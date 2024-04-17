"use client";

import TopBar from "@/layouts/TopBar";
import MainProvider from "@/providers/MainProvider";
import DashBoard from "./dashboard/Dashboard";

export default function Home() {
  return <MainProvider>
    <DashBoard/>
  </MainProvider>;
}
