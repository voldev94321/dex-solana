"use client";

/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const TokenSelect = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-white rounded-xl flex gap-1 items-center px-4 py-2 min-w-28 justify-between">
          <img src="/ico/tether.png" alt="tether" className="w-4 h-4" />
          <div>USDT</div>
          <span className="text-2xs">▼</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuItem className="flex !px-2 bg-white hover:bg-gray-100 py-1">
          <div className="flex gap-1 items-center px-4 py-2">
            <img src="/ico/tether.png" alt="tether" className="w-4 h-4" />
            <div>USDT</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TokenSelect;
