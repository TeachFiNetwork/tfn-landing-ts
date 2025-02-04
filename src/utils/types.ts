import { TypedValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

export type TCallMethodProperties = {
  contract: any;
  method: string;
  args?: TypedValue[];
  egld?: BigNumber.Value;
  fts?: FTPayment[];
  nfts?: NFTPayment[];
  sfts?: SFTPayment[];
  wrap?: BigNumber.Value;
  gasLimit?: string;
  // unwrap?: BigNumber.Value
};

export const BigZero = new BigNumber(0);

export type TViewMethodProperties = {
  contract: any;
  method: string;
  args?: TypedValue[];
};

export type TViewMethod = (values: TViewMethodProperties) => Promise<any>;

export type TCallMethod = (values: TCallMethodProperties) => Promise<any>;

export interface FTPayment {
  token: string;
  amount: BigNumber.Value;
  decimals: number;
}

export interface NFTPayment {
  token: string;
  nonce: number;
}

export interface SFTPayment {
  token: string;
  nonce: number;
  amount: number;
}

export interface IInteractionContext {
  viewMethod: TViewMethod;
  callMethod: TCallMethod;
}

export type Token = {
  balance: string;
  identifier: string;
  name: string;
  ticker: string;
  valueUsd: number;
  pngUrl: string;
  decimals: number;
};

export type SelectedToken = Token & {
  isSelected: boolean;
};

export enum SWAP_TYPE {
  fixedInput = 0,
  fixedOutput = 1,
}

export enum DexType {
  OneDex,
  xExchange,
}
