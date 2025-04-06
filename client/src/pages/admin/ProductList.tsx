import { Popconfirm, Table, Tooltip } from "antd";
import type { TableColumnsType, TableProps } from "antd";

import { FormProductType } from "../../utils/type";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData, remove } from "../../functions/product";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  formatCurrency,
  formatDateTime,
} from "../../functions/formatDateAndTime";

const ProductList = () => {
  const [data, setData] = useState<FormProductType[]>([]);
  console.log("table", data);

  const loadData = async () => {
    try {
      const res = await getData(); //เรียกใช้ api
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    remove(id)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const TableData = data.map((item, index) => ({
    key: item?._id,
    no: index + 1,
    image: item?.file,
    productName: item?.name,
    price: formatCurrency(item?.price),
    createAt: formatDateTime(item?.createdAt ?? ""),
  }));

  const onChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const columns: TableColumnsType = [
    {
      title: "No",
      dataIndex: "no",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (_, record) => (
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-16 h-16 shadow-md rounded-md overflow-hidden">
            <img
              src={
                typeof record.image === "string"
                  ? `http://localhost:8080/uploads/${record?.image?.toString()}`
                  : ""
              }
              alt="product image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Price (THB)",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "View Product",
      dataIndex: "View Product",
      render: (_, record) => <Link to={`/product/${record.key}`}>Click</Link>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <div className="flex flex-row gap-2 justify-center items-center">
            <Link to={`/edit/${record.key}`}>
              <Tooltip title="Edit" placement="top">
                <BiSolidEdit className="text-green-600 text-xl cursor-pointer border-2 p-1 rounded-md w-8 h-8 hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out" />
              </Tooltip>
            </Link>
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => {
                if (record.key) {
                  handleDelete(record.key);
                }
              }}
              placement="right"
              okText="Yes"
              okType="primary"
            >
              <button>
                <Tooltip title="Delete" placement="top">
                  <RiDeleteBin2Fill className="text-red-600 text-xl cursor-pointer border-2 p-1 rounded-md w-8 h-8 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out" />
                </Tooltip>
              </button>
            </Popconfirm>
          </div>
        </>
      ),
    },
    {
      title: "Create At",
      dataIndex: "createAt",
    },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={TableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
      loading={data.length === 0}
      pagination={{ pageSize: 10 }}
      style={{ overflowX: "scroll" }}
    />
  );
};
export default ProductList;
