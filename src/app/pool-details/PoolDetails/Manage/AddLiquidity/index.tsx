'use client';

import TokenSummary from "@/components/token/TokenSummary";
import { Button } from "@/components/ui/button";

const AddLiquidity = () => {
    return <div className="p-2 rounded-lg border-2 border-gray-50">
        <div className="text-lg mt-2">Add Liquidity</div>
        <div className="text-gray-400 mt-2">Provide liquidity to earn fees</div>
        <TokenSummary/>
        <Button className="mt-4 bg-primary w-full">Add liquidity</Button>
    </div>
}

export default AddLiquidity;