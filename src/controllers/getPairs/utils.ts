export const getTickerId = (amm) =>
  `${amm.baseAssetSymbol}_${amm.quoteAssetSymbol}`;

export const getSpotPrice = (amm) =>
  Number((amm.quoteAssetReserve * BigInt(100)) / amm.baseAssetReserve) / 100;

export const getMaxMinSpotPrice = (dailyPriceLogs) => {
  const spotPrices = dailyPriceLogs
    .map((dailyPriceLog) => Number(dailyPriceLog.spotPrice) * 1e-18)
    .sort();

  return [spotPrices[0], spotPrices[spotPrices.length - 1]];
};

export const getTargetVolume = (dailyPriceLogs) =>
  dailyPriceLogs.reduce((a, b) => a + Number(b.positionNotional) * 1e-18, 0);

export const getBaseVolume = (dailyPriceLogs) =>
  dailyPriceLogs.reduce(
    (a, b) => a + Number(b.positionNotional) / Number(b.spotPrice),
    0
  );
