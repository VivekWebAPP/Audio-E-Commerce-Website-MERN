import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home'
import HeadPhones from './pages/headphones/HeadPhones'
import Speakers from './pages/speakers/Speakers'
import EarPhones from './pages/earphones/EarPhones'
import Product from './pages/prodact/Product'
import Cart from './pages/cart/Cart'
import Page404 from './pages/page404/Page404'
import Sigin from './pages/sigin/Sigin';
import Login from './pages/login/Login';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Payment from './pages/Payment/Payment';
import PaymentComplete from './pages/payment complete/PaymentComplete';

export default function App() {
  const context = useContext(AuthContext);
  const { authToken } = context;
  let auth;
  if (authToken === '' && localStorage.getItem('AudioAce_Token')) {
    auth = localStorage.getItem('AudioAce_Token');
  }
  else if (authToken !== '' && localStorage.getItem('AudioAce_Token')) {
    auth = authToken;
  }
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/HeadPhones' element={<HeadPhones />} />
      <Route path='/Speakers' element={<Speakers />} />
      <Route path='/EarPhones' element={<EarPhones />} />
      <Route path='/Product/:name' element={<Product />} />
      <Route path='/Sigin' element={auth ? <Login /> : <Sigin />} />
      <Route path='/Login' element={auth ? <Home /> : <Login />} />
      <Route path='/Cart' element={auth ? <Cart /> : <Login />} />
      <Route path='/Payment' element={auth ? <Payment /> : <Login />} />
      <Route path='/PaymentSuccess' element={auth ? <PaymentComplete /> : <Login />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  )
}
