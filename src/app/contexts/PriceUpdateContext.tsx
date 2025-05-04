"use client";

import { createContext, useCallback, useContext, useState } from "react";

type PriceUpdateContextType = {
    /** flips whenever we want consumers to re-fetch */
    isUpdated: boolean;
    /** call this after you’ve done something that should trigger a price refresh */
    triggerUpdate: () => void;
    /** Currently selected asset code for API fetch. Default is "BTC" */
    code: string;
    /** When called changes the current context code of the selected view */
    changeCode: (asset_code: string) => void;
};

const PriceUpdateContext =
    createContext<PriceUpdateContextType | undefined>(undefined);

export function PriceUpdateProvider({
    children,
    initialCode = "BTC",
    }: {
    children: React.ReactNode,
    initialCode?: string;
}) {
    const [ isUpdated, setIsUpdated ] = useState(false);
    const [ code, setCode ] = useState<string>("BTC");

    const triggerUpdate = useCallback(() => {
        setIsUpdated(prevState => !prevState);
    }, []);

    const changeCode : (asset_code: string) => void = useCallback((asset_code) => {
        setCode(asset_code);
    }, []);

    return (
        <PriceUpdateContext.Provider value={{ isUpdated, triggerUpdate, code, changeCode }}>
            {children}
        </PriceUpdateContext.Provider>
    );
}

export function usePriceUpdate() : PriceUpdateContextType {
    const context = useContext(PriceUpdateContext);

    if(!context) throw new Error(
        "usePriceUpdate must be used within a PriceUpdateProvider"
    );
    return context;
}