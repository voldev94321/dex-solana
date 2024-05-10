"use client";

import TokenReceiveMin from "@/components/token/TokenReceiveMin";
import TokenSelectPercentage from "@/components/token/TokenSelectPercentage";
import TokenSummary from "@/components/token/TokenSummary";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useSolanaWeb3 from "@/hooks/useSolanaWeb3";
import React from "react";

interface RemoveLiquidityProps {
  poolKey: any;
  tokenA: any;
  tokenB: any;
}

const RemoveLiquidity = ({ poolKey, tokenA, tokenB }: RemoveLiquidityProps) => {
  const [percentage, setPercentage] = React.useState(0);
  const { claimLiquidity } = useSolanaWeb3();

  const handleRemove = async () => {
    if(percentage == 0){
      toast({
        title: "Please set the percentage!",
        description: "",
        status: "ERROR",
      });
      return;
    }
    const result = await claimLiquidity(poolKey,percentage);
    if (!result) {
      toast({
        title: "Liquidity Removed!",
        description: "",
        status: "SUCCESS",
      });
    } else if (result.status == "ERROR") {
      toast({
        title: "Removing Liquidity Failed!",
        description: "",
        status: "ERROR",
      });
    }
  }

  return (
    <div className="p-2 rounded-lg border-2 border-gray-50">
      <div className="text-lg mt-2">Remove Liquidity</div>
      <div className="text-gray-400 mt-2">
        Trade in your LP to receive your tokens
      </div>
      <div className="mt-4">
        <TokenSelectPercentage percentage={percentage} setPercentage={setPercentage}/>
      </div>
      <div className="mt-4">
        <TokenReceiveMin tokenA={tokenA} tokenB={tokenB}/>
      </div>
      <Button className="mt-4 bg-primary w-full" onClick={handleRemove}>Remove</Button>
    </div>
  );
};

export default RemoveLiquidity;
