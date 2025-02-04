export const getApi = (chainID: string) => {
  const defaultUrl = chainID === "1" ? "api.multiversx.com" : "devnet-api.multiversx.com";

  return defaultUrl;
};
