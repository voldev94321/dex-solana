/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { getTokenList } from "@/apis/token";
import Card from "@/components/Custom/Card";
import TransparentInput from "@/components/inputs/TransparentInput";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import WalletConnection from "@/components/wallet/WalletConnection";
import { TOKEN_ADDRESSES } from "@/constants/token";
import { setTokenList } from "@/store/appSlice";
import React from "react";
import { GoQuestion } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";

const slippage = ["0.1", "0.3", "0.5", "0.7", "1.0"];
const PRIORITY_AUTO = -1;
const PRIORITY_NORMAL = -2;
const PRIORITY_HIGH = -3;
const PRIORITY_TURBO = -4;
const PRIORITY_CUSTOM = -5;
const priorities = [
  {
    label: "Auto",
    title: "Dynamic",
    state: PRIORITY_AUTO,
    value: 0,
  },
  {
    label: "Normal",
    title: "0 SOL",
    state: PRIORITY_NORMAL,
    value: 0,
  },
  {
    label: "High",
    title: "0.00005 SOL",
    state: PRIORITY_HIGH,
    value: 0.00005,
  },
  {
    label: "Turbo",
    title: "0.005 SOL",
    state: PRIORITY_TURBO,
    value: 0.005,
  },
];
const explorers = [
  {
    icon: "https://faucet.solana.com/favicon.ico",
    label: "Explorer",
  },
  {
    icon: "data:image/png;base64,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",
    label: "Solscan",
  },
  {
    icon: "https://image-cdn.solana.fm/images/?imageUrl=https://sfm-s3-assets.s3.amazonaws.com/twitter-image.png",
    label: "SolanaFM",
  },
];
const rpcs = [
  {
    isOnline: true,
    title: "Triton",
    extra: "(Recommended)",
  },
  {
    isOnline: false,
    title: "Helius",
    extra: "",
  },
];

