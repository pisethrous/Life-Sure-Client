import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    return (
          <div>
     <div className="flex w-full flex-col">
  
  <div className="divider">OR</div>

</div>
      <button  className="btn btn-info w-full">
        {" "}
        <FcGoogle /> Continue with Google
      </button>
    </div>
    );
};

export default SocialLogin;