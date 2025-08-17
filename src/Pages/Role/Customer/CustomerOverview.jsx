import React from 'react';
import useCurrentUser from '../../../Hooks/useCurrentUser';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import { FaMoneyCheckAlt, FaShieldAlt, FaUserEdit } from 'react-icons/fa';

const CustomerOverview = () => {
      const { user } = useCurrentUser();
  const AxiosSecure = useAxiosSecure();
// customer policy data
  const { data: myPolicies = [], isLoading } = useQuery({
    queryKey: ["myPolicies", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosSecure.get(
        `/applications/user?email=${user?.email}`
      );
      return res.data;
    },
  });
    if (isLoading) return <Loading />;
     const Card = ({ icon, iconBg, title, description, footer }) => (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
      <div className="flex items-start gap-5">
        <div className={`p-5 ${iconBg} text-white rounded-2xl shadow-md`}>
          {icon}
        </div>
        <div>
          <h4 className="text-xl font-semibold text-gray-900">{title}</h4>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      {footer && (
        <div className="mt-4 text-xs text-gray-400 border-t pt-2">{footer}</div>
      )}
    </div>
  );
    return (
        <div className='w-11/12 mx-auto'>
             
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            <Card
                              icon={<FaShieldAlt size={32} />}
                              iconBg="bg-gradient-to-tr from-blue-500 to-blue-300"
                              title={`${myPolicies.length} My Policies`}
                              description="Active insurance plans under your account."
                              footer="Last updated just now"
                            />
                            <Card
                              icon={<FaMoneyCheckAlt size={32} />}
                              iconBg="bg-gradient-to-tr from-green-500 to-green-300"
                              title="Payment History"
                              description="View all transactions and invoices in one place."
                              footer="Last payment: Aug 15, 2025"
                            />
                            <Card
                              icon={<FaUserEdit size={32} />}
                              iconBg="bg-gradient-to-tr from-yellow-500 to-yellow-300"
                              title="File a Claim"
                              description="Easily submit a claim for any of your active policies."
                              footer="Quick response within 48 hours"
                            />
                        </div>
                    
                     
            
        </div>
    );
};

export default CustomerOverview;