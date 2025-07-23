import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuthContext from "../../../Hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import uploadImageToImgbb from "../../../Hooks/uploadImageToImgbb"; // ✅ Correct import
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";

const ClaimRequest = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const { data: allApplications = [], isLoading } = useQuery({
    queryKey: ["active-application", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/active-application?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setUploading(true);

    let documentURL = null;
    if (data.document?.[0]) {
      try {
        documentURL = await uploadImageToImgbb(data.document[0]);
      } catch (error) {
        alert("❌ Document upload failed. Try again.");
        setUploading(false);
        return;
      }
    }

    const selected = allApplications.find((app) => app._id === data.policyId);
    const claimData = {
      email: user.email,
      policyId: selected._id,
      policyTitle: selected.policy_name,
      reason: data.reason,
      documentURL,
      claimStatus: "pending",
      submittedAt: new Date(),
    };

 const res = await axiosSecure.post("/claims", claimData);
    setUploading(false);
    reset();
    if (res.data?.insertedId) {
      toast.success("✅ Claim submitted!");
    } else {
      toast.error("⚠️ Failed to submit claim. Try again.");
    }
  };

  if (isLoading) return <Loading></Loading>;

  if (allApplications.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-4 bg-white shadow rounded text-center mt-16">
        <h2 className="text-xl font-semibold mb-2">Submit Claim Request</h2>
        <p className="text-red-600">🚫 You have no active policies to claim.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow rounded mt-16">
      <h2 className="text-xl font-semibold mb-4">Submit Claim Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select Policy</label>
          <select
            {...register("policyId", { required: true })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Active Policy --</option>
            {Array.isArray(allApplications) && allApplications.length > 0 ? (
              allApplications.map((app) => (
                <option key={app._id} value={app._id}>
                  {app.policyTitle}
                </option>
              ))
            ) : (
              <option disabled>No active policies available</option>
            )}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Reason for Claim</label>
          <textarea
            {...register("reason", { required: true })}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            placeholder="Explain your reason clearly..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Upload Document (optional)
          </label>
          <input
            type="file"
            {...register("document")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <p className="text-sm opacity-50">eg:death certificate,retirement documents,birth certificate</p>

        <button
          type="submit"
          disabled={uploading}
          className="bg-secondary w-full text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {uploading ? "Submitting..." : "Submit Claim"}
        </button>
      </form>
    </div>
  );
};

export default ClaimRequest;
