import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link className='flex items-center gap-2'  to={'/'}>
            <img className='w-12 h-12 ' src="/fav.png" alt="" />
            <h1 className='text-secondary text-2xl font-semibold'>Life<span className='text-accent'>Sure</span> </h1>
        </Link>
    );
};

export default Logo;