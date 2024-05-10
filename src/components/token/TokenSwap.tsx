/* eslint-disable @next/next/no-img-element */
"use client";

import { AiOutlineSwap } from "react-icons/ai";
import TokenSelect from "./TokenSelect";
import React from "react";

interface TokenSwapProps {
  setTokenA: React.Dispatch<React.SetStateAction<any>>;
  setTokenB: React.Dispatch<React.SetStateAction<any>>;
  tokenA: any;
  tokenB: any;
  setTokenAAmount: React.Dispatch<React.SetStateAction<any>>;
  setTokenBAmount: React.Dispatch<React.SetStateAction<any>>;
  tokenAAmount: any;
  tokenBAmount: any;
  price: any;
}

const TokenSwap = ({
  tokenA,
  tokenB,
  setTokenA,
  setTokenB,
  tokenAAmount,
  tokenBAmount,
  setTokenAAmount,
  setTokenBAmount,
  price,
}: TokenSwapProps) => {
  const handleSwap = () => {
    const tempA = tokenA;
    const tempB = tokenB;
    setTokenA(tempB);
    setTokenB(tempA);

    const tempAAmount = tokenAAmount;
    const tempBAmount = tokenBAmount;

    setTokenAAmount(tempBAmount);
    setTokenBAmount(tempAAmount);
  }

  React.useEffect(() => {
    console.log("tokenA", tokenA);
  }, [tokenA]);

  return (
    <div className="relative">
      <div className="mt-2 justify-between items-center bg-white rounded-lg px-4 py-2 border-2 border-gray-50">
        <div className="flex gap-1 items-center justify-between">
          <div className="text-gray-400">From</div>
          <div className="text-gray-400">
            Balance: {tokenA ? tokenA.tokenBalance : 0.0}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="-ml-4">
            <TokenSelect
              token={tokenA}
              handleSelect={(token: any) => {
                setTokenA(token);
              }}
            />
          </div>
          <div className="text-gray-400 text-right flex-grow">
            <input
              placeholder="0.0"
              type="number"
              className="text-2xl w-full text-right focus:outline-none text-black"
              value={tokenAAmount}
              onChange={(e) => {
                setTokenAAmount(e.target.value);
                setTokenBAmount(e.target.value ? parseFloat(e.target.value) * price : 0);
              }}
            />
          </div>
        </div>
        <div className="text-right text-gray-400">$0.00</div>
      </div>
      <div className="mt-2 justify-between items-center bg-white rounded-lg px-4 py-2 border-2 border-gray-50">
        <div className="flex gap-1 items-center justify-between">
          <div className="text-gray-400">From</div>
          <div className="text-gray-400">
            Balance: {tokenB ? tokenB.tokenBalance : 0.0}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="-ml-4">
            <TokenSelect
              token={tokenB}
              handleSelect={(token: any) => {
                setTokenB(token);
              }}
            />
          </div>
          <div className="text-gray-400 text-right flex-grow">
            <div
              className="text-2xl w-full text-right focus:outline-none text-black"
              >
              {tokenBAmount}
            </div>
          </div>
        </div>
        <div className="text-right text-gray-400">$0.0</div>
      </div>
      <div className="absolute p-2 bg-white border-2 border-gray-100 rounded-full rotate-90 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
        <AiOutlineSwap className="text-gray-600" onClick={handleSwap}/>
      </div>
    </div>
  );
};

export default TokenSwap;
