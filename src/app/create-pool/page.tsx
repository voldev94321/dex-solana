'use client';

import TopBar from "@/layouts/TopBar";
import MainProvider from "@/providers/MainProvider";
import CreatePool from "./CreatePool";

const CreatePoolPage = () => {
    return <MainProvider>
        <TopBar/>
        <CreatePool/>
    </MainProvider>;
}

export default CreatePoolPage;