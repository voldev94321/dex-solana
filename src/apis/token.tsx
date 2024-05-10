import axios from "axios";
import {
  fetchMetadata,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

const RPC_URL = `https://api.devnet.solana.com `;
const umi = createUmi(RPC_URL);

export async function getTokenMetadata(tokenMint: string) {
  //get the metadata on chain
  const metadataPda = findMetadataPda(umi, { mint: publicKey(tokenMint) });
  const metadata = await fetchMetadata(umi, metadataPda);

  //print the metadata
  // console.log(metadata)

  //get the uri
  const uri = metadata.uri;

  //print the uri
  // console.log(uri)

  //get the offchain metadata
  const fetchResponse = await fetch(uri);
  const offchainMetadata = await fetchResponse.json();

  //print the offchain metadata
  // console.log(offchainMetadata)
  return { ...metadata, offchainMetadata };
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