import { Button } from "@/components/ui/button";

const UnclaimedRewards = () => {
  return (
    <div className="bg-white rounded-lg p-4 mt-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Unclaimed Rewards</div>
        <div className="opacity-50">$0.0</div>
      </div>
      <Button className="w-full bg-primary mt-2">Claim</Button>
    </div>
  );
};

export default UnclaimedRewards;
