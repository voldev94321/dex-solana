import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_CLOCK_PUBKEY,
  Keypair
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID,ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress,getAssociatedTokenAddressSync, createTransferInstruction, getAccountTypeOfMintType, createAssociatedTokenAccount, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import idl from "../app/IDL/dex.json";

import * as anchor from "@project-serum/anchor";
import { Program, AnchorProvider, web3, utils } from '@project-serum/anchor';

import { Buffer } from 'buffer';

// window.Buffer = Buffer;
const opts = {
  preflightCommitment:"processed",
};

const RPC_URL = `https://api.devnet.solana.com `;
const connection = new Connection(RPC_URL,'confirmed');
const programID = new PublicKey(idl.metadata.address);

const useSolanaWeb3 = () => {
  // const { wallet, connected } = useWallet();
  const { select, wallets, publicKey, disconnect, connected,connecting, wallet } = useWallet();

  const getProvider = () => {
    const provider = new AnchorProvider(
      connection,
      wallet.adapter,
      opts.preflightCommitment
    );
    return provider;
  };

  const createpool = async (tokenMintA, tokenMintB, depositAmountA, depositAmountB) => {
    try{
      if (!connected) {
        console.error('Wallet is not connected');
        return;
      }
  
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      // create amm
      const id = Keypair.generate().publicKey;
      const admin = publicKey;
      const [ammKey, _] = await anchor.web3.PublicKey.findProgramAddress(
        [
          id.toBuffer()
        ],
        program.programId
      );
  
      if(new anchor.BN(tokenMintB.toBytes()).lt(new anchor.BN(tokenMintA.toBytes()))){
        let temp = tokenMintB;
        tokenMintB = tokenMintA;
        tokenMintA = temp;
  
        let temp_amount = depositAmountB;
        depositAmountB = depositAmountA;
        depositAmountA = temp_amount;
      }
  
      const [poolAuthority,_3] = await anchor.web3.PublicKey.findProgramAddress(
        [
          ammKey.toBuffer(),
          tokenMintA.toBuffer(),
          tokenMintB.toBuffer(),
          Buffer.from("authority"),
        ],
        program.programId
      );
  
      const [mintLiquidity, _4] = await anchor.web3.PublicKey.findProgramAddress(
        [
          ammKey.toBuffer(),
          tokenMintA.toBuffer(),
          tokenMintB.toBuffer(),
          Buffer.from("liquidity"),
        ],
        program.programId
      );
  
      const [poolKey,_5] = await anchor.web3.PublicKey.findProgramAddress(
        [
          ammKey.toBuffer(),
          tokenMintA.toBuffer(),
          tokenMintB.toBuffer(),
        ],
        program.programId
      );
  
      const poolAccountA = getAssociatedTokenAddressSync(
        tokenMintA,
        poolAuthority,
        true,
      );
  
      const poolAccountB = getAssociatedTokenAddressSync(
        tokenMintB,
        poolAuthority,
        true
      );
  
      const liquidityAccount = getAssociatedTokenAddressSync(
        mintLiquidity,
        admin,
      );
  
      const holderAccountA = getAssociatedTokenAddressSync(
        tokenMintA,
        admin,
      );
  
      const holderAccountB = getAssociatedTokenAddressSync(
        tokenMintB,
        admin,
      );
  
      const minimumLiquidity = new anchor.BN(100);
      const defaultSupply = new anchor.BN(100 * 10 ** 6);
  
      const transaction = new Transaction();
      
      const [globalState, _2] = await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from("global-state")
        ],
        program.programId
      );
  
      const fee = 500;
  
      const tx = program.instruction.createAmm(
        id,
        fee,
        {
          accounts: {
            amm: ammKey, 
            admin: admin,
            payer: admin,
            systemProgram: SystemProgram.programId
          }
        }
      );
      transaction.add(tx);
        
      const pool_tx = program.instruction.createPool(
        {
          accounts: {
            payer: admin,
            amm: ammKey,
            globalState,
            pool: poolKey,
            mintA: tokenMintA,
            mintB: tokenMintB,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram : ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId
          }
        }
      );
      transaction.add(pool_tx);

      const confimr_tx = program.instruction.confirmPool(
        {
          accounts: {
            payer: admin,
            amm: ammKey,
            poolAuthority: poolAuthority,
            mintLiquidity: mintLiquidity,
            mintA: tokenMintA,
            mintB: tokenMintB,
            poolAccountA: poolAccountA,
            poolAccountB: poolAccountB,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram : ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId
          }
        }
      );
      transaction.add(confimr_tx);

      const deposit_tx = program.instruction.depositLiquidity(
        new anchor.BN(depositAmountA),
        new anchor.BN(depositAmountB),
        {
          accounts: {
            pool: poolKey,
            poolAuthority: poolAuthority,
            depositor: admin,
            mintLiquidity: mintLiquidity,
            mintA: tokenMintA,
            mintB: tokenMintB,
            poolAccountA: poolAccountA,
            poolAccountB: poolAccountB,
            depositorAccountLiquidity: liquidityAccount,
            depositorAccountA: holderAccountA,
            depositorAccountB: holderAccountB,
            payer: admin,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram : ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId
          }
        }
      );
      transaction.add(deposit_tx);
  
      // Set the fee payer to the sender's public key
      transaction.feePayer = publicKey;
      // Get the recent blockhash
      const recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
      // Sign the transaction
      transaction.recentBlockhash = recentBlockhash;
      // transaction.partialSign(mint);
      console.log("transaction->", transaction);
      const signedTransaction = await wallet.adapter.signTransaction(transaction);
      await connection.sendRawTransaction(signedTransaction.serialize());

      // const depositTokenAccountLiquditiy =
      // await connection.getTokenAccountBalance(liquidityAccount);
      // console.log("depositTokenAccountLiquditiy->", depositTokenAccountLiquditiy);

      const depositTokenAccountA = await connection.getTokenAccountBalance(
        holderAccountA
      );
      console.log("depositTokenAccountA->", depositTokenAccountA);
  
      const depositTokenAccountB = await connection.getTokenAccountBalance(
        holderAccountB
      );
      console.log("depositTokenAccountB->", depositTokenAccountB);
      
    } catch(err){
      console.log('err in usesolanaweb3', err)
      throw err;
    }
  };

  const swap = async() => {
    try {
      if (!connected) {
        console.error('Wallet is not connected');
        return;
      }
  
      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      const [globalState, _1] = await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from("global-state")
        ],
        program.programId
      );

      // get the all pools
      const pools = await program.account.globalState.fetch(globalState);
      // target pool
      const targetPool = pools.pools[1];
      // get pool information
      const poolInformation = await program.account.pool.fetch(targetPool);
      console.log(poolInformation);
      const ammKey = poolInformation.amm;
      const tokenMintA = poolInformation.mintA;
      const tokenMintB = poolInformation.mintB;
      // call the swap function
      const [poolAuthority,_2] = await anchor.web3.PublicKey.findProgramAddress(
        [
          ammKey.toBuffer(),
          tokenMintA.toBuffer(),
          tokenMintB.toBuffer(),
          Buffer.from("authority"),
        ],
        program.programId
      );
      const poolAccountA = getAssociatedTokenAddressSync(
        tokenMintA,
        poolAuthority,
        true,
      );
  
      const poolAccountB = getAssociatedTokenAddressSync(
        tokenMintB,
        poolAuthority,
        true
      );

      const admin = publicKey;
      
      const holderAccountA = getAssociatedTokenAddressSync(
        tokenMintA,
        admin,
      );
  
      const holderAccountB = getAssociatedTokenAddressSync(
        tokenMintB,
        admin,
      );

      const input = new anchor.BN(20 * 10 ** 6);
      // "Swap from A to B"
      const tx = await program.rpc.swapExactTokensForTokens(
        true,
        input,
        new anchor.BN(100), {
          accounts:{
            amm: ammKey,
            pool: targetPool,
            poolAuthority: poolAuthority,
            trader: admin,
            mintA: tokenMintA,
            mintB:tokenMintB,
            poolAccountA: poolAccountA,
            poolAccountB: poolAccountB,
            traderAccountA: holderAccountA,
            traderAccountB: holderAccountB,
            payer: admin,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram : ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId
          }
        }
      )

    } catch (error) {
      console.log(error);
    }
   
  }
  return {
    createpool,
    swap
  };
};

export default useSolanaWeb3;