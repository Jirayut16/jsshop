import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDataEdit, updateData } from "../functions/product";
import { FormEditProps } from "../utils/type";
import { categories } from "../utils/categories";
import { tags } from "../utils/tags";
import { gender } from "../utils/genders";
import { shirt_size } from "../utils/shirt_size";
import { plant_size } from "../utils/plant_size";
import { shoe_size } from "../utils/shoe_size";
import { colors } from "../utils/colors";
import CustomCheckbox from "./CustomCheckbox";
import CustomRadio from "./CustomRadio";
import UploadFileButton from "./UplaodFileButton";
import { UploadFile } from "antd";
import {
  ValidateArrayType,
  ValidateNumberType,
  ValidateNumberTypeForPercentage,
  ValidateRadioType,
  ValidateTextType,
} from "./ValidateAddProductForm";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import { GrDocumentUpdate } from "react-icons/gr";

const EditProductForm = () => {
  const [data, setData] = useState<FormEditProps>({
    name: "",
    detail: "",
    price: "",
    discountPercent: "",
    file: "",
    category: [],
    gender: "",
    size: "",
    color: "",
    tag: [],
    stock: 0,
  });
  // console.log(data);

  const { id } = useParams();

  const navigate = useNavigate();
  const [fileold, setFileold] = useState();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async (id: string | undefined) => {
    getDataEdit(id) //เรียกใช้ api
      .then((res) => {
        setData(res.data);
        setFileold(res.data.file);
      })
      .catch((err) => console.log(err));
  };

  // console.log("fileold", fileold);

  useEffect(() => {
    loadData(id);
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //เช็คไฟล์
    if (
      e.target.name === "file" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const propName = e.target.name as keyof typeof data;
      setData({ ...data, [propName]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value }); //เก็บไว้ใน array มี objectเป็น  {name: 'df', detail: 'sdf', price: 'sdf'}
    }
  };

  const handleFileChange = (files: UploadFile[]) => {
    console.log(files);
    setFileList(files);
    setData({ ...data, file: files[0].originFileObj });
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value, checked } = e.target;
    if (checked) {
      setData({ ...data, [field]: [...data.category, value] });
    } else {
      setData({
        ...data,
        [field]: data.category.filter((item) => item !== value),
      });
    }
  };
  const handleTagChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value, checked } = e.target;
    if (checked) {
      setData({ ...data, [field]: [...data.tag, value] });
    } else {
      setData({
        ...data,
        [field]: data.tag.filter((item) => item !== value),
      });
    }
  };

  // console.log("data.file", data.file);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // console.log(data);
    // console.log(fileold);
    // console.log("fileold", fileold);

    const formWithImageData = new FormData();
    formWithImageData.append("name", data.name);
    formWithImageData.append("detail", data.detail);
    formWithImageData.append("price", data.price);
    formWithImageData.append("discountPercent", data.discountPercent);
    formWithImageData.append("file", data.file ?? "");
    formWithImageData.append("gender", data.gender);
    formWithImageData.append("size", data.size);
    formWithImageData.append("color", data.color);
    formWithImageData.append("tag", JSON.stringify(data.tag));
    formWithImageData.append("category", JSON.stringify(data.category));
    formWithImageData.append("stock", data.stock.toString());

    if (fileold) {
      formWithImageData.append("fileold", fileold);
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await updateData(id, formWithImageData);
      console.log("Update Product:", res.data);

      toast.success("Product edited successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      if (res) {
        navigate("/admin/productlist");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {/* form */}
        <div className="flex flex-col px-16 py-8 bg-gray-100 border-2 border-gray-200">
          <div className="flex justify-center mb-8 text-3xl font-semibold ">
            <h1>Edit Product Form</h1>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="z-20"
          >
            {/*------------------- Name & Price ------------------ */}
            <div className="flex flex-row w-full justify-between gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="text-lg font-semibold">
                  1. Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  onChange={handleChange}
                  className="bg-white border-1 border-gray-300 px-4 py-2 mt-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
                  required
                  value={data.name}
                />

                <ValidateTextType value={data.name} text="name" />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="price" className="text-lg font-semibold">
                  2. Product Price (THB) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Product Price"
                  min={0}
                  onChange={handleChange}
                  className="bg-white border-1 border-gray-300 px-4 py-2 mt-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
                  required
                  value={data.price}
                />
                <ValidateNumberType
                  value={+data.price.valueOf()}
                  text="price"
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="discountPercent"
                  className="text-lg font-semibold"
                >
                  3. Discount Price % <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="discountPercent"
                  placeholder="Discount Price %"
                  min={0}
                  onChange={handleChange}
                  className="bg-white border-1 border-gray-300 px-4 py-2 mt-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
                  required
                  value={data.discountPercent}
                />
                <ValidateNumberTypeForPercentage
                  value={+data.discountPercent.valueOf()}
                />
              </div>
            </div>

            {/*------------------- Detail ------------------ */}
            <div className="flex flex-row w-full mt-5">
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="text-lg font-semibold">
                  4. Product Detail <span className="text-red-500">*</span>
                </label>

                <textarea
                  rows={10}
                  name="detail"
                  placeholder="Product Detail"
                  onChange={handleChange}
                  className="bg-white border-1 border-gray-300 px-4 py-2 mt-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
                  required
                  maxLength={500}
                  value={data.detail}
                ></textarea>
                {data.detail.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {data.detail.length}/500
                  </span>
                )}
                <ValidateTextType value={data.detail} text="detail" />
              </div>
            </div>

            {/*------------------- Category ------------------ */}
            <div className="mt-5">
              <label htmlFor="name" className="text-lg font-semibold ">
                5. Product Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {categories.map((category, index) => (
                  <CustomCheckbox
                    htmlFor={`category-${index}`}
                    index={index}
                    name="category"
                    id={`category-${index}`}
                    value={category}
                    onChange={(e) => handleCategoryChange(e, "category")}
                    checkedValue={data.category.includes(category)}
                    label={category}
                  />
                ))}
              </div>
              <ValidateArrayType value={data.category.length} text="category" />
            </div>
            {/*------------------- Tag ------------------ */}
            <div className="mt-5">
              <label htmlFor="tag" className="text-lg font-semibold ">
                6. Product Tags: <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {tags.map((tag, index) => (
                  <CustomCheckbox
                    htmlFor={`tag-${index}`}
                    index={index}
                    name="tag"
                    id={`tag-${index}`}
                    value={tag}
                    onChange={(e) => handleTagChange(e, "tag")}
                    checkedValue={data.tag.includes(tag)}
                    label={tag}
                  />
                ))}
              </div>
              <ValidateArrayType value={data.tag.length} text="tag" />
            </div>

            {/* ------------------- Gender ------------------ */}
            <div className="mt-5">
              <label htmlFor="gender" className="text-lg font-semibold ">
                7. Product Gender: <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {gender.map((gender, index) => (
                  <CustomRadio
                    htmlFor={`gender-${index}`}
                    index={index}
                    name="gender"
                    id={`gender-${index}`}
                    value={gender}
                    onChange={handleChange}
                    checkedValue={data.gender === gender}
                    label={gender}
                  />
                ))}
              </div>
              <ValidateRadioType value={data.gender} text="gender" />
            </div>

            {/* ------------------- Size ------------------ */}
            <div className="mt-5">
              <label htmlFor="size" className="text-lg font-semibold ">
                8. Product Size: <span className="text-red-500">*</span>
              </label>
              <h4 className="text-md font-semibold mt-2">8.1 Size For Shirt</h4>

              <div className="grid grid-cols-3 gap-4 mt-2">
                {shirt_size.map((size, index) => (
                  <CustomRadio
                    htmlFor={`shirt_size-${index}`}
                    index={index}
                    name="size"
                    id={`shirt_size-${index}`}
                    value={size}
                    onChange={handleChange}
                    checkedValue={data.size === size}
                    label={size}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-md font-semibold mt-2">
                8.2 Size For Pants(Waist/Inches)
              </h4>

              <div className="grid grid-cols-3 gap-4 mt-2">
                {plant_size.map((size, index) => (
                  <CustomRadio
                    htmlFor={`plant_size-${index}`}
                    index={index}
                    name="size"
                    id={`plant_size-${index}`}
                    value={size}
                    onChange={handleChange}
                    checkedValue={data.size === size}
                    label={size}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-md font-semibold mt-2">8.3 Size For Shoes</h4>

              <div className="grid grid-cols-3 gap-4 mt-2">
                {shoe_size.map((size, index) => (
                  <CustomRadio
                    htmlFor={`shoe_size-${index}`}
                    index={index}
                    name="size"
                    id={`shoe_size-${index}`}
                    value={size}
                    onChange={handleChange}
                    checkedValue={data.size === size}
                    label={size}
                  />
                ))}
              </div>
              <ValidateRadioType value={data.size} text="size" />
            </div>

            {/* ------------------- Color ------------------ */}
            <div className="mt-5">
              <label htmlFor="color" className="text-lg font-semibold ">
                9. Product Color: <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-3 gap-4 mt-2">
                {colors.map((color, index) => (
                  <CustomRadio
                    htmlFor={`color-${index}`}
                    index={index}
                    name="color"
                    id={`color-${index}`}
                    value={color}
                    onChange={handleChange}
                    checkedValue={data.color === color}
                    label={color}
                  />
                ))}
              </div>
              <ValidateRadioType value={data.color} text="color" />
            </div>

            {/* ------------------- Stock & Image ------------------ */}
            <div className="flex flex-row w-full justify-between gap-4 mt-5">
              <div className="flex flex-col w-1/2">
                <label htmlFor="stock" className="text-lg font-semibold">
                  10. Product Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  placeholder="Product Stock"
                  min={0}
                  onChange={handleChange}
                  className="bg-white border-1 border-gray-300 px-4 py-2 mt-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
                  required
                  value={data.stock}
                />
                <ValidateNumberType value={data.stock} text="stock" />
              </div>

              {/* เพิ่มรูป */}
              <div className="flex flex-col w-1/2 justify-center items-center ">
                <label htmlFor="image" className="text-lg font-semibold">
                  11. Product Image <span className="text-red-500">*</span>
                </label>

                <UploadFileButton
                  onFileChange={handleFileChange}
                  fileList={fileList}
                />
              </div>
            </div>

            <div className="flex flex-row justify-center w-full items-center gap-8">
              {loading ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-200 text-white flex flex-row gap-2 justify-center items-center font-semibold text-lg w-64 px-4 py-2 rounded-md mt-8 transition-all duration-300 ease-in-out cursor-progress"
                >
                  <GrDocumentUpdate className="text-2xl animate-spin" />
                  Updating...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-button text-white flex flex-row gap-2 justify-center items-center font-semibold text-lg w-64 px-4 py-2 rounded-md mt-8 hover:bg-red-500 transition-all duration-300 ease-in-out cursor-pointer"
                >
                  <GrDocumentUpdate className="text-2xl" />
                  Update Product
                </button>
              )}
            </div>
          </form>
        </div>

        {/* list */}
      </div>
    </>
  );
};
export default EditProductForm;
