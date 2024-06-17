import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../redux/index.js';
import AuthContext from "./AuthContext.jsx";
import useVerifyProduct from "../hooks/useVerifyProduct.js";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [count, setCount] = useState(1);
  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const { authToken } = authContext;
  const { verifyOrder } = useVerifyProduct();
  const verify = verifyOrder();
  const [paymentSuccessfulProducts, setpaymentSuccessfulProducts] = useState([]);
  const [orderID, setorderID] = useState('');

  let foundProduct;
  let index;
  let counter = 1;

  const addToCart = async (product, count) => {
    const item = { product: product, count: count };
    counter = count;
    const findProduct = cartItems.find((item) => item.product.id === product.id);
    if (!findProduct) {
      cartItems.push(item);
      if (authToken === '' && localStorage.getItem('AudioAce_Token')) {
        dispatch(action.addItemToCart(product.id, product.name, product.img, product.desc, product.price, localStorage.getItem('AudioAce_Token')));
      }
      else if (authToken !== '' && localStorage.getItem('AudioAce_Token')) {
        dispatch(action.addItemToCart(product.id, product.name, product.img, product.desc, product.price, authToken));
      }
    }
    if (cartItems.length !== 0) {
      let total = 0
      cartItems.forEach((item) => {
        total += Number.parseInt(item.product.price) * item.count;
      });
      setTotalPrice(total);
    }
  };

  useEffect(() => {
    if (authToken === '' && localStorage.getItem('AudioAce_Token')) {
      dispatch(action.fetchCartItems(localStorage.getItem('AudioAce_Token')));
      if (cartItems.length === 0 && cartItem.length !== 0) {
        cartItem.forEach((i) => {
          const item = { product: i, count: counter };
          cartItems.push(item);
        })
      }
      if (cartItems.length !== 0) {
        let total = 0
        cartItems.forEach((item) => {
          total += Number.parseInt(item.product.price) * item.count;
        });
        setTotalPrice(total);
      }
    }
    else if (authToken !== '' && localStorage.getItem('AudioAce_Token')) {
      dispatch(action.fetchCartItems(authToken));
      if (cartItems.length === 0 && cartItem.length !== 0) {
        cartItem.forEach((i) => {
          const item = { product: i, count: counter };
          cartItems.push(item);
        })
      }
      if (cartItems.length !== 0) {
        let total = 0
        cartItems.forEach((item) => {
          total += Number.parseInt(item.product.price) * item.count;
        });
        setTotalPrice(total);
      }
    }
  });

  if (authToken !== '' && localStorage.getItem('AudioAce_Token')) {
    verify.then((res) => {
      console.log('verification',res);
      setTotalPrice(0);
      for (let i = 0; i < cartItems.length; i++) {
        dispatch(action.removeItemFromCart(cartItems[i].product._id, localStorage.getItem('AudioAce_Token')));
        paymentSuccessfulProducts.push(cartItems[i])
      }
      setCartItems([]);
    });
  }

  else if (authToken !== '' && localStorage.getItem('AudioAce_Token')) {
    verify.then((res) => {
      console.log('verification',res);
      setTotalPrice(0);
      for (let i = 0; i < cartItems.length; i++) {
        dispatch(action.removeItemFromCart(cartItems[i].product._id, authToken));
        paymentSuccessfulProducts.push(cartItems[i])
      }
      setCartItems([]);
    });
  }

  const onRemove = (product) => {
    if (authToken !== '' && localStorage.getItem('AudioAce_Token')) {
      foundProduct = cartItems.filter((item) => item.product.id !== product.id);
      const removedItem = cartItems.find((item) => item.product.id === product.id);
      dispatch(action.removeItemFromCart(product._id, authToken));
      if (totalPrice !== 0) {
        let total = 0;
        total = total + totalPrice - Number.parseInt(removedItem.product.price) * removedItem.count;
        setTotalPrice(total);
      }
      setCartItems(foundProduct);
    }
    else if (authToken !== '' && localStorage.getItem('AudioAce_Token')) {
      foundProduct = cartItems.filter((item) => item.product.id !== product.id);
      const removedItem = cartItems.find((item) => item.product.id === product.id);
      dispatch(action.removeItemFromCart(product._id, localStorage.getItem('AudioAce_Token')));
      if (totalPrice !== 0) {
        let total = 0;
        total = total + totalPrice - Number.parseInt(removedItem.product.price) * removedItem.count;
        setTotalPrice(total);
      }
      setCartItems(foundProduct);
    }
  };

  const toggleCartItemQuanitity = (id, value) => {
    if (value === 'inc') {
      incCount(id);
    }
    else {
      decCount(id);
    }
  };

  const incCount = (id) => {
    const findProduct = cartItems.filter((item) => item.product.id === id);
    index = cartItems.indexOf(findProduct[0]);
    findProduct[0].count = findProduct[0].count + 1;
    cartItems[index] = findProduct[0];
    setCount(count + 1);
    let total = (totalPrice + Number.parseInt(findProduct[0].product.price));
    setTotalPrice(total);
  };

  const decCount = (id) => {
    const findProduct = cartItems.filter((item) => item.product.id === id);
    index = cartItems.indexOf(findProduct[0]);
    if (findProduct[0].count > 1) {
      findProduct[0].count = findProduct[0].count - 1;
      cartItems[index] = findProduct[0];
      setCount(count - 1);
      if (findProduct[0].product.price < totalPrice) {
        let total = totalPrice - (findProduct[0].product.price);
        setTotalPrice(total);
      }
    }

  };




  return (
    <CartContext.Provider
      value={{
        cartItems,
        count,
        totalCount,
        totalPrice,
        addToCart,
        onRemove,
        toggleCartItemQuanitity,
        incCount,
        decCount,
        paymentSuccessfulProducts,
        orderID,
        setorderID,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);