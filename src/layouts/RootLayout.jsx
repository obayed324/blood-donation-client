import React from 'react';
import Navbar from '../pages/HomePage/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/HomePage/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
           <Navbar></Navbar>
           <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default RootLayout;