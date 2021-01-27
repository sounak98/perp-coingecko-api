import fetch from "cross-fetch";

const subgraphUrl =
  "https://api.thegraph.com/subgraphs/name/perpetual-protocol/perp-position-subgraph";

export const getLastFundingInfo = async (address: any) => {
  const fundingRateUpdatedEvents = await fetch(subgraphUrl, {
    method: "POST",
    body: JSON.stringify({
      query: `{
                fundingRateUpdatedEvents(
                  first: 1,
                  orderBy: timestamp,
                  orderDirection: desc,
                  where: {amm: "${address}"}
                ) {
                  id
                  rate
                  underlyingPrice
                  amm
                  blockNumber
                  timestamp
                }
            }`,
    }),
  })
    .then((res) => res.json())
    .then((resJson) => resJson.data.fundingRateUpdatedEvents);

  return fundingRateUpdatedEvents.length > 0
    ? fundingRateUpdatedEvents[0]
    : null;
};

export async function getDailyPriceLogs(address) {
  const now = new Date();
  const timestamp_lt = Math.floor(now.getTime() / 1000);

  now.setHours(now.getHours() - 24);
  const timestamp_gt = Math.floor(now.getTime() / 1000);

  const dailyPriceLogs = await fetch(subgraphUrl, {
    method: "POST",
    body: JSON.stringify({
      query: `{
                positionChangedEvents(
                  orderBy: timestamp,
                  orderDirection: desc,
                  where: { amm_in: ["${address}"],
                  timestamp_lt: "${timestamp_lt}",
                  timestamp_gt: "${timestamp_gt}"}
                ) {
                  id
                  spotPrice
                  fundingPayment
                  timestamp
                  positionNotional
              }
            }`,
    }),
  })
    .then((res) => res.json())
    .then((resJson) => resJson.data.positionChangedEvents);

  return dailyPriceLogs;
}
