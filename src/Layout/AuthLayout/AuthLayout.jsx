import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className=' bg-primary min-h-screen'>
            <div className='py-20'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;