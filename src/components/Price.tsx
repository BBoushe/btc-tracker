"use client";

import {useCallback, useEffect, useState} from "react";
import {getPrice} from "@/util/api_calls";
import RefreshButton from "@/components/RefreshButton";
import {usePriceUpdate} from "@/app/contexts/PriceUpdateContext";
import {toCurrency} from "@/util/formattingUtils";
import AssetSelector from "@/components/AssetSelector";

export default function Price() {
    const [ price, setPrice ] = useState<number | null>(null);
    const [ isPending, setIsPending ] = useState<boolean>(false);
    const { isUpdated, code } = usePriceUpdate();

    // shared refresh function, we're using useCallback here because we intend to pass this ref
    // to a child component
    const refresh = useCallback(async () => {
        setIsPending(true);
        try {
            console.log(code);
            const newPrice = await getPrice(code);
            setPrice(newPrice);
        } catch(err) {
            console.error("Failed to fetch price", err);
        } finally {
            setIsPending(false);
        }
    }, [code]);

    // run on mount and whenever InfoToggle calls triggerUpdate()
    useEffect(() => {
        refresh();
    }, [isUpdated, refresh]);

    if (price === null) return <div>Loading...</div>;

    return (
        <div className="mb-5 position-relative">
            {/* tiny selector, sits top-left */}
            <AssetSelector />

            <h1 id="price" className="display-1 mb-3">
                {toCurrency(price)}
            </h1>
            <RefreshButton onRefresh={refresh} isPending={isPending} />
        </div>
    );
}

