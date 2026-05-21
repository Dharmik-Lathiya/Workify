import { useState } from "react";
import apiFetch from "../lib/api";

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        amount: "",
        productInfo: "",
        firstName: "",
        email: "",
        phone: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {
            const data = await apiFetch("/api/payment/pay", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            const form = document.createElement("form");
            form.method = "POST";
            form.action = data.data.action;

            Object.keys(data.data.payUData).forEach((key) => {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = data.data.payUData[key];
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    };

    return (
        <div className="payment-container">
            <h2>PayU Payment</h2>
            <form onSubmit={handlePayment}>
                <label>Amount:</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

                <label>Product Info:</label>
                <input type="text" name="productInfo" value={formData.productInfo} onChange={handleChange} required />

                <label>First Name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Phone:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                <button type="submit">Pay Now</button>
            </form>
        </div>
    );
};

export default PaymentForm;
