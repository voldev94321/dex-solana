"use client";

import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import TransparentInput from "../inputs/TransparentInput";
import { SearchIcon } from "lucide-react";
import Card from "../Custom/Card";
import { HiCheckBadge } from "react-icons/hi2";
import { abbreviateTokenAddress } from "@/lib/utils";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import Link from "next/link";
import { Button } from "../ui/button";

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
  const [isConfirmDlgOpen, setIsConfirmDlgOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleKeyDown = (e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      setIsConfirmDlgOpen(true);
    }
  };

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
            <Dialog open={isConfirmDlgOpen} onOpenChange={setIsConfirmDlgOpen}>
              <DialogTrigger asChild>
                <TransparentInput
                  placeholder="Search by token name or address"
                  value={search}
                  setValue={setSearch}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
              </DialogTrigger>
              <DialogContent>
                <div className="bg-black text-white font-bold text-2xl w-10 h-10 rounded-full text-center mx-auto p-1">
                  !
                </div>
                <div className="text-center text-2xl font-bold">
                  Confirm Custom Token Address
                </div>
                <div className="text-center text-gray-400">
                  Make sure the token address is correct before swapping. <br />
                  Many token icons and addresses are similar.
                  <br />
                  <br />
                  By continuing you understand that you take full responsibility{" "}
                  <br />
                  for confirming the token you are swapping.
                </div>
                <div className="flex gap-2 items-center bg-gray-100 py-2 px-4 rounded-lg">
                  <div className="bg-gray-700 text-white font-bold text-2xl w-12 h-12 rounded-full text-center mx-auto p-2">
                    ?
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold">4px8A4</div>
                    <div>4px8A4VF...JHQLEH5g</div>
                  </div>
                  <div><FaCopy className="text-gray-700"/></div>
                  <Link href=""><BsBoxArrowUpRight className="text-gray-700"/></Link>
                </div>
                <Button className="bg-primary">I understand, Confirm</Button>
                <Button className="bg-transparent text-black">Cancel</Button>
              </DialogContent>
            </Dialog>
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
              {tokens.map((token) => (
                <div
                  key={token.label}
                  className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <img src={token.icon} alt="icon" className="w-12 h-12" />
                  <div>
                    <div className="flex gap-2 items-center">
                      <div className="font-bold">{token.label}</div>
                      {token.isVerified && (
                        <HiCheckBadge className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                    <div>{token.title}</div>
                  </div>
                  <div className="flex-grow"></div>
                  <div className="flex gap-4 items-center">
                    <div className="text-gray-400">
                      {abbreviateTokenAddress(token.address)}
                    </div>
                    <BsBoxArrowUpRight className="text-gray-400" />
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
