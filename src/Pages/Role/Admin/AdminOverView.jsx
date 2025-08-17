import { useEffect, useState } from "react";
import { FaUsers, FaFileAlt, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminOverView = () => {
  const axiosSecure = useAxiosSecure();
  const [overview, setOverview] = useState({
    totalUsers: 0,
    totalApplications: 0,
    totalIncome: 0,
  });
  const [earningsByDate, setEarningsByDate] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);
        const [usersRes, appsRes, paymentsRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/applications"),
          axiosSecure.get("/payment-history"),
        ]);

        const users = usersRes.data || [];
        const applications = appsRes.data || [];
        const payments = paymentsRes.data || [];

        // filter successful payments
        const successfulPayments = payments.filter(
          (p) => p.status === "success"
        );

        // sum total income
        const totalIncome = successfulPayments.reduce(
          (sum, p) => sum + (p.amount || 0),
          0
        );

        // group by date (daily earnings)
        const earningsMap = {};
        successfulPayments.forEach((p) => {
          const date = new Date(p.paidAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          if (!earningsMap[date]) earningsMap[date] = 0;
          earningsMap[date] += p.amount || 0;
        });

        // convert to chart data array
        const earningsData = Object.entries(earningsMap).map(
          ([date, amount]) => ({
            date,
            amount,
          })
        );

        setOverview({
          totalUsers: users.length,
          totalApplications: applications.length,
          totalIncome,
        });
        setEarningsByDate(earningsData);
      } catch (err) {
        console.error("Error fetching overview data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner text-primary w-12 h-12"></span>
      </div>
    );
  }

  return (
    <div>
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="card bg-base-100 shadow-xl border-l-4 border-blue-500">
          <div className="card-body flex flex-row items-center justify-between">
            <div>
              <h2 className="card-title text-xl">Total Users</h2>
              <p className="text-3xl font-bold">{overview.totalUsers}</p>
            </div>
            <FaUsers className="text-4xl text-blue-500" />
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border-l-4 border-green-500">
          <div className="card-body flex flex-row items-center justify-between">
            <div>
              <h2 className="card-title text-xl">Total Applications</h2>
              <p className="text-3xl font-bold">{overview.totalApplications}</p>
            </div>
            <FaFileAlt className="text-4xl text-green-500" />
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border-l-4 border-yellow-500">
          <div className="card-body flex flex-row items-center justify-between">
            <div>
              <h2 className="card-title text-xl">Total Income</h2>
              <p className="text-3xl font-bold">{overview.totalIncome} TK</p>
            </div>
            <FaDollarSign className="text-4xl text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Earnings Line Chart */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Earnings Over Time</h2>
        {earningsByDate.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No earnings data yet</p>
        )}
      </div>
    </div>
  );
};

export default AdminOverView;
