import "./globals.css";

import InfoToggle from "@/components/InfoToggle";
import {PriceUpdateProvider} from "@/app/contexts/PriceUpdateContext";
import Price from "@/components/Price";

export default async function Home({
    searchParams
} : {
    searchParams: Promise<{ code?: string; show?: string }>;
}) {

    const { code = "BTC", show } = await searchParams;
    const showForm = show === "true";

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <PriceUpdateProvider initialCode={code}>
            <Price/>

            {showForm ? (
                <InfoToggle initialCode={code} initialShow={true}/>
            ) : (
                <>
                    <InfoToggle initialCode={code} initialShow={false} />
                </>
            )}
        </PriceUpdateProvider>
    </div>
  );
}
