"use client";

import { useState } from 'react';
import BalanceInput from './BalanceInput';

export default function InfoToggle({ children }: { children: React.ReactNode }) {
    const [showForm, setShowForm] = useState(false);

    return showForm ? (
        <>
            <BalanceInput onSuccess={() => setShowForm(false)} />
        </>
    ) : (
        <>
            {children /* ← server output is streamed in once */ }
            <button onClick={() => setShowForm(true)} className="btn btn-success btn-md">
                +
            </button>
        </>
    );
}