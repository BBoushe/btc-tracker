"use client";

import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {addInvestment} from "@/util/api_calls";


export default function BalanceInput() {
    const [ amount, setAmount ] = useState<string>("");
    const [ quantity, setQuantity ] = useState<string>("");
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if(!amount) return;

        setIsSubmitting(true);
        await addInvestment(parseFloat(amount), parseFloat(quantity));

        setAmount("");
        setIsSubmitting(false);
        router.refresh();
    }


    return (
        <div className="d-flex justify-content-center align-items-center mt-4"
             style={{maxWidth: "400px", margin: "0 auto"}}>
            <form onSubmit={handleSubmit} className="w-100">
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control bg-dark text-white border-secondary"
                        id="amountInput"
                        placeholder="Enter amount in EUR"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        step="1.0"
                    />
                    <label htmlFor="amountInput">Invested Amount (€)</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control bg-dark text-white border-secondary"
                        id="quantityInput"
                        placeholder="Enter quantity of BTC"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        step="0.00001"
                    />
                    <label htmlFor="quantityInput">Bought Quantity (BTC)</label>
                </div>
                <button type="submit" className="btn btn-success btn-md w-75" disabled={isSubmitting}>
                    {isSubmitting ? "Adding…" : "Add Investment"}
                </button>
            </form>
        </div>
    );
}