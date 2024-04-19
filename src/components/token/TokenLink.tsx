'use client';

import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";

interface TokenLinkProps {
    tokenAddress: string,
}

const TokenLink = ( { tokenAddress }: TokenLinkProps ) => {
    return <Link href="#" className="flex gap-2 items-center text-primary">
    Es9vMF...enwNYB <BsBoxArrowUpRight />
  </Link>;
}

export default TokenLink;