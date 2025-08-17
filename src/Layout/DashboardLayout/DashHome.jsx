// src/Pages/Dashboard/DashHome.jsx
import React from "react";
import useCurrentUser from "../../Hooks/useCurrentUser";
import {
  FaMoneyCheckAlt,
  FaUserEdit,
  FaUserCheck,
  FaUsers,
  FaBlog,
  FaShieldAlt,
} from "react-icons/fa";
import { MdSettingsApplications } from "react-icons/md";
import { TbTransactionDollar } from "react-icons/tb";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import TransactionsChart from "../../Pages/Role/Customer/TransactionsChart";
import CustomerOverview from "../../Pages/Role/Customer/CustomerOverview";

const DashHome = () => {
  const { user } = useCurrentUser();
//   const AxiosSecure = useAxiosSecure();
// // customer policy data
//   const { data: myPolicies = [], isLoading } = useQuery({
//     queryKey: ["myPolicies", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await AxiosSecure.get(
//         `/applications/user?email=${user?.email}`
//       );
//       return res.data;
//     },
//   });





  // 🛠️ A helper to render cards with consistent design
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
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">
        👋 Welcome back, {user.name || "User"}!
      </h2>

      {/* ✅ Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 👉 Customer Dash Summary */}
   

        {/* 👉 Agent Dash Summary */}
        {user.role === "agent" && (
          <>
            <Card
              icon={<FaUserCheck size={32} />}
              iconBg="bg-gradient-to-tr from-purple-500 to-purple-300"
              title="Assigned Customers"
              description="View and manage your assigned clients."
            />
            <Card
              icon={<FaBlog size={32} />}
              iconBg="bg-gradient-to-tr from-pink-500 to-pink-300"
              title="Write Blogs"
              description="Share your expertise by publishing helpful articles."
            />
          </>
        )}

        {/* 👉 Admin Dash Summary */}
        {user.role === "admin" && (
          <>
            <Card
              icon={<FaUsers size={32} />}
              iconBg="bg-gradient-to-tr from-indigo-500 to-indigo-300"
              title="Manage Users"
              description="Control platform users and assign roles."
            />
            <Card
              icon={<MdSettingsApplications size={32} />}
              iconBg="bg-gradient-to-tr from-orange-500 to-orange-300"
              title="Manage Applications"
              description="Approve or reject customer applications."
            />
            <Card
              icon={<TbTransactionDollar size={32} />}
              iconBg="bg-gradient-to-tr from-teal-500 to-teal-300"
              title="Manage Transactions"
              description="Track and monitor all payment activity."
            />
          </>
        )}
      </div>
      {user.role === "customer" && (
         <div>
           <CustomerOverview></CustomerOverview>
           
             <TransactionsChart  />
         </div>
)}
    </div>
  );
};

export default DashHome;
