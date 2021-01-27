import type { Request, Response } from "express";
import fetch from "cross-fetch";
import { getAmmInfos } from './amm';
import { PairResponse } from '../schema';

const getPairs = async (req: Request, res: Response) => {
    let result: PairResponse;
    const ammInfos = await getAmmInfos()
    console.log(ammInfos)
    const spotPrices = ammInfos.map(amm => Number(amm.quoteAssetReserve * BigInt(100) / amm.baseAssetReserve) / 100)
    console.log(spotPrices)
};

export default getPairs;
