//1 load stripe
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { checkout } from "../../functions/checkout";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { useState } from "react";

//2 key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

const Checkout = () => {
  const MdToken = localStorage.getItem("token");
  const { orderid, orderLatestId } = useParams(); //latest order id ที่ส่งมาจากหน้า confirm ไปหา order ใน database
  console.log("orderId", orderid);
  console.log("orderLatestId", orderLatestId);
  const [loading, setLoading] = useState(false);
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(setLoading(true));
    }, 2000);
  });

  const fetchClientSecret = async () => {
    try {
      const res = await checkout(MdToken, orderid, orderLatestId);
      console.log("res co", res);
      return res.data.clientSecret;
    } catch (error) {
      console.log(error);
    }
  };
  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      {loading && (
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
              {
                title: "Payment",
              },
            ]}
          />
          <div className="bg-zinc-900 dark:bg-accent-dark my-4 text-white p-2 lg:p-4 text-lg sm:text-2xl lg:text-4xl rounded-md font-bold flex gap-4 justify-center items-center">
            <h1>Payment </h1>
          </div>
        </div>
      )}
      <div className="container mx-auto px-8 lg:px-0">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>

      {loading && (
        <div className=" w-full flex justify-center mt-4">
          <Link to="/mycart">
            <p className="text-xl text-black dark:text-text-dark underline cursor-pointer hover:scale-102">
              Back to cart
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Checkout;
