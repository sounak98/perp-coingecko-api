import type { IPair } from "../../schema";
import { getAmmInfos } from "./amm";
import { getDailyPriceLogs, getLastFundingInfo } from "./subgraph";
import {
  getSpotPrice,
  getTickerId,
  getMaxMinSpotPrice,
  getTargetVolume,
  getBaseVolume,
} from "./utils";

const getPairs = async (req, res) => {
  const ammInfos = await getAmmInfos();

  const pairs: Array<IPair> = await Promise.all(
    ammInfos.map(async (amm) => {
      const fundingRateInfo = await getLastFundingInfo(amm.address);
      const dailyPriceLogs = await getDailyPriceLogs(amm.address);
      const [minSpotPrice, maxSpotPrice] = getMaxMinSpotPrice(dailyPriceLogs);
      let nextFundingRateTimestamp;
      if (fundingRateInfo?.timestamp) {
        const nextFundingRateTime = new Date(
          Number(fundingRateInfo.timestamp) * 1000 // converting to ms
        );
        nextFundingRateTime.setHours(nextFundingRateTime.getHours() + 1);
        nextFundingRateTimestamp = Math.floor(
          nextFundingRateTime.getTime() / 1000
        );
      }

      const pair: IPair = {
        ticker_id: getTickerId(amm),
        base_currency: amm.baseAssetSymbol,
        target_currency: amm.quoteAssetSymbol,
        last_price: getSpotPrice(amm),
        product_type: "Perpetual",
        funding_rate: fundingRateInfo?.rate && fundingRateInfo.rate * 1e-15,
        next_funding_rate_timestamp: nextFundingRateTimestamp,
        high: maxSpotPrice,
        low: minSpotPrice,
        target_volume: getTargetVolume(dailyPriceLogs),
        base_volume: getBaseVolume(dailyPriceLogs),
      };

      return pair;
    })
  );

  res.json({ pairs });
};

export default getPairs;
