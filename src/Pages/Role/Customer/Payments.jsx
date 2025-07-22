import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useTitle from "../../../Hooks/useTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuthContext from "../../../Hooks/useAuthContext";
import Loading from "../../../Components/Loading/Loading";


const Payments = () => {
  useTitle("paymentStatus");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["approvedApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/user?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
const approvedApplications = (applications || []).filter(app => app.status === "approved");


  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">💳 Payment Status</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Policy Title</th>
              <th>Payment Amount</th>
              <th>Frequency</th>
              <th>Status</th>
              <th>Due/Paid Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {approvedApplications.map((app, index) => {
              const frequency = app.paymentFrequency || "monthly";
              const amount =
                frequency === "monthly"
                  ? app.quoteData?.monthlyPremium
                  : app.quoteData?.annualPremium;

              const isPaid = app.paymentStatus === "paid";
              const date = new Date(app.dueDate).toLocaleDateString();

              return (
                <tr key={app._id} className="hover">
                  <td>{index + 1}</td>
                  <td>{app.policyTitle}</td>
                  <td>৳ {amount?.toLocaleString()}</td>
                  <td className="capitalize">{frequency}</td>
                  <td className={isPaid ? "badge badge-success mt-4 " : "badge badge-error mt-4"}>
                    {app.paymentStatus}
                  </td>
                 
                  {
                    isPaid? <td>lastPaid: {date}</td>: <td>Due: {date}</td>
                  }
                  <td>
                    <Link state={{ policyTitle: app.policyTitle, amount: amount }} to={`/dashboard/customer/pay/${app._id} ` }>
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={isPaid}
                      >
                        Make Payment
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
