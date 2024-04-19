'use client';

import TopBar from "@/layouts/TopBar";
import MainProvider from "@/providers/MainProvider";
import PoolDetails from "./PoolDetails";

const PoolDetailsPage = () => {
    return <MainProvider>
    <TopBar/>
    <PoolDetails/>
</MainProvider>;
}

export default PoolDetailsPage;