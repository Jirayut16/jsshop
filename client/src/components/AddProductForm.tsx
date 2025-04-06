import React, { useState } from "react";
import { create } from "../functions/product";
import { FormProductType } from "../utils/type";
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
import { VscClearAll } from "react-icons/vsc";
import { IoBagAddOutline } from "react-icons/io5";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";

const AddProductForm = () => {
  const [form, setForm] = useState<FormProductType>({
    name: "",
    detail: "",
    price: 0,
    discountPercent: 0,
    file: "",
    category: [],
    gender: "",
    size: "",
    color: "",
    tag: [],
    stock: 0,
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    const { name, value } = e.target;

    // checkbox
    if (name === "category") {
      setForm((prev) => ({
        ...prev,
        [name]: isChecked
          ? [...prev[name], value] // เพิ่มหมวดหมู่
          : prev.category.filter((cat) => cat !== value), // เอาออก
      }));
    } else if (name === "tag") {
      setForm((prev) => ({
        ...prev,
        [name]: isChecked
          ? [...prev[name], value] // เพิ่มหมวดหมู่
          : prev.tag.filter((tag) => tag !== value), // เอาออก
      }));
      // radio
    } else if (name === "gender" || name === "size" || name === "color") {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  console.log(form);

  const handleFileChange = (files: UploadFile[]) => {
    console.log(files);
    setFileList(files);
    setForm({ ...form, file: files[0].originFileObj });
  };
  console.log(fileList);

  const handleClearForm = () => {
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "category") {
        (value as string[]).forEach((cat) => formData.append("category", cat)); // เพิ่ม array ทีละตัว
      } else if (key === "tag") {
        (value as string[]).forEach((tag) => formData.append("tag", tag)); // เพิ่ม array ทีละตัว
      } else {
        formData.append(key, value as string | Blob);
      }
    });
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await create(formData);
      console.log("Created:", res.data);

      toast.success("Product added successfully", {
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

      setTimeout(() => {
        handleClearForm();
      }, 3000);
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
        <div className="flex flex-col p-2 lg:px-16 lg::py-8 bg-gray-100 dark:bg-background-dark border-2 border-gray-200 dark:border-none">
          <div className="flex justify-center mb-8 text-2xl lg:text-4xl font-semibold dark:text-text-dark ">
            <h1>Add Product Form</h1>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="z-20"
          >
            {/*------------------- Name & Price ------------------ */}
            <div className="flex flex-col lg:flex-row w-full justify-between gap-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="name"
                  className="text-lg font-semibold dark:text-text-dark"
                >
                  1. Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  onChange={handleChange}
                  className="bg-white border-1 border-gray-300 px-4 py-2 mt-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
                  required
                />

                <ValidateTextType value={form.name} text="name" />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="price"
                  className="text-lg font-semibold dark:text-text-dark"
                >
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
                />
                <ValidateNumberType value={form.price.valueOf()} text="price" />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="discountPercent"
                  className="text-lg font-semibold dark:text-text-dark"
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
                />
                <ValidateNumberTypeForPercentage
                  value={form.discountPercent.valueOf()}
                />
              </div>
            </div>

            {/*------------------- Detail ------------------ */}
            <div className="flex flex-row w-full mt-5">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="name"
                  className="text-lg font-semibold dark:text-text-dark"
                >
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
                ></textarea>
                {form.detail.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {form.detail.length}/500
                  </span>
                )}
                <ValidateTextType value={form.detail} text="detail" />
              </div>
            </div>

            {/*------------------- Category ------------------ */}
            <div className="mt-5">
              <label
                htmlFor="name"
                className="text-lg font-semibold dark:text-text-dark "
              >
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
                    onChange={handleChange}
                    checkedValue={form.category.includes(category)}
                    label={category}
                  />
                ))}
              </div>
              <ValidateArrayType value={form.category.length} text="category" />
            </div>
            {/*------------------- Tag ------------------ */}
            <div className="mt-5">
              <label
                htmlFor="tag"
                className="text-lg font-semibold dark:text-text-dark"
              >
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
                    onChange={handleChange}
                    checkedValue={form.tag.includes(tag)}
                    label={tag}
                  />
                ))}
              </div>
              <ValidateArrayType value={form.tag.length} text="tag" />
            </div>

            {/* ------------------- Gender ------------------ */}
            <div className="mt-5">
              <label
                htmlFor="gender"
                className="text-lg font-semibold dark:text-text-dark"
              >
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
                    checkedValue={gender === form.gender}
                    label={gender}
                  />
                ))}
              </div>
              <ValidateRadioType value={form.gender} text="gender" />
            </div>

            {/* ------------------- Size ------------------ */}
            <div className="mt-5 dark:text-text-dark">
              <label htmlFor="size" className="text-lg font-semibold">
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
                    checkedValue={size === form.size}
                    label={size}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 dark:text-text-dark">
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
                    checkedValue={size === form.size}
                    label={size}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 dark:text-text-dark">
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
                    checkedValue={size === form.size}
                    label={size}
                  />
                ))}
              </div>
              <ValidateRadioType value={form.size} text="size" />
            </div>

            {/* ------------------- Color ------------------ */}
            <div className="mt-5 dark:text-text-dark">
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
                    checkedValue={color === form.color}
                    label={color}
                  />
                ))}
              </div>
              <ValidateRadioType value={form.color} text="color" />
            </div>

            {/* ------------------- Stock & Image ------------------ */}
            <div className="flex flex-row w-full justify-between gap-4 mt-5">
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="stock"
                  className="text-lg font-semibold dark:text-text-dark"
                >
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
                />
                <ValidateNumberType value={form.stock} text="stock" />
              </div>

              {/* เพิ่มรูป */}
              <div className="flex flex-col w-1/2 justify-center items-center ">
                <label
                  htmlFor="image"
                  className="text-lg font-semibold dark:text-text-dark"
                >
                  11. Product Image <span className="text-red-500">*</span>
                </label>

                <UploadFileButton
                  onFileChange={handleFileChange}
                  fileList={fileList}
                />
                {form.file === "" && (
                  <span className="text-red-500">
                    Please select a product image.
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-row justify-center w-full items-center gap-8">
              <button
                type="button"
                onClick={handleClearForm}
                className="bg-green-500 text-white flex flex-row gap-2 justify-center items-center font-semibold text-sm lg:text-lg w-64 px-4 py-2 rounded-md mt-8 hover:bg-green-600 transition-all duration-300 ease-in-out cursor-pointer"
              >
                <VscClearAll className="text-sm lg:text-2xl" />
                Clear all
              </button>

              {loading ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-200 text-white flex flex-row gap-2 justify-center items-center font-semibold text-lg w-64 px-4 py-2 rounded-md mt-8 transition-all duration-300 ease-in-out cursor-progress"
                >
                  <IoBagAddOutline className="text-sm lg:text-2xl animate-spin" />
                  Adding...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-button text-white flex flex-row gap-2 justify-center items-center font-semibold text-sm lg:text-lg w-64 px-4 py-2 rounded-md mt-8 hover:bg-red-500 transition-all duration-300 ease-in-out cursor-pointer"
                >
                  <IoBagAddOutline className="text-sm lg:text-2xl" />
                  Add Product
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
export default AddProductForm;
