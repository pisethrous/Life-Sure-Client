import Lottie from 'lottie-react';
import React from 'react';
import Error from "../../assets/Lottie/Error.json"
import GoBack from '../../Components/Back/GoBack';
import { useLocation } from 'react-router';
const ErrorPage = () => {
const {pathname} = useLocation();
const Exact =  pathname.split('/')[1];

    return (
        <div className='flex flex-col items-center justify-center space-y-2'>
             <Lottie animationData={Error} width={550} loop={true} />
             <h1 className='text-2xl'> ❌ Oops! No match found for: {Exact} </h1>
             <GoBack></GoBack>
        </div>
    );
};

export default ErrorPage;