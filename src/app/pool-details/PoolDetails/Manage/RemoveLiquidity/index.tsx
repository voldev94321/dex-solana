"use client";

import TokenReceiveMin from "@/components/token/TokenReceiveMin";
import TokenSelectPercentage from "@/components/token/TokenSelectPercentage";
import TokenSummary from "@/components/token/TokenSummary";
import { Button } from "@/components/ui/button";

const RemoveLiquidity = () => {
  return (
    <div className="p-2 rounded-lg border-2 border-gray-50">
      <div className="text-lg mt-2">Remove Liquidity</div>
      <div className="text-gray-400 mt-2">
        Trade in your LP to receive your tokens
      </div>
      <div className="mt-4">
        <TokenSelectPercentage />
      </div>
      <div className="mt-4">
        <TokenReceiveMin />
      </div>
      <Button className="mt-4 bg-primary w-full">Remove</Button>
    </div>
  );
};

export default RemoveLiquidity;
