/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import React from "react";

const feeTiers = [0.01, 0.05, 0.3, 0.5, 1, 2];

const CreatePool = () => {
  const router = useRouter();
  const [selectedFee, setSelectedFee] = React.useState(0);
  const [selectedRangeTab, setSelectedRangeTab] = React.useState(0);

  const handleBack = () => {
    router.back();
  };

  const handleFeeClicked = (fee: number) => {
    setSelectedFee(fee);
  };

  const handleRangeTabClicked = (tab: number) => {
    setSelectedRangeTab(tab);
  };

  const handleCreate = () => {
    
  };

  return (
    <div className="my-6">
      <div className="w-[700px] m-auto">
        <div
          className="text-primary cursor-pointer"
          onClick={handleBack}
        >{`<- Back`}</div>
        <div className="mt-4 text-2xl font-bold">Create a pool</div>
        <div className="text-gray-400 mt-4">
          Create a new pool or create a liquidity position on an existing pool
        </div>
        <div className="mt-4 text-lg font-bold">Tokens</div>
        <div className="mt-2 flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-gray-50 rounded-xl border-2 border-gray-100 flex gap-1 items-center px-4 py-2 min-w-28 justify-between">
                <img src="/ico/tether.png" alt="tether" className="w-4 h-4" />
                <div>USDT</div>
                <span className="text-2xs">▼</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuItem className="flex !px-2 bg-white hover:bg-gray-100 py-1">
                <div className="flex gap-1 items-center px-4 py-2">
                  <img src="/ico/tether.png" alt="tether" className="w-4 h-4" />
                  <div>USDT</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-gray-50 rounded-xl border-2 border-gray-100 flex gap-1 items-center px-4 py-2 min-w-28 justify-between">
                <img src="/ico/solana.png" alt="tether" className="w-4 h-4" />
                <div>SOL</div>
                <span className="text-2xs">▼</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuItem className="flex !px-2 bg-white hover:bg-gray-100 py-1">
                <div className="flex gap-1 items-center px-4 py-2">
                  <img src="/ico/solana.png" alt="tether" className="w-4 h-4" />
                  <div>SOL</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 text-lg font-bold">Fee tier</div>
        <div className="text-gray-400 mt-2">
          Lower fee tiers generally work better when pairing stable coins.
          Higher fee tiers generally work better when pairing exotic coins.
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {feeTiers.map((fee) => (
            <Button
              key={fee}
              className={`py-2 px-4 bg-white rounded-lg cursor-pointer hover:bg-gray-400 text-black justify-start ${
                fee == selectedFee && "border-primary border-2"
              }`}
              onClick={() => handleFeeClicked(fee)}
            >
              {fee} %
            </Button>
          ))}
        </div>
        <div className="mt-4 text-lg font-bold">Range</div>
        <div className="text-gray-400 mt-2">
          Select a price range to provide liquidity. You will not earn any fees
          when prices move outside of this range.
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            className={`bg-white text-black min-w-36 hover:bg-gray-400 ${
              selectedRangeTab == 0 && "border-2 border-primary"
            }`}
            onClick={() => handleRangeTabClicked(0)}
          >
            Full Range
          </Button>
          <Button
            className={`bg-white text-black min-w-36 hover:bg-gray-400 ${
              selectedRangeTab == 1 && "border-2 border-primary"
            }`}
            onClick={() => handleRangeTabClicked(1)}
          >
            Custom
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-white rounded-lg py-2 px-4 w-full border-2 border-gray-100 flex justify-between items-center">
            <div>
              <div>Min Price</div>
              <div className="text-gray-400 text-sm mt-2">
                Your position will be 100% <br />
                USDT at this price
              </div>
            </div>
            <div className="text-2xl">0</div>
          </div>
          <div className="bg-white rounded-lg py-2 px-4 w-full border-2 border-gray-100 flex justify-between items-center">
            <div>
              <div>Max Price</div>
              <div className="text-gray-400 text-sm mt-2">
                Your position will be 100% <br />
                USDT at this price
              </div>
            </div>
            <div className="text-2xl">∞</div>
          </div>
        </div>
        <div className="mt-4 text-lg font-bold">Liquidity deposit</div>
        <div className="mt-2 flex justify-between items-center bg-white rounded-lg px-4 py-2">
          <div className="flex gap-1 items-center">
            <img src="/ico/tether.png" alt="tether" className="w-4 h-4" />
            <div>USDT</div>
          </div>
          <div className="text-gray-400 text-right">
            <div>Balance: 1000.00</div>
            <div className="text-2xl">0.0</div>
            <div>$0.00</div>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center bg-white rounded-lg px-4 py-2">
          <div className="flex gap-1 items-center">
            <img src="/ico/solana.png" alt="tether" className="w-4 h-4" />
            <div>SOL</div>
          </div>
          <div className="text-gray-400 text-right">
            <div> &nbsp;</div>
            <div className="text-2xl">0.0</div>
            <div>$0.00</div>
          </div>
        </div>
        <div className="text-gray-400 mt-2">Pool creation fees: ~0.50 SOL</div>
        <Button className="w-full mt-4 bg-primary" onClick={handleCreate}>
          Create Pool
        </Button>
      </div>
    </div>
  );
};

export default CreatePool;
