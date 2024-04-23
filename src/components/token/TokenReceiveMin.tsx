/* eslint-disable @next/next/no-img-element */
"use client";

import Card from "../Custom/Card";

const TokenReceiveMin = () => {
  return (
    <Card>
      <div>You’ll receive min: </div>
      <div className="flex justify-between mt-2">
        <div className="flex gap-1 items-center">
          <img src="/ico/tether.png" alt="tether" className="w-6 h-6" />
          <div>USDT</div>
        </div>
        <div>0 <span className="text-gray-400">$0</span></div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex gap-1 items-center">
          <img src="/ico/solana.png" alt="tether" className="w-6 h-6" />
          <div>SOL</div>
        </div>
        <div>0 <span className="text-gray-400">$0</span></div>
      </div>
    </Card>
  );
};

export default TokenReceiveMin;
