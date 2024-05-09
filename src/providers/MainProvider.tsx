"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import WalletContextProvider from "./WalletContextProvider";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletContextProvider>
      <Provider store={store}>
      <TooltipProvider>{children}</TooltipProvider>
      </Provider>
    </WalletContextProvider>
  );
};

export default MainProvider;
