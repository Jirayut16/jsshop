import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { FormProductType } from "../utils/type";
import { getData } from "../functions/product";
import { formatCurrency } from "../functions/formatDateAndTime";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import useAddToCart from "../functions/AddToCart";
import { MdLockOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const BestSeller = () => {
  const [hover, setHover] = useState<boolean[]>([false, false, false, false]);
  const [data, setData] = useState<FormProductType[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const confirmDialog = useRef<HTMLDialogElement>(null);
  const handleAddToCart = useAddToCart({ confirmDialog });

  const getDataProduct = async () => {
    try {
      const response = await getData();
      const selectedData = response?.data?.filter((item: FormProductType) =>
        item.tag.includes("Best Seller")
      );
      setData(selectedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataProduct();
  }, []);

  const hoverImage = [
    { image: "/bestSeller1.jpg" },
    { image: "/bestSeller2.jpg" },
    { image: "/bestSeller3.jpg" },
    { image: "/bestSeller4.jpg" },
    { image: "/bestSeller5.jpg" },
    { image: "/bestSeller6.jpg" },
    { image: "/bestSeller7.jpg" },
    { image: "/bestSeller8.jpg" },
  ];

  const hoverImageToChange = (index: number) => {
    const newHover = [...hover];
    newHover[index] = true;
    setHover(newHover);
  };

  const hoverImageToChangeLeave = (index: number) => {
    const newHover = [...hover];
    newHover[index] = false;
    setHover(newHover);
  };

  return (
    <div className="container mx-auto px-12 lg:px-10 xl:px-0">
      <div className="flex flex-col w-full h-full text-4xl font-semibold pt-16 pb-8 md:py-16  items-center justify-center text-black dark:text-text-dark">
        <h1>Best Sellers</h1>
        <p className="text-base sm:text-xl font-extralight mt-4">
          Check out our most popular products
        </p>
      </div>

      <Swiper
        key={data.length}
        breakpoints={{
          // เมื่อหน้าจอเล็กกว่า 640px
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // เมื่อหน้าจอใหญ่กว่า 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // เมื่อหน้าจอใหญ่กว่า 1024px
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-[70vh] xl:h-[85vh]"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              key={index}
              className="w-full h-[50vh] xl:h-[65vh] relative rounded-t-sm overflow-hidden hover:shadow-md "
            >
              <Link to={`/product/${item._id}`} key={index}>
                <img
                  src={`https://jsshop.onrender.com/uploads/${item?.file?.toString()}`}
                  alt="best seller product"
                  onMouseEnter={() => hoverImageToChange(index)}
                  onMouseLeave={() => hoverImageToChangeLeave(index)}
                  id="hover"
                  loading="lazy"
                  className={`absolute w-full h-full object-cover cursor-pointer transition duration-500 ease-in-out ${
                    hover[index]
                      ? "opacity-0 translate-x-10"
                      : "opacity-100 translate-x-0 "
                  }`}
                />
                <img
                  src={hoverImage[index]?.image}
                  alt=""
                  onMouseEnter={() => hoverImageToChange(index)}
                  onMouseLeave={() => hoverImageToChangeLeave(index)}
                  id="hover"
                  className={` w-full h-full object-cover cursor-pointer transition duration-500 ease-in-out  ${
                    hover[index]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-10"
                  }`}
                />
              </Link>
            </div>

            {/* description */}

            <div className="px-4 py-2 cursor-pointer rounded-b-sm bg-accent-dark text-white dark:bg-soft-dark dark:text-text-dark">
              <div className="font-semibold text-base sm:text-lg">
                <p>{item.name}</p>
              </div>

              <div className="flex flex-row gap-2 items-center font-extralight">
                <p>
                  {item.color} <span>|</span>
                </p>
                <div
                  className={`w-5 h-5 ${
                    item.color === "Black" ? "bg-black" : ""
                  } ${
                    item.color === "White" ? "bg-white border" : ""
                  } rounded-full`}
                  style={{
                    backgroundColor:
                      item.color !== "Black" && item.color !== "White"
                        ? item.color
                        : "",
                  }}
                ></div>
              </div>

              <div className="flex flex-row justify-between items-center font-light mt-1">
                <p className="text-lg sm:text-xl">
                  {formatCurrency(item.price)}
                </p>
                {user.user.role === "admin" ? (
                  <Link to={`/admin/productlist`}>
                    <button className="flex flex-row items-center gap-2 rounded-sm bg-primary text-white px-4 py-1 cursor-pointer hover:bg-button transition duration-300 ease-in-out">
                      Manage item
                      <MdLockOutline className="text-xl" />
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      const productToAdd = {
                        productId: item._id,
                        name: item.name,
                        price: item.price,
                        image: item.file?.toString(),
                        quantity: 1,
                      };
                      handleAddToCart(productToAdd);
                    }}
                    className="flex flex-row items-center gap-2 bg-primary dark:bg-accent-dark text-white px-4 py-1 cursor-pointer rounded-sm hover:bg-button transition duration-300 ease-in-out"
                  >
                    Add to cart
                    <BsCart4 className="text-xl" />
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <ConfirmDialog confirmDialogRef={confirmDialog} />
    </div>
  );
};
export default BestSeller;
