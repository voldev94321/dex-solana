"use client";

import Card from "../Custom/Card";
import TransparentInput from "../inputs/TransparentInput";

const items = ["25%", "50%", "75%", "Max"];

interface TokenSelectPercentageProps {
  percentage?: any;
  setPercentage?: any;
}

const TokenSelectPercentage = ({
  percentage,
  setPercentage,
}: TokenSelectPercentageProps) => {
  return (
    <Card>
      <div className="flex justify-between items-center my-8">
        <div className="text-3xl flex">
          <TransparentInput
            classNames="text-right max-w-14"
            placeholder="0"
            type="number"
            max={100}
            value={percentage}
            setValue={setPercentage}
          />
          <span className="text-gray-400">%</span>
        </div>
        <div className="flex gap-2">
          {items.map((item, index) => (
            <div key={item} className="bg-gray-100 p-2 rounded-lg font-bold cursor-pointer" onClick={()=>{setPercentage(index * 25 + 25)}}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TokenSelectPercentage;
