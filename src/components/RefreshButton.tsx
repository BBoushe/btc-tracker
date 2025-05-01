"use client";

import {memo, useTransition} from "react";
import {getPriceEUR} from "@/util/api_calls";
import {toCurrency} from "@/components/Info";

function RefreshButton(){
    const [isPending, startTransition] = useTransition();

    async function handleRefresh(){
        startTransition(async () => {
            const newPrice = await getPriceEUR();

            const priceElement = document.getElementById("price");
            if(priceElement){
                priceElement.textContent = toCurrency(newPrice);
            }
        });
    }

    return (
        <button
            onClick={handleRefresh}
            className="btn btn-warning btn-sm"
            disabled={isPending}>
            {isPending ? "Refreshing..." : "Refresh"}
        </button>
    );
}

export default memo(RefreshButton);