import React, { useContext } from 'react';
import { Context } from '../Context/AuthProvider/Context';

const useAuthContext = () => {
    const AuthContext = useContext(Context);
    return AuthContext
      
};

export default useAuthContext;