/* eslint-disable @next/next/no-img-element */
"use client";

import Card from "../Custom/Card";

interface TokenReceiveMinProps {
  tokenA: any;
  tokenB: any;
}

const TokenReceiveMin = ({ tokenA, tokenB }: TokenReceiveMinProps) => {
  return tokenA && tokenB && (
    <Card>
      <div>You’ll receive min: </div>
      <div className="flex justify-between mt-2">
        <div className="flex gap-1 items-center">
          <img src={tokenA.offchainMetadata.image} alt="tether" className="w-6 h-6" />
          <div>{tokenA.symbol}</div>
        </div>
        <div>
          0 <span className="text-gray-400">$0</span>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex gap-1 items-center">
          <img src={tokenB.offchainMetadata.image} alt="tether" className="w-6 h-6" />
          <div>{tokenB.symbol}</div>
        </div>
        <div>
          0 <span className="text-gray-400">$0</span>
        </div>
      </div>
    </Card>
  );
};

export default TokenReceiveMin;
