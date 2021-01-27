import fetch from "cross-fetch";
const subgraphUrl = 'https://api.thegraph.com/subgraphs/name/perpetual-protocol/perp-position-subgraph'

export async function getLastFundingRate() {
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

export async function getDailyPriceLogs() {
    const metadata = await fetch(subgraphUrl, {
        method: "POST",
        body: JSON.stringify({
            query: `{
                positionChangedEvents(orderBy: blockNumber, orderDirection: desc, where: { amm_in: ["0x8d22F1a9dCe724D8c1B4c688D75f17A2fE2D32df"], 
                    timestamp_lt: "1611773826", timestamp_gt: "1611773740"}) {
                id
                spotPrice
                fundingPayment
                timestamp
                }
              }`
        })
    }).then(res => res.json())
    return {
        metadata
    }
}