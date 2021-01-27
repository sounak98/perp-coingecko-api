import fetch from "cross-fetch";
export async function getLastFundingRate() {
    const subgraphUrl = 'https://api.thegraph.com/subgraphs/name/perpetual-protocol/perp-position-subgraph'
    const metadata = await fetch(subgraphUrl, {
        method: "POST",
        body: JSON.stringify({
            query: `{
                fundingRateUpdatedEvents(first: 1, orderBy: timestamp, orderDirection: desc,  where: {amm: "0x8d22F1a9dCe724D8c1B4c688D75f17A2fE2D32df"}){
                id
                rate
                underlyingPrice
                amm
                blockNumber
                timestamp
                }
            }`
        })
    }).then(res => res.json())
    return {
        metadata
    }
  }