import fetch from "cross-fetch";
import { Contract, providers } from "ethers";
import AmmReaderArtifact from "@perp/contract/build/contracts/AmmReader.json";
import InsuranceFundArtifact from "@perp/contract/build/contracts/InsuranceFund.json";

async function setupEnv() {
  const metadataUrl = "https://metadata.perp.exchange/production.json"
  const metadata = await fetch(metadataUrl).then(res => res.json())
  const xDaiUrl = "https://rpc.xdaichain.com/"
  const layer2Provider = new providers.JsonRpcProvider(xDaiUrl)
  const insuranceFundAddr = metadata.layers.layer2.contracts.InsuranceFund.address
  const ammReaderAddr = metadata.layers.layer2.contracts.AmmReader.address

  const insuranceFund = new Contract(insuranceFundAddr, InsuranceFundArtifact.abi, layer2Provider)
  const ammReader = new Contract(ammReaderAddr, AmmReaderArtifact.abi, layer2Provider)
  return {
    insuranceFund, ammReader
  }
}

function getAmmInfo(ammProps: any) {
  return {
    quoteAssetSymbol: ammProps.quoteAssetSymbol,
    baseAssetSymbol: ammProps.baseAssetSymbol,
    priceFeedKey: ammProps.priceFeedKey,
    priceFeed: ammProps.priceFeed,
    fundingPeriod: ammProps.fundingPeriod,
    tradeLimitRatio: ammProps.tradeLimitRatio,
    baseAssetReserve: BigInt(ammProps.baseAssetReserve),
    quoteAssetReserve: BigInt(ammProps.quoteAssetReserve)
  }
}


export async function getAmmInfos() {
  const { insuranceFund, ammReader } = await setupEnv()
  const ammAddresses: any = await insuranceFund.getAllAmms()
  const ammProps = await Promise.all(ammAddresses.map(addr => ammReader.getAmmStates(addr)))
  
  const ammInfos = ammProps.map(prop => getAmmInfo(prop))
  return ammInfos
}
