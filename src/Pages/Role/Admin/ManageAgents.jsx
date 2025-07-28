import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

import noPending from "../../../assets/noPending.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ManageAgents = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: pendingApplications = [],
    isLoading: loadingPending,
  } = useQuery({
    queryKey: ["pending-agent-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agent-applications/pending");
      return res.data;
    },
  });

  const {
    data: allAgents = [],
    isLoading: loadingAgents,
  } = useQuery({
    queryKey: ["all-agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
    const agents = allAgents.filter((user) => user.role === "agent");

  const handleApprove = async (application) => {
    const { email } = application;
    console.log(application);
    try {
      await axiosSecure.patch(`/users/promote/${email}`, { role: "agent" });
      await axiosSecure.patch(`/agent-applications/approve/${email}`,{status:"approve"});
      Swal.fire("Success", "User promoted to Agent", "success");
      queryClient.invalidateQueries(["pending-agent-applications"]);
      queryClient.invalidateQueries(["all-agents"]);
    } catch {
      Swal.fire("Error", "Could not promote user", "error");
    }
  };

  const handleReject = async (id) => {
    const { value: feedback } = await Swal.fire({
      title: "Reject Application",
      input: "textarea",
      inputLabel: "Feedback",
      inputPlaceholder: "Provide rejection reason...",
      showCancelButton: true,
    });

    if (feedback) {
      try {
        await axiosSecure.patch(`/agent-applications/reject/${id}`, { feedback });
        Swal.fire("Rejected", "Application has been rejected", "info");
        queryClient.invalidateQueries(["pending-agent-applications"]);
      } catch {
        Swal.fire("Error", "Could not reject application", "error");
      }
    }
  };

  const handleDemote = async (id) => {
    try {
       await axiosSecure.patch(`/users/${id}/role`, { role: "customer" });
      Swal.fire("Demoted", "Agent has been demoted to customer", "info");
      queryClient.invalidateQueries(["all-agents"]);
    } catch {
      Swal.fire("Error", "Could not demote user", "error");
    }
  };

  return (
    <div className="p-6">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm font-medium leading-5 text-blue-700",
                "rounded-lg",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Pending Applications
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm font-medium leading-5 text-blue-700",
                "rounded-lg",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            All Agents
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            {loadingPending ? (
              <Loading/>
            ) : pendingApplications.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl">No pending applications.</p>
              <img src={noPending} width={450} alt="" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full border">
                  <thead>
                    <tr className="bg-blue-100 text-left">
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Message</th>
                      <th>Applied At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApplications.map((app) => (
                      <tr key={app._id} className="border-b">
                        <td>{app.name}</td>
                        <td>{app.email}</td>
                        <td>{app.phone}</td>
                        <td>{app.address}</td>
                        <td>{app.message}</td>
                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td className="space-x-2">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleApprove(app)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-error"
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
            )}
          </Tab.Panel>

          <Tab.Panel>
            {loadingAgents ? (
              <Loading />
            ) : agents.length === 0 ? (
              <p>No agents found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full border">
                  <thead>
                    <tr className="bg-green-100 text-left">
                      <th>Name</th>
                      <th>Email</th>
                      <th>Registered At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent) => (
                      <tr key={agent._id} className="border-b">
                        <td>{agent.name}</td>
                        <td>{agent.email}</td>
                        <td>{new Date(agent.registerAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleDemote(agent._id)}
                          >
                            Demote to Customer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ManageAgents;
