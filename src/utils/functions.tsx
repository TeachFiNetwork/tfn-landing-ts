import BigNumber from "bignumber.js";
import { DexType, SWAP_TYPE } from "@/utils/types.ts";
import {
  Address,
  AddressType,
  AddressValue,
  BigUIntValue,
  OptionType,
  OptionValue,
  StringValue,
  Tuple,
  U8Value,
} from "@multiversx/sdk-core/out";

export const convertEsdtToWei = (amount: BigNumber.Value, decimals?: number): BigNumber => {
  if (!amount) amount = "0";
  return new BigNumber(amount)
    .shiftedBy(decimals == null ? 18 : decimals)
    .decimalPlaces(0, BigNumber.ROUND_FLOOR);
};

export function formatNumber(number: number, decimals: number = 4) {
  const multiplier = Math.pow(10, decimals);
  return (Math.floor(number * multiplier) / multiplier).toFixed(decimals);
}

export function createSwapOperations(swapRoute: any): any {
  const swapOperations: any = [];

  for (let i = 0; i < swapRoute.pairs.length; i++) {
    const pair = swapRoute.pairs[i];
    const tokenWanted = swapRoute.tokenRoute[i + 1];
    const lastPath = i == swapRoute.pairs.length - 1;
    const amountWanted = swapRoute.intermediaryAmounts[i + 1];

    // In case if all paths are OneDex, use same operation since only the last one actually counts
    const lastPathsAreOnedex = !swapRoute.pairs
      .slice(i)
      .find((pair: any) => pair.type !== DexType.OneDex);

    // If fixed output, only last operation will be fixed output
    const actualAmountWanted =
      lastPath && swapRoute.swapType === SWAP_TYPE.fixedOutput
        ? swapRoute.amountOut
        : new BigNumber(amountWanted).minus(
            new BigNumber(amountWanted).multipliedBy(swapRoute.tolerance)
          );

    swapOperations.push(
      Tuple.fromItems([
        new U8Value(pair.type),
        new OptionValue(
          new OptionType(new AddressType()),
          pair.type === DexType.OneDex ? null : new AddressValue(Address.fromBech32(pair.address))
        ),
        new U8Value(
          lastPath || lastPathsAreOnedex
            ? swapRoute.swapType.valueOf()
            : SWAP_TYPE.fixedInput.valueOf()
        ),
        new StringValue(tokenWanted),
        new BigUIntValue(actualAmountWanted.integerValue()),
      ])
    );
  }

  return swapOperations;
}
