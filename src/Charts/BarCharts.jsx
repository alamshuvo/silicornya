import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2019", value: 3000 },
  { year: "2020", value: 2500 },
  { year: "2021", value: 10000 },
  { year: "2022", value: 5000 },
  { year: "2023", value: 3500 },
];

const YearlyBarChart = () => {
  return (
    <div className=" bg-white rounded-xl p-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="year"
            stroke="#999"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#999"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="value" fill="url(#purpleGradient)" radius={[4, 4, 0, 0]} barSize={30} />
          <defs>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9F7AEA" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#805AD5" stopOpacity={1} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyBarChart;