const TopBar = () => {
  const [isSettingModal, setIsSettingModal] = React.useState(false);
  const [selectedSlippage, setSelectedSlippage] = React.useState("0");
  const [selectedPriority, setSelectedPriority] = React.useState(PRIORITY_AUTO);
  const [customPriority, setCustomPriority] = React.useState("");
  const [selectedExplorer, setSelectedExplorer] = React.useState("");
  const [selectedRPC, setSelectedRPC] = React.useState("");
  const [customRPC, setCustomRPC] = React.useState("");

  const dispatch = useDispatch();

  const handleSettingClicked = () => {};

  React.useEffect(() => {
    getTokenList((list: any) => {
      // const tokenList = list.filter((item: any) => item.whitelisted == true);
      // tokenList.sort((a: any, b: any) =>
      //   a.whitelisted && (a.mint == TOKEN_ADDRESSES.SOL ||
      //   a.mint == TOKEN_ADDRESSES.NINJA ||
      //   a.mint == TOKEN_ADDRESSES.USDT ||
      //   a.mint == TOKEN_ADDRESSES.USDC)
      //     ? -1
      //     : 1
      // );
      // console.log(tokenList);
      // dispatch(setTokenList(list));
    });
  }, []);

  return (
    <div className="flex items-center justify-between px-6 border-b-2 border-gray-200">
      <div className="text-3xl my-6">
        <b>DEX</b>
      </div>
      <div className="flex items-center gap-4" id="setting-dialog">
        <Dialog open={isSettingModal} onOpenChange={setIsSettingModal}>
          <DialogTrigger asChild>
            <IoMdSettings
              className="w-6 h-6 cursor-pointer"
              onClick={handleSettingClicked}
            />
          </DialogTrigger>
          <DialogContent>
            <div className="text-2xl font-bold">Settings</div>
            <div className="text-gray-400">
              Adjust your personal preferences and Connections
            </div>
            <Card>
              <div className="flex items-center gap-4">
                Slippage Tolerance{" "}
                <span>
                  <GoQuestion />
                </span>
              </div>
              <div className="text-gray-400 mt-2">
                Select your max. amount of slippage
              </div>
              <div className="flex gap-2 mt-2">
                {slippage.map((slip) => (
                  <div
                    key={slip}
                    className={`px-4 py-2 bg-gray-50 border-2 ${
                      selectedSlippage == slip
                        ? "border-black"
                        : "border-gray-100"
                    } rounded-xl cursor-pointer`}
                    onClick={() => setSelectedSlippage(slip)}
                  >
                    {slip}%
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-4">
                Transaction Priority{" "}
                <span>
                  <GoQuestion />
                </span>
              </div>
              <div className="text-gray-400 mt-2">
                Select your transaction priority and priority fee
              </div>
              <div className="grid grid-cols-3 gap-2">
                {priorities.map((item) => (
                  <div
                    key={item.label}
                    className={`flex gap-2 px-4 py-2 justify-between bg-gray-50 rounded-lg cursor-pointer border-2 ${
                      item.state == selectedPriority
                        ? "border-black"
                        : "border-gray-100"
                    }`}
                    onClick={() => {
                      setSelectedPriority(item.state);
                    }}
                  >
                    <div className="text-gray-400">{item.label}</div>
                    <div>{item.title}</div>
                  </div>
                ))}
                <div
                  className={`col-span-2 flex gap-2 px-4 py-2 justify-between bg-gray-50 rounded-lg border-2 ${
                    PRIORITY_CUSTOM == selectedPriority
                      ? "border-black"
                      : "border-gray-100"
                  }`}
                  onClick={() => {
                    setSelectedPriority(PRIORITY_CUSTOM);
                  }}
                >
                  <div className="text-gray-400">Custom</div>
                  <div className="flex gap-2">
                    <TransparentInput
                      placeholder="0.0"
                      value={customPriority}
                      setValue={setCustomPriority}
                      type="number"
                      classNames="text-right"
                    />
                    <div>SOL</div>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-4">
                Default Explorer{" "}
                <span>
                  <GoQuestion />
                </span>
              </div>
              <div className="text-gray-400 mt-2">
                Select which explorer you want to use to view transactions
              </div>
              <div className="flex gap-2 mt-2">
                {explorers.map((item) => (
                  <div
                    key={item.label}
                    className={`flex gap-2 items-center px-4 py-2 bg-gray-50 border-2 ${
                      selectedExplorer == item.label
                        ? "border-black"
                        : "border-gray-100"
                    } rounded-xl cursor-pointer`}
                    onClick={() => setSelectedExplorer(item.label)}
                  >
                    <img src={item.icon} alt="icon" className="w-6 h-6" />
                    <div>{item.label}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-4">
                RPC Connection{" "}
                <span>
                  <GoQuestion />
                </span>
              </div>
              <div className="text-gray-400 mt-2">
                Select your RPC connection
              </div>
              <div className="flex gap-2 mt-2">
                {rpcs.map((rpc) => (
                  <div
                    key={rpc.title}
                    className={`flex gap-2 items-center px-4 py-2 bg-gray-50 border-2 ${
                      selectedRPC == rpc.title
                        ? "border-black"
                        : "border-gray-100"
                    } rounded-xl cursor-pointer`}
                    onClick={() => setSelectedRPC(rpc.title)}
                  >
                    {rpc.isOnline && (
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    )}
                    <div>{rpc.title}</div>
                    <div className="text-gray-400">{rpc.extra}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <div className="flex-grow bg-gray-50 py-2 px-4 rounded-lg border-2 border-gray-100">
                  <TransparentInput
                    type="text"
                    value={customRPC}
                    setValue={setCustomRPC}
                    placeholder="https://"
                  />
                </div>
                <Button className="bg-primary">Switch</Button>
              </div>
            </Card>
          </DialogContent>
        </Dialog>
        <WalletConnection />
      </div>
    </div>
  );
};

export default TopBar;
