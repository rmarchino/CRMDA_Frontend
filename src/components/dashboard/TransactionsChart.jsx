import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    Expense: 4000,
    Income: 5400,
  },
  {
    name: "Feb",
    Expense: 3500,
    Income: 1900,
  },
  {
    name: "Mar",
    Expense: 5500,
    Income: 7000,
  },
  {
    name: "Apr",
    Expense: 3800,
    Income: 8000,
  },
  {
    name: "May",
    Expense: 2600,
    Income: 5000,
  },
  {
    name: "Jun",
    Expense: 2000,
    Income: 2500,
  },
  {
    name: "Jul",
    Expense: 3000,
    Income: 6000,
  },
  {
    name: "Aug",
    Expense: 4000,
    Income: 5000,
  },
  {
    name: "Sep",
    Expense: 2500,
    Income: 3000,
  },
  {
    name: "Oct",
    Expense: 2000,
    Income: 4000,
  },
  {
    name: "Nov",
    Expense: 3000,
    Income: 5000,
  },
  {
    name: "Dec",
    Expense: 4000,
    Income: 1000,
  },
];

const TransactionsChart = () => {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Transacciones</strong>
      <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#0ea5e9" />
            <Bar dataKey="Expense" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionsChart;
