import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import useAuthContext from "../../../Hooks/useAuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const MyPolicies = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [reviewPolicy, setReviewPolicy] = useState(null);

  const { data: myPolicies = [], isLoading } = useQuery({
    queryKey: ["myPolicies", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/user?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleDownloadPDF = (policy) => {
    const doc = new jsPDF();
    doc.text("Policy Application Details", 14, 16);

    const healthConditions = policy.health
      ? Object.entries(policy.health)
          .map(([key, value]) => `${key}: ${value ? "Yes" : "No"}`)
          .join(", ")
      : "N/A";

    const quoteInfo = policy.quoteData
      ? [
          ["Coverage Amount", `৳${policy.quoteData.coverageAmount}`],
          ["Duration", `${policy.quoteData.duration} years`],
          ["Premium", `৳${policy.quoteData.premium}`],
        ]
      : [];

    doc.autoTable({
      startY: 20,
      head: [["Field", "Value"]],
      body: [
        ["Name", policy.name],
        ["Email", policy.email],
        ["Phone", policy.phone],
        ["Date of Birth", policy.dob],
        ["Address", policy.address],
        ["NID", policy.nid],
        ["Policy Title", policy.policyTitle],
        ["Status", policy.status],
        ["Assigned Agent", policy.assignedAgent || "Not Assigned"],
        ["Nominee Name", policy.nomineeName],
        ["Nominee NID", policy.nomineeNid],
        ["Relationship", policy.relationship?.label || "N/A"],
        ["Health Conditions", healthConditions],
        ...quoteInfo,
      ],
    });

    doc.save(`${policy.policyTitle}_Application.pdf`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const message = form.message.value;

    const review = {
      name: user.displayName,
      email: user.email,
      rating,
      message,
      policy: reviewPolicy.policyTitle,
      createdAt: new Date(),
    };
    console.log(review);

    const res = await axiosSecure.post("/reviews", review);
    if (res.data.insertedId) {
      Swal.fire("Success", "Review submitted", "success");
      form.reset();
      setReviewPolicy(null);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📄 My Policies</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Policy</th>
              <th>Coverage</th>
              <th>Premium</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myPolicies.map((policy, index) => (
              <tr key={policy._id}>
                <td>{index + 1}</td>
                <td>{policy.policyTitle}</td>
                <td>৳{policy.quoteData?.coverageAmount || "-"}</td>
                <td>৳{policy.quoteData?.annualPremium || "-"} / year</td>
                <td>
                  <span
                    className={`capitalize badge badge-${
                      policy.status === "approved"
                        ? "success"
                        : policy.status === "pending"
                        ? "warning"
                        : "error"
                    }`}
                  >
                    {policy.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-outline mr-2"
                    onClick={() => setSelectedPolicy(policy)}
                  >
                    View Details
                  </button>
                  {policy.status === "approved" && (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => setReviewPolicy(policy)}
                    >
                      Give Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {selectedPolicy && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-2">Policy Details</h3>
            <p>
              <strong>Name:</strong> {selectedPolicy.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedPolicy.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedPolicy.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong> {selectedPolicy.dob}
            </p>
            <p>
              <strong>Address:</strong> {selectedPolicy.address}
            </p>
            <p>
              <strong>Policy:</strong> {selectedPolicy.policyTitle}
            </p>
            <p>
              <strong>Status:</strong> {selectedPolicy.status}
            </p>
            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(selectedPolicy.submittedAt).toLocaleDateString()}
            </p>

            {selectedPolicy.quoteData && (
              <>
                <p>
                  <strong>Coverage:</strong> ৳
                  {selectedPolicy.quoteData.coverageAmount}
                </p>
                <p>
                  <strong>Premium:</strong> ৳
                  {selectedPolicy.quoteData.annualPremium}
                </p>
                <p>
                  <strong>Duration:</strong> {selectedPolicy.quoteData.duration}{" "}
                  years
                </p>
              </>
            )}

            <p>
              <strong>Nominee:</strong> {selectedPolicy.nomineeName} (
              {selectedPolicy.relationship?.label || "N/A"})
            </p>
            <p>
              <strong>Nominee NID:</strong> {selectedPolicy.nomineeNid}
            </p>

            {selectedPolicy.health && (
              <p className="mt-2">
                <strong>Health Conditions:</strong>{" "}
                {Object.entries(selectedPolicy.health)
                  .map(([k, v]) => `${k}: ${v ? "Yes" : "No"}`)
                  .join(", ")}
              </p>
            )}

            {selectedPolicy.status === "rejected" && (
              <p className="text-red-500 mt-2">
                <strong>Rejection Feedback:</strong>{" "}
                {selectedPolicy.rejectionFeedback}
              </p>
            )}

            {selectedPolicy.status === "approved" && (
              <button
                className="btn btn-sm mt-4"
                onClick={() => handleDownloadPDF(selectedPolicy)}
              >
                📥 Download PDF
              </button>
            )}

            <form method="dialog" className="modal-backdrop mt-4">
              <button className="btn">Close</button>
            </form>
          </div>
        </dialog>
      )}

      {/* Review Modal */}
      {reviewPolicy && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">⭐ Submit Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Rating (1–5)</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Feedback</label>
                <textarea
                  name="message"
                  className="textarea textarea-bordered w-full"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button className="btn btn-primary" type="submit">
                Submit Review
              </button>
            </form>
            <form method="dialog" className="modal-backdrop mt-4">
              <button className="btn">Close</button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyPolicies;
