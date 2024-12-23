import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetAccountInfo,
  useGetIsLoggedIn,
  useGetPendingTransactions,
} from "@multiversx/sdk-dapp/hooks";
import { useInteraction } from "@/utils/Interaction.tsx";
import BigNumber from "bignumber.js";
import { getAddressTokens, getSwapFromOneApi, getTokensFromOnedexApi } from "@/utils/api.ts";
import { SelectedToken } from "@/utils/types.ts";
import { createSwapOperations, formatNumber } from "@/utils/functions.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { contracts, ONE } from "@/utils/config.ts";
import { TokenIdentifierValue, U64Value } from "@multiversx/sdk-core/out";
import { Label } from "@/components/ui/label.tsx";

export const Home = () => {
  const { address } = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const { callMethod } = useInteraction();
  const maxBalance = 1000;
  const [tokens, setTokens] = useState<SelectedToken[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minBalanceFilter, setMinBalanceFilter] = useState<number>(100000);
  const [selectedTokensForSwap, setSelectedTokensForSwap] = useState<SelectedToken[]>([]);

  useEffect(() => {
    (async () => {
      const stateTokens: Array<SelectedToken> = [];
      const tokensFromsOnedexApi = new Set<any>(
        await getTokensFromOnedexApi().then((res) => res.map((token: any) => token.identifier))
      );
      // console.log(tokensFromsMVXApi, tokensFromsOnedexApi);
      if (address) {
        const tokensFromsMVXApi = await getAddressTokens(address);
        tokensFromsMVXApi.forEach((tokenMVX: any) => {
          if (tokensFromsOnedexApi.has(tokenMVX.identifier) && tokenMVX.identifier !== ONE) {
            stateTokens.push({
              balance: tokenMVX.balance,
              identifier: tokenMVX.identifier,
              name: tokenMVX.name,
              ticker: tokenMVX.ticker,
              valueUsd: tokenMVX.valueUsd,
              pngUrl: tokenMVX.assets?.pngUrl ?? "",
              isSelected: false,
              decimals: tokenMVX.decimals,
            });
          }
        });
      } else {
        const tokensFromsOnedex = await getTokensFromOnedexApi();
        // console.log(tokensFromsOnedex);
        tokensFromsOnedex.forEach((tokenOnedex: any) => {
          stateTokens.push({
            balance: "0",
            identifier: tokenOnedex.identifier,
            name: tokenOnedex.name,
            ticker: tokenOnedex.ticker,
            valueUsd: tokenOnedex.valueUsd,
            pngUrl: tokenOnedex.assets?.pngUrl ?? "",
            isSelected: false,
            decimals: tokenOnedex.decimals,
          });
        });
      }
      setTokens(stateTokens);
    })();
  }, [address, hasPendingTransactions]);

  const filteredTokens = tokens.filter((token) => {
    const matchesSearch =
      token.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.name.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesCategory = !selectedCategory;
    const matchesBalance =
      BigNumber(token.balance)
        .dividedBy(10 ** token.decimals)
        .toNumber() <= minBalanceFilter;
    return matchesSearch && matchesBalance;
  });
  // console.log(tokens);

  const handleCreateStruct = async (selectedTokens: SelectedToken[]) => {
    const tokensPayment = selectedTokens.map((token) => {
      return {
        token: token.identifier,
        amount: new BigNumber(token.balance).shiftedBy(-18).toString(),
        decimals: 18,
      };
    });

    const structForSc: any = [new TokenIdentifierValue(ONE)];

    for (let i = 0; i < selectedTokens.length; i++) {
      const responseFromOneApi = await getSwapFromOneApi(
        selectedTokens[i].identifier,
        ONE,
        selectedTokens[i].balance,
        address
      );
      const structToSendToSc = await createSwapOperations(responseFromOneApi);
      structForSc.push(new U64Value(structToSendToSc.length), ...structToSendToSc);
    }

    // console.log(structForSc);

    await callMethod({
      contract: contracts.DustConverter,
      method: "convertDust",
      gasLimit: Math.min(40_000_000 + selectedTokens.length * 36_000_000, 600_000_000).toString(),
      args: structForSc,
      fts: tokensPayment,
    }).finally(() => setSelectedTokensForSwap([]));
  };

  const handleTokenClick = (token: SelectedToken) => {
    const isTokenSelected = selectedTokensForSwap.some((t) => t.identifier === token.identifier);

    if (!isTokenSelected && selectedTokensForSwap.length >= 7) {
      alert("Maximum of 7 tokens can be selected");
      return;
    }

    setTokens((prevTokens) =>
      prevTokens.map((t) =>
        t.identifier === token.identifier ? { ...t, isSelected: !t.isSelected } : t
      )
    );

    setSelectedTokensForSwap((prevTokens) => {
      const tokenExists = prevTokens.some((t) => t.identifier === token.identifier);

      if (tokenExists) {
        return prevTokens.filter((t) => t.identifier !== token.identifier);
      } else {
        return [
          ...prevTokens,
          {
            ...token,
            isSelected: true,
          },
        ];
      }
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
              hidden={!isLoggedIn}
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
                <div className="text-gray-100 text-xs">≥ 0</div>
              </div>
              <Input
                type="range"
                min={0}
                max={100000}
                value={minBalanceFilter}
                onChange={(e) => setMinBalanceFilter(parseInt(e.target.value))}
                className="w-full mt-2"
              />
              <div className="flex flex-col items-start justify-center gap-1.5">
                <Label htmlFor="balance">Min Balance</Label>
                <Input
                  id="balance"
                  min={0}
                  max={100000}
                  type="number"
                  value={minBalanceFilter}
                  onChange={(e) => {
                    if (parseInt(e.target.value) >= 0) {
                      setMinBalanceFilter(parseInt(e.target.value));
                    } else {
                      setMinBalanceFilter(0);
                    }
                    if (parseInt(e.target.value) > 100000) {
                      setMinBalanceFilter(100000);
                    }
                  }}
                  className="w-full bg-[#0D0B1A] mr-0 mb-2"
                />
              </div>

              <div className="flex items-center gap-1">
                <p className="py-0">Current Min Balance</p>
                <p className="text-slate-300 text-sm pt-0.5">{minBalanceFilter}</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="h-[calc(80vh-200px)] flex flex-col gap-2">
        <div className="flex-1 overflow-y-auto pr-2 min-h-80">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredTokens.map((token) => (
              <div
                key={token.identifier}
                onClick={() => handleTokenClick(token)}
                className={`group relative rounded-lg p-4 cursor-pointer transition-all duration-300 border
                            ${
                              token.isSelected
                                ? "bg-[#252042]/60 border-purple-500/50"
                                : "bg-[#252042]/30 border-purple-900/20 hover:bg-[#252042]/50 hover:border-purple-500/30"
                            }`}>
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-lg transition-opacity
                            ${token.isSelected ? "opacity-10" : "opacity-0 group-hover:opacity-5"}`}
                />
                <div className="relative flex flex-col items-center gap-2">
                  {token.pngUrl !== "" ? (
                    <img
                      src={token.pngUrl}
                      alt={token.name}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform
                                ${token.isSelected ? "scale-110" : "group-hover:scale-110"}`}
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center shadow-lg transition-transform
                                ${token.isSelected ? "scale-110" : "group-hover:scale-110"}`}>
                      <span className="text-white text-sm font-bold">{token.ticker.charAt(0)}</span>
                    </div>
                  )}

                  <div className="text-center">
                    <div
                      className={`font-medium ${token.isSelected ? "text-white" : "text-gray-200"}`}>
                      {token.name}
                    </div>
                    <div className="text-gray-400 text-xs">{token.ticker}</div>
                    <div className="text-gray-400 text-xs">
                      {token.balance !== "0"
                        ? formatNumber(
                            BigNumber(token.balance)
                              .dividedBy(10 ** token.decimals)
                              .toNumber(),
                            15
                          )
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full border md:h-40 h-32 overflow-y-auto rounded-lg">
          <p className="md:text-xl text-lg font-bold p-2.5">Selected Tokens</p>
          <div className="flex justify-between px-2.5 font-medium border-b-2 text-slate-200">
            <p>Coin</p>
            <p>Amount</p>
          </div>
          {selectedTokensForSwap.map((selectedToken, index) => (
            <div
              className="flex justify-between px-2.5 text-base text-slate-300 border-b py-1"
              key={index}>
              <div className="flex items-center gap-2">
                <img src={selectedToken.pngUrl} alt="logo" className="w-5 h-5" />
                <p className="pr-3">{selectedToken.name}</p>
              </div>
              <p className="md:text-base text-sm">
                {formatNumber(
                  BigNumber(selectedToken.balance)
                    .dividedBy(10 ** selectedToken.decimals)
                    .toNumber(),
                  16
                )}
              </p>
            </div>
          ))}
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
              onClick={() => handleCreateStruct(selectedTokensForSwap)}
              disabled={selectedTokensForSwap.length === 0}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-6">
              Swap
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
