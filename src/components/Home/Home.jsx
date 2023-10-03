import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className='max-w-screen-xl mx-auto'>
            <Helmet>
                <title>Registration form/Home</title>
            </Helmet>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;