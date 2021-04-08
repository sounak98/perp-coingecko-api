import { getRelevantPositionChangedEvents } from "./subgraph";
import { getAmmInfos } from "../getPairs/amm";

import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import QRCode from "qrcode";

const getPnl = async (req, res, next) => {
  const trader: string = req.query.trader;
  const amm: string = req.query.amm;
  const blockNumber: string = req.query.blockNumber;

  if (!trader || !amm || !blockNumber) {
    const err = new Error("Required query params missing");
    return next(err);
  }

  const relevantEvents = await getRelevantPositionChangedEvents(
    trader,
    amm,
    blockNumber
  );

  const entryPrice =
    Number(relevantEvents[relevantEvents.length - 1].spotPrice) * 1e-18;
  const exitPrice = Number(relevantEvents[0].spotPrice) * 1e-18;

  const totalRealizedPnl =
    relevantEvents.reduce((total, obj) => total + Number(obj.realizedPnl), 0) *
    1e-18;
  const finalMargin = Number(relevantEvents[1].margin) * 1e-18;
  const finalPosition = Number(relevantEvents[1].positionSizeAfter) * 1e-18;
  const roi = (totalRealizedPnl / finalMargin) * 100;

  const green = "#40C87F";
  const red = "#EA6262";
  const QrPngString = await QRCode.toDataURL(
    `https://perp.exchange/ref/${trader}`
  );

  const template = handlebars.compile(
    fs.readFileSync(path.join(__dirname, "./card.svg"), {
      encoding: "utf8",
      flag: "r",
    })
  );

  const ammInfos = await getAmmInfos();
  const { quoteAssetSymbol, baseAssetSymbol, ...params } = ammInfos.filter(
    (x) => x.address.toLowerCase() == amm.toLowerCase()
  )[0];

  const data = {
    exitPrice: exitPrice.toFixed(1),
    entryPrice: entryPrice.toFixed(1),
    roi: roi.toFixed(1),
    pair: `${baseAssetSymbol}/${quoteAssetSymbol}`,
    roiColor: roi > 0 ? green : red,
    positionSideColor: finalPosition > 0 ? green : red,
    positionSide: finalPosition > 0 ? "LONG " : "SHORT ",
    QrPngString,
  };

  const resultSvg = template(data);
  const resultPng = await sharp(Buffer.from(resultSvg))
    .toFormat("png")
    .toBuffer();

  res.set("Content-Type", "image/png");
  res.send(resultPng);
};

export default getPnl;
