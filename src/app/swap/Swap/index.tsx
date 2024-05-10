/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Card from "@/components/Custom/Card";
import TokenSwap from "@/components/token/TokenSwap";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useWallet } from "@solana/wallet-adapter-react";
import { BsQuestionCircle } from "react-icons/bs";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { SlRefresh } from "react-icons/sl";
import useSolanaWeb3 from "@/hooks/useSolanaWeb3";
import React from "react";
import { toast } from "@/components/ui/use-toast";

const Swap = () => {
  const { connected } = useWallet();
  const { swap, getPoolList } = useSolanaWeb3();

  const [tokenA, setTokenA] = React.useState<any>(null);
  const [tokenB, setTokenB] = React.useState<any>(null);
  const [tokenAAmount, setTokenAAmount] = React.useState<any>(0);
  const [tokenBAmount, setTokenBAmount] = React.useState<any>(0);

  const [price, setPrice] = React.useState(1);
  const [poolKey, setPoolKey] = React.useState('');

  const handleSwap = async () => {
    console.log(tokenAAmount);
    const result = await swap(poolKey, tokenA.mint, tokenB.mint, tokenAAmount);
    if (!result) {
      toast({
        title: "Swap successful!",
        description: "",
        status: "SUCCESS",
      });
      fetchData();
    } else if (result.status == "ERROR") {
      toast({
        title: "Swap Failed!",
        description: "",
        status: "ERROR",
      });
    }
  };

  const fetchData = async () => {
    console.log("timer", tokenA, tokenB);
    if (!tokenA || !tokenB) {
      return;
    }

    const poolList = await getPoolList();

    if (poolList) {
      for (let i = 0; i < poolList?.length; i++) {
        if (
          tokenA.mint == poolList[i].tokenMintA.toBase58() &&
          tokenB.mint == poolList[i].tokenMintB.toBase58()
        ) {
          const tokenBBalance = poolList[i].PoolBBalance.value.uiAmount;
          const tokenABalance = poolList[i].PoolABalance.value.uiAmount;
          const balance =
            tokenBBalance && tokenABalance ? tokenBBalance / tokenABalance : 1;
          setPrice(balance);
          setPoolKey(poolList[i].poolKey);
        } else if (
          tokenB.mint == poolList[i].tokenMintA.toBase58() &&
          tokenA.mint == poolList[i].tokenMintB.toBase58()
        ) {
          const tokenABalance = poolList[i].PoolABalance.value.uiAmount;
          const tokenBBalance = poolList[i].PoolBBalance.value.uiAmount;
          const balance =
            tokenBBalance && tokenABalance ? tokenABalance / tokenBBalance : 1;
          setPrice(balance);
          setPoolKey(poolList[i].poolKey);
        }
      }
    }
    console.log("poollist", poolList);
  };

  const handleHalf = () => {
    setTokenAAmount(tokenA.tokenBalance / 2);
    setTokenBAmount(tokenA.tokenBalance * price / 2)
  }

  const handleMax = () => {
    setTokenAAmount(tokenA.tokenBalance);
    setTokenBAmount(tokenA.tokenBalance * price)
  }

  React.useEffect(() => {
    if (tokenA && tokenB) {
      fetchData();
    }
  }, [tokenA, tokenB]);

  return (
    <div className="max-w-[500px] mt-12 m-auto">
      <div className="text-2xl font-bold">Swap</div>
      <div className="flex justify-between mt-4 items-center">
        <div className="bg-gray-200 p-3 rounded-md">
          <SlRefresh className="w-4 h-4 " />
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-200 p-2 rounded-md h-full font-bold cursor-pointer" onClick={handleHalf}>
            Half
          </div>
          <div className="bg-gray-200 p-2 rounded-md h-full font-bold cursor-pointer" onClick={handleMax}>Max</div>
        </div>
      </div>
      <TokenSwap
        tokenA={tokenA}
        tokenB={tokenB}
        setTokenA={setTokenA}
        setTokenB={setTokenB}
        tokenAAmount={tokenAAmount}
        tokenBAmount={tokenBAmount}
        setTokenAAmount={setTokenAAmount}
        setTokenBAmount={setTokenBAmount}
        price={price}
      />
      {false && <Card className={"mt-4 pr-2"}>
        <div className="flex gap-4 items-center">
          <div className="font-bold">Price Updated</div>
          <div className="flex-grow">
            <BsQuestionCircle />
          </div>
          <Button className="bg-primary">Accept</Button>
        </div>
      </Card> }
      {connected ? (
        <Button className="w-full mt-4 bg-primary" onClick={() => handleSwap()}>
          Swap!
        </Button>
      ) : (
        <Button className="w-full mt-4 bg-primary">Connect Wallet</Button>
      )}
      {tokenA && tokenB && (
        <div className="flex gap-2 mt-4 items-center">
          <HiOutlineArrowTrendingUp />
          <div>
            <b>1 {tokenA.symbol}</b> ($0.001) ≈{" "}
            <b>
              {price} {tokenB.symbol}
            </b>{" "}
            ($0.001){" "}
          </div>
        </div>
      )}
      {tokenA && tokenB && (
        <Card className="mt-2">
          <div className="flex justify-between items-center gap-2 p-2">
            <div>Swapping Route</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <BsQuestionCircle />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-black text-white p-2 rounded-lg">
                  This route has the best
                  <br /> price for your trade
                </p>
                <div className="border-t-8 border-l-8 border-r-8 w-0 mx-auto border-t-black border-l-transparent border-r-transparent"></div>
              </TooltipContent>
            </Tooltip>
            <div className="flex-grow text-right font-bold">
              {tokenA.symbol}
              {" > "}
              {tokenB.symbol}
            </div>
          </div>
          <div className="flex justify-between items-center gap-2 p-2">
            <div>Min. Received</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <BsQuestionCircle />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-black text-white p-2 rounded-lg">
                  The least amount of tokens
                  <br />
                  you’ll receive from this swap
                </p>
                <div className="border-t-8 border-l-8 border-r-8 w-0 mx-auto border-t-black border-l-transparent border-r-transparent"></div>
              </TooltipContent>
              <div className="flex-grow text-right font-bold">0.000978 SOL</div>
            </Tooltip>
          </div>
          <div className="flex justify-between items-center gap-2 p-2">
            <div>Price Impact</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <BsQuestionCircle />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-black text-white p-2 rounded-lg">
                  Difference between market price and <br />
                  estimated price due to trade volume
                </p>
                <div className="border-t-8 border-l-8 border-r-8 w-0 mx-auto border-t-black border-l-transparent border-r-transparent"></div>
              </TooltipContent>
              <div className="flex-grow text-right font-bold">0.63%</div>
            </Tooltip>
          </div>
          <div className="flex justify-between items-center gap-2 p-2">
            <div>Swap Fee</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <BsQuestionCircle />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-black text-white p-2 rounded-lg">
                  Fee paid to use the network <br />
                  and swap tokens
                </p>
                <div className="border-t-8 border-l-8 border-r-8 w-0 mx-auto border-t-black border-l-transparent border-r-transparent"></div>
              </TooltipContent>
              <div className="flex-grow text-right font-bold">0.000015 SOL</div>
            </Tooltip>
          </div>
          <div className="flex justify-between items-center gap-2 p-2">
            <div>Slippage Tolerance</div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <BsQuestionCircle />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-black text-white p-2 rounded-lg">
                  Max. difference between estimated <br />
                  price and execution price
                </p>
                <div className="border-t-8 border-l-8 border-r-8 w-0 mx-auto border-t-black border-l-transparent border-r-transparent"></div>
              </TooltipContent>
              <div className="ml-auto text-right font-bold px-1 bg-gray-50">
                0.3%
              </div>
            </Tooltip>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Swap;
