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

const Swap = () => {
  const { connected } = useWallet();

  return (
    <div className="max-w-[500px] mt-12 m-auto">
      <div className="text-2xl font-bold">Swap</div>
      <div className="flex justify-between mt-4 items-center">
        <div className="bg-gray-200 p-3 rounded-md">
          <SlRefresh className="w-4 h-4 " />
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-200 p-2 rounded-md h-full font-bold">
            Half
          </div>
          <div className="bg-gray-200 p-2 rounded-md h-full font-bold">Max</div>
        </div>
      </div>
      <TokenSwap />
      <Card className={"mt-4 pr-2"}>
        <div className="flex gap-4 items-center">
          <div className="font-bold">Price Updated</div>
          <div className="flex-grow">
            <BsQuestionCircle />
          </div>
          <Button className="bg-primary">Accept</Button>
        </div>
      </Card>
      {connected ? (
        <Button className="w-full mt-4 bg-primary">Swap!</Button>
      ) : (
        <Button className="w-full mt-4 bg-primary">Connect Wallet</Button>
      )}
      <div className="flex gap-2 mt-4 items-center">
        <HiOutlineArrowTrendingUp />
        <div>
          <b>1 KIT</b> ($0.001) ≈ <b>0.000012 SOL</b> ($0.001){" "}
        </div>
      </div>
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
          <div className="flex-grow text-right font-bold">{"KIT > SOL"}</div>
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
    </div>
  );
};

export default Swap;
