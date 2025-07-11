import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center mt-20'>
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-white"></div>  
        </div>
    );
};

export default Loading;