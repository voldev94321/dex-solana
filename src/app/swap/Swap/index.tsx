"use client";
import Card from "@/components/Custom/Card";
import TokenSwap from "@/components/token/TokenSwap";
import { Button } from "@/components/ui/button";
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
          <div className="flex-grow"><BsQuestionCircle/></div>
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
        <div><b>1 KIT</b> ($0.001) ≈ <b>0.000012 SOL</b> ($0.001) </div>
      </div>
      <Card className="mt-2">
        <div className="flex justify-between items-center gap-2 p-2">
          <div>Swapping Route</div>
          <div className="flex-grow"><BsQuestionCircle/></div>
          <div className="font-bold">{"KIT > SOL"}</div>
        </div>
        <div className="flex justify-between items-center gap-2 p-2">
          <div>Min. Received</div>
          <div className="flex-grow"><BsQuestionCircle/></div>
          <div className="font-bold">0.000978 SOL</div>
        </div>
        <div className="flex justify-between items-center gap-2 p-2">
          <div>Price Impact</div>
          <div className="flex-grow"><BsQuestionCircle/></div>
          <div className="font-bold">0.63%</div>
        </div>
        <div className="flex justify-between items-center gap-2 p-2">
          <div>Swap Fee</div>
          <div className="flex-grow"><BsQuestionCircle/></div>
          <div className="font-bold">0.000015 SOL</div>
        </div>
        <div className="flex justify-between items-center gap-2 p-2">
          <div>Slippage Tolerance</div>
          <div className="flex-grow"><BsQuestionCircle/></div>
          <div className="font-bold px-1 bg-gray-50">0.3%</div>
        </div>
      </Card>
    </div>
  );
};

export default Swap;
