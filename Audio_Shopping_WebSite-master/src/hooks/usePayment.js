import React, { useState } from 'react';

const usePayment = () => {
    const [orderDetails, setorderDetails] = useState('')
    const order = async (amount) => {
        try {
            const response = await fetch('https://audio-e-commerce-website-mern-3iyu.onrender.com/payment/paymentRoute', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: amount }),
            });
            const res = await response.json();
            if (res.error) {
                throw new Error(res.error);
            }
            return res;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    return { order }
}

export default usePayment
