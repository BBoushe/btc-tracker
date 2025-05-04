import BalanceInput from "@/components/BalanceInput";
import Info from "@/components/Info";
import InfoToggleClient from "@/components/InfoToggleClient";

type InfoToggleProps = {
    initialCode: string;
    initialShow: boolean;
};

export default function InfoToggle({ initialCode, initialShow } : InfoToggleProps) {
    return (
        <>
            {initialShow ? (
                <BalanceInput/>
            ) : (
                <Info code={initialCode}/>
            )}

            <InfoToggleClient code={initialCode} showForm={initialShow}/>
        </>
    );
}

// "use client";
//
// import { useState } from 'react';
// import BalanceInput from './BalanceInput';
// import {usePriceUpdate} from "@/app/contexts/PriceUpdateContext";
// import Info from "@/components/Info";
// import {useSearchParams} from "next/navigation";
//
// type InfoToggleProps = {
//     initialCode: string,
//     initialShow: boolean,
// }
//
// export default function InfoToggle({ initialCode, initialShow } : InfoToggleProps) {
//     const [showForm, setShowForm] = useState(false);
//     const { triggerUpdate, code } = usePriceUpdate();
//
//     const params = useSearchParams();
//     const showForm = initialShow;
//
//     return showForm ? (
//         <>
//             <BalanceInput onSuccess={() => {
//                 setShowForm(false);
//                 triggerUpdate();
//             }} />
//         </>
//     ) : (
//         <>
//             <Info code={code} />
//             <button onClick={() => setShowForm(true)} className="btn btn-success btn-md">
//                 +
//             </button>
//         </>
//     );
// }