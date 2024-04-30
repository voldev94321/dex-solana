import TopBar from "@/layouts/TopBar";
import MainProvider from "@/providers/MainProvider";
import Swap from "./Swap";

const SwapPage = () => {
    return <MainProvider>
    <TopBar/>
    <Swap />
</MainProvider>;
}

export default SwapPage;