'use client';

import WalletConnection from "@/components/wallet/WalletConnection";
import { IoMdSettings } from "react-icons/io";

const TopBar = () => {
    return <div className="flex items-center justify-between px-6 border-b-2 border-gray-200">
        <div className="text-3xl my-6"><b>DEX</b></div>
        <div className="flex items-center gap-4">
            <IoMdSettings className="w-6 h-6"/>
            <WalletConnection/>
        </div>
    </div>
};

export default TopBar;