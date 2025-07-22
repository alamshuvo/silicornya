import { Link } from "react-router-dom";
import SimpleAreaChart from "../Charts/AreaCharts";
import YearlyBarChart from "../Charts/BarCharts";
import CustomBarChart from "../Charts/BarCharts";
import TableComponent from "../components/Table";

const Card = ({ title, value, growth }) => {
  return (
    <div className="bg-gradient-to-r cursor-pointer from-purple-500 to-purple-300 text-white p-5 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-2xl font-bold">${value}</div>
      <p className="text-sm mt-1">📈 Increase by {growth}%</p>
    </div>
  );
};

const ChartPlaceholder = ({ title }) => (
  <div className="bg-white rounded-xl shadow-md p-6 min-h-[200px] flex flex-col gap-2">
    <h4 className="font-semibold text-gray-700">{title}</h4>
    <div className="flex-1 flex items-center justify-center text-gray-400">
      (Please Wait for the chart to load)
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="Weekly Sales" value="5,00,000" growth={30} />
        <Card title="Monthly Sales" value="5,00,000" growth={20} />
        <Card title="Yearly Sales" value="5,00,000" growth={10} />
      </div>

      {/* Chart Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-10 font-fustat">
        <SimpleAreaChart></SimpleAreaChart>
        <YearlyBarChart></YearlyBarChart>
        <SimpleAreaChart></SimpleAreaChart>
      </div>
      <div className="flex justify-between items-center font-fustat">
        <p className="text-2xl font-bold">Bulk Client</p>
        <Link to={"/user"}>
        <button
          className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
          type="button"
        >
          Show All User
        </button>
        </Link>
      </div>

      <TableComponent></TableComponent>
    </div>
  );
};

export default Dashboard;
