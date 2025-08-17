import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";

const TransactionsChart = () => {
    const AxiosSecure = useAxiosSecure();
    // customer payment data
   const { data: transactions = [],isLoading } = useQuery({
      queryKey: ["payments"],
      queryFn: async () => {
        const res = await AxiosSecure.get("/payment-history");
        return res.data;
      },
    });
   const paid = transactions.filter(amount=>amount.
status== "success");

  // Transform data (policyTitle vs amount)
  const chartData = paid.map(tx => ({
    name: tx.policyTitle, // x-axis (policy names or formatted dates if you prefer)
    amount: tx.amount,    // y-axis (amounts)
  }));
  isLoading && <Loading></Loading>

  return (
    <div className="flex justify-center my-12">
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
