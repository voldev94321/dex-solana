/* eslint-disable react-hooks/exhaustive-deps */
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
import { useSelector } from "react-redux";
import { getTokenAccounts, getTokenList } from "@/apis/token";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  GetProgramAccountsFilter,
  PublicKey,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getTokenMetadata } from "@/apis/token";

const rpcEndpoint = `https://api.devnet.solana.com `;
const solanaConnection = new Connection(rpcEndpoint);

/* eslint-disable @next/next/no-img-element */

const defaultTokens = [
  {
    coingeckoId: "solana",
    tokenDecimals: 9,
    tokenBalance: 0.0,
    offchainMetadata: {
      image:
      "https://cdn.jsdelivr.net/gh/saber-hq/spl-token-icons@master/icons/101/So11111111111111111111111111111111111111112.png",
    },
    mint: "So11111111111111111111111111111111111111112",
    name: "Solana",
    poolToken: false,
    symbol: "SOL",
    whitelisted: true,
  },
  {
    coingeckoId: "ninja-protocol",
    tokenDecimals: 6,
    tokenBalance: 0.0,
    offchainMetadata: {
      image:
      "https://assets.coingecko.com/coins/images/18442/large/ninja.PNG?1632006127",
    },
    mint: "FgX1WD9WzMU3yLwXaFSarPfkgzjLb2DZCqmkx9ExpuvJ",
    name: "Ninja Protocol",
    poolToken: false,
    symbol: "NINJA",
    whitelisted: true,
  },
  {
    coingeckoId: "tether",
    tokenDecimals: 6,
    tokenBalance: 0.0,
    offchainMetadata: {
      image:
      "https://cdn.jsdelivr.net/gh/saber-hq/spl-token-icons@master/icons/101/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB.svg",
    },
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    name: "Tether",
    poolToken: false,
    symbol: "USDT",
    whitelisted: true,
  },
  {
    coingeckoId: "usd-coin",
    tokenDecimals: 6,
    tokenBalance: 0.0,
    offchainMetadata: {
      image:
      "https://s3.coinmarketcap.com/static-gravity/image/5a8229787b5e4c809b5914eef709b59a.png",
    },
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    name: "USD Coin",
    poolToken: false,
    symbol: "USDC",
    whitelisted: true,
  },
];

interface TokenSelectProps {
  token?: any;
  handleSelect: any;
}

const TokenSelect = ({ token, handleSelect }: TokenSelectProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isConfirmDlgOpen, setIsConfirmDlgOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [tokens, setTokens] = React.useState<any[]>(defaultTokens);
  // const { tokenList } = useSelector((state: any) => state.app);
  const wallet = useWallet();

  const [selectedToken, setSelectedToken] = React.useState<any>({});

  const handleKeyDown = (e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      setIsConfirmDlgOpen(true);
    }
  };

  React.useEffect(() => {
    // console.log(wallet);

    setTimeout(async () => {
      if (wallet.connected && wallet.publicKey) {
        setTokens(
          [...defaultTokens, ...await getTokenAccounts(wallet.publicKey.toString(), solanaConnection)]
        );
      }
    }, 0);
  }, [wallet.connected]);

  React.useEffect(() => {
    console.log(token);
    if(token){
      setSelectedToken(token);
    }
  }, [token]);

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
            {selectedToken.offchainMetadata ? (
              <img
                src={
                  selectedToken.offchainMetadata == undefined
                    ? ""
                    : selectedToken.offchainMetadata.image
                }
                alt="tether"
                className="w-5 h-5"
              />
            ) : (
              <div className="w-5 h-5"></div>
            )}
            <div>
              {selectedToken.symbol == undefined ? "" : selectedToken.symbol}
            </div>
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
                  <div>
                    <FaCopy className="text-gray-700" />
                  </div>
                  <Link href="">
                    <BsBoxArrowUpRight className="text-gray-700" />
                  </Link>
                </div>
                <Button className="bg-primary">I understand, Confirm</Button>
                <Button className="bg-transparent text-black">Cancel</Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex justify-between items-center">
            {defaultTokens.map((token) => (
              <div
                key={token.symbol}
                className="flex gap-2 items-center bg-gray-50 border-2 border-gray-100 rounded-lg p-2 cursor-pointer"
                onClick={() => {
                  handleSelect(token), setSelectedToken(token);
                  setIsDialogOpen(false);
                }}
              >
                <img
                  src={token.offchainMetadata.image}
                  alt="token"
                  className="w-6 h-6 rounded-full"
                />
                <div>{token.symbol}</div>
              </div>
            ))}
          </div>
          <Card>
            <div className="-mx-2 max-h-[500px] overflow-auto">
              {tokens.map((token: any) => (
                <div
                  key={token.symbol}
                  className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    handleSelect(token), setSelectedToken(token);
                    setIsDialogOpen(false);
                  }}
                >
                  <img
                    src={token.offchainMetadata.image}
                    alt="icon"
                    className="w-12 h-12"
                  />
                  <div>
                    <div className="flex gap-2 items-center">
                      <div className="font-bold">{token.symbol}</div>
                      {token.whitelisted && (
                        <HiCheckBadge className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                    <div>{token.name}</div>
                  </div>
                  <div className="flex-grow"></div>
                  <div className="flex gap-4 items-center">
                    <div className="text-gray-400">
                      {abbreviateTokenAddress(token.mint)}
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
