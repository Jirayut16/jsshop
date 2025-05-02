import { useEffect, useState } from "react";
import { getDashboard } from "../../functions/checkout";
import { formatCurrency } from "../../functions/formatDateAndTime";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { MyCountUpMoney, MyCountUpNumber } from "../../components/CountUp";
import { BsCartPlus, BsCashCoin } from "react-icons/bs";
import { PiHandCoins } from "react-icons/pi";
import { LiaCoinsSolid } from "react-icons/lia";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Spin } from "antd";

import { DashboardData } from "../../utils/dashboardData";

const HomePageAdmin = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(
    {} as DashboardData
  );
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getDashboard();
      setDashboardData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  return (
    <>
      {!loading ? (
        <div className="bg-[#f1f1f1] dark:bg-background-dark rounded-sm transition-all duration-300 ease-in-out">
          {/* 1 */}
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center p-4">
            <div className="bg-red-500 font-bold text-lg md:text-xl lg:text-2xl text-white w-full md:w-1/2 px-8 py-4 rounded-md shadow-md flex gap-2 justify-between items-center hover:scale-101 transition-all duration-300 ease-in-out cursor-pointer">
              <div>
                <p className="uppercase text-center">Total Earnings:</p>
                <MyCountUpMoney
                  data={dashboardData?.saleReport?.[0]?.totalSales ?? 0}
                  className="text-lg md:text-xl lg:text-4xl font-semibold text-center"
                />
              </div>
              <div className="bg-red-200 text-red-500 rounded-md p-4 h-full">
                <BsCashCoin className="text-xl md:text-3xl lg:text-6xl" />
              </div>
            </div>
            <div className="bg-green-500 font-bold text-lg md:text-xl lg:text-2xl text-white w-full md:w-1/2 px-8 py-4 rounded-md shadow-md flex gap-2 justify-between items-center hover:scale-101 transition-all duration-300 ease-in-out cursor-pointer">
              <div>
                <p className="uppercase text-center">My Balance:</p>
                <MyCountUpMoney
                  data={dashboardData?.balance ?? 0}
                  className="text-lg md:text-xl lg:text-4xl font-semibold text-center"
                />
              </div>
              <div className="bg-green-200 text-green-500 rounded-md p-4 h-full">
                <PiHandCoins className="text-xl md:text-3xl lg:text-6xl" />
              </div>
            </div>
          </div>

          {/* 2  */}
          <div className="flex gap-2 md:gap-6 flex-wrap md:flex-nowrap justify-between items-center px-4 py-0 md:py-2">
            <div className="w-[47%] md:w-1/3 bg-white dark:bg-soft-dark dark:text-text-dark dark:border dark:border-accent-dark font-bold text-sm md:text-lg text-gray-600 p-4 rounded-md shadow-md flex gap-6 justify-evenly items-center">
              <div className="flex flex-col justify-center items-center">
                <p className="uppercase">item sale:</p>
                <MyCountUpNumber
                  data={dashboardData?.totalItemsSale ?? 0}
                  className=" font-semibold text-center"
                  suffix=" Pieces"
                />
                <LiaCoinsSolid className="text-3xl md:hidden block mt-2" />
              </div>
              <LiaCoinsSolid className="text-5xl hidden md:block" />
            </div>
            <div className="w-[47%] md:w-1/3 bg-white dark:bg-soft-dark dark:text-text-dark dark:border dark:border-accent-dark font-bold text-sm md:text-lg text-gray-600  p-4 rounded-md shadow-md flex gap-6 justify-evenly items-center">
              <div className="flex flex-col justify-center items-center">
                <p className="uppercase">total orders:</p>
                <MyCountUpNumber
                  data={dashboardData?.saleReport?.[0]?.totalOrders ?? 0}
                  className="font-semibold text-center"
                  suffix=" Orders"
                />
                <BsCartPlus className="text-3xl md:hidden block mt-2" />
              </div>
              <BsCartPlus className="text-5xl hidden md:block" />
            </div>
            <div className="w-full md:w-1/3 bg-white dark:bg-soft-dark dark:text-text-dark dark:border dark:border-accent-dark font-bold text-lg text-gray-600  p-4 rounded-md shadow-md flex gap-6 justify-evenly items-center">
              <div className="flex flex-col justify-center items-center ">
                <p className="uppercase">total customers:</p>
                <MyCountUpNumber
                  data={dashboardData?.customer ?? 0}
                  className="font-semibold text-center"
                  suffix=" Pax"
                />
              </div>
              <AiOutlineUsergroupAdd size={50} />
            </div>
          </div>

          {/* 3 */}
          <div className="flex gap-4 flex-col md:flex-row justify-between p-0 md:p-4 mt-4 md:mt-0">
            <div className="w-full md:w-[55%] bg-white dark:bg-soft-dark dark:text-text-dark dark:border dark:border-gray-600 px-0 py-4 md:p-8 md:py-8 rounded-md shadow-md">
              <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 dark:text-text-dark mb-6">
                Daily Sales
              </h2>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dashboardData?.salesByDate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="_id"
                      stroke="#000"
                      tick={{ fill: "#666" }}
                    />
                    <YAxis stroke="#000" tick={{ fill: "#666" }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="bump"
                      dataKey="totalSales"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      animationBegin={100}
                      animationDuration={2000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="w-full md:w-[45%]">
              <div className="bg-white dark:bg-soft-dark dark:text-text-dark dark:border dark:border-gray-600 px-0 py-4 md:p-8 md:py-8 rounded-md shadow-md">
                <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 dark:text-text-dark mb-6">
                  Top 5 Product Revenue
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={dashboardData?.revenueByProduct}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="_id"
                      angle={-45}
                      textAnchor="end"
                      height={110}
                      tick={{ fill: "#666666", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#666666" }} />
                    <Tooltip />
                    <Bar
                      dataKey="totalRevenue"
                      name="Revenue (฿)"
                      radius={[8, 8, 0, 0]}
                      barSize={60}
                    >
                      {dashboardData?.revenueByProduct?.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div className="flex gap-2 md:flex-row flex-col justify-between items-center p-0 md:p-4 mt-4 md:mt-0 ">
            <div className="w-full md:w-1/2 bg-white dark:bg-gradient-to-b dark:from-accent-dark dark:to-secondary-dark  dark:text-white rounded-md shadow-md p-4">
              <h3 className="text-xl md:text-4xl font-semibold">
                Best Seller:
              </h3>
              <table className="w-full border-collapse mt-4">
                <thead>
                  <tr className="text-sm md:text-base bg-zinc-200 dark:bg-zinc-800 text-center">
                    <th className="p-2">No.</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Image</th>
                    <th className="p-2">Total Sold</th>
                    <th className="p-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.bestSeller?.map((item, index) => (
                    <tr
                      key={index}
                      className="text-sm md:text-base text-center border-b border-gray-400 dark:border-white"
                    >
                      <td className="p-2">{index + 1}.</td>
                      <td className="p-2">{item._id}</td>
                      <td className="p-1 flex justify-center">
                        <div className=" border border-gray-300 rounded-md overflow-hidden w-12 h-12">
                          <img
                            src={
                              typeof item.image === "string" ? item.image : ""
                            }
                            alt="product image"
                            className="w-full h-full object-cover "
                          />
                        </div>
                      </td>
                      <td className="p-2">{item.totalSold}</td>
                      <td>{formatCurrency(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full md:w-1/2 bg-white dark:bg-gradient-to-b dark:from-accent-dark dark:to-secondary-dark dark:text-white rounded-md shadow-md p-4 ">
              <h3 className="text-xl md:text-4xl font-semibold">
                Top Spending:
              </h3>
              <table className="w-full border-collapse mt-4">
                <thead>
                  <tr className="text-sm md:text-base bg-zinc-200 dark:bg-zinc-800 text-center">
                    <th className="p-2">No.</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">UserID</th>
                    <th className="p-2">Total Spend</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.topCustomers?.map((item, index) => (
                    <tr
                      key={index}
                      className="text-sm md:text-base text-center border-b border-gray-400 dark:border-white"
                    >
                      <td className="p-2">{index + 1}.</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item._id}</td>
                      <td className="p-1">
                        <div className="flex justify-center items-center w-full h-12">
                          <p>{formatCurrency(item.totalSpent)}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Spin spinning={loading} size="large" />
        </div>
      )}
    </>
  );
};
export default HomePageAdmin;
