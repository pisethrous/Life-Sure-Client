// src/Pages/Dashboard/DashHome.jsx

import React from "react";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { FaBoxOpen, FaMoneyCheckAlt, FaUserEdit, FaUserCheck, FaUsers, FaBlog } from "react-icons/fa";
import { MdOutlineManageAccounts, MdSettingsApplications } from "react-icons/md";
import { TbTransactionDollar } from "react-icons/tb";

const DashHome = () => {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">👋 Welcome back, {user.name || "User"}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 👉 Customer Dash Summary */}
        {user.role === "customer" && (
          <>
            <div className="card bg-base-200 p-4 shadow">
              <FaBoxOpen className="text-3xl mb-2 text-primary" />
              <h4 className="font-bold text-lg">My Policies</h4>
              <p>View your purchased insurance policies.</p>
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
