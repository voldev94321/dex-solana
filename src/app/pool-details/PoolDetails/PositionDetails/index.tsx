/* eslint-disable @next/next/no-img-element */
"use client";

import TokenLink from "@/components/token/TokenLink";
import React from "react";

interface PositionDetailsProps {
  tokenA: any;
  tokenB: any;
  poolInfo: any;
}

const PositionDetails = ({tokenA, tokenB, poolInfo}: PositionDetailsProps) => {
  React.useEffect(() => {
    console.log("TokenaA", tokenA);
  }, [tokenA]);

  return tokenA && tokenB && poolInfo && (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Position details</div>
        <div className="text-gray-400">$0.00</div>
      </div>
      <div className="text-gray-400 font-bold mt-4">Tokens</div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-1 items-center">
          <img src={tokenA.offchainMetadata.image} alt="tether" className="w-6 h-6" />
          <div>{tokenA.symbol}</div>
          <TokenLink tokenAddress={tokenA.mint} />
        </div>
        <div>
          <b>{poolInfo.poolAccountABalance.value.uiAmount.toFixed(2)}</b> <span className="text-gray-400">$2.91</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-1 items-center">
          <img src={tokenB.offchainMetadata.image} alt="tether" className="w-6 h-6" />
          <div>{tokenB.symbol}</div>
          <TokenLink tokenAddress={tokenB.mint} />
        </div>
        <div>
          <b>{poolInfo.poolAccountBBalance.value.uiAmount.toFixed(2)}</b> <span className="text-gray-400">$2.91</span>
        </div>
      </div>
      <div className="text-gray-400 font-bold mt-4">Current Price</div>
      <div className="mt-4">1 {tokenA.symbol} = {poolInfo.poolAccountBBalance.value.uiAmount / poolInfo.poolAccountABalance.value.uiAmount} {tokenB.symbol}</div>
      <div className="bg-white rounded-lg py-2 px-4 w-full border-2 border-gray-100 flex justify-between items-center mt-4">
        <div>
          <div>Min Price</div>
          <div className="text-gray-400 text-sm mt-2">
            Your position will be 100% USDT at this price
          </div>
        </div>
        <div className="text-2xl">0</div>
      </div>
      <div className="bg-white rounded-lg py-2 px-4 w-full border-2 border-gray-100 flex justify-between items-center mt-2">
        <div>
          <div>Max Price</div>
          <div className="text-gray-400 text-sm mt-2">
            Your position will be 100% USDT at this price
          </div>
        </div>

        <div className="text-2xl">∞</div>
      </div>
    </div>
  );
};

export default PositionDetails;
