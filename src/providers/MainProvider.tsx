"use client";

import WalletContextProvider from "./WalletContextProvider";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return <WalletContextProvider>{children}</WalletContextProvider>;
};

export default MainProvider;
