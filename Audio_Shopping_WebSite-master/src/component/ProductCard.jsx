import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
// import { product_headphone, product_speaker, product_earphone } from '../data/List'
import useFetchProduct from '../hooks/useFetchProduct'

function CardList({ cat }) {
    const [catValue, setCatValue] = useState([])
    const { data, loading } = useFetchProduct();
    useEffect(() => {
        if (!loading) {
            switch (cat) {
                case "HEADPHONES":
                    setCatValue(data.slice(3, 6))
                    break;
                case "SPEAKERS":
                    setCatValue(data.slice(6, 10))
                    break;
                case "EARPHONES":
                    setCatValue(data.slice(0, 3))
                    break;
                default:
                    break;
            }
        }
    })
    return (
        <>
            {!loading && catValue.length !== 0 && catValue.map((item, key) => (
                key % 2 === 0 ?
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            delay: .4,
                            opacity: { duration: .4 }
                        }}
                        className='pcCard boxRow w_100'
                        key={item.id}
                    >
                        <img src={item.image[0]} alt={item.name} className='pImg pr_2' />
                        <div className='w_50 boxColumn gap_2 p_3 pt_0 pb_0 left'>
                            {
                                item.isNew && <p className='text_orange_overLine w_100'>NEW PRODUCT</p>
                            }
                            <h1 className='text_h1 w_100'>{item.name}</h1>
                            <p className='opacity_50'>{item.description}</p>
                            <Link to={'/Product/' + item.name} state={{ name: item.name, desc: item.description, img: item.image[0], pid: item.id, features: item.features, price: item.price, restImage: item.image, restItems: catValue, _id: item._id }} className='btn_orange selfLeft' >SEE PRODUCT</Link>
                        </div>
                    </motion.div>
                    :
                    <motion.div
                        initial={{ opacity: 0.5, x: +50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: 'linner' }}
                        className='pcCard boxRow pcCardReverse'
                        key={item.id}
                    >
                        <div className='w_50 boxColumn gap_2 p_3 pt_0 pb_0 left'>
                            {
                                item.isNew && <p className='text_orange_overLine w_100'>NEW PRODUCT</p>
                            }
                            <h1 className='text_h1 w_100'>{item.name}</h1>
                            <p className='opacity_50'>{item.description}</p>
                            <Link to={'/Product/' + item.name} replace={true} state={{ name: item.name, desc: item.description, img: item.image[0], pid: item.id, features: item.features, price: item.price, restImage: item.image, restItems: catValue, _id: item._id }} className='btn_orange selfLeft' >SEE PRODUCT</Link>
                        </div>
                        <img src={item.image[0]} alt={item.name} className='pImg' />
                    </motion.div>
            ))}
        </>
    )
}

const ProductCard = ({ category_value }) => {
    return (
        <section id="productCard" >
            <CardList cat={category_value} />
        </section>
    )
}

export default ProductCard
