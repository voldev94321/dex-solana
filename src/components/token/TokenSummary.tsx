/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

interface TokenSummaryProps {
  valueA?: any;
  setValueA?: React.Dispatch<React.SetStateAction<any>>;
  valueB?: any;
  setValueB?: React.Dispatch<React.SetStateAction<any>>;
  tokenA?: any;
  tokenB?: any;
}

const TokenSummary = ({valueA, setValueA, valueB, setValueB, tokenA, tokenB}: TokenSummaryProps) => {
  return (
    <div>
      {tokenA && <div className="mt-2 flex justify-between items-center bg-white rounded-lg px-4 py-2 border-2 border-gray-50">
        <div className="flex gap-1 items-center">
          {tokenA && tokenA.offchainMetadata && <img src={tokenA.offchainMetadata.image} alt="tether" className="w-6 h-6" />}
          <div>{tokenB && tokenA.symbol ? tokenA.symbol : ""}</div>
        </div>
        <div className="text-gray-400 text-right flex-grow">
          <div>Balance: {tokenA.tokenBalance}</div>
          <input
            placeholder="0.0"
            className="text-2xl w-full text-right focus:outline-none text-black"
            value={valueA && valueA}
            onChange={(e) => {
              if(setValueA) {
                setValueA(e.target.value);
              }
            }}
            type="number"
            max={tokenA.tokenBalance}
            min={0}
          />
          <div>$0.00</div>
        </div>
      </div>}
      {tokenB && <div className="mt-2 flex justify-between items-center bg-white rounded-lg px-4 py-2 border-2 border-gray-50">
        <div className="flex gap-1 items-center">
          {tokenB && tokenB.offchainMetadata && <img src={tokenB.offchainMetadata.image} alt="tether" className="w-6 h-6" />}
          <div>{tokenB && tokenB.symbol ? tokenB.symbol : ""}</div>
        </div>
        <div className="text-gray-400 text-right flex-grow">
          <div>Balance: {tokenB.tokenBalance}</div>
          <input
            placeholder="0.0"
            className="text-2xl w-full text-right focus:outline-none text-black"
            value={valueB && valueB}
            onChange={(e) => {
              if(setValueB) {
                setValueB(e.target.value);
              }
            }}
            type="number"
            max={tokenB.tokenBalance}
            min={0}
          />
          <div>$0.00</div>
        </div>
      </div>}
    </div>
  );
};

export default TokenSummary;
