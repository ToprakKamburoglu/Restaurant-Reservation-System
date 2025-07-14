import React from 'react';
import Header from "../../../Shared/Promotion/Navigation.jsx";
import Footer from "../../../Shared/Promotion/Footer.jsx";

import Section6 from './Section6.jsx';
import Section7 from './Section7.jsx';

const Features = () => {
    return (
        <>
            <Header/>
                <div className='content'>
                    <Section6/>
                    <Section7/>
                </div>
            <Footer/>
        </>
        
    );
};

export default Features;