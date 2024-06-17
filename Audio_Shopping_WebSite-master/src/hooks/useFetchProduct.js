import React, { useEffect, useState } from 'react'

const useFetchProduct = () => {
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState('');
    useEffect(() => {
        const products = async () => {
            setloading(true);
            try {
                const response = await fetch('https://audio-electronics-e-commerce-website-api.onrender.com/api/getAllImages', {
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
                setdata(res.response);
            } catch (error) {
                console.log(error.message);
            }finally{
                setloading(false);
            }
        }

        if(data === ''){
            products();
        }
    },[data]);

    return { loading, data };
}

export default useFetchProduct
