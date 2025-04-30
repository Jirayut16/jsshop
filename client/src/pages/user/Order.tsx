import { useEffect, useState } from "react";
import PublicHeader from "../../layout/PublicHeader";
import { getUserIdFromToken } from "../../utils/userIdDecode";
import { getOrders } from "../../functions/order";
import { Breadcrumb, Tabs } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  formatCurrency,
  formatDateTime,
} from "../../functions/formatDateAndTime";

import { OrderType } from "../../utils/type";

const Order = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const getCompleteItem = orders.filter((order) => order.status === "paid");
  const getIncompleteItem = orders.filter(
    (order) => order.status === "pending"
  );
  const userID = getUserIdFromToken();

  const getOrder = async () => {
    try {
      const res = await getOrders(userID ?? "");
      setOrders(res.data.order);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  console.log(orders);
  orders.map((index) => console.log(index.item));

  return (
    <>
      <PublicHeader classname="bg-background dark:bg-soft-dark dark:text-text-dark  md:bg-transparent w-full md:static border-b border-gray-600 shadow-md p-2 "></PublicHeader>
      <div className="container mx-auto px-8 md:px-0 my-4 ">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: (
                <>
                  <div className="flex flex-row gap-2 justify-center items-center text-black dark:text-text-dark font-semibold">
                    <AiOutlineHome size={20} />
                    <span>Home</span>
                  </div>
                </>
              ),
              href: "/",
            },
            {
              title: "My Account",
            },
            {
              title: "My Orders",
            },
          ]}
        />
      </div>
      <div className="container mx-auto dark:bg-soft-dark border border-gray-600 dark:border-gray-800 rounded-md overflow-hidden">
        <div className="bg-zinc-900 dark:bg-accent-dark text-white p-2 lg:p-4 text-lg sm:text-2xl lg:text-4xl rounded-md font-bold flex gap-4 justify-center items-center">
          <h1>My Orders</h1>
        </div>
        {orders.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-16 gap-8">
            <p className="text-2xl font-semibold text-gray-500 dark:text-text-dark">
              You have no orders
            </p>
            <Link to="/allproduct">
              <button className="bg-primary dark:bg-accent-dark text-xl w-48 text-white py-2 px-4 rounded-md hover:bg-main dark:hover:bg-button hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                Shop Now !
              </button>
            </Link>
          </div>
        ) : (
          <div className="p-2 mt-4 lg:mt-0 lg:p-8">
            <Tabs
              className="custom-tabs"
              type="card"
              defaultActiveKey="1"
              items={Array.from({ length: 3 }, (_, index) => {
                const key = String(index + 1);
                const label =
                  key === "1" ? "All" : key === "2" ? "Completed" : "Cancelled";
                const itemToShow =
                  key === "1"
                    ? orders
                    : key === "2"
                    ? getCompleteItem
                    : getIncompleteItem;
                return {
                  label: (
                    <div className="flex flex-row gap-2 justify-center items-center hover:text-button transition-all duration-300 ease-in-out">
                      <span className="text-sm font-semibold">{label}</span>
                      <span className="text-sm font-semibold">
                        ({itemToShow?.length})
                      </span>
                    </div>
                  ),
                  key: key,
                  children: (
                    <div className="flex flex-col gap-4 animate__animated animate__fadeInRight animate__delay-0.5s animate__faster">
                      {itemToShow
                        .slice(0)
                        .reverse()
                        .map((item, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-background-dark dark:text-text-dark px-2 lg:px-8 py-4 rounded-sm  gap-2 flex flex-col"
                          >
                            {/* 1 */}
                            <div className="flex flex-row justify-between items-center border-b border-gray-600 ">
                              <p className="text-sm font-semibold">
                                {formatDateTime(item.date)}
                              </p>
                              <div className="flex gap-4 justify-center items-center">
                                <div className="flex gap-1">
                                  <p className="hidden lg:block text-sm font-semibold">
                                    Payment:
                                  </p>
                                  <p className="first-letter:uppercase">
                                    {item.status}
                                  </p>
                                </div>
                                <span>|</span>
                                <p className="text-sm font-semibold first-letter:uppercase">
                                  {item.status === "paid" ? (
                                    <span className="text-green-500">
                                      completed
                                    </span>
                                  ) : (
                                    <span className="text-red-500">
                                      cancelled
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            {/* 2 */}
                            {/* desktop content */}
                            <div className="hidden lg:flex flex-row justify-between items-center pb-2 border-b border-gray-600 ">
                              <div className="flex flex-row gap-4">
                                <div className="flex flex-col gap-2">
                                  {item.item.map((item) => (
                                    <div className="w-20 h-24 border border-gray-400 dark:border-white rounded-md overflow-hidden">
                                      <img
                                        src={
                                          typeof item.image === "string"
                                            ? item.image
                                            : ""
                                        }
                                        alt="product image"
                                        loading="lazy"
                                        className="w-full h-full object-cover "
                                      />
                                    </div>
                                  ))}
                                </div>
                                <div className="flex flex-col gap-2">
                                  {item.item.map((item) => (
                                    <div className="text-base w-full h-24 dark:font-semibold">
                                      <p>{item.name}</p>
                                      <p className="text-sm font-extralight text-gray-500 dark:text-white">
                                        x{item.quantity}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                {item.item.map((product) => (
                                  <div className="w-full h-24 flex flex-row justify-between items-center gap-8">
                                    <p>{formatCurrency(product.price)}</p>
                                    <Link to={`/product/${product.productId}`}>
                                      <div className="text-sm bg-accent text-white rounded-sm px-4 py-2 hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-300 ease-in-out">
                                        {item.status === "paid" ? (
                                          <p className="">
                                            Review this product
                                          </p>
                                        ) : (
                                          <p className="">Buy again</p>
                                        )}
                                      </div>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* mobile content */}
                            {item.item.map((order, index) => (
                              <div
                                key={index}
                                className="flex mb-2 border-b border-gray-600 py-2 lg:hidden"
                              >
                                <div className="w-1/4 flex items-center justify-center">
                                  <div className="w-16 h-20 ">
                                    <img
                                      src={
                                        typeof order.image === "string"
                                          ? order.image
                                          : ""
                                      }
                                      alt="product image"
                                      loading="lazy"
                                      className="w-full h-full object-cover "
                                    />
                                  </div>
                                </div>
                                <div className="w-2/4 text-sm flex flex-col justify-between">
                                  <p>{order.name}</p>
                                  <p className="dark:text-gray-400">
                                    x{order.quantity}
                                  </p>
                                  <p className="dark:text-gray-400">
                                    {formatCurrency(order.price)}
                                  </p>
                                </div>
                                <div className="w-1/4 flex flex-col justify-end">
                                  <Link to={`/product/${order.productId}`}>
                                    <div className="text-sm text-center bg-accent-dark text-white rounded-sm px-2 py-1 hover:bg-button transition-all duration-300 ease-in-out">
                                      {item.status === "paid" ? (
                                        <p className="">Review</p>
                                      ) : (
                                        <p className="">Buy again</p>
                                      )}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            ))}

                            {/* 3 */}
                            <div className="flex justify-end items-center py-2 gap-2">
                              <p>Total Price: </p>
                              <span className="text-lg lg:text-2xl font-semibold">
                                {formatCurrency(item.totalPrice)}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  ),
                };
              })}
            ></Tabs>
          </div>
        )}
      </div>
    </>
  );
};
export default Order;
