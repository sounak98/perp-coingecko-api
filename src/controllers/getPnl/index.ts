import { getRelevantPositionChangedEvents } from "./subgraph";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

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
  const template = handlebars.compile(
    fs.readFileSync(path.join(__dirname, "./card.svg"), {
      encoding: "utf8",
      flag: "r",
    })
  );

  const data = {
    exitPrice: exitPrice.toFixed(1),
    entryPrice: entryPrice.toFixed(1),
    roi: roi.toFixed(1),
    pair: "BTC/USDC",
    roiColor: roi > 0 ? green : red,
    positionSideColor: finalPosition > 0 ? green : red,
    positionSide: finalPosition > 0 ? "LONG " : "SHORT ",
  };

  const resultSvg = template(data);
  console.log(resultSvg);
  
  const resultSvgBuffer = Buffer.from(resultSvg);
  const resultPng = await sharp(resultSvgBuffer).toFormat("png").toBuffer();
  const resultBase64Png = `data:image/png;base64,${resultPng.toString('base64')}`
  
  console.log(resultBase64Png);
  res.writeHead(200, { "Content-Type": "image/png", 'Content-Length': resultPng.length});
  res.end(resultPng);
};

export default getPnl;
