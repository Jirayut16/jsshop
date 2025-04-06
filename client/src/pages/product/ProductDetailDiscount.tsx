import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneData } from "../../functions/product";
import { FormProductType } from "../../utils/type";
import ReviewFrom from "../../components/ReviewFrom";
import PublicHeader from "../../layout/PublicHeader";
import { Breadcrumb, Divider, InputNumber } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { formatCurrency } from "../../functions/formatDateAndTime";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import ConfirmDialog from "../../components/ConfirmDialog";
import useAddToCart from "../../functions/AddToCart";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { MdLockOutline } from "react-icons/md";

const ProductDetailDiscount = () => {
  const confirmDialog = useRef<HTMLDialogElement>(null);
  const handleAddToCart = useAddToCart({ confirmDialog });
  const user = useSelector((state: RootState) => state.user);

  const [quantity, setQuantity] = useState<number>(1);
  const [productDetail, setProductDetail] = useState<FormProductType>(
    {} as FormProductType
  );
  const { id } = useParams();
  // console.log("id", id);

  const getProductDetail = async () => {
    try {
      getOneData(id).then((res) => {
        setProductDetail(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log("productDetail", productDetail);

  useEffect(() => {
    getProductDetail();
    window.scrollTo(0, 0);
  }, []);

  const handleUpdateQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => prev - 1);
  };
  // console.log("quantity", quantity);
  const getDiscount = (price: number, discount: number) => {
    const discountPrice = (price * discount) / 100;
    const finalPrice = price - discountPrice;
    return finalPrice;
  };

  return (
    <>
      {/* 😁 Navbar */}
      <nav>
        <PublicHeader classname="bg-background dark:bg-soft-dark dark:text-text-dark md:bg-transparent w-full md:static border-b border-gray-600 shadow-md p-1 "></PublicHeader>
      </nav>
      {/* 😁 Breadcrumb */}
      <div className="container mx-4 sm:mx-auto my-4">
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
              title: "Product",
              href: "/allproduct",
            },
            {
              title: ":gender",
            },
            {
              title: ":name",
            },
          ]}
          params={{ gender: productDetail.gender, name: productDetail.name }}
        />
      </div>

      {/* 😁show product */}

      <div className="container mx-auto p-4 bg-white dark:bg-soft-dark rounded-sm shadow-md">
        <div className="flex flex-row gap-4 sm:gap-8 w-full h-full">
          <div className="w-1/3 sm:w-1/2 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-start lg:justify-center items-start lg:items-center">
            <div className="w-full h-[25vh] sm:h-[80vh] flex justify-center items-center">
              <img
                src={`http://localhost:8080/uploads/${productDetail?.file?.toString()}`}
                alt=""
                className="h-full object-cover rounded-sm"
              />
            </div>

            {/* 😁 Quantity mobile */}
            <div className="flex flex-row gap-1 items-center sm:hidden">
              <button
                type="button"
                className="flex justify-center items-center rounded-full"
                onClick={handleDecreaseQuantity}
                disabled={quantity === 1}
              >
                <FaMinusSquare
                  className={`text-2xl h-10 text-button dark:text-accent-dark ${
                    quantity === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105 hover:text-red-500 cursor-pointer "
                  }  duration-300 transition-all ease-in-out`}
                />
              </button>
              <InputNumber
                min={1}
                max={10}
                value={quantity}
                defaultValue={1}
                size="small"
                style={{
                  width: "100%",
                  border: "1px solid black",
                  fontSize: "15px",
                }}
              />
              <button
                type="button"
                className="flex justify-center items-center w rounded-full"
                onClick={handleUpdateQuantity}
                disabled={quantity === 10}
              >
                <FaPlusSquare
                  className={`text-2xl h-10 text-button dark:text-accent-dark  ${
                    quantity === 10
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105 hover:text-red-500 cursor-pointer "
                  }  duration-300 transition-all ease-in-out`}
                />
              </button>
            </div>
            <p className="text-xs max-[400px]:text-[10px] -mt-4 font-light  text-button sm:hidden">
              **Maximum 10 pieces
            </p>
            {/* 😁 Quantity mobile */}

            {/* Add to cart mobile */}
            {user.user.role === "admin" ? (
              <Link to={`/admin/productlist`}>
                <button className="flex sm:hidden justify-center items-center gap-2 bg-button shadow-md text-white w-full rounded-md py-1  text-sm cursor-pointer hover:bg-red-700 transition duration-300 ease-in-out">
                  Manage item
                  <MdLockOutline className="text-xl" />
                </button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  const productToAdd = {
                    productId: productDetail._id,
                    name: productDetail.name,
                    price: productDetail.price,
                    image: productDetail.file?.toString(),
                    quantity: quantity,
                  };
                  handleAddToCart(productToAdd);
                }}
                className="flex sm:hidden justify-center items-center gap-2 bg-button shadow-md text-white w-full rounded-md py-1  text-sm max-[400px]:text-xs cursor-pointer hover:bg-red-700 transition duration-300 ease-in-out"
              >
                Add to cart
                <BsCart4 size={20} className="text-white " />
              </button>
            )}
            {/* Add to cart mobile */}
          </div>

          <div className="w-2/3 sm:w-1/2 flex flex-col gap-2  justify-between font-semibold dark:text-white dark:bg-soft-dark ">
            <div className="text-lg text-start sm:text-xl lg:text-2xl xl:text-4xl  uppercase">
              <p>{productDetail.name}</p>
            </div>
            <div>
              <p className="text-xs sm:text-base lg:text-lg ">
                About product:
                <span className="font-extralight">{productDetail.detail}</span>
              </p>
            </div>
            <div>
              <p className="flex items-center gap-0 sm:gap-2 text-sm sm:text-xl  ">
                Price:
                <span className="font-extralight text-[10px] me-1 sm:text-lg  line-through">
                  {formatCurrency(productDetail.price)} (THB)
                </span>
                <span className="text-red-500  text-xs sm:text-lg font-semibold ">
                  {" "}
                  {formatCurrency(
                    getDiscount(
                      productDetail.price,
                      productDetail.discountPercent
                    )
                  )}{" "}
                  (THB)
                </span>
              </p>
            </div>
            <div>
              <p className="flex flex-row flex-wrap items-center gap-2 text-xs sm:text-lg">
                Category:
                {productDetail?.category?.map((category, index) => (
                  <span
                    key={index}
                    className="font-extralight bg-primary dark:bg-accent-dark text-white rounded-md px-2 py-1"
                  >
                    {category}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p className="flex flex-row flex-wrap items-center gap-2 text-xs sm:text-lg">
                Tag:
                {productDetail?.tag?.map((tag, index) => (
                  <span
                    key={index}
                    className="font-extralight bg-primary dark:bg-accent-dark text-white rounded-md px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-16">
              <p className="flex flex-row items-center gap-2 text-xs sm:text-lg">
                Color:
                <span className="font-extralight">{productDetail.color} |</span>
                <div
                  className={`w-5 h-5 border  ${
                    productDetail.color === "Black" ? "bg-black" : ""
                  } ${
                    productDetail.color === "White" ? "bg-white border" : ""
                  } rounded-md`}
                  style={{
                    backgroundColor:
                      productDetail.color !== "Black" &&
                      productDetail.color !== "White"
                        ? productDetail.color
                        : "",
                  }}
                ></div>
              </p>
              <p className="text-xs sm:text-lg">
                Size:
                <span className="font-extralight">{productDetail.size}</span>
              </p>
            </div>

            <div className="hidden sm:flex flex-row gap-1 items-center">
              <p className="text-lg">Quantity:</p>
              <button
                type="button"
                className="flex justify-center items-center rounded-full"
                onClick={handleDecreaseQuantity}
                disabled={quantity === 1}
              >
                <FaMinusSquare
                  className={`text-4xl h-10 text-button dark:text-accent-dark ${
                    quantity === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105 hover:text-red-500 cursor-pointer "
                  }  duration-300 transition-all ease-in-out`}
                />
              </button>
              <InputNumber
                min={1}
                max={10}
                value={quantity}
                defaultValue={1}
                size="large"
                style={{
                  width: "30%",
                  border: "1px solid black",
                  fontSize: "20px",
                }}
              />
              <button
                type="button"
                className="flex justify-center items-center w rounded-full"
                onClick={handleUpdateQuantity}
                disabled={quantity === 10}
              >
                <FaPlusSquare
                  className={`text-4xl h-10 text-button dark:text-accent-dark  ${
                    quantity === 10
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105 hover:text-red-500 cursor-pointer "
                  }  duration-300 transition-all ease-in-out`}
                />
              </button>
              <p className="text-sm font-light  text-button">
                **Maximum 10 pieces
              </p>
            </div>

            <div>
              <p className="text-sm sm:text-lg mt-1">
                Stock:
                <span className="font-extralight">{productDetail.stock}</span>
              </p>
            </div>

            {user.user.role === "admin" ? (
              <Link to={`/admin/productlist`}>
                <button className="hidden sm:flex justify-center items-center gap-2 bg-button shadow-md text-white w-full rounded-md py-2  text-xl cursor-pointer hover:bg-red-700 transition duration-300 ease-in-out">
                  Manage item
                  <MdLockOutline className="text-xl" />
                </button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  const productToAdd = {
                    productId: productDetail._id,
                    name: productDetail.name,
                    price: productDetail.price,
                    image: productDetail.file?.toString(),
                    quantity: quantity,
                  };
                  handleAddToCart(productToAdd);
                }}
                className="hidden sm:flex justify-center items-center gap-2 bg-button shadow-md text-white w-full rounded-md py-2  text-xl cursor-pointer hover:bg-red-700 transition duration-300 ease-in-out"
              >
                Add to cart
                <BsCart4 size={26} className="text-white " />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-4">
        <Divider style={{ borderColor: "gray" }}></Divider>
      </div>
      {/* review form */}
      <ReviewFrom></ReviewFrom>
      <ConfirmDialog confirmDialogRef={confirmDialog} />
    </>
  );
};
export default ProductDetailDiscount;
