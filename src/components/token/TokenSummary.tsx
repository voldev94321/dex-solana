/* eslint-disable @next/next/no-img-element */
"use client";

interface TokenSummaryProps {}

const TokenSummary = ({}: TokenSummaryProps) => {
  return (
    <div>
      <div className="mt-2 flex justify-between items-center bg-white rounded-lg px-4 py-2 border-2 border-gray-50">
        <div className="flex gap-1 items-center">
          <img src="/ico/tether.png" alt="tether" className="w-6 h-6" />
          <div>USDT</div>
        </div>
        <div className="text-gray-400 text-right flex-grow">
          <div>Balance: 1000.00</div>
          <input placeholder="0.0" className="text-2xl w-full text-right focus:outline-none text-black"/>
          <div>$0.00</div>
        </div>
      </div>
      <div className="mt-2 flex justify-between items-center bg-white rounded-lg px-4 py-2 border-2 border-gray-50">
        <div className="flex gap-1 items-center">
          <img src="/ico/solana.png" alt="tether" className="w-6 h-6" />
          <div>SOL</div>
        </div>
        <div className="text-gray-400 text-right flex-grow">
          <div> &nbsp;</div>
          <input placeholder="0.0" className="text-2xl w-full text-right focus:outline-none text-black"/>
          <div>$0.00</div>
        </div>
      </div>
    </div>
  );
};

export default TokenSummary;
