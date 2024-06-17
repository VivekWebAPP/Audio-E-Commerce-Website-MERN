import React, { useState } from 'react'
import { useCart } from '../context/CartCotext'
import { motion, AnimatePresence } from 'framer-motion';
import {Link} from 'react-router-dom';

function CartList() {
    const { cartItems, totalPrice, onRemove, toggleCartItemQuanitity } = useCart();
    const [delAnimVal, setDelAnimVal] = useState();

    const handlerDecBtn = (id) => {
        toggleCartItemQuanitity(id, "dec");
    }

    const handlerIncBtn = (id) => {
        toggleCartItemQuanitity(id, "inc");
    }

    const handlerDeleteBox = (item, key) => {
        setDelAnimVal(key)
        setTimeout(() => {
            onRemove(item)
        }, 300);
    }

    const animateVariant = {
        initial: {
            opacity: 0, x: -50
        },
        start: {
            opacity: 1, x: 0
        },
        end: {
            opacity: 0, x: -100,
            transition: {
                delay: 0,
                duration: .2,
                x: { duration: .4 }
            }
        }
    }

    return (
        cartItems.length > 0 ?
            <AnimatePresence>
                {
                    cartItems.map((item, key) => (
                        delAnimVal !== item.product.id &&
                        <motion.div
                            className='CICart boxRow w_100 gap_3'
                            key={item.product.id}
                            initial='initial'
                            animate='start'
                            exit='end'
                            variants={animateVariant}
                            transition={{
                                duration: .6,
                                delay: key / 3
                            }}
                        >
                            <img src={item.product.img} alt={item.product.name} className='CICImg' />
                            <div className='boxColumn gap_1'>
                                {
                                    item.product.isNew && <p className='text_orange_overLine w_100'>NEW PRODUCT</p>
                                }
                                <h3 className='w_100'>{item.product.name}</h3>
                                <p className='opacity_50'>{item.product.desc}</p>
                                <div className='boxRow gap_2 left w_100 fleWrap'>
                                    <div className='boxRow bgGray'>
                                        <button className='p_1' onClick={() => handlerDecBtn(item.product.id)}>-</button>
                                        <button className='p_1'>{item.count}</button>
                                        <button className='p_1' onClick={() => handlerIncBtn(item.product.id)}>+</button>
                                    </div>
                                    <h4 className=''>${Number.parseInt(item.product.price) * item.count}</h4>
                                    <button className='btn_red center' onClick={() => handlerDeleteBox(item.product, item.product.id)}>x</button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                }
                <div className='flex flex-row flex-wrap justify-end'>
                    <h2 className='center pt_2 pb_2 w_100'>
                        total price: ${totalPrice}
                    </h2>
                    <Link to={'/Payment'} state={{pageName:'PAYMENT'}} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Proceed To CheckOut</Link>
                </div>
            </AnimatePresence>
            :
            <div className='center p_5'>
                <h1 className='text_h1 w_100'>Cart Empty</h1>
            </div>
    )
}

const CartItem = () => {
    return (
        <section id="cartItem" >
            <CartList />
        </section>
    )
}

export default CartItem
