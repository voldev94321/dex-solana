/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Manage from "./Manage";
import BackButton from "@/components/buttons/BackButton";
import PositionDetails from "./PositionDetails";
import UnclaimedRewards from "./UnclaimedRewards";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSolanaWeb3 from "@/hooks/useSolanaWeb3";
import { useWallet } from "@solana/wallet-adapter-react";
import { getTokenMetadata } from "@/apis/token";
import { abbreviateTokenAddress } from "@/lib/utils";

const PoolDetails = () => {
  const searchParams = useSearchParams();
  const { getPoolInfo } = useSolanaWeb3();
  const { connected } = useWallet();
  const address = searchParams ? searchParams.get("address") : "";
  const [tokenA, setTokenA] = React.useState<any>({});
  const [tokenB, setTokenB] = React.useState<any>({});

  React.useEffect(() => {
    if (address && connected) {
      setTimeout(async () => {
        // console.log(address);
        const poolInformation = await getPoolInfo(address);
        // console.log(poolInformation);

        setTokenA(await getTokenMetadata(poolInformation?.tokenMintA));
        setTokenB(await getTokenMetadata(poolInformation?.tokenMintB));
      // if(tokenMetadata) {
      //   tokenArray.push({...await getTokenMetadata(mintAddress), tokenBalance, tokenDecimals});
      }, 0);
    }
  }, [address, connected]);

  React.useEffect(() => {
    // console.log(tokenA, tokenB);
  }, [tokenA, tokenB]);

  return (
    <div className="px-36 mt-4">
      <div>
        Home <span className="text-gray-400">{`> ${address}`}</span>
      </div>
      <BackButton />
      {tokenA.mint != undefined && tokenB.mint != undefined && <div className="flex mt-4 items-center">
        <img
          alt="token"
          src={tokenA.offchainMetadata.image}
          className="w-10 h-10 rounded-full"
        />
        <img
          alt="token"
          src={tokenB.offchainMetadata.image}
          className="w-10 h-10 rounded-full -ml-2"
        />
        <div className="ml-2 text-2xl font-bold">{tokenA.symbol} / {tokenB.symbol}</div>
      </div>}
      <div className="flex gap-4 mt-4">
        <div>
          <b>APR</b> 0.00%
        </div>
        <div>
          <b>Fee</b> 0.03%
        </div>
        <div className="flex gap-2 items-center">
          <b>{tokenA.offchainMeta && tokenA.offchainMetadata.symbol}</b>{" "}
          <Link href="#" className="flex gap-2 items-center text-primary">
            {tokenA.mint && abbreviateTokenAddress(tokenA.mint) } <BsBoxArrowUpRight />
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <b>{tokenB.offchainMeta && tokenB.offchainMetadata.symbol}</b>{" "}
          <Link href="#" className="flex gap-2 items-center text-primary">
            {tokenB.mint && abbreviateTokenAddress(tokenB.mint)} <BsBoxArrowUpRight />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-6 gap-4">
        <Manage tokenA={tokenA} tokenB={tokenB}/>
        <div>
          <PositionDetails />
          <UnclaimedRewards />
        </div>
      </div>
    </div>
  );
};

export default PoolDetails;
