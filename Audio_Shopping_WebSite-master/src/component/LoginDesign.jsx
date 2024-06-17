import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../redux/index.js';
import AuthContext from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';


const LoginDesign = () => {
    const [loginComponent, setloginComponent] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.authonication);
    const authContext = useContext(AuthContext);
    const {setauthToken} = authContext;


    const handleOnChange = (event) => {
        setloginComponent({ ...loginComponent, [event.target.name]: event.target.value });
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const combinedName = loginComponent.firstname + ' ' + loginComponent.lastname;
        dispatch(action.loginAction(combinedName,loginComponent.email,loginComponent.password));
        if(loginState){
            setauthToken(loginState);
        }
    }
    return (
        <>
            <form>
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                            <div className="mt-2">
                                <input type="text" name="firstname" id="first-name" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleOnChange} value={loginComponent.firstname} />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                            <div className="mt-2">
                                <input type="text" name="lastname" id="last-name" autocomplete="family-name" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleOnChange} value={loginComponent.lastname} />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autocomplete="email" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleOnChange} value={loginComponent.email} />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autocomplete="password" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleOnChange} value={loginComponent.password} />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <Link to={'/Sigin'} state={{ pageName: 'SIGIN' }} className="block text-sm font-medium leading-6 text-blue-900 underline">Do Not Have A Account</Link>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end">
                        <button type="submit" className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={(event) => handleOnSubmit(event)}>Summit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default LoginDesign
