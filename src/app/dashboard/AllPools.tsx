/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { getTokenAccounts, getTokenMetadata } from "@/apis/token";
import useSolanaWeb3 from "@/hooks/useSolanaWeb3";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import React from "react";

const rpcEndpoint = `https://api.devnet.solana.com `;
const solanaConnection = new Connection(rpcEndpoint);

const TableHeaders = [
  "TVL",
  "Volume (24h)",
  "Volume (1w)",
  "Fees (24h)",
  "APR",
];
const TableData = [
  {
    tokens: [
      {
        image: "/ico/tether.png",
        name: "USDT",
      },
      {
        image: "/ico/solana.png",
        name: "SOL",
      },
    ],
    tvl: "7.02m",
    dailyVolume: "114.28k",
    weeklyVolume: "1.31m",
    fees: "344.34",
    APR: "1.49%",
  },
  {
    tokens: [
      {
        image: "/ico/tether.png",
        name: "USDT",
      },
      {
        image: "/ico/solana.png",
        name: "SOL",
      },
    ],
    tvl: "7.02m",
    dailyVolume: "114.28k",
    weeklyVolume: "1.31m",
    fees: "344.34",
    APR: "1.49%",
  },
  {
    tokens: [
      {
        image: "/ico/tether.png",
        name: "USDT",
      },
      {
        image: "/ico/solana.png",
        name: "SOL",
      },
    ],
    tvl: "7.02m",
    dailyVolume: "114.28k",
    weeklyVolume: "1.31m",
    fees: "344.34",
    APR: "1.49%",
  },
];

const AllPools = () => {
  const { getPoolList } = useSolanaWeb3();
  const { connected, publicKey } = useWallet();
  const [poolList, setPoolList] = React.useState<any>([]);
  const router = useRouter();

  const handleClick = ( poolKey: any ) => {
    // console.log(poolKey);
    router.push("/pool-details?address=" + poolKey);
  }

  React.useEffect(() => {
    if (connected && publicKey) {
      setTimeout(async () => {
        const list = await getPoolList();
        if (!list) {
          return;
        }

        const tempPoolList = [];
        for (let i = 0; i < list.length; i++) {
          const tokenAMint = list[i].tokenMintA;
          const tokenBMint = list[i].tokenMintB;
          const tokenA = await getTokenMetadata(
            tokenAMint.toBase58(),
          );
          const tokenB = await getTokenMetadata(
            tokenBMint.toBase58(),
          );
          tempPoolList.push({
            poolKey: list[i].poolKey,
            tokenA,
            tokenB,
          });
          // console.log("tempPoolList", tempPoolList);
          setPoolList(tempPoolList);
        }
        // console.log(list);
      }, 0);
    }
  }, [connected]);

  return (
    <div className="bg-white rounded-lg w-full p-8 mt-6">
      <div className="text-xl">
        <b>Pools</b> <span className="text-gray-600">(3)</span>
      </div>
      <table className="w-full mt-8">
        <thead className="border-b-2 border-gray-50">
          <tr>
            <th className="text-left text-gray-400 pl-4">Name</th>
            {TableHeaders.map((item, index) => (
              <th key={index} className="text-left text-gray-400 py-4">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {poolList.map((item: any, index: number) => (
            <tr key={index} className="hover:bg-gray-100 hover:rounded-lg cursor-pointer" onClick={() => {handleClick(item.poolKey)}}>
              <td className="flex py-4 pl-4">
                <img
                  alt="token"
                  src={item.tokenA.offchainMetadata.image}
                  className="w-6 h-6 rounded-full"
                />
                <img
                  alt="token"
                  src={item.tokenB.offchainMetadata.image}
                  className="w-6 h-6 rounded-full -ml-2"
                />
                <div className="ml-2">
                  {item.tokenA.symbol} / {item.tokenB.symbol}
                </div>
              </td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0%</td>
              <td>{`->`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPools;
