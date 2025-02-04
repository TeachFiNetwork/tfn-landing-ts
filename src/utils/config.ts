import { DustConverterAbi } from "@/utils/abiConfig.ts";

export const isDev = false;

export const contracts = {
  DustConverter: {
    address: "erd1qqqqqqqqqqqqqpgqlkk9xgxqdxhqfja6fa57apuurfllvg887yqse5lvdr",
    abi: DustConverterAbi,
  },
  Wrap0: {
    address: "erd1qqqqqqqqqqqqqpgqvc7gdl0p4s97guh498wgz75k8sav6sjfjlwqh679jy",
  },
  Wrap1: {
    address: "erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3",
  },
  Wrap2: {
    address: "erd1qqqqqqqqqqqqqpgqmuk0q2saj0mgutxm4teywre6dl8wqf58xamqdrukln",
  },
};

export const ElrondGatewayUrl = isDev
  ? "https://devnet-gateway.multiversx.com"
  : "https://gateway.multiversx.com";
export const ElrondApiUrl = isDev
  ? "https://devnet-api.multiversx.com"
  : "https://multiversx-api.beaconx.app/public-mainnet-api";
export const ONEDEX_AGGREGATOR_API = isDev
  ? "https://devnet-aggregator.onedex.app"
  : "https://aggregator.onedex.app";
export const ONEDEX_API = "https://api.onedex.app";

export const ONE = isDev ? "ONE-83a7c0" : "ONE-f9954f";
