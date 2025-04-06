import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PublicHeader from "../../layout/PublicHeader";
import { TiShoppingCart } from "react-icons/ti";
import { getData } from "../../functions/product";
import { FormProductType } from "../../utils/type";
import { formatCurrency } from "../../functions/formatDateAndTime";
import { AiFillInfoCircle, AiOutlineHome } from "react-icons/ai";
import { SkeletonCard } from "../../components/Skeleton";
import { Breadcrumb, FloatButton } from "antd";
import { categories } from "../../utils/categories";
import { CustomCheckboxBox } from "../../components/CustomCheckbox";
import { TbFilterCheck } from "react-icons/tb";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog";
import useAddToCart from "../../functions/AddToCart";
import { BsChevronDoubleUp } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { MdLockOutline } from "react-icons/md";

const AllProduct = () => {
  const [allProduct, setAllProduct] = useState<FormProductType[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [checkValue, setCheckValue] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const gender = query.get("gender");
  const confirmDialog = useRef<HTMLDialogElement>(null);
  const handleAddToCart = useAddToCart({ confirmDialog });

  window.scrollTo(0, 0);

  const getAllProduct = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await getData()
        .then((res) => {
          setAllProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleCheckValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckValue([...checkValue, value]);
    } else {
      setCheckValue(checkValue.filter((item) => item !== value));
    }
  };

  const filteredProduct = allProduct?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      checkValue.every((value) => item.category.includes(value)) &&
      (gender ? item.gender === gender : true)
  );
  console.log(filteredProduct);

  return (
    <>
      <div className="flex-col flex w-full  overflow-hidden">
        <PublicHeader classname="bg-background  dark:bg-soft-dark dark:text-text-dark md:bg-transparent w-full md:static border-b border-gray-600 shadow-md p-1 "></PublicHeader>
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
              },
            ]}
          />
        </div>

        {filteredProduct ? (
          <div className=" text-white font-semibold flex justify-center text-lg md:text-2xl p-2 bg-primary dark:bg-soft-dark mb-4">
            <h1>Product Found {filteredProduct?.length} Items. </h1>
          </div>
        ) : null}
        <div className="container mx-auto w-full h-full flex flex-col lg:flex-row gap-2 px-4 lg:p-2">
          {/* ------------------------------- Search ------------------------------ */}
          <div className="w-full lg:w-1/4 max-h-fit p-2 bg-stone-200 dark:bg-soft-dark  rounded-md flex flex-col gap-4">
            <div className="flex flex-row gap-2 justify-center items-center text-xl lg:text-2xl font-semibold bg-primary dark:bg-accent-dark text-white p-2 rounded-md">
              <h4>Filter</h4>
              <TbFilterCheck />
            </div>
            {/* Search by name */}
            <div>
              <label className=" text-gray-700 dark:text-white font-semibold">
                Search By Name:
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-white border-1 border-gray-300 mt-2 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Search by Category */}
            <div>
              <label className=" text-gray-700 dark:text-white font-semibold">
                Search By Category:
              </label>
              <div className="flex flex-row flex-wrap gap-2 mt-2">
                {categories?.map((category, index) => (
                  <CustomCheckboxBox
                    key={index}
                    htmlFor={category}
                    id={category}
                    value={category}
                    name="category"
                    label={category}
                    checkedValue={checkValue.includes(category)}
                    onChange={handleCheckValue}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* ------------------------------- Product ------------------------------ */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4">
              {allProduct ? (
                filteredProduct?.map((product, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-300 dark:border-none  w-full h-[50vh] lg:h-[60vh] rounded-md overflow-hidden cursor-pointer shadow-lg relative"
                  >
                    <div className="w-full h-[70%] ">
                      <img
                        src={`https://jsshop.onrender.com/uploads/${product?.file?.toString()}`}
                        alt="product image"
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out "
                      />
                    </div>
                    {/* detail */}
                    <div className="flex flex-col gap-1 py-3 px-2 h-full dark:bg-soft-dark dark:text-text-dark">
                      <p className="text-xs max-[400px]:text-[10px] lg:text-sm font-medium">
                        {product.name}
                      </p>
                      <hr className="border border-gray-300 dark:border-gray-600" />
                      <div className="flex gap-2 justify-between items-center text-xs lg:text-sm">
                        <p>{formatCurrency(product.price)}</p>
                        <Link
                          to={
                            product.tag.includes("Sale")
                              ? `/productdiscount/${product._id}`
                              : `/product/${product._id}`
                          }
                        >
                          <button className="text-xs sm:text-sm max-[361px]:text-[10px] flex flex-row items-center gap-2 justify-center w-full rounded-md cursor-pointer text-primary dark:text-white underline hover:scale-102 transition-all duration-300 ease-in-out">
                            <p>More Detail</p>
                            <AiFillInfoCircle className="text-xs sm:text-base dark:text-accent-dark" />
                          </button>
                        </Link>
                      </div>

                      <div className="flex flex-row items-center justify-center gap-2 mt-2">
                        {user.user.role === "admin" ? (
                          <Link to={`/admin/productlist`} className="w-full">
                            <div className="w-full h-full p-2 rounded-md gap-2 flex items-center justify-center bg-accent dark:bg-accent-dark text-white hover:bg-button  transition-all duration-300 ease-in-out">
                              Manage product
                              <MdLockOutline size={26} />
                            </div>
                          </Link>
                        ) : (
                          <div
                            onClick={() => {
                              const productToAdd = {
                                productId: product._id,
                                name: product.name,
                                price: product.price,
                                image: product.file?.toString(),
                                quantity: 1,
                              };
                              handleAddToCart(productToAdd);
                            }}
                            className="w-full h-full p-2 rounded-md gap-2 flex items-center justify-center bg-accent dark:bg-accent-dark text-white hover:bg-button  transition-all duration-300 ease-in-out"
                          >
                            Add to cart
                            <TiShoppingCart size={26} />
                          </div>
                        )}
                      </div>
                    </div>
                    {product.tag.includes("Sale") && (
                      <div className="absolute top-0 right-0 bg-button rounded-bl-lg text-white font-semibold px-2 py-1">
                        Sale
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <SkeletonCard></SkeletonCard>
                  <SkeletonCard></SkeletonCard>
                  <SkeletonCard></SkeletonCard>
                  <SkeletonCard></SkeletonCard>
                </>
              )}
            </div>
            {filteredProduct?.length === 0 && (
              <div className="w-full h-full flex justify-center">
                <p className="text-2xl md:text-4xl font-semibold dark:text-white">
                  "No Product Found"
                </p>
              </div>
            )}
          </div>
        </div>

        <ConfirmDialog confirmDialogRef={confirmDialog} />
      </div>
      <FloatButton.BackTop icon={<BsChevronDoubleUp />} />
    </>
  );
};
export default AllProduct;
