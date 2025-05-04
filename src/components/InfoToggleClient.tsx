"use client";

import {useRouter} from "next/navigation";
import {startTransition} from "react";

type InfoToggleClientProps = {
    code: string;
    showForm: boolean;
}
export default function InfoToggleClient({ code, showForm }: InfoToggleClientProps) {
    const router = useRouter();

    function navigate(nextShow: boolean) {
        startTransition(() => {
            const qs = new URLSearchParams();
            qs.set("code", code);

            if(nextShow) qs.set('show', 'true');

            // keep params only when the form should be visible
            router.push(`/?${qs}`);
        });
    }

    if(showForm) {
        return (
            <button
                className="btn btn-secondary mt-3"
                onClick={() => navigate(false)}
            >
                Back
            </button>
        );
    }

    return (
        <button
            className="btn btn-success btn-md"
            onClick={() => navigate(true)}
        >
            +
        </button>
    );
}