import { Link, useParams } from "react-router-dom";
import { checkoutStatus } from "../../functions/checkout";
import { useEffect, useState } from "react";
import { Result } from "antd";
import PublicHeader from "../../layout/PublicHeader";
import { clearCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { getUserIdFromToken } from "../../utils/userIdDecode";
import { AppDispatch } from "../../store/store";

const CheckoutComplete = () => {
  const { session, orderid } = useParams(); //session ที่ส่งมาจากหน้า checkout หลังจ่ายเงิน เอาไว้ส่งไปให้ server
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const userId = getUserIdFromToken();

  useEffect(() => {
    fetchPayment();
    dispatch(clearCart({ userId: userId ?? "" }));
  }, []);
  const fetchPayment = async () => {
    try {
      const res = await checkoutStatus(token, session, orderid);
      setStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PublicHeader classname="bg-background dark:bg-soft-dark dark:text-text-dark md:bg-transparent w-full md:static border-b border-gray-600 shadow-md p-2 "></PublicHeader>
      {status === "complete" && (
        <Result
          status="success"
          title="Successfully Purchased Your Product!"
          subTitle="Thank you for your order, we will deliver your product as soon as possible."
          extra={[
            <Link to="/">
              <button className="bg-text dark:bg-white text-white dark:text-text rounded-md  p-2  cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-300 ease-in-out">
                Back to home
              </button>
            </Link>,
            <Link to="/allproduct">
              <button className="bg-button text-white rounded-md  p-2 cursor-pointer hover:bg-red-500 transition-all duration-300 ease-in-out">
                Shop more
              </button>
            </Link>,
          ]}
        />
      )}
    </>
  );
};
export default CheckoutComplete;
