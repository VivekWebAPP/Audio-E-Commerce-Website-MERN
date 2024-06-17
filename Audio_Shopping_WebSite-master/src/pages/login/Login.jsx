import React from 'react'
import HeaderBody from '../../component/HeaderBody'
import Footer from '../../component/Footer'
import Nav from '../../component/Nav'
import LoginDesign from '../../component/LoginDesign'


const Login = () => {
    return (
        <div>
            <Nav />
            <HeaderBody />
            <div className='pl_5 pr_5 p_5'>
                <LoginDesign />
            </div>
            <Footer />
        </div>
    )
}

export default Login
