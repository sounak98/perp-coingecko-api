export interface IPair {
  ticker_id: string;
  base_currency: string;
  target_currency: string;
  last_price: number; // last price of ETH in USDC
  base_volume: number; // 24 hr volume in ETH
  target_volume: number; // 24 hr volume in USDC
  high: number; // highest price in last 24hrs
  low: number; // lowest price in last 24hrs
  product_type: "Perpetual";
  open_interest: string;
  funding_rate: number;
  next_funding_rate_timestamp?: string;
}
