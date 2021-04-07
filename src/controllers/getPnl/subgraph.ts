import fetch from "cross-fetch";

const subgraphUrl =
  "https://api.thegraph.com/subgraphs/name/perpetual-protocol/perp-position-subgraph";

export const getRelevantPositionChangedEvents = async (
  trader: String,
  amm: String,
  blockNumber: String
) => {
  const positionChangedEvents = await fetch(subgraphUrl, {
    method: "POST",
    body: JSON.stringify({
      query: `{
        positionChangedEvents(where: {
            trader: "${trader}",
            amm: "${amm}",
            blockNumber_lte: "${blockNumber}"
        }, orderBy: timestamp, orderDirection: desc) {
            id
            trader
            amm
            margin
            positionNotional
            exchangedPositionSize
            fee
            positionSizeAfter
            realizedPnl
            unrealizedPnlAfter
            badDebt
            liquidationPenalty
            spotPrice
            fundingPayment
            blockNumber
          }
        }`,
    }),
  })
    .then((res) => res.json())
    .then((resJson) => resJson.data.positionChangedEvents);

  let relevantPositionChangedEvents = [];
  let flag = false;
  for (let positionChangedEvent of positionChangedEvents) {
    if (flag && positionChangedEvent.positionSizeAfter === "0") break;
    if (!flag && positionChangedEvent.positionSizeAfter === "0") flag = true;

    if (flag) relevantPositionChangedEvents.push(positionChangedEvent);
  }

  return relevantPositionChangedEvents;
};
