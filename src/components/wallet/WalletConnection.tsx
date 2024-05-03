/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MdAccountBalanceWallet } from "react-icons/md";
import { abbreviateTokenAddress } from "@/lib/utils";
import { FaCheckCircle, FaCopy } from "react-icons/fa";
import { FiClock, FiMinusCircle } from "react-icons/fi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useToast } from "../ui/use-toast";

//handle wallet balance fixed to 2 decimal numbers without rounding
export function toFixed(num: number, fixed: number): string {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)![0];
}

const WalletConnection = () => {
  const { connection } = useConnection();
  const { toast } = useToast();
  const { select, wallets, publicKey, disconnect, connecting, wallet } =
    useWallet();

  const [open, setOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        setBalance(info?.lamports / LAMPORTS_PER_SOL);
      }
    });
  }, [publicKey, connection]);

  useEffect(() => {
    setUserWalletAddress(publicKey?.toBase58()!);
    if (wallet) {
      toast({
        title: "" + wallet?.adapter.name + " wallet connected",
        description: publicKey
          ? abbreviateTokenAddress(publicKey.toBase58())
          : "",
        status: "SUCCESS",
      });
    }
  }, [publicKey]);

  const handleWalletSelect = async (walletName: any) => {
    if (walletName) {
      try {
        select(walletName);
        setOpen(false);
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }
  };

  const handleDisconnect = async () => {
    disconnect();
    toast({
      title: "Wallet disconnected",
      status: "ERROR",
    });
  };

  return (
    <div className="text-white">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex gap-2 items-center">
          {!publicKey ? (
            <>
              <DialogTrigger asChild>
                <Button className="bg-black text-white z-50 md:w-[170px] w-[170px]">
                  {connecting ? (
                    "connecting..."
                  ) : (
                    <div className="flex gap-2 items-center">
                      <MdAccountBalanceWallet
                        color="white"
                        className="w-5 h-5"
                      />
                      Connect Wallet
                    </div>
                  )}
                </Button>
              </DialogTrigger>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex gap-2 bg-black text-white z-50 md:w-[170px] w-[170px] ">
                  <div className="!w-2 h-2 bg-green-400 rounded-full">
                    &nbsp;&nbsp;
                  </div>
                  <div className="w-full">
                    <div className=" w-full ">
                      {abbreviateTokenAddress(publicKey.toBase58())}
                    </div>
                  </div>
                  {/* {balance ? (
                    <div>{toFixed(balance, 2)} SOL</div>
                  ) : (
                    <div>0 SOL</div>
                  )} */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white hover:bg-white focus:!bg-white">
                <div className="m-4">CONNECTED</div>
                <div className="flex justify-between gap-2 items-center mx-4 cursor-pointer">
                  <div className="font-bold">
                    {abbreviateTokenAddress(publicKey.toBase58())}
                  </div>
                  <div>
                    <FaCopy className="text-gray-600" />
                  </div>
                </div>
                <hr className="my-2 -mx-1" />
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex gap-4 items-center hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      <div className="">
                        <FiClock className="text-black" />
                      </div>
                      <div>Recent transactions</div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="text-2xl font-bold">
                      Recent transactions
                    </div>
                    <div className="relative">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase dark:bg-gray-700 dark:text-gray-400">
                          <tr className="border-b">
                            <th scope="col" className="px-2 py-3">
                              Status
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Transaction type
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Details
                            </th>
                            <th scope="col" className="px-2 py-3">
                              Date/Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-100 rounded-lg">
                            <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <div className=" flex items-center gap-2">
                                <span>
                                  <FaCheckCircle className="text-green-400" />
                                </span>
                                Success
                              </div>
                            </td>
                            <th className="px-2 py-4" scope="row">
                              <div>Swap</div>
                              <div className="text-gray-400">(Phantom)</div>
                            </th>
                            <td className="px-2 py-4">
                              Swapped 1.0 KIT for <br /> 0.00002118 SOL
                            </td>
                            <td className="px-2 py-4">
                              <div className="flex gap-2 items-center">
                                22/03/2024 11:28 GMT <BsBoxArrowUpRight />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </DialogContent>
                </Dialog>
                <hr className="-mx-4 my-2" />
                <div
                  className="flex gap-4 items-center hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  onClick={handleDisconnect}
                >
                  <div className="">
                    <FiMinusCircle className="text-black" />
                  </div>
                  <div>Disconnect</div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DialogContent
            className=" bg-black "
            style={{
              borderRadius: "30px",
            }}
          >
            <div className="flex w-full justify-center items-center ">
              <div className="flex flex-col justify-start items-center space-y-5 overflow-y-auto ">
                {wallets.map((wallet) => (
                  <Button
                    key={wallet.adapter.name}
                    //onClick={() => select(wallet.adapter.name)}
                    onClick={() => handleWalletSelect(wallet.adapter.name)}
                    variant={"ghost"}
                    className=" h-[40px] hover:bg-transparent hover:text-white text-[20px] text-white font-slackey flex w-full justify-start items-center "
                  >
                    <div className="flex">
                      <Image
                        src={wallet.adapter.icon}
                        alt={wallet.adapter.name}
                        height={30}
                        width={30}
                        className="mr-5 "
                      />
                    </div>
                    <div className="font-slackey text-white wallet-name text-[20px]">
                      {wallet.adapter.name}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default WalletConnection;
