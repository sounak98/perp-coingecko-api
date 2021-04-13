import { getRelevantPositionChangedEvents } from "./subgraph";
import fetch from "cross-fetch";

import sharp from "sharp";
import QRCode from "qrcode";
import template from "./card";

let ammList = {}

const getAmmForAddress = async (ammAddress) => {
  if (ammAddress in ammList) {
    return ammList[ammAddress]
  }

  const metadataUrl = "https://metadata.perp.exchange/production.json";
  const metadata = await fetch(metadataUrl).then((res) => res.json());
  const contracts = metadata["layers"]["layer2"]["contracts"]

  Object.keys(contracts).forEach(item => {
    const data = contracts[item]
    if (data['name'] === 'Amm') {
      ammList[data["address"].toLowerCase()] = { baseAssetSymbol: item.slice(0, -4), quoteAssetSymbol: item.slice(-4) }
    }
  })

  return ammList[ammAddress]
}

const getPnl = async (req, res, next) => {

  const trader: string = req.query.trader.toLowerCase();
  const amm: string = req.query.amm.toLowerCase();
  const blockNumber: string = req.query.blockNumber.toLowerCase();

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
  const { quoteAssetSymbol, baseAssetSymbol } = await getAmmForAddress(amm);

  const green = "#40C87F";
  const red = "#EA6262";
  const QrPngString = await QRCode.toDataURL(
    `https://perp.exchange/t/${baseAssetSymbol}:${quoteAssetSymbol}`
  );

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
