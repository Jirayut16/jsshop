import { getUserIdFromToken } from "../../utils/userIdDecode";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import {
  fetchCart,
  removeItemFromCart,
  updateQuantity,
} from "../../store/cartSlice";
import PublicHeader from "../../layout/PublicHeader";
import { Breadcrumb } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { formatCurrency } from "../../functions/formatDateAndTime";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const CartDetail = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const userId = getUserIdFromToken();
  useEffect(() => {
    dispatch(fetchCart({ userId: userId ?? "" }));
  }, [dispatch, userId]);

  const handleQuantityChange = (newQuantity: number, productId?: string) => {
    dispatch(
      updateQuantity({
        userId: userId ?? "",
        productId: productId ?? "",
        amount: newQuantity,
      })
    );
  };

  // console.log("cart item", cart);

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
            },
          ]}
        />
      </div>

      <div className="container mx-auto flex justify-between pb-4 px-4 lg:px-0 dark:text-text-dark">
        <p className="text-base lg:text-2xl font-bold dark:font-medium flex gap-2 items-center">
          Shopping Cart <BsCart4 />
        </p>
        <p className="text-base lg:text-xl font-extralight text-gray-600 dark:text-text-dark">
          {cart?.items?.length} items
        </p>
      </div>

      {/* cart content */}
      <div className="container mx-auto px-4 lg:px-0">
        {cart?.items?.length > 0 ? (
          <div className="bg-white dark:bg-soft-dark rounded-md shadow-sm overflow-hidden mb-6 transition-colors duration-500 ease-in-out">
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 dark:bg-soft-dark text-sm font-medium text-gray-500 dark:text-text-dark">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-1 text-center">Total</div>
              <div className="col-span-1 text-center">Action</div>
            </div>
            {cart.items?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 p-1 lg:py-6 lg:px-4 border-b border-gray-300 dark:border-gray-600 lg:border-gray-100 items-center"
              >
                {/* desktop view */}
                <div className="hidden lg:block col-span-6">
                  <div className="flex items-center">
                    <img
                      src={
                        typeof item.image === "string"
                          ? `https://jsshop.onrender.com/uploads/${item?.image?.toString()}`
                          : ""
                      }
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-text-dark mb-1">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block col-span-2 text-center dark:text-text-dark">
                  <p>{formatCurrency(item.price)}</p>
                </div>
                <div className="hidden lg:block col-span-2 text-center dark:text-text-dark">
                  <div className="flex justify-center gap-2 items-center ">
                    <button
                      className={`${
                        item.quantity <= 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-red-500 hover:scale-105 cursor-pointer"
                      }  bg-button dark:bg-accent-dark text-white w-8 h-8 text-xl rounded-full transition duration-300 ease-in-out `}
                      onClick={() => handleQuantityChange(-1, item.productId)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <p className="px-4">{item.quantity}</p>
                    <button
                      className=" bg-button dark:bg-accent-dark text-white h-8 w-8 rounded-full hover:bg-red-500 hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                      onClick={() => handleQuantityChange(+1, item.productId)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block col-span-1 text-center dark:text-text-dark">
                  <p>{formatCurrency(item.price * item.quantity)}</p>
                </div>
                <div className="hidden lg:block col-span-1 text-center">
                  <div className="flex justify-center">
                    <button
                      className="flex gap-2 justify-center items-center text-center bg-button text-white w-8 h-8 rounded-md hover:bg-red-500 hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                      onClick={() =>
                        dispatch(
                          removeItemFromCart({
                            userId: userId ?? "",
                            productId: item.productId ?? "",
                          })
                        )
                      }
                    >
                      <RiDeleteBin2Fill size={20} />
                    </button>
                  </div>
                </div>

                {/* Mobil view */}
                <div className="col-span-8 lg:hidden p-1">
                  <div className="flex items-center gap-2 ">
                    <div className="w-20 h-16">
                      <img
                        src={
                          typeof item.image === "string"
                            ? `https://jsshop.onrender.com/uploads/${item?.image?.toString()}`
                            : ""
                        }
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md mr-4"
                      />
                    </div>
                    <div className="flex flex-col space-y-2 w-full">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-text-dark">
                        {item.name}
                      </h3>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-300">
                        {formatCurrency(item.price)}
                      </p>
                      <div className="flex gap-4 items-center">
                        <button
                          className={`${
                            item.quantity <= 1
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-gray-300 hover:scale-105 cursor-pointer"
                          }  bg-gray-100 dark:bg-accent-dark text-gray-600 dark:text-text-dark flex justify-center items-center w-6 h-6 text-xs rounded-full transition duration-300 ease-in-out `}
                          onClick={() =>
                            handleQuantityChange(-1, item.productId)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <p className="text-gray-900 dark:text-text-dark">
                          {item.quantity}
                        </p>
                        <button
                          className=" bg-gray-100 dark:bg-accent-dark text-gray-600 dark:text-text-dark flex justify-center items-center h-6 w-6 text-xs rounded-full hover:bg-gray-300 hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                          onClick={() =>
                            handleQuantityChange(+1, item.productId)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 lg:hidden h-full p-1 ">
                  <div className="flex flex-col justify-between items-end  h-full">
                    <button
                      className="flex gap-2 justify-center items-center text-center text-gray-600 dark:text-text-dark w-8 h-8 rounded-md hover:scale-105 duration-300 ease-in-out cursor-pointer"
                      onClick={() =>
                        dispatch(
                          removeItemFromCart({
                            userId: userId ?? "",
                            productId: item.productId ?? "",
                          })
                        )
                      }
                    >
                      <RiDeleteBin2Fill size={18} />
                    </button>
                    <p className="text-sm font-medium text-gray-900 dark:text-text-dark">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-soft-dark p-12 text-center rounded-md shadow-sm">
            <div className="flex justify-center mb-4">
              <img src="/empty-cart.png" alt="" className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 dark:text-text-dark mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 dark:text-text-dark mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/allproduct">
              <button className="px-6 py-3 bg-accent text-white rounded-md font-medium cursor-pointer hover:bg-button transition-colors duration-300 ease-in-out">
                Start Shopping
              </button>
            </Link>
          </div>
        )}

        {/* Order summary */}
        {cart?.items?.length > 0 && (
          <div className="text-sm lg:text-base w-full mt-6 ">
            <div className="bg-white dark:bg-soft-dark rounded-md shadow-sm overflow-hidden transition-colors duration-500 ease-in-out">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-medium text-gray-900 dark:text-text-dark">
                  Order Summary
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-text-dark">
                      Subtotal
                    </span>
                    <span className="text-gray-900 dark:text-text-dark font-medium">
                      {getTotalPrice().total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-text-dark">
                      Shipping
                    </span>
                    <span className="text-gray-900 dark:text-text-dark font-medium">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-text-dark">
                      Tax (7%)
                    </span>
                    <span className="text-gray-900 dark:text-text-dark font-medium">
                      {getTotalPrice().tax}
                    </span>
                  </div>

                  {/* Promo Code */}
                  <div className="pt-2 pb-4">
                    <label className="block text-gray-700 dark:text-text-dark text-sm font-medium mb-2">
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-1  w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-white"
                        placeholder="Enter code"
                      />
                      <button className="px-4 py-2 bg-accent dark:bg-accent-dark text-white rounded-r-lg font-medium">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 my-2"></div>
                  <div className="flex justify-between text-lg font-medium">
                    <span className="text-gray-900 dark:text-text-dark">
                      Total
                    </span>
                    <span className="text-gray-900 dark:text-text-dark">
                      {getTotalPrice().includedTax}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 w-full mt-6">
                  <div className="w-full lg:w-1/2 order-2 lg:order-1">
                    <Link to="/allproduct">
                      <button className="w-full py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-950 transition-colors duration-300 ease-in-out cursor-pointer">
                        Continue to Shopping
                      </button>
                    </Link>
                  </div>
                  <div className="w-full lg:w-1/2 order-1 lg:order-2">
                    <Link to="/order-confirmation">
                      <button className="w-full py-3 bg-accent dark:bg-accent-dark text-white rounded-md font-medium hover:bg-button transition-colors duration-300 ease-in-out cursor-pointer">
                        Proceed to Checkout
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="flex  justify-center mt-4">
                  <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4 text-sm text-gray-500 dark:text-gray-300">
                    <span>🔒 Secure Checkout</span>
                    <span>💳 Multiple Payment Options</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default CartDetail;
