import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../../Hooks/useAuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CustomerDashHome = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const { data: myPolicies = [] } = useQuery({
    queryKey: ["myPolicies", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-policies?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: myApplications = [] } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user?.email}`);
      return res.data.reverse(); // latest first
    },
    enabled: !!user?.email,
  });

  const latestApp = myApplications[0];

  return (
    <div className="p-4 space-y-6">
      {/* Welcome */}
     

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title">📄 My Policies</h2>
            <p className="text-3xl font-bold">{myPolicies.length}</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title">🕐 Latest Status</h2>
            <p className="text-xl font-semibold">
              {latestApp?.status || "No Application Yet"}
            </p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title">🚀 Quick Actions</h2>
            <div className="flex flex-col gap-2">
              <Link to="/get-quote" className="btn btn-sm btn-primary">
                Get a Quote
              </Link>
              <Link to="/apply" className="btn btn-sm btn-secondary">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations (Static for now) */}
      <div>
        <h2 className="text-xl font-semibold mb-2">🧠 Recommended for You</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">Plan #{i + 1}</h3>
                <p>Coverage: BDT 5,00,000</p>
                <p>Duration: 10 Years</p>
                <div className="card-actions justify-end">
                  <Link to="/all-policies" className="btn btn-outline btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashHome;
