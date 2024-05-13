"use client";

import TopBar from "@/layouts/TopBar";
import MainProvider from "@/providers/MainProvider";
import DashBoard from "./Dashboard";

export default function Home() {
  return <MainProvider>
    <DashBoard/>
  </MainProvider>;
}
