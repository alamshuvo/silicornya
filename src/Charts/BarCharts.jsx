import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2019", uv: 3000, pv: 2000 },
  { year: "2020", uv: 2500, pv: 1500 },
  { year: "2021", uv: 10000, pv: 5000 },
  { year: "2022", uv: 5000, pv: 3000 },
  { year: "2023", uv: 3500, pv: 2000 },
];

const YearlyBarChart = () => {
  return (
    <div className="bg-white rounded-xl p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
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
          <Legend />
          <Bar
            dataKey="pv"
            fill="#8884d8"
            barSize={30}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="uv"
            fill="#82ca9d"
            barSize={30}
            activeBar={<Rectangle fill="gold" stroke="purple" />}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyBarChart;
