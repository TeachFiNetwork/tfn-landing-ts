import { EnvironmentsEnum } from "@multiversx/sdk-dapp/types";

// go to https://cloud.reown.com/sign-up to get create a project then get your project id
export const walletConnectV2ProjectId = import.meta.env.VITE_ENV_WALLETCONNECTV2_PROJECTID;
export const apiTimeout = 10_000; // 10s

export const TOOLS_API_URL = "https://tools.multiversx.com";

export const ELROND_NETWORK = import.meta.env.VITE_ENV_NETWORK || EnvironmentsEnum.devnet;

export enum MVX_ENV_ENUM {
  devnet = "ED",
  mainnet = "E1",
}

export const dAppName = "Mvx Template";

export const defaultUrl = (chainId: string) => {
  return chainId === "1" ? "api.multiversx.com" : "devnet-api.multiversx.com";
};
