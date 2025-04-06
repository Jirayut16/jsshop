import FlashSale from "./FlashSale";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/navigation";
import { Pagination, Grid, Navigation } from "swiper/modules";
import { FormProductType } from "../utils/type";
import { useEffect, useState } from "react";
import { getData } from "../functions/product";
import { formatCurrency } from "../functions/formatDateAndTime";
import { Link } from "react-router-dom";

const SpecialDeal = () => {
  const [data, setData] = useState<FormProductType[]>([]);
  const getDataProduct = async () => {
    try {
      const res = await getData();
      const selectedData = res.data.filter((item: FormProductType) =>
        item.tag.includes("Sale")
      );
      setData(selectedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataProduct();
  }, []);

  const getDiscount = (price: number, discount: number) => {
    const discountPrice = (price * discount) / 100;
    const finalPrice = price - discountPrice;
    return finalPrice;
  };

  return (
    <div className="w-full h-full lg:h-[90vh] flex flex-col lg:flex-row gap-2 mt-20">
      {/* left */}
      <div className="w-full lg:w-1/2 h-full">
        <div className="relative w-full h-full">
          <img
            src="/sale2.jpg"
            alt="sale picture"
            loading="lazy"
            className="w-full h-full object-cover shadow-lg"
          />
          <div className="absolute inset-0 w-full text-center">
            <FlashSale />
          </div>
        </div>
      </div>

      {/* right */}
      <div className="w-full lg:w-1/2 h-full px-12 lg:p-0">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Grid, Pagination, Navigation]}
          className="mySwiper w-full h-[80vh] lg:h-full"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col w-full h-full group lg:border lg:border-gray-300">
                <div className="bg-white w-full h-2/3 ">
                  <img
                    src={`https://jsshop.onrender.com/uploads/${item?.file?.toString()}`}
                    alt="product picture"
                    className="w-full h-full object-cover"
                  />
                  <div className="w-20 h-16 flex justify-center items-center bg-button text-white text-lg font-semibold absolute top-0 right-0">
                    {item.discountPercent}%
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full lg:h-1/3 px-4 py-2 bg-accent-dark text-white">
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="font-extralight text-sm">
                      Stock:{item.stock}
                    </p>
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
                  <div>
                    <p className="hidden lg:line-clamp-3 text-sm font-extralight">
                      {item.detail}
                    </p>
                  </div>

                  <div className="flex flex-row gap-4 justify-between items-center mt-2">
                    <p className="text-xl line-through font-extralight text-black">
                      {formatCurrency(item.price)}
                    </p>
                    <p className="text-xl font-medium bg-white px-2 text-button">
                      {formatCurrency(
                        getDiscount(item.price, item.discountPercent)
                      )}
                    </p>
                  </div>
                </div>

                <div className="absolute cursor-pointer inset-0 w-full h-[73vh] lg:h-full bg-black opacity-0 scale-80 transition-all duration-300 ease-in-out group-hover:opacity-90 group-hover:scale-100 flex justify-center items-center">
                  <Link to={`/productdiscount/${item._id}`}>
                    <p className="text-2xl text-white font-light  hover:text-accent hover:font-semibold">
                      View Product
                    </p>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default SpecialDeal;
