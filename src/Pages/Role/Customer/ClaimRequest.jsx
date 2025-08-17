import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuthContext from "../../../Hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import uploadImageToImgbb from "../../../Hooks/uploadImageToImgbb";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";
import empty from "../../../assets/emptyClaim.png"; // fallback illustration

const ClaimRequest = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: allApplications = [], isLoading } = useQuery({
    queryKey: ["active-application", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/active-application?email=${user.email}`);
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
        toast.error("❌ Document upload failed. Try again.");
        setUploading(false);
        return;
      }
    }

    const selected = allApplications.find((app) => app._id === data.policyId);
    const claimData = {
      email: user.email,
      policyId: selected._id,
      policyTitle: selected.policyTitle || selected.policy_name,
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
      setIsSubmitted(true);
    } else {
      toast.error("⚠️ Failed to submit claim. Try again.");
    }
  };

  if (isLoading) return <Loading />;

  if (allApplications.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-white shadow rounded-2xl text-center mt-16">
        <img src={empty} alt="No policies" className="w-56 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Submit Claim Request</h2>
        <p className="text-red-600">🚫 You have no active policies to claim.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* 🖼️ Illustration (replace with Storyset insurance claim) */}
        <div className="flex justify-center mb-6">
          <img
            src="https://i.ibb.co.com/dJc7WP4s/Attached-files-pana.png" 
            alt="Claim Illustration"
            className="w-60"
          />
        </div>

        <h2 className="text-2xl lg:text-3xl  font-bold mb-6 text-center text-primary">
          Submit Your Claim Request
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Select Policy */}
          <div>
            <label className="block mb-1 font-medium">Select Policy</label>
            <select
              {...register("policyId", { required: true })}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            >
              <option value="">-- Select Active Policy --</option>
              {allApplications.map((app) => (
                <option key={app._id} value={app._id}>
                  {app.policyTitle || app.policy_name}
                </option>
              ))}
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block mb-1 font-medium">Reason for Claim</label>
            <textarea
              {...register("reason", { required: true })}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              rows={4}
              placeholder="Explain your reason clearly..."
            />
          </div>

          {/* Document */}
          <div>
            <label className="block mb-1 font-medium">
              Upload Document (optional)
            </label>
            <input
              type="file"
              {...register("document")}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
            />
            <p className="text-sm text-gray-500 mt-1">
              e.g. Death certificate, retirement documents, birth certificate
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={uploading || isSubmitted}
           className="w-full   px-3 py-2 text-sm font-medium bg-primary text-secondary hover:text-primary hover:border hover:border-primary rounded-md hover:bg-transparent
             transition-all duration-300"
          >
            {uploading ? "Submitting..." : isSubmitted ? "Submitted ✅" : "Submit Claim"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClaimRequest;
