import type { Request, Response } from "express";
import fetch from "cross-fetch";
import { getAmmInfos } from './amm';
import { PairResponse } from '../schema';
import { getLastFundingRate, getDailyPriceLogs } from './subgraph';

const getPairs = async (req: Request, res: Response) => {
    let result: PairResponse;
    const ammInfos = await getAmmInfos()
    console.log(ammInfos)
    const spotPrices = ammInfos.map(amm => Number(amm.quoteAssetReserve * BigInt(100) / amm.baseAssetReserve) / 100)
    console.log(spotPrices)
    const fundingrateMetadata = await getLastFundingRate()
    const fundingRate = fundingrateMetadata.rate // -90468496635057, convert to -0.090%
    console.log(fundingRate)

    // will be used to calculate 24hr high and 24 hr low (sorting on )
    const priceLogsMetadata = await getDailyPriceLogs()
    console.log(priceLogsMetadata)

    // 24hr target volume
    // Sigma(positionNotional)

    // 24hr base bolume
    // Sigma(positionNotional / spotPrice)
};

export default getPairs;
