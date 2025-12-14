import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/HomePage/Navbar/Navbar';
import Footer from '../pages/HomePage/Footer/Footer';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;