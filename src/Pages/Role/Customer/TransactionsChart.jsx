import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const TransactionsChart = ({ paid }) => {
  // Transform data (policyTitle vs amount)
  const chartData = paid.map(tx => ({
    name: tx.policyTitle, // x-axis (policy names or formatted dates if you prefer)
    amount: tx.amount,    // y-axis (amounts)
  }));

  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-3/4 lg:w-2/3">
        <h2 className="lg:text-5xl text-2xl text-primary font-semibold mb-4 text-center">Transactions Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionsChart;
