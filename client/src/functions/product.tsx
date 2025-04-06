import axios from "axios";

type Data = {
  name: string;
  detail: string;
  price: number;
  file: string;
};
type DataUpdate = {
  name: string;
  detail: string;
  price: string;
  file: File | string; // file สามารถเป็น File หรือ string (path)
  category: string[];
  gender: string;
  size: string;
  color: string;
  tag: string[];
  _id?: string;
  stock?: number;
};

export const remove = async (id: string) =>
  await axios.delete(import.meta.env.VITE_API + "/product/" + id);

export const create = async (data: Data | FormData) =>
  await axios.post(import.meta.env.VITE_API + "/product/create", data);

export const getData = async () => {
  return await axios.get(import.meta.env.VITE_API + "/product/list");
};
export const getOneData = async (id: string | undefined) => {
  return await axios.get(import.meta.env.VITE_API + "/product/" + id);
};

export const getDataEdit = async (id: string | undefined) => {
  return await axios.get(import.meta.env.VITE_API + "/product/" + id);
};

export const updateData = async (
  id: string | undefined,
  data: DataUpdate | FormData
) => {
  return await axios.put(import.meta.env.VITE_API + "/product/" + id, data);
};
