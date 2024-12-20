import { ElrondApiUrl, isDev, ONEDEX_AGGREGATOR_API, ONEDEX_API } from "@/utils/config.ts";
import axios from "axios";

export const getAddressTokens = async (address: string) => {
  const response = await axios.get(`${ElrondApiUrl}/accounts/${address}/tokens?size=200`);
  return response.data;
};

export const getSwapFromOneApi = async (
  tokenIn: string,
  tokenOut: string,
  amount: string,
  sender: string
) => {
  const response = await axios.post(
    `${ONEDEX_AGGREGATOR_API}/swap`,
    {
      tokenInID: tokenIn,
      tokenOutID: tokenOut,
      amountIn: amount,
      senderAddress: sender,
      tolerance: isDev ? 0.99 : 0.01,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getTokensFromOnedexApi = async () => {
  const response = await axios.get(`${ONEDEX_AGGREGATOR_API}/tokens`);
  return response.data;
};

export const getApi = (chainID: string) => {
  const defaultUrl = chainID === "1" ? "api.multiversx.com" : "devnet-api.multiversx.com";

  return defaultUrl;
};
