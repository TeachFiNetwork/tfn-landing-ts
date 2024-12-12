import { DustConverterAbi } from "@/utils/abiConfig.ts";

export const isDev = true;

export const contracts = {
  DustConverter: {
    address: "erd1qqqqqqqqqqqqqpgqkj8ms9xk8ff9f74qmqe8dmte7s55kt9qtatsrr3f36",
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

export const ElrondGatewayUrl = "https://devnet-gateway.multiversx.com";
export const ElrondApiUrl = "https://devnet-api.multiversx.com";
export const ONEDEX_AGGREGATOR_API = "https://devnet-aggregator.onedex.app";

export const ONE = isDev ? "ONE-83a7c0" : "ONE-f9954f";
