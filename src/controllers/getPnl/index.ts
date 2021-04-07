import { getRelevantPositionChangedEvents } from "./subgraph";

const getPnl = async (req, res, next) => {
  const trader: String = req.query.trader;
  const amm: String = req.query.amm;
  const blockNumber: String = req.query.blockNumber;

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

  res.json({
    totalRealizedPnl,
    roi,
    entryPrice,
    exitPrice,
    positionSide: finalPosition > 0 ? "LONG" : "SHORT",
  });
};

export default getPnl;
