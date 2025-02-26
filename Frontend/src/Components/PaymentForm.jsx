import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!stripe || !elements) return;

        try {
            const response = await fetch("http://localhost:3000/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: 20, currency: "usd" }), // Amount in USD
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Payment request failed");
            }

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: { card: elements.getElement(CardElement) },
            });

            if (result.error) {
                setMessage(result.error.message);
            } else {
                setMessage("Payment successful!");
            }
        } catch (error) {
            setMessage(error.message);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? "Processing..." : "Pay Now"}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default PaymentForm;
