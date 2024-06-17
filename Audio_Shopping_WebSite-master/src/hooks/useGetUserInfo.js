import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext';


const useGetUserInfo = () => {
    const authContext = useContext(AuthContext);
    const { authToken } = authContext;

    const [loading, setloading] = useState(false);
    const [userData, setuserData] = useState('');
    useEffect(() => {
        const user = async () => {
            setloading(true);
            try {
                if (authToken !== '' && localStorage.getItem('AudioAce_Token')) {
                    const response = await fetch('https://audio-e-commerce-website-mern-3iyu.onrender.com/auth/getUserInfo', {
                        method: "GET", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, *cors, same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        headers: {
                            "Content-Type": "application/json",
                            "Auth-Token": authToken,
                        },
                    });
                    const res = await response.json();
                    if (res.error) {
                        throw new Error(res.error);
                    }
                    setuserData(res);
                }
                else if (authToken === '' && localStorage.getItem('AudioAce_Token')) {
                    const response = await fetch('https://audio-e-commerce-website-mern-3iyu.onrender.com/auth/getUserInfo', {
                        method: "GET", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, *cors, same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        headers: {
                            "Content-Type": "application/json",
                            "Auth-Token": localStorage.getItem('AudioAce_Token'),
                        },
                    });
                    const res = await response.json();
                    if (res.error) {
                        throw new Error(res.error);
                    }
                    setuserData(res);
                }

            } catch (error) {
                console.log(error);
                return error.message;
            } finally {
                setloading(false);
            }
        }
        if (userData.length === 0) {
            user();
        }
    });
    return { loading, userData };
}

export default useGetUserInfo
