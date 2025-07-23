import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useTitle from "../../../Hooks/useTitle";

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();
useTitle("ManageTransTransactions");
  const { data: transactions = [], isLoading, error } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment-history");
      return res.data;
    },
  });

  // Group earnings by date (simple daily total)
  const earningsByDate = useMemo(() => {
    const totals = {};
    transactions.forEach((trx) => {
      const dateKey = new Date(trx.paidAt).toLocaleDateString();
      totals[dateKey] = (totals[dateKey] || 0) + trx.amount; // assuming amount is in BDT cents
    });
    return Object.entries(totals)
      .map(([date, amount]) => ({ date, amount: Number(amount.toFixed(2)) }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [transactions]);

  if (isLoading) return <Loading />;
  if (error) return <div className="p-4 text-red-600">Failed to load payments.</div>;

  // Calculate total income
  const totalIncome = transactions.reduce((sum, t) => sum + t.amount , 0).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">💳 Manage Transactions</h1>

      {/* Filter Buttons (non-functional placeholders) */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button className="btn btn-outline btn-sm">Filter by Date</button>
        <button className="btn btn-outline btn-sm">Filter by User</button>
        <button className="btn btn-outline btn-sm">Filter by Policy</button>
      </div>

      {/* Total Income */}
      <div className="mb-6 text-xl font-semibold">
        Total Income: <span className="text-green-600">৳ {totalIncome} BDT</span>
      </div>

      {/* Earnings Chart */}
      <div className="mb-10 h-72 bg-white rounded shadow p-4">
        <h2 className="mb-3 font-semibold">Earnings Over Time</h2>
        {earningsByDate.length === 0 ? (
          <p>No earnings data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={earningsByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white rounded shadow p-4">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>User Email</th>
              <th>Policy Name</th>
              <th>Paid Amount (BDT)</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((trx) => (
                <tr key={trx._id}>
                  <td>{trx.TransitionId}</td>
                  <td>{trx.userEmail}</td>
                  <td>{trx.policyTitle}</td>
                  <td>৳ {(trx.amount ).toFixed(2)}</td>
                  <td>{new Date(trx.paidAt).toLocaleDateString()}</td>
                  <td>
                    {trx.status === "success" ? (
                      <span className="badge badge-success">Success</span>
                    ) : (
                      <span className="badge badge-error">Failed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTransactions;
