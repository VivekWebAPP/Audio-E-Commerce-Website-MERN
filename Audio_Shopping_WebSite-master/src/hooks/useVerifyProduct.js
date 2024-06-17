
const useVerifyProduct = () => {
    const verifyOrder = async () => {
        try {
            const response = await fetch('https://audio-e-commerce-website-mern-3iyu.onrender.com/payment/verifyThePayment', {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = await response.json();
            if (res.error) {
                throw new Error(res.error);
            }
            return res;
        } catch (error) {
            console.log(error.message);
        }
    }
    return { verifyOrder }
}

export default useVerifyProduct
