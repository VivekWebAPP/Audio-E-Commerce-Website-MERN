import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../redux';
import AuthContext from '../context/AuthContext';


const SiginDesign = () => {
    const [signComponent, setsignComponent] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        phone:'',
        address:'',
        country:'',
    });
    const dispatch = useDispatch();
    const sigin = useSelector((state) => state.authonication);
    const authContext = useContext(AuthContext);
    const {setauthToken} = authContext;

    const handleOnChange = (event) => {
        setsignComponent({...signComponent,[event.target.name]:event.target.value});
    }

    const handleOnSubmit = (event)=>{
        event.preventDefault();
        const name = signComponent.firstname + ' ' + signComponent.lastname;
        dispatch(action.siginAction(name,signComponent.email,signComponent.password,signComponent.phone,signComponent.address,signComponent.country));
        if(sigin){
            setauthToken(sigin);
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
                                <input type="text" name="firstname" id="first-name" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleOnChange} value={signComponent.firstname}/>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                            <div className="mt-2">
                                <input type="text" name="lastname" id="last-name" autocomplete="family-name" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleOnChange} value={signComponent.lastname}/>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autocomplete="email" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleOnChange} value={signComponent.email}/>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autocomplete="password" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleOnChange} value={signComponent.password}/>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                            <div className="mt-2">
                                <input id="phone" name="phone" type="number" autocomplete="number" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleOnChange} value={signComponent.phone}/>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                            <div className="mt-2">
                                <input id="country" name="country" type="text" autocomplete="country" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleOnChange} value={signComponent.country}/>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                            <div className="mt-2">
                                <input type="text" name="address" id="street-address" autocomplete="street-address" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleOnChange} value={signComponent.address}/>
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                            <div className="mt-2">
                                <input type="text" name="city" id="city" autocomplete="address-level2" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                            <div className="mt-2">
                                <input type="text" name="region" id="region" autocomplete="address-level1" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                            <div className="mt-2">
                                <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end">
                    <button type="submit" className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={(event)=>handleOnSubmit(event)}>Summit</button>
                </div>
            </form>
        </>
    )
}

export default SiginDesign
