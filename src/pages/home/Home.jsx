import React from 'react';
import Banner from './Banner';
import Footer from './Footer';
import PopularClass from './PopularClass';
import PopularInstructor from './PopularInstructor';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <PopularClass></PopularClass>
            <PopularInstructor></PopularInstructor>
            <Footer></Footer>
        </>
    );
};

export default Home;