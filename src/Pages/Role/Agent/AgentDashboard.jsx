import React from "react";
import { FaUsers, FaFileAlt, FaBlog } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AgentDashboard = () => {
  // Static card data
  const cards = [
    {
      title: "Total Assigned Customers",
      value: 12,
      icon: <FaUsers className="text-4xl text-blue-500" />,
      border: "border-blue-500",
    },
    {
      title: "Active Applications",
      value: 8,
      icon: <FaFileAlt className="text-4xl text-green-500" />,
      border: "border-green-500",
    },
    {
      title: "Blogs Published",
      value: 5,
      icon: <FaBlog className="text-4xl text-purple-500" />,
      border: "border-purple-500",
    },
  ];

  // Static chart data
  const chartData = [
    { month: "Jan", sales: 3 },
    { month: "Feb", sales: 5 },
    { month: "Mar", sales: 2 },
    { month: "Apr", sales: 7 },
    { month: "May", sales: 6 },
    { month: "Jun", sales: 8 },
  ];

  return (
    <div className="p-6 space-y-6">
     
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card bg-base-100 shadow-xl border-l-4 ${card.border}`}
          >
            <div className="card-body flex flex-row items-center justify-between">
              <div>
                <h2 className="card-title text-xl">{card.title}</h2>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart Section */}
      <div className="bg-white p-6 shadow-xl rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Monthly Policy Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgentDashboard;
