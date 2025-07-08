import React from 'react';
import { useNavigate } from 'react-router';

const GoBack = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={()=>navigate('/')} className='btn btn-secondary text-white  hover:scale-110 hover:duration-150 transition-all '>Back to Home</button>
        </div>
    );
};

export default GoBack;