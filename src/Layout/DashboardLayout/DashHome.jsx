// src/Pages/Dashboard/DashHome.jsx

import React from "react";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { FaBoxOpen, FaMoneyCheckAlt, FaUserEdit, FaUserCheck, FaUsers, FaBlog, FaShieldAlt } from "react-icons/fa";
import { MdOutlineManageAccounts, MdSettingsApplications } from "react-icons/md";
import { TbTransactionDollar } from "react-icons/tb";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const DashHome = () => {
  const { user } = useCurrentUser();
const AxiosSecure = useAxiosSecure();
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
  

  if (isLoading) return <Loading></Loading>

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">👋 Welcome back, {user.name || "User"}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 👉 Customer Dash Summary */}
        {user.role === "customer" && (
          <>
 <div className="stat bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-transform duration-300 hover:scale-105">
      <div className="flex items-center gap-5">
        {/* Icon with gradient background */}
        <div className="p-5 bg-gradient-to-tr from-blue-500 to-blue-300 text-white rounded-2xl shadow-md">
          <FaShieldAlt size={32} />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900">
            {myPolicies.length}
          </h2>
          <p className="text-gray-700 font-medium text-base">My Policies</p>
          <p className="text-gray-500 text-sm">
            Active insurance plans under your account
          </p>
        </div>
      </div>

      {/* Optional Footer */}
      <div className="mt-4 text-xs text-gray-400 border-t pt-2">
        Last updated just now
      </div>
    </div>
            <div className="card bg-base-200 p-4 shadow">
              <FaMoneyCheckAlt className="text-3xl mb-2 text-success" />
              <h4 className="font-bold text-lg">Payment History</h4>
              <p>Check your transactions and invoices.</p>
            </div>
            <div className="card bg-base-200 p-4 shadow">
              <FaUserEdit className="text-3xl mb-2 text-warning" />
              <h4 className="font-bold text-lg">File a Claim</h4>
              <p>Submit a claim for a policy you’ve purchased.</p>
            </div>
          </>
        )}

        {/* 👉 Agent Dash Summary */}
        {user.role === "agent" && (
          <>
            <div className="card bg-base-200 p-4 shadow">
              <FaUserCheck className="text-3xl mb-2 text-primary" />
              <h4 className="font-bold text-lg">Assigned Customers</h4>
              <p>View and manage your assigned clients.</p>
            </div>
            <div className="card bg-base-200 p-4 shadow">
              <FaBlog className="text-3xl mb-2 text-secondary" />
              <h4 className="font-bold text-lg">Write Blogs</h4>
              <p>Share your expertise by publishing articles.</p>
            </div>
          </>
        )}

        {/* 👉 Admin Dash Summary */}
        {user.role === "admin" && (
          <>
            <div className="card bg-base-200 p-4 shadow">
              <FaUsers className="text-3xl mb-2 text-primary" />
              <h4 className="font-bold text-lg">Manage Users</h4>
              <p>Control platform users and roles.</p>
            </div>
            <div className="card bg-base-200 p-4 shadow">
              <MdSettingsApplications className="text-3xl mb-2 text-warning" />
              <h4 className="font-bold text-lg">Manage Applications</h4>
              <p>Approve or reject user applications.</p>
            </div>
            <div className="card bg-base-200 p-4 shadow">
              <TbTransactionDollar className="text-3xl mb-2 text-success" />
              <h4 className="font-bold text-lg">Manage Transactions</h4>
              <p>Track all payment activity.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashHome;
