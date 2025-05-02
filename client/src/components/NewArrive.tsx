import { useState, useEffect, useRef } from "react";
import { FormProductType } from "../utils/type";
import { getData } from "../functions/product";
import { formatCurrency } from "../functions/formatDateAndTime";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import useAddToCart from "../functions/AddToCart";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { MdLockOutline } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { SkeletonCardLarge } from "./Skeleton";

const NewArrive = () => {
  const [hover, setHover] = useState<boolean[]>([false, false, false, false]);
  const [data, setData] = useState<FormProductType[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const confirmDialog = useRef<HTMLDialogElement>(null);
  const handleAddToCart = useAddToCart({ confirmDialog });
  const hoverImageToChange = (index: number) => {
    const newHover = [...hover];
    newHover[index] = true;
    setHover(newHover);
  };

  const getDataProduct = async () => {
    try {
      const response = await getData();
      const selectData = response.data.filter((item: FormProductType) =>
        item.tag.includes("New Arrival")
      );
      setData(selectData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataProduct();
  }, []);

  const hoverImage = [
    { image: "/newArrive3.jpg" },
    { image: "/newArrive4.jpg" },
    { image: "/newArrive2.jpg" },
    { image: "/newArrive1.jpg" },
  ];
  const hoverImageToChangeLeave = (index: number) => {
    const newHover = [...hover];
    newHover[index] = false;
    setHover(newHover);
  };

  return (
    <div className="container mx-auto relative px-12 lg:px-10 xl:px-0">
      <div className="flex flex-col w-full h-full text-4xl font-semibold pt-16 pb-8 md:py-16  items-center justify-center text-black dark:text-text-dark">
        <h1>New Arrivals</h1>
        <p className="text-base sm:text-xl font-extralight mt-4 ">
          Discover the latest fashion trends
        </p>
      </div>

      {/* swiper */}
      {data.length !== 0 ? (
        <>
          <div className="w-48 lg:w-60 xl:w-96 h-48 hidden lg:block absolute xl:top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#783B1C"
                d="M46.8,-80.7C61.1,-72.7,73.7,-61.2,81.8,-47.2C89.9,-33.2,93.6,-16.6,93.1,-0.3C92.7,16.1,88.1,32.2,79.5,45.2C70.8,58.3,58.1,68.5,44.2,75.8C30.2,83.2,15.1,87.8,-0.5,88.6C-16.1,89.4,-32.1,86.5,-46,79.1C-59.9,71.7,-71.6,59.9,-79.9,46C-88.2,32,-93.2,16,-93.5,-0.2C-93.8,-16.4,-89.4,-32.7,-80.7,-46C-72,-59.3,-59.1,-69.6,-44.9,-77.7C-30.7,-85.8,-15.4,-91.7,0.4,-92.4C16.2,-93.1,32.4,-88.6,46.8,-80.7Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          <div className="w-48 lg:w-60 xl:w-96 h-48 hidden lg:block absolute top-1/2  right-0 transform translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#783B1C"
                d="M36.8,-72.4C43.5,-60,41.7,-41.5,50.4,-28.5C59,-15.4,77.9,-7.7,82.5,2.6C87.1,13,77.3,26,65.6,33.7C53.9,41.4,40.3,43.9,29.1,45.2C17.9,46.5,8.9,46.6,-1.7,49.5C-12.3,52.4,-24.6,58.2,-37.5,57.9C-50.4,57.5,-63.9,51.1,-71.8,40.4C-79.8,29.8,-82.2,14.9,-83.1,-0.6C-84.1,-16,-83.6,-32,-75.3,-42C-67,-52,-50.8,-55.9,-36.9,-64.2C-23.1,-72.5,-11.5,-85.2,1.8,-88.3C15.1,-91.4,30.2,-84.9,36.8,-72.4Z"
                transform="translate(100 100)"
              />
            </svg>
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
                      src={typeof item?.file === "string" ? item.file : ""}
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
                      alt="newarrive product"
                      loading="lazy"
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
                        className="flex flex-row items-center gap-2  bg-primary dark:bg-accent-dark text-white px-4 py-1 cursor-pointer rounded-sm hover:bg-button transition duration-300 ease-in-out"
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
        </>
      ) : (
        <>
          <div className="hidden lg:flex h-[70vh] justify-center ">
            <SkeletonCardLarge />
            <SkeletonCardLarge />
            <SkeletonCardLarge />
            <SkeletonCardLarge />
          </div>
          <div className="lg:hidden flex h-[70vh] ">
            <SkeletonCardLarge />
          </div>
        </>
      )}

      {/* swiper */}

      <ConfirmDialog confirmDialogRef={confirmDialog} />
    </div>
  );
};
export default NewArrive;
