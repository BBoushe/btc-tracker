"use client";

import { useTransition } from "react";

export default function RefreshButton(){
    const [isPending, startTransition] = useTransition();

    async function handleRefresh(){
        startTransition(async () => {
            const result = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur');

            if (!result.ok) {
                throw new Error("Failed to fetch price.\n" + result.statusText);
            }

            const data = await result.json();

            const newPrice = data.bitcoin.eur.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
            });

            const priceElement = document.getElementById("price");
            if(priceElement){
                priceElement.textContent = newPrice;
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