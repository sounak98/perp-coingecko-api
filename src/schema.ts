export interface PairResponse {
    ticker_id: string
    base_currency: string
    target_currency: string
    last_price: string          // last price of ETH in USDC
    base_volume: string         // 24 hr volume in ETH
    target_volume: string       // 24 hr volume in USDC
    high: string                // highest price in last 24hrs
    low: string                 // lowest price in last 24hrs
    product_type: "Perpetual"
    // open_interest: string
    funding_rate: string
    next_funding_rate_timestamp: string
}