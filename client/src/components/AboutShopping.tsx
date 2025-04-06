import { BiSolidCheckShield, BiSolidLock } from "react-icons/bi";
import { FaTruckFast } from "react-icons/fa6";
import { RiCustomerServiceFill } from "react-icons/ri";

const AboutShopping = () => {
  return (
    <div className="container mx-auto mt-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-0 ">
        <div className=" flex flex-col gap-2 justify-center items-center text-text dark:text-text-dark">
          <FaTruckFast className="w-16 h-16 sm:w-24 sm:h-24 rounded-full p-2 bg-gray-200 dark:bg-secondary-dark" />
          <p className="text-sm sm:text-xl xl:text-2xl font-semibold">
            Fast Delivery
          </p>
          <p className="text-sm font-light">Fast delivery for all orders</p>
        </div>
        <div className=" flex flex-col gap-2 justify-center items-center text-text dark:text-text-dark">
          <RiCustomerServiceFill className="w-16 h-16 sm:w-24 sm:h-24 rounded-full p-2 bg-gray-200 dark:bg-secondary-dark" />
          <p className="text-sm sm:text-xl xl:text-2xl font-semibold">
            24/7 Customer Service
          </p>
          <p className="text-xs sm:text-sm font-light">
            Friendly 24/7 customer support
          </p>
        </div>
        <div className=" flex flex-col gap-2 justify-center items-center text-text dark:text-text-dark">
          <BiSolidCheckShield className="w-16 h-16 sm:w-24 sm:h-24 rounded-full p-2 bg-gray-200 dark:bg-secondary-dark" />
          <p className="text-sm sm:text-xl xl:text-2xl font-semibold">
            Money Back Guarantee
          </p>
          <p className="text-sm  font-light text-center">
            We guarantee 100% money back within 30 days
          </p>
        </div>
        <div className=" flex flex-col gap-2 justify-center items-center text-text dark:text-text-dark">
          <BiSolidLock className="w-16 h-16 sm:w-24 sm:h-24 rounded-full p-2 bg-gray-200 dark:bg-secondary-dark" />
          <p className="text-sm sm:text-xl xl:text-2xl font-semibold">
            Secure Payment
          </p>
          <p className="text-sm font-light text-center">
            Secure payment with many payment method
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutShopping;
