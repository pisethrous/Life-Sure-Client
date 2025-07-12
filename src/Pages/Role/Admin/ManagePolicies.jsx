import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import AddPolicyForm from "./AddPolicyForm";


const ManagePolicies = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: policies = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/policies");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Policies</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          ➕ Add New Policy
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Min-Max Age</th>
              <th>Base Premium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr key={policy._id}>
                <td>{index + 1}</td>
                <td>{policy.title}</td>
                <td>{policy.category}</td>
                <td>{policy.minAge} - {policy.maxAge}</td>
                <td>${policy.basePremium}</td>
                <td>
                  <button className="btn btn-xs btn-outline mr-2">Edit</button>
                  <button className="btn btn-xs btn-error text-white">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
        
            <AddPolicyForm
              onClose={() => setIsModalOpen(false)}
              refetch={refetch}
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ManagePolicies;
