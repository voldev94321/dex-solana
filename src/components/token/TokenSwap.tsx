/* eslint-disable @next/next/no-img-element */
"use client";

import { AiOutlineSwap } from "react-icons/ai";
import TokenSelect from "./TokenSelect";

interface TokenSwapProps {}

const TokenSwap = ({}: TokenSwapProps) => {

  return (
    <div className="relative">
      <div className="mt-2 justify-between items-center bg-white rounded-lg px-4 py-2 border-2 border-gray-50">
        <div className="flex gap-1 items-center justify-between">
          <div className="text-gray-400">From</div>
          <div className="text-gray-400">Balance: 0.00</div>
        </div>
        <div className="flex justify-between">
          <div className="-ml-4">
            <TokenSelect />
          </div>
          <div className="text-gray-400 text-right flex-grow">
            <input
              placeholder="0.0"
              type="number"
              className="text-2xl w-full text-right focus:outline-none text-black"
            />
          </div>
        </div>
        <div className="text-right text-gray-400">$0.18</div>
      </div>
      <div className="mt-2 justify-between items-center bg-white rounded-lg px-4 py-2 border-2 border-gray-50">
        <div className="flex gap-1 items-center justify-between">
          <div className="text-gray-400">From</div>
          <div className="text-gray-400">Balance: 0.00</div>
        </div>
        <div className="flex justify-between">
          <div className="-ml-4">
            <TokenSelect />
          </div>
          <div className="text-gray-400 text-right flex-grow">
            <input
              placeholder="0.0"
              type="number"
              className="text-2xl w-full text-right focus:outline-none text-black"
            />
          </div>
        </div>
        <div className="text-right text-gray-400">$0.18</div>
      </div>
      <div className="absolute p-2 bg-white border-2 border-gray-100 rounded-full rotate-90 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
        <AiOutlineSwap className="text-gray-600"/>
      </div>
    </div>
  );
};

export default TokenSwap;
