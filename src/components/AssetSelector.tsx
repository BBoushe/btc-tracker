"use client"

import {usePriceUpdate} from "@/app/contexts/PriceUpdateContext";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent, startTransition} from "react";

const ASSETS = ["BTC", "ETH", "PAXG", "CBETH"];

export default function AssetSelector() {
    const {code, changeCode } = usePriceUpdate();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const newCode = e.target.value;
        changeCode(newCode);

        const qs  = new URLSearchParams(searchParams.toString());
        qs.set("code", newCode);

        startTransition(() => {
            router.push(`${pathname}?${qs}`);
        });
    }

    return (
        <div className="d-flex justify-content-start align-items-bottom">
            <div className="dropdown bg-dark">
                <select
                    value={code}
                    onChange={handleChange}
                    className="btn btn-secondary btn-sm bg-black">
                    {ASSETS.map((sym) => (
                        <option key={sym} value={sym}>
                            {sym}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
// "use client";
//
// import { ChangeEvent } from "react";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { startTransition } from "react";
// import { usePriceUpdate } from "@/app/contexts/PriceUpdateContext";
//
// // add or remove symbols as you like
// const ASSETS = ["BTC", "ETH", "PAXG", "CBETH", ];
//
// export default function AssetSelector() {
//     const { code, changeCode } = usePriceUpdate();
//
//     const router = useRouter();
//     const pathname = usePathname();
//     const searchParams = useSearchParams();
//
//     function handleChange(e: ChangeEvent<HTMLSelectElement>) {
//         const newCode = e.target.value;
//         changeCode(newCode);             // updates context
//
//         // rebuild ?query string
//         const qs = new URLSearchParams(searchParams.toString());
//         qs.set("code", newCode);
//
//         startTransition(() => {
//             router.push(`${pathname}?${qs}`);
//         });
//     }
//
//     return (
//         <div
//             className="dropdown position-absolute"
//             style={{ top: 0, left: 0, width: 90 }}   /* neat, tucked-away */
//         >
//             <select
//                 value={code}
//                 onChange={handleChange}
//                 className="form-select form-select-sm bg-dark text-white border-secondary"
//             >
//                 {ASSETS.map((sym) => (
//                     <option key={sym} value={sym}>
//                         {sym}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// }
