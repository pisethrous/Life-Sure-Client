import React from "react";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuthContext from "../../../Hooks/useAuthContext";
import Loading from "../../../Components/Loading/Loading";
import useTitle from "../../../Hooks/useTitle";

const AssignedCustomers = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const now = new Date();
  const dueDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  useTitle("Assigned-customer");
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-customers", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/agent/${user.email}`);
      return res.data;
    },
  });

  const handleStatusChange = async (id, newStatus, policyId) => {
    try {
      await axiosSecure.patch(`/applications/status/${id}`, {
        status: newStatus,
        policyId,
        dueDate,
      });
      Swal.fire("Success", "Status updated", "success");
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Could not update status", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Assigned Customers</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Policy</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, idx) => (
              <tr key={app._id}>
                <td>{idx + 1}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.policyTitle}</td>
                <td>
                  <select
                    className="select select-bordered select-sm"
                    value={app.status}
                    disabled={app.status !== "pending"}
                    onChange={(e) =>
                      handleStatusChange(
                        app._id,
                        e.target.value,
                        app.policyId
                      )
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>{new Date(app.submittedAt).toLocaleDateString()}</td>
                <td>
                  {/* View Details can be route or modal */}
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() =>
                      Swal.fire({
                        title: "Customer Info",
                        html: `
                          <p><b>Name:</b> ${app.name}</p>
                          <p><b>Email:</b> ${app.email}</p>
                          <p><b>Phone:</b> ${app.phone}</p>
                          <p><b>Address:</b> ${app.address}</p>
                          <p><b>Nominee:</b> ${app.nomineeName}</p>
                          <p><b>Relationship:</b> ${
                            app.relationship?.label || "N/A"
                          }</p>
                        `,
                      })
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedCustomers;
