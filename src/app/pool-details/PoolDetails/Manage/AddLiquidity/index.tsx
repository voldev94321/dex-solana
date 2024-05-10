/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { fetchTokenBalances, getTokenAccounts } from "@/apis/token";
import TokenSummary from "@/components/token/TokenSummary";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import React from "react";
import useSolanaWeb3 from "@/hooks/useSolanaWeb3";
import { useSearchParams } from "next/navigation";

const rpcEndpoint = `https://api.devnet.solana.com `;
const solanaConnection = new Connection(rpcEndpoint);

interface AddLiquidityProps {
  tokenA: any;
  tokenB: any;
}

const AddLiquidity = ({ tokenA, tokenB }: AddLiquidityProps) => {
  const [amountA, setAmountA] = React.useState<number>(0);
  const [amountB, setAmountB] = React.useState<number>(0);

  const [tokenBalanceA, setTokenBalanceA] = React.useState(0);
  const [tokenBalanceB, setTokenBalanceB] = React.useState(0);

  const { publicKey } = useWallet();
  const { addTokenLiquidity } = useSolanaWeb3();
  const searchParams = useSearchParams();

  const address = searchParams ? searchParams.get("address") : "";

  const handleAdd = async () => {
    if (amountA <= 0 || amountB <= 0) {
      toast({
        title: "Token Balance is not enough",
        description: "",
        status: "WARNING",
      });
      return;
    }
    const addTokenA = {
      mint: tokenA.mint,
      amount: amountA,
      decimals: 6,
    };
    const addTokenB = {
      mint: tokenB.mint,
      amount: amountB,
      decimals: 6,
    };
    const result = await addTokenLiquidity(addTokenA, addTokenB, address);
    if (!result) {
      toast({
        title: "Liquidity added!",
        description: "",
        status: "SUCCESS",
      });
      fetchData();
    } else if (result.status == "ERROR") {
      toast({
        title: "Adding Liquidity Failed!",
        description: "",
        status: "ERROR",
      });
    }
    console.log(tokenA, tokenBalanceA);
  };

  const fetchData = async () => {
    if (publicKey) {
      const tokenAccounts = await getTokenAccounts(
        publicKey.toBase58(),
        solanaConnection
      );
      const tokenAccountAIndex = tokenAccounts.findIndex((ta: any) => {
        return ta.mint == tokenA.mint;
      });
      if (tokenAccountAIndex != -1) {
        setTokenBalanceA(tokenAccounts[tokenAccountAIndex].tokenBalance);
      }
      const tokenAccountBIndex = tokenAccounts.findIndex((ta: any) => {
        return ta.mint == tokenB.mint;
      });
      if (tokenAccountBIndex != -1) {
        setTokenBalanceB(tokenAccounts[tokenAccountBIndex].tokenBalance);
      }
    }
  };

  React.useEffect(() => {
    setTimeout(async () => {
      if (publicKey && tokenA && tokenB) {
        await fetchData();
      }
    }, 0);
  }, [publicKey, tokenA, tokenB]);

  return (
    <div className="p-2 rounded-lg border-2 border-gray-50">
      <div className="text-lg mt-2">Add Liquidity</div>
      <div className="text-gray-400 mt-2">Provide liquidity to earn fees</div>
      <TokenSummary
        tokenA={{ ...tokenA, tokenBalance: tokenBalanceA }}
        tokenB={{ ...tokenB, tokenBalance: tokenBalanceB }}
        valueA={amountA}
        setValueA={setAmountA}
        valueB={amountB}
        setValueB={setAmountB}
      />
      <Button className="mt-4 bg-primary w-full" onClick={handleAdd}>
        Add liquidity
      </Button>
    </div>
  );
};

export default AddLiquidity;
