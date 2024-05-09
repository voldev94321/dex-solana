/* eslint-disable @next/next/no-img-element */
"use client";

import TokenSelect from "@/components/token/TokenSelect";
import BackButton from "@/components/buttons/BackButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import TokenSummary from "@/components/token/TokenSummary";
import useSolanaWeb3 from "../../hooks/useSolanaWeb3";
import { PublicKey } from "@solana/web3.js";

const feeTiers = [0.01, 0.05, 0.3, 0.5, 1, 2];

const CreatePool = () => {
  const router = useRouter();
  const [selectedFee, setSelectedFee] = React.useState(0);
  const [selectedRangeTab, setSelectedRangeTab] = React.useState(0);
  const [minPrice, setMinPrice] = React.useState("0");
  const [maxPrice, setMaxPrice] = React.useState("∞");

  const { createpool } = useSolanaWeb3();

  const handleFeeClicked = (fee: number) => {
    setSelectedFee(fee);
  };

  const handleRangeTabClicked = (tab: number) => {
    if (tab == 0) {
      setMinPrice("0");
      setMaxPrice("∞");
    }
    setSelectedRangeTab(tab);
  };

  const handleCreate = () => {
    const tokenMintA = new PublicKey("8NtheYSKWDkCgWoc8HScQFkcCTF1FiFEbbriosZLNmtE");
    const tokenMintB = new PublicKey("5hyJ6h3ABjF7zEBhc32LWT5ZUCkNx4AZkdRzKC1MUHRb");
    const depositAmountA = 100000000;
    const depositAmountB = 100000000;

    createpool(tokenMintA, tokenMintB, depositAmountA, depositAmountB);
    // router.push("/pool-details");
  };

  return (
    <div className="my-6">
      <div className="w-[700px] m-auto">
        <BackButton />
        <div className="mt-4 text-2xl font-bold">Create a pool</div>
        <div className="text-gray-400 mt-4">
          Create a new pool or create a liquidity position on an existing pool
        </div>
        <div className="mt-4 text-lg font-bold">Tokens</div>
        <div className="mt-2 flex gap-2">
          <TokenSelect />
          <TokenSelect />
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
            {selectedRangeTab == 0 ? (
              <div className="text-2xl">0</div>
            ) : (
              <div
                contentEditable={selectedRangeTab == 1}
                className="text-2xl focus:outline-0"
              >
                {minPrice}
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg py-2 px-4 w-full border-2 border-gray-100 flex justify-between items-center">
            <div>
              <div>Max Price</div>
              <div className="text-gray-400 text-sm mt-2">
                Your position will be 100% <br />
                USDT at this price
              </div>
            </div>
            {selectedRangeTab == 0 ? (
              <div className="text-2xl">∞</div>
            ) : (
              <div
                contentEditable={selectedRangeTab == 1}
                className="text-2xl focus:outline-0"
              >
                {maxPrice}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 text-lg font-bold">Liquidity deposit</div>
        <TokenSummary/>
        <div className="text-gray-400 mt-2">Pool creation fees: ~0.50 SOL</div>
        <Button className="w-full mt-4 bg-primary" onClick={handleCreate}>
          Create Pool
        </Button>
      </div>
    </div>
  );
};

export default CreatePool;
