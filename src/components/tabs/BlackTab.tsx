"use client";

import React from "react";
import { Button } from "../ui/button";

interface BlackTabProps {
  data: any;
  onTabChanged: any;
}

const BlackTab = ({ data, onTabChanged }: BlackTabProps) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChanged = ( index: number ) => {
    onTabChanged(index);
    setSelectedTab(index);
  }

  return (
    <div className="flex gap-2">
      {data.map((value: string, index: number) => (
        <Button
          key={index}
          className={`rounded-full ${
            selectedTab == index
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => handleTabChanged(index)}
        >
          {value}
        </Button>
      ))}
    </div>
  );
};

export default BlackTab;
