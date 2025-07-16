import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-accent">
        Manage Applications
      </h1>

      {/* Responsive Scrollable Table */}
      <div className="w-full overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra min-w-[1000px] text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Applicant</th>
              <th>Email</th>
              <th>Policy</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, idx) => (
              <tr key={app._id}>
                <td>{idx + 1}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.policy_name}</td>
                <td>{format(new Date(app.submittedAt), "PPP")}</td>
                <td>
                  <span
                    className={`badge ${
                      app.status === "pending"
                        ? "badge-warning"
                        : app.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="space-x-1 text-center">
                  <button
                    className="btn btn-xs btn-outline btn-secondary"
                    onClick={() => setSelectedApp(app)}
                  >
                    View Details
                  </button>
                  <button className="btn btn-xs btn-primary">Assign Agent</button>
                  <button className="btn btn-xs btn-error">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Application Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4">Application Details</h2>
            <p><strong>Name:</strong> {selectedApp.name}</p>
            <p><strong>Email:</strong> {selectedApp.email}</p>
            <p><strong>Phone:</strong> {selectedApp.phone}</p>
            <p><strong>DOB:</strong> {selectedApp.dob}</p>
            <p><strong>Address:</strong> {selectedApp.address}</p>
            <p><strong>NID:</strong> {selectedApp.nid}</p>
            <p><strong>Policy:</strong> {selectedApp.policy_name}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>
            <hr className="my-2" />
            <p><strong>Nominee:</strong> {selectedApp.nomineeName} ({selectedApp.relationship?.label})</p>
            <p><strong>Nominee NID:</strong> {selectedApp.nomineeNid}</p>
            <p className="mt-2"><strong>Health Issues:</strong></p>
            <ul className="list-disc list-inside text-sm">
              {selectedApp.health &&
                Object.entries(selectedApp.health).map(
                  ([condition, value]) =>
                    value && <li key={condition}>{condition}</li>
                )}
            </ul>

            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-sm"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
