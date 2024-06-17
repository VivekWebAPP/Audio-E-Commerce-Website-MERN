import React from 'react';
import { useCart } from '../context/CartCotext';
import usePayment from '../hooks/usePayment';
import useGetUserInfo from '../hooks/useGetUserInfo';
import useGetKeyId from '../hooks/useGetKeyId';
import { Link } from 'react-router-dom';

const PaymentDesign = () => {
    const { totalPrice, setorderID } = useCart();
    const { order } = usePayment();
    const { userData } = useGetUserInfo();
    const { key } = useGetKeyId();

    const onCheckOutHandler = (totalPrice,event) => {
        event.preventDefault();
        const payment = order(totalPrice);
        payment.then((pay) => {
            const options = {
                key: key.keyId, // Enter the Key ID generated from the Dashboard
                amount: pay.orders.amount, // Amount in currency subunits. Default currency is INR.
                currency: "INR",
                name: "AudioAce",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: pay.orders.id, // Pass the order ID obtained from the backend
                redirect: true,
                callback_url: "http://localhost:5000/payment/successfulOrder",
                prefill: {
                    name: userData.user.name,
                    email: userData.user.email,
                    contact: userData.user.phone
                },
                notes: {
                    address: userData.user.address,
                },
                theme: {
                    color: "#3399cc"
                }
            };
            setorderID(pay.orders.id);
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        })
    };

    return (
        <section className="bg-white py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">Payment</h2>

                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                        <form action="#" className="w-full rounded-lg border border-gray-900 bg-white p-4 shadow-sm dark:border-gray-700 sm:p-6 lg:max-w-xl lg:p-8">
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label for="full_name" className="mb-2 block text-sm font-medium text-gray-900"> Full name (as displayed on card)* </label>
                                    <input type="text" id="full_name" className="block w-full rounded-lg border border-solid border-gray-900 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500    dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label for="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 "> Card number* </label>
                                    <input type="text" id="card-number-input" className="block w-full rounded-lg border border-solid border-gray-900 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" required />
                                </div>

                                <div>
                                    <label for="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900">Card expiration* </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                            <svg className="h-4 w-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <input datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" className="block w-full rounded-lg border border-solid border-gray-900 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
                                    </div>
                                </div>
                                <div>
                                    <label for="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900">
                                        CVV*
                                        <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" className="text-gray-500 hover:text-gray-900 ">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                        <div id="cvv-desc" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg  px-3 py-2 text-sm font-medium  opacity-0 shadow-sm transition-opacity duration-300">
                                            The last 3 digits on back of card
                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                    </label>
                                    <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" className="block w-full rounded-lg border border-solid border-gray-900 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••" required />
                                </div>
                            </div>

                            <button type='submit' className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 bg-primary-600" onClick={(event) => { onCheckOutHandler(totalPrice + 799 + 99,event) }}>Pay now</button>
                        </form>

                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-4 rounded-lg border border-solid border-gray-900 bg-gray-50 p-6">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-900">Original price</dt>
                                        <dd className="text-base font-medium text-gray-900">Rs {totalPrice}.00</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-900 ">Savings</dt>
                                        <dd className="text-base font-medium text-green-500">-Rs 299.00</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-900 ">Store Pickup</dt>
                                        <dd className="text-base font-medium text-gray-900 ">Rs 99</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-900 ">Tax</dt>
                                        <dd className="text-base font-medium text-gray-900 ">Rs 799</dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 ">Total</dt>
                                    <dd className="text-base font-bold text-gray-900 ">Rs {totalPrice + 799 + 99}.00</dd>
                                </dl>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-8">
                                <img className="h-8 w-auto " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
                                <img className="hidden h-8 w-auto " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
                                <img className="h-8 w-auto " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                                <img className="hidden h-8 w-auto " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                                <img className="h-8 w-auto " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
                                <img className="hidden h-8 w-auto " src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
                            </div>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-gray-500  sm:mt-8 lg:text-left">
                        Payment processed by <a href="/" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Paddle</a> for <a href="/" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Flowbite LLC</a>
                        - United States Of America
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PaymentDesign;
