import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import useTitle from "../../../Hooks/useTitle";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  useTitle("ManageUsers");
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `This will change the user's role to ${newRole}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, change role`,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
        await refetch();
        Swal.fire("Success!", "User role updated successfully.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to update user role.", "error");
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete user",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/users/${userId}`);
        await refetch();
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Registered At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{idx + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.registerAt).toLocaleString()}</td>
              <td className="space-x-2">
                {user.role !== "admin" && (
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => handleRoleChange(user._id, "admin")}
                  >
                    Make Admin
                  </button>
                )}

                {user.role === "customer" && (
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleRoleChange(user._id, "agent")}
                  >
                    Promote to Agent
                  </button>
                )}

                {user.role === "agent" && (
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => handleRoleChange(user._id, "customer")}
                  >
                    Demote to Customer
                  </button>
                )}

                <button
                  className="btn btn-xs btn-error text-white"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
