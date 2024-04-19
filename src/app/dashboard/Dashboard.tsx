"use client";

import { Button } from "@/components/ui/button";
import TopBar from "@/layouts/TopBar";
import React from "react";
import AllPools from "./AllPools";
import MyPositions from "./MyPositions";
import { useRouter } from "next/navigation";
import BlackTab from "@/components/tabs/BlackTab";

const tabs = ["All Pools", "My Positions"];
const DashBoard = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const router = useRouter();

  const handleCreateNewPosition = () => {
    router.push("/create-pool");
  };

  return (
    <div>
      <TopBar />
      <div className="mt-12 mx-28">
        <div className="text-2xl font-bold">Provide Liquidity</div>
        <div className="mt-2 text-gray-500">
          Create a position and add liquidity to a pool. Adding liquidity allows
          you <br />
          to receive a share of its trading volume and more.
        </div>
        <Button
          className="mt-4 bg-primary text-md px-6"
          onClick={handleCreateNewPosition}
        >
          + Create a new position
        </Button>
        <div className="mt-8">
          <BlackTab
            data={tabs}
            onTabChanged={(index: number) => setSelectedTab(index)}
          />
        </div>
        {selectedTab == 0 ? <AllPools /> : <MyPositions />}
      </div>
    </div>
  );
};

export default DashBoard;
