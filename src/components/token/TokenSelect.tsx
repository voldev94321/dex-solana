"use client";

import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import TransparentInput from "../inputs/TransparentInput";
import { SearchIcon } from "lucide-react";
import Card from "../Custom/Card";
import { HiCheckBadge } from "react-icons/hi2";
import { abbreviateTokenAddress } from "@/lib/utils";
import { BsBoxArrowUpRight } from "react-icons/bs";

/* eslint-disable @next/next/no-img-element */

const defaultTokens = [
  {
    icon: "/ico/solana.png",
    label: "SOL",
  },
  {
    icon: "/ico/ninja.png",
    label: "NINJA",
  },
  {
    icon: "/ico/tether.png",
    label: "USDT",
  },
  {
    icon: "/ico/usdc.png",
    label: "USDC",
  },
  {
    icon: "/ico/kit.png",
    label: "KIT",
  },
];

const tokens = [
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
  {
    icon: "/ico/solana.png",
    label: "SOL",
    title: "Solana",
    address: "So11111111111111111111111111111111111111112",
    isVerified: "true",
  },
];
const TokenSelect = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div
            className="bg-white rounded-xl flex gap-1 items-center px-4 py-2 min-w-28 justify-between cursor-pointer"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <img src="/ico/tether.png" alt="tether" className="w-5 h-5" />
            <div>USDT</div>
            <span className="text-2xs">▼</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className="text-2xl font-bold">Select a token</div>
          <div className="text-gray-400">
            Choose a token or search for a token’s symbol or address
          </div>
          <div className="flex gap-2 p-2 bg-gray-100 rounded-lg">
            <SearchIcon className="text-gray-400" />
            <TransparentInput
              placeholder="Search by token name or address"
              value={search}
              setValue={setSearch}
              type="text"
            />
          </div>
          <div className="flex justify-between items-center">
            {defaultTokens.map((token) => (
              <div
                key={token.label}
                className="flex gap-2 items-center bg-gray-50 border-2 border-gray-100 rounded-lg p-2 cursor-pointer"
              >
                <img
                  src={token.icon}
                  alt="token"
                  className="w-6 h-6 rounded-full"
                />
                <div>{token.label}</div>
              </div>
            ))}
          </div>
          <Card>
            <div className="-mx-2 max-h-[500px] overflow-auto">
              {tokens.map(token=>(
                <div key={token.label} className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <img src={token.icon} alt="icon" className="w-12 h-12"/>
                  <div>
                    <div className="flex gap-2 items-center">
                      <div className="font-bold">{token.label}</div>
                      {token.isVerified && <HiCheckBadge className="w-5 h-5 text-green-400"/>}
                    </div>
                    <div>{token.title}</div>
                  </div>
                  <div className="flex-grow"></div>
                  <div className="flex gap-4 items-center">
                    <div className="text-gray-400">{abbreviateTokenAddress(token.address)}</div>
                    <BsBoxArrowUpRight className="text-gray-400"/>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TokenSelect;
