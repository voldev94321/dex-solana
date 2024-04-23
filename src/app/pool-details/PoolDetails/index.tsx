/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Manage from "./Manage";
import BackButton from "@/components/buttons/BackButton";
import PositionDetails from "./PositionDetails";
import UnclaimedRewards from "./UnclaimedRewards";

const PoolDetails = () => {
  return (
    <div className="px-36 mt-4">
      <div>
        Home <span className="text-gray-400">{`> 1:0x397ff1542f...`}</span>
      </div>
      <BackButton />
      <div className="flex mt-4 items-center">
        <img
          alt="token"
          src="/ico/tether.png"
          className="w-10 h-10 rounded-full"
        />
        <img
          alt="token"
          src="/ico/solana.png"
          className="w-10 h-10 rounded-full -ml-2"
        />
        <div className="ml-2 text-2xl font-bold">USDT / SOL</div>
      </div>
      <div className="flex gap-4 mt-4">
        <div>
          <b>APR</b> 0.00%
        </div>
        <div>
          <b>Fee</b> 0.03%
        </div>
        <div className="flex gap-2 items-center">
          <b>USDT</b>{" "}
          <Link href="#" className="flex gap-2 items-center text-primary">
            Es9vMF...enwNYB <BsBoxArrowUpRight />
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <b>SOL</b>{" "}
          <Link href="#" className="flex gap-2 items-center text-primary">
            So1111...111112 <BsBoxArrowUpRight />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-6 gap-4">
        <Manage />
        <div>
          <PositionDetails />
          <UnclaimedRewards />
        </div>
      </div>
    </div>
  );
};

export default PoolDetails;
