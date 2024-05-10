'use client';

import { abbreviateTokenAddress } from "@/lib/utils";
import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";

interface TokenLinkProps {
    tokenAddress: string,
}

const TokenLink = ( { tokenAddress }: TokenLinkProps ) => {
    return <Link href="#" className="flex gap-2 items-center text-primary">
    {abbreviateTokenAddress(tokenAddress)} <BsBoxArrowUpRight />
  </Link>;
}

export default TokenLink;