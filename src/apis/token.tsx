import axios from "axios";
import {
  fetchMetadata,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Connection, GetProgramAccountsFilter, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const RPC_URL = `${process.env.NEXT_PUBLIC_RPC}`;
const umi = createUmi(RPC_URL);
const conn = new Connection(RPC_URL);

export async function getTokenMetadata(tokenMint: string) {
  //get the metadata on chain
  try {
    const metadataPda = findMetadataPda(umi, { mint: publicKey(tokenMint) });
    const metadata = await fetchMetadata(umi, metadataPda);
    if (metadata) {
      const uri = metadata.uri;
      const fetchResponse = await fetch(uri);
      const offchainMetadata = await fetchResponse.json();
      return { ...metadata, offchainMetadata };
    }
  } catch (error) {
    console.log(error);
  }
}

export const getTokenList = (callback: any) => {
  axios
    .get("" + process.env.NEXT_PUBLIC_TOKEN_LIST_API_URL)
    .then((result) => {
      callback(result.data.tokens);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Function to get token balance
export async function fetchTokenBalances( walletAddress: string, tokenAddress: string) {
  try {
    const tokenArrays = await getTokenAccounts(walletAddress, new Connection(RPC_URL));
    // return tokenBalance;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return null;
  }
}

export async function getTokenAccounts(
  wallet: string,
  solanaConnection: Connection
) {
  // console.log(wallet, solanaConnection);
  const filters: GetProgramAccountsFilter[] = [
    {
      dataSize: 165, //size of account (bytes)
    },
    {
      memcmp: {
        offset: 32, //location of our query in the account (bytes)
        bytes: wallet, //our search criteria, a base58 encoded string
      },
    },
  ];
  const accounts = await solanaConnection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    { filters: filters }
  );
  // console.log(
  //   `Found ${accounts.length} token account(s) for wallet ${wallet}.`
  // );
  let tokenArray: any = [];
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    //Parse the account data
    const parsedAccountInfo: any = account.account.data;
    const mintAddress: string = parsedAccountInfo["parsed"]["info"]["mint"];
    // console.log("#!#!#!#", parsedAccountInfo);
    const tokenBalance: number =
      parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
    const tokenDecimals: number =
      parsedAccountInfo["parsed"]["info"]["tokenAmount"]["decimals"];
    //Log results
    // console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
    // console.log(`--Token Mint: ${mintAddress}`);
    // console.log(`--Token Balance: ${tokenBalance}`);
    // console.log(await getTokenMetadata(mintAddress));
    const tokenMetadata = await getTokenMetadata(mintAddress);
    if(tokenMetadata) {
      tokenArray.push({...await getTokenMetadata(mintAddress), tokenBalance, tokenDecimals});
    }
  }

  // console.log(tokenArray);
  return tokenArray;
}
