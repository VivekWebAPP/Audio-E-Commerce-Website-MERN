import React, {useEffect, useState} from 'react'
import { useCart } from '../context/CartCotext'
import { useLocation } from 'react-router-dom'
import {motion} from 'framer-motion'
import pImg from '../assets/cart/image-xx59-headphones.jpg'
import { Message } from './message'

const ProductDetail = () => {
    const {addToCart, incCount, decCount, count} = useCart();
    const [randomNumber,setRandomNumber] = useState(0)
    const [showMessage,setShowMessage] = useState(false)

    let location = useLocation();

    const handlerCartAdd = () => {
        const newCartItem = {};
        newCartItem.id = location.state.pid;
        newCartItem.pid = location.state.pid;
        newCartItem.name = location.state.name;
        newCartItem.desc = location.state.desc;
        newCartItem.img = location.state.img?location.state.img:pImg;
        newCartItem.count = count;
        newCartItem.price = randomNumber;
        addToCart(newCartItem, count)

        setShowMessage(true)
    }

    useEffect(()=> {
        setRandomNumber(200);
        // setRandomNumber(Math.floor(Math.random() * 1000) + 1);
    },[])

    const handlerDecBtn = () => {
        decCount();
    }

    const handlerIncBtn = () => {
        incCount();
    }

    function handlerMessageVisibility() {
        setShowMessage(false)
    }
    
      useEffect(() => {
        showMessage &&
          setTimeout(() => {
            handlerMessageVisibility()
          }, 2000);
    }, [showMessage])
    
    return (
        <section id='productDetail'>
            {
                showMessage && <Message func={handlerMessageVisibility} productName={location.state.name}/>
            }
            <div className='w_100 boxRow pdCard pt_2'>
                <motion.img 
                    className='pDImg pr_2' 
                    src={location.state.img?location.state.img:pImg} 
                    alt={'product'}
                    initial={{x: -100}}
                    animate={{x: 0}}
                    transition={{duration:.6,}}
                />
                <motion.div 
                    className='pdDesc w_50 boxColumn gap_3 p_6 pt_0 pb_0 left'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration:.6,}}
                >
                    <h1 className='text_h1 w_50 selfLeft'>
                        {location.state.name}
                    </h1>
                    <p className='opacity_50 w_100'>
                        {location.state.desc ? location.state.desc : 'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.'}
                    </p>
                    <p className='text_body w_100'>
                        $ {randomNumber}
                    </p>
                    <div className='boxRow gap_1 left w_100 fleWrap'>
                        <div className='boxRow bgGray'>
                            <button className='p_1' onClick={handlerDecBtn}>-</button>
                            <button className='p_1'>{count}</button>
                            <button className='p_1' onClick={handlerIncBtn}>+</button>
                        </div>
                        <button onClick={handlerCartAdd} className='btn_orange selfLeft' >ADD TO CART</button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ProductDetail
