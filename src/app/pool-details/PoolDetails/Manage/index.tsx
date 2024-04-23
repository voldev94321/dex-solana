"use client";

import BlackTab from "@/components/tabs/BlackTab";
import React from "react";
import AddLiquidity from "./AddLiquidity";
import RemoveLiquidity from "./RemoveLiquidity";

const tabs = ["Add", "Remove", "Fees"];
const Manage = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);

  return <div className="bg-white rounded-lg p-4">
    <div className="text-xl font-bold">Manage</div>
    <div className="text-gray-400 mt-2">Manage your liquidity position</div>
    <div className="mt-4">
        <BlackTab data={tabs} onTabChanged={(index: number) => setSelectedTab(index)}/>
    </div>
    <div className="mt-4">
        {selectedTab == 0 && <AddLiquidity/>}
        {selectedTab == 1 && <RemoveLiquidity/>}
    </div>
  </div>;
};

export default Manage;
