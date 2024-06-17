import React from 'react'
import { motion } from 'framer-motion'
import EARPHONES1 from '../assets/cart/EARPHONES.jpg'
import HEADPHONES3 from '../assets/cart/image-xx99-mark-two-headphones.jpg'
import SPEAKER2 from '../assets/cart/SPEAKER2.jpg'
import { useLocation } from 'react-router-dom'

const list = [
  { id: 1, img: EARPHONES1 },
  { id: 2, img: HEADPHONES3 },
  { id: 3, img: SPEAKER2 },
]
const ProductGallery = () => {
  let location = useLocation();
  return (
    <section id={'productGallery'}>
      {
        location.state.restImage ?
          location.state.restImage.map((item, key) => (
            <motion.img
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: key / 4 }}
              src={item}
              alt={item}
              className={`pgImg pgItem${item.id}`}
            />
          ))
          : list.map((item, key) => (
            <motion.img
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: key / 4 }}
              src={item.img}
              alt={item.img}
              className={`pgImg pgItem${item.id}`}
            />
          ))
      }
    </section>
  )
}

export default ProductGallery
