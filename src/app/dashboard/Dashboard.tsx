"use client";

import { Button } from "@/components/ui/button";
import TopBar from "@/layouts/TopBar";
import React from "react";
import AllPools from "./AllPools";
import MyPositions from "./MyPositions";

const tabs = ["All Pools", "My Positions"];
const DashBoard = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

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
        <Button className="mt-4 bg-primary text-md px-6">
          + Create a new position
        </Button>
        <div className="flex gap-2 mt-8">
          {tabs.map((value, index) => (
            <Button
              key={index}
              className={`rounded-full ${
                selectedTab == index
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={()=>setSelectedTab(index)}
            >
              {value}
            </Button>
          ))}
        </div>
        { selectedTab == 0 ? <AllPools/> : <MyPositions/> }
      </div>
    </div>
  );
};

export default DashBoard;
