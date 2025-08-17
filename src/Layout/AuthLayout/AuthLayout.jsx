import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='  '>
            <div className=''>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;