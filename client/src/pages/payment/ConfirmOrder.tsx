import { Breadcrumb } from "antd";
import PublicHeader from "../../layout/PublicHeader";
import { AiOutlineHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getUserIdFromToken } from "../../utils/userIdDecode";
import { useEffect, useState } from "react";
import { fetchCart } from "../../store/cartSlice";
import { formatCurrency } from "../../functions/formatDateAndTime";
import { submitOrder } from "../../functions/order";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}
const ConfirmOrder = () => {
  window.scrollTo(0, 0);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const userId = getUserIdFromToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    dispatch(fetchCart({ userId: userId ?? "" }));
  }, [dispatch, userId]);

  const getTotalPrice = () => {
    const total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const tax = total * 0.07;
    const includedTax = total * 1.07;
    return {
      total: formatCurrency(total),
      tax: formatCurrency(tax),
      includedTax: formatCurrency(includedTax),
    };
  };

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  console.log("formValues", formValues);
  console.log("cart confirm", cart);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitOrder(formValues, cart.cartId);
      console.log("resconfirm", res.data);
      // console.log("latest", res?.data?.latestOrder?._id);
      // console.log("order", res?.data?.order?._id);
      await new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        navigate(
          `/checkout/${res?.data?.order?._id}/${res?.data?.latestOrder?._id}`
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PublicHeader classname="bg-background dark:bg-soft-dark dark:text-text-dark md:bg-transparent w-full md:static border-b border-gray-600 shadow-md p-2 "></PublicHeader>
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
              title: "Cart",
              href: "/mycart",
            },
            {
              title: "Checkout",
            },
          ]}
        />
      </div>
      <div className="container mx-auto px-4 md:px-0">
        <div className="bg-zinc-900 dark:bg-accent-dark text-white p-2 lg:p-4 text-xl sm:text-2xl lg:text-4xl rounded-md font-bold flex gap-4 justify-center items-center">
          <h1>Checkout</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 mt-4">
          <div className="w-full lg:w-1/2 border border-gray-300 dark:border-none dark:text-text-dark dark:bg-soft-dark  rounded-md max-h-fit ">
            <h2 className="text-lg lg:text-2xl font-semibold text-center py-4">
              Shipping Address
            </h2>
            <form
              id="form"
              className="flex flex-col gap-2 p-4 h-full"
              onSubmit={handleSubmit}
            >
              <label htmlFor="name">Name:</label>
              <input
                className="border rounded-md p-2"
                placeholder="Enter your name"
                type="text"
                name="name"
                onChange={handleFormChange}
                required
              />
              <label htmlFor="email">Email:</label>
              <input
                className="border rounded-md p-2"
                placeholder="Enter your email"
                type="email"
                name="email"
                onChange={handleFormChange}
                required
              />
              <label htmlFor="phone">Phone:</label>
              <input
                className="border rounded-md p-2"
                placeholder="Enter your phone number"
                type="number"
                name="phone"
                onChange={handleFormChange}
                required
              />
              <label htmlFor="address">Address:</label>
              <textarea
                className="border rounded-md p-2"
                placeholder="Enter your address"
                name="address"
                rows={4}
                onChange={handleFormChange}
                required
              ></textarea>
            </form>
          </div>
          <div className="w-full lg:w-1/2 border border-gray-300 dark:border-none dark:text-text-dark dark:bg-soft-dark rounded-md ">
            <h2 className="text-lg lg:text-2xl font-semibold text-center py-4">
              Order Confirmation
            </h2>
            {/* desktop content */}
            <table className="w-full border-collapse hidden lg:inline-table">
              <thead>
                <tr className="bg-zinc-200 dark:bg-zinc-700 text-center">
                  <th className="p-2">No.</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Image</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center border-b border-gray-400"
                  >
                    <td className="p-2">{index + 1}.</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">
                      <div className=" border border-gray-400 rounded-md overflow-hidden w-12 h-16">
                        <img
                          src={typeof item.image === "string" ? item.image : ""}
                          alt="product image"
                          loading="lazy"
                          className="w-full h-full object-cover "
                        />
                      </div>
                    </td>
                    <td className="p-2">{item.quantity}</td>
                    <td>{formatCurrency(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* mobile content */}
            <div className="block lg:hidden">
              <div className="grid grid-cols-12 mb-2 text-sm bg-gray-100 dark:bg-background-dark py-1">
                <div className="col-span-2 text-center">No</div>
                <div className="col-span-8 text-center">Product</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              {cart?.items?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 py-2 border-b border-gray-600"
                >
                  <div className="flex items-center justify-center col-span-2 text-sm">
                    {index + 1}.
                  </div>
                  <div className="flex items-center col-span-7">
                    <div className="flex gap-2 mr-4">
                      <div className="w-12 h-12">
                        <img
                          src={typeof item.image === "string" ? item.image : ""}
                          alt="product image"
                          className="w-full h-full object-cover rounded-md "
                        />
                      </div>
                      <div className="w-full text-sm">
                        <p>{item.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          x {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center col-span-3 text-center text-xs font-medium ">
                    <p> {formatCurrency(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 justify-center p-4 tracking-wider ">
              <div className="flex justify-between items-center">
                <p>Total: </p>
                <p>{getTotalPrice().total}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Vat 7 %: </p>
                <p>{getTotalPrice().tax}</p>
              </div>
              <div className="flex justify-between items-center mt-2 text-lg font-semibold">
                <p>Total Price: </p>
                <p>{getTotalPrice().includedTax} (THB)</p>
              </div>
            </div>
            <div className="flex justify-end px-4 py-2 mb-2 lg:mb-0">
              <button
                type="submit"
                form="form"
                className={`${
                  loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
                } bg-accent w-full lg:w-1/2 text-lg lg:text-xl font-semibold text-white p-2 lg:py-2 lg:px-4 rounded-md hover:bg-button transition-all duration-300 ease-in-out cursor-pointer`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2 ">
                    <FaSpinner className="text-2xl animate-spin" />
                    Please Wait
                  </span>
                ) : (
                  <span>Confirm Order</span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className=" w-full flex justify-center mt-4">
          <Link to="/mycart">
            <p className="text-base lg:text-xl text-black dark:text-text-dark underline cursor-pointer hover:scale-102">
              Back to cart
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};
export default ConfirmOrder;
