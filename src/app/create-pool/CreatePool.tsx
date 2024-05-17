/* eslint-disable @next/next/no-img-element */
"use client";

import TokenSelect from "@/components/token/TokenSelect";
import BackButton from "@/components/buttons/BackButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import TokenSummary from "@/components/token/TokenSummary";
import useSolanaWeb3 from "../../hooks/useSolanaWeb3";
import { PublicKey } from "@solana/web3.js";
import TransparentInput from "@/components/inputs/TransparentInput";
import { useToast } from "@/components/ui/use-toast";

const feeTiers = [0.01, 0.05, 0.3, 0.5, 1, 2];

const CreatePool = () => {
  const router = useRouter();
  const [selectedFee, setSelectedFee] = React.useState(0);
  const [selectedRangeTab, setSelectedRangeTab] = React.useState(0);
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("∞");
  const [selectedTokenA, setSelectedTokenA] = React.useState<any>({});
  const [selectedTokenB, setSelectedTokenB] = React.useState<any>({});

  const [amountA, setAmountA] = React.useState(0);
  const [amountB, setAmountB] = React.useState(0);

  const { createpool, getPoolInfo, getPoolList } = useSolanaWeb3();

  const { toast } = useToast();

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

  const handleCreate = async () => {
    if (
      !selectedTokenA.mint ||
      !selectedTokenB.mint ||
      selectedTokenA.mint == selectedTokenB.mint
    ) {
      toast({
        title: "Please select your tokens correctly!",
        description: "",
        status: "ERROR",
      });
      return;
    }

    if (selectedFee == 0) {
      toast({
        title: "Please select the fee tier!",
        description: "",
        status: "ERROR",
      });
      return;
    }

    if (!amountA || amountA == 0 || !amountB || amountB == 0) {
      toast({
        title: "Please select your token amounts!",
        description: "",
        status: "ERROR",
      });
      return;
    }

    const tokenMintA = new PublicKey(selectedTokenA.mint);
    const tokenMintB = new PublicKey(selectedTokenB.mint);
    const depositAmountA =
      amountA * Math.pow(10, selectedTokenA.tokenDecimals);
    const depositAmountB =
      amountB * Math.pow(10, selectedTokenB.tokenDecimals);
    // console.log(selectedTokenB);
  //   const depositAmountA =
  //   amountA * Math.pow(10, 9);
  // const depositAmountB =
  //   amountB * Math.pow(10,9);


    // console.log(tokenMintA, tokenMintB, depositAmountA, depositAmountB);
    const poolkey = await createpool(tokenMintA, tokenMintB, depositAmountA, depositAmountB);
    console.log("poolkey->", poolkey);
    // const poolInformation = await getPoolInfo(poolkey);
    // console.log("poolInformation->", poolInformation);
    router.push("/pool-details?address=" + poolkey);
  };

  const handleSelectTokenA = (token: any) => {
    setSelectedTokenA(token);
  };

  const handleSelectTokenB = (token: any) => {
    setSelectedTokenB(token);
  };

  useEffect(() => {
    const getPoolInfos = async() => {
      const pools = await getPoolList();
      console.log(pools);
    }
    getPoolInfos();
  })

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
          <TokenSelect handleSelect={handleSelectTokenA} />
          <TokenSelect handleSelect={handleSelectTokenB} />
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
              <div className="flex-grow max-w-24">
                <TransparentInput
                  classNames="text-right text-2xl"
                  placeholder="0"
                  type="number"
                  value={minPrice}
                  setValue={setMinPrice}
                />
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
              <div className="flex-grow max-w-24">
                <TransparentInput
                  classNames="text-right text-2xl"
                  placeholder="0"
                  type="number"
                  value={maxPrice}
                  setValue={setMaxPrice}
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 text-lg font-bold">Liquidity deposit</div>
        {selectedTokenA.symbol && selectedTokenB.symbol && (
          <TokenSummary
            tokenA={selectedTokenA}
            tokenB={selectedTokenB}
            valueA={amountA}
            setValueA={setAmountA}
            valueB={amountB}
            setValueB={setAmountB}
          />
        )}
        <div className="text-gray-400 mt-2">Pool creation fees: ~0.50 SOL</div>
        <Button className="w-full mt-4 bg-primary" onClick={handleCreate}>
          Create Pool
        </Button>
      </div>
    </div>
  );
};

export default CreatePool;
