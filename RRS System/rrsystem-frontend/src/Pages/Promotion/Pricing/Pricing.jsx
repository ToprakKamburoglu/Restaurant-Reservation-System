import React from 'react';
import Header from "../../../Shared/Promotion/Navigation.jsx";
import Footer from "../../../Shared/Promotion/Footer.jsx";

import Section4 from './Section4.jsx';
import Section5 from './Section5.jsx';

const Pricing = () => {
    return (
        <>
            <Header/>
                <div className='content'>
                    <Section4/>
                    <Section5/>

                </div>

            <Footer/>
        </>
    );
};

export default Pricing;