import React from 'react';
import Nav from '../../component/Nav';
import HeaderBody from '../../component/HeaderBody';
import SiginDesign from '../../component/SiginDesign';
import Footer from '../../component/Footer';

const Sigin = () => {
    return (
        <div>
            <Nav />
            <HeaderBody />
            <div className='pl_5 pr_5 p_5'>
                <SiginDesign />
            </div>
            <Footer />
        </div>
    )
}

export default Sigin;
