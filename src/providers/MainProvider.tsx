"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import WalletContextProvider from "./WalletContextProvider";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletContextProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </WalletContextProvider>
  );
};

export default MainProvider;
