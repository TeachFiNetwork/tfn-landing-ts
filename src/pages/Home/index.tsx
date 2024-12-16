import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAccountInfo, useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks";
import { logout } from "@multiversx/sdk-dapp/utils";
import { useInteraction } from "@/utils/Interaction.tsx";
import BigNumber from "bignumber.js";
import { getAddressTokens, getSwapFromOneApi } from "@/utils/api.ts";
import { Token } from "@/utils/types.ts";
import { createSwapOperations, formatNumber } from "@/utils/functions.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { contracts, ONE } from "@/utils/config.ts";
import { TokenIdentifierValue, U64Value } from "@multiversx/sdk-core/out";

export const Home = () => {
  const { address } = useGetAccountInfo();
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const { callMethod } = useInteraction();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minBalanceFilter, setMinBalanceFilter] = useState<number>(100000);

  useEffect(() => {
    (async () => {
      const stateTokens: Array<Token> = [];
      const tokens = await getAddressTokens(address);
      tokens.map((token: any) => {
        stateTokens.push({
          balance: token.balance,
          identifier: token.identifier,
          name: token.name,
          ticker: token.ticker,
          valueUsd: token.valueUsd,
          pngUrl: token.assets?.pngUrl ?? "",
        });
      });
      setTokens(stateTokens);
    })();
  }, [address]);

  const filteredTokens = tokens.filter((token) => {
    const matchesSearch =
      token.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.name.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesCategory = !selectedCategory;
    const matchesBalance =
      BigNumber(token.balance)
        .dividedBy(10 ** 18)
        .toNumber() <= minBalanceFilter;
    return matchesSearch && matchesBalance;
  });
  console.log(tokens);
  const handleCreateStruct = async (identifier: string, balance: string) => {
    const firstResponseFromOneApi = await getSwapFromOneApi(
      tokens[0].identifier,
      ONE,
      new BigNumber(1).shiftedBy(18).toString(),
      address
    );
    const secondResponseFromOneApi = await getSwapFromOneApi(
      tokens[1].identifier,
      ONE,
      new BigNumber(0.01).shiftedBy(18).toString(),
      address
    );

    console.log(firstResponseFromOneApi);
    console.log(secondResponseFromOneApi);

    const firstStructToSendToSc = await createSwapOperations(firstResponseFromOneApi);
    const secondStructToSendToSc = await createSwapOperations(secondResponseFromOneApi);

    await callMethod({
      contract: contracts.DustConverter,
      method: "convertDust",
      gasLimit: "100000000",
      args: [
        new TokenIdentifierValue(ONE),
        new U64Value(firstStructToSendToSc.length),
        ...firstStructToSendToSc,
        new U64Value(secondStructToSendToSc.length),
        ...secondStructToSendToSc,
      ],
      fts: [
        {
          token: tokens[0].identifier,
          amount: new BigNumber(firstResponseFromOneApi.amountIn).shiftedBy(-18),
          decimals: 18,
        },
        {
          token: tokens[1].identifier,
          amount: new BigNumber(secondResponseFromOneApi.amountIn).shiftedBy(-18),
          decimals: 18,
        },
      ],
    });
  };

  const handleSwap = async (tokenIn: string, tokenOut: string, amount: number) => {
    await callMethod({
      contract: contracts.DustConverter,
      method: "convertDust",
      // args: [new TokenIdentifierValue(ONE), [new U64Value()]],
    });
  };

  return (
    <Card className="w-full max-w-3xl bg-[#1A1830]/90 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-gray-100 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          Select Token
        </CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-10 bg-[#252042]/50 border-purple-900/30 text-gray-100 placeholder:text-gray-400 focus:border-purple-500/50"
            placeholder="Search tokens by name or symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild className="flex w-full justify-start">
            <Button
              className="md:w-[20dvw] !mt-3 bg-[#252042]/30 hover:bg-[#252042]/70 border hover:border-purple-500/30 transition-all duration-300 border-purple-900/30 text-gray-100"
              variant="default">
              Minimum Balance: {minBalanceFilter}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align={"start"}
            className="w-[20rem] bg-[#1A1830]/90 backdrop-blur-sm border py-6">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <div className="text-gray-100">Minimum Balance</div>
                <div className="text-gray-100 text-xs">≥ 100000</div>
              </div>
              <Input
                type="range"
                min={0}
                max={100000}
                value={minBalanceFilter}
                onChange={(e) => setMinBalanceFilter(parseInt(e.target.value))}
                className="w-full mt-2"
              />
              <div>{minBalanceFilter}</div>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="md:h-[calc(60vh-300px)] h-[calc(80vh-200px)] flex flex-col">
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredTokens.map((token) => (
              <div
                key={token.identifier}
                onClick={() => handleCreateStruct(token.identifier, token.balance)}
                className="group relative bg-[#252042]/30 rounded-lg p-4 cursor-pointer hover:bg-[#252042]/50 transition-all duration-300 border border-purple-900/20 hover:border-purple-500/30">
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-fuchsia-600 opacity-0 group-hover:opacity-5 transition-opacity rounded-lg`}
                />
                <div className="relative flex flex-col items-center gap-2">
                  {token.pngUrl !== "" ? (
                    <img
                      src={token.pngUrl}
                      alt={token.name}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <span className="text-white text-sm font-bold">{token.ticker.charAt(0)}</span>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="text-gray-200 font-medium">{token.name}</div>
                    <div className="text-gray-400 text-xs">{token.ticker}</div>
                    <div className="text-gray-400 text-xs">
                      {formatNumber(
                        BigNumber(token.balance)
                          .dividedBy(10 ** 18)
                          .toNumber(),
                        16
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!isLoggedIn ? (
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => navigate("/unlock")}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-6">
              Connect Wallet
            </Button>
          </div>
        ) : (
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => logout()}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-6">
              Disconnect
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
