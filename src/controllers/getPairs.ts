import type { Request, Response } from "express";
import fetch from "cross-fetch";
import { getAmmInfos } from './amm';
import { PairResponse } from '../schema';
import { getLastFundingRate } from './subgraph';

const getPairs = async (req: Request, res: Response) => {
    let result: PairResponse;
    const ammInfos = await getAmmInfos()
    console.log(ammInfos)
    const spotPrices = ammInfos.map(amm => Number(amm.quoteAssetReserve * BigInt(100) / amm.baseAssetReserve) / 100)
    console.log(spotPrices)
    const fundingrateMetadata = await getLastFundingRate()
    const fundingRate = fundingrateMetadata.rate // -90468496635057, convert to -0.090%
    console.log(fundingRate)
};

export default getPairs;
