import React from 'react';


import { Navigate, useLocation } from 'react-router';
import useAuthContext from '../Hooks/useAuthContext';
import Loading from '../Components/Loading/Loading';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user,loading} = useAuthContext();

   if (loading) return <Loading></Loading>
   if(user) return children;
   else{
    return <Navigate state={location.pathname} to={'/auth/login'} replace></Navigate>
   }
};

export default PrivateRoute;