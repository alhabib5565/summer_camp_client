import React from 'react';
import Navbar from '../pages/home/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Navbar></Navbar>
           <div className='max-w-7xl mx-auto p-4'><Outlet></Outlet></div>
        </>
    );
};

export default Layout;