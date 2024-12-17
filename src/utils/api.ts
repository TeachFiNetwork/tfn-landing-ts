import { ElrondApiUrl, ONEDEX_AGGREGATOR_API } from "@/utils/config.ts";
import axios from "axios";

export const getAddressTokens = async (address: string) => {
  const response = await axios.get(`${ElrondApiUrl}/accounts/${address}/tokens`);
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
      tolerance: 0.9,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
