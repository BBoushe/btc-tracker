"use client";

import { useState } from "react";
import BalanceInput from "./BalanceInput";
import InfoWrapper from "@/components/InfoWrapper";

export default function InfoToggle() {
    const [showForm, setShowForm] = useState(false);

    function handleToggle() {
        setShowForm(prev => !prev);
    }

    return (
        <>
            {showForm ? (
                <>
                    <BalanceInput />
                    <div className="mt-3">
                        <button onClick={handleToggle} className="btn btn-secondary btn-sm">
                            ← Back
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Render Info dynamically inside a Client Wrapper */}
                    <InfoWrapper />
                    <div className="mt-3">
                        <button onClick={handleToggle} className="btn btn-success btn-md">
                            +
                        </button>
                    </div>
                </>
            )}
        </>
    );
}