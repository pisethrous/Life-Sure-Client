import React from 'react';
import { useNavigate } from 'react-router';

const GoBack = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={()=>navigate('/')} className="  text-sm font-medium bg-primary text-secondary hover:text-primary hover:border hover:border-primary rounded-md hover:bg-transparent
             transition-all duration-300">Back to Home</button>
        </div>
    );
};

export default GoBack;