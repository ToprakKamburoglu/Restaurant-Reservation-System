import React from 'react';
import Navigation from '../../../Shared/Promotion/Navigation';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Footer from '../../../Shared/Promotion/Footer';

const Home = () => {
    return (
        <>
            <Navigation />
            <div className='content'>
                <Section1 />
                <Section2 />
                <Section3 />
            </div>
            <Footer />
        </>
    );
};

export default Home;