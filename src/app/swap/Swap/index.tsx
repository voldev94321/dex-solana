import TokenSelect from "@/components/token/TokenSelect";
import TokenSummary from "@/components/token/TokenSummary";
import TokenSwap from "@/components/token/TokenSwap";
import { Button } from "@/components/ui/button";
import { SlRefresh } from "react-icons/sl";

const Swap = () => {
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
          <div className="bg-gray-200 p-2 rounded-md h-full font-bold">
            Max
          </div>
        </div>
      </div>
      <TokenSwap/>
      <Button className="w-full mt-4 bg-primary">Connect Wallet</Button>
      
    </div>
  );
};

export default Swap;
