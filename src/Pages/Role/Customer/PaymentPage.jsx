import React from 'react';
import { useLocation } from 'react-router';
import { CiCircleInfo } from "react-icons/ci";
import useTitle from '../../../Hooks/useTitle';
import useAuthContext from '../../../Hooks/useAuthContext';

const PaymentPage = () => {
  useTitle("PaymentPage");

  const location = useLocation();
  const { policyTitle, amount } = location.state || {};
  const { user } = useAuthContext();

  return (
    <div className='w-11/12 mx-auto min-h-screen py-10'>
      <div className='p-6 shadow-md rounded-md bg-white w-full max-w-3xl mx-auto'>
        <h1 className='bg-primary text-white rounded-md p-2 mb-6 w-fit flex items-center gap-2'>
          <CiCircleInfo className="text-xl" /> You are paying for: <span className="font-semibold">{policyTitle}</span>
        </h1>

        {/* Info Summary */}
        <div className='grid md:grid-cols-2 gap-6 mb-10'>
          <div>
            <label className='font-semibold'>Full Name</label>
            <input
              type="text"
              className='input input-bordered w-full'
              value={user?.displayName || ""}
              readOnly
            />
          </div>
          <div>
            <label className='font-semibold'>Email Address</label>
            <input
              type="email"
              className='input input-bordered w-full'
              value={user?.email || ""}
              readOnly
            />
          </div>
          <div>
            <label className='font-semibold'>Policy Title</label>
            <input
              type="text"
              className='input input-bordered w-full'
              value={policyTitle}
              readOnly
            />
          </div>
          <div>
            <label className='font-semibold'>Amount (৳)</label>
            <input
              type="text"
              className='input input-bordered w-full'
              value={amount?.toLocaleString()}
              readOnly
            />
          </div>
        </div>

        {/* Stripe Payment Form Placeholder */}
        <div className='mt-6'>
          <h2 className='text-lg font-semibold mb-2'>💳 Enter Payment Details</h2>
          <div className='border border-dashed border-gray-300 p-6 rounded-md bg-gray-50'>
            {/* You will replace this with your Stripe form */}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
