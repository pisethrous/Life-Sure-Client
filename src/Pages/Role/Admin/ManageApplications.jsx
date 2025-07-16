import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState({}); // Track agent per row

  // Fetch applications
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  // Fetch agents
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const agents = users.filter(user => user.role === "agent");
  
  if (isLoading) return <Loading />;

  const handleAssignAgent = async (appId, agentEmail) => {
    try {
      const res = await axiosSecure.patch(`/applications/${appId}/assign-agent`, {
        agentEmail,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Agent assigned successfully", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to assign agent", "error");
    }
  };

  const handleReject = async (appId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/applications/${appId}/reject`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Rejected!", "The application has been rejected.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-accent">
        Manage Applications
      </h1>

      {/* Table */}
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
                <td className="space-y-1 text-center">
                  <button
                    className="btn btn-xs btn-outline btn-secondary w-full"
                    onClick={() => setSelectedApp(app)}
                  >
                    View Details
                  </button>

                  {/* Agent Select */}
                  <select
                    className="select select-sm select-bordered w-full"
                    value={selectedAgents[app._id] || ""}
                    onChange={(e) =>
                      setSelectedAgents({
                        ...selectedAgents,
                        [app._id]: e.target.value,
                      })
                    }
                  >
                    <option value="">Assign Agent</option>
                    {agents?.map((agent) => (
                      <option key={agent.email} value={agent.email}>
                        {agent.name}
                      </option>
                    ))}
                  </select>

                  <button
                    disabled={!selectedAgents[app._id]}
                    className="btn btn-xs btn-primary w-full"
                    onClick={() =>
                      handleAssignAgent(app._id, selectedAgents[app._id])
                    }
                  >
                    Confirm Assign
                  </button>

                  {/* Reject */}
                  <button
                    className="btn btn-xs btn-error w-full"
                    onClick={() => handleReject(app._id)}
                  >
                    Reject
                  </button>
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
