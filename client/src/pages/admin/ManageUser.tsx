//find() ทั้งหมด จาก server โดยเอา auth จาก token ไป find เพื่อดึงข้อมูลทั้งหมด

import { Popconfirm, Table, Tooltip } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { formatDateTime } from "../../functions/formatDateAndTime";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { changeRole, listUser, removeUser } from "../../functions/user";
import { RootState } from "../../store/store";
import { Bounce, toast } from "react-toastify";
import { RiDeleteBin2Fill } from "react-icons/ri";
type Data = {
  _id: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

const ManageUser = () => {
  const [data, setData] = useState<Data[]>([]);
  const user = useSelector((state: RootState) => state.user);
  console.log("manageuser", user);

  useEffect(() => {
    loadData(user.user.token);
  }, []);

  const loadData = async (authtoken: string) => {
    await listUser(authtoken)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log(data);

  const roleUser = ["user", "admin"];

  const handleChangeRole = async (
    id: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(id, e.target.value);
    const value = {
      id: id,
      role: e.target.value,
    };
    await changeRole(user.user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.user.token);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteUser = async (id: string) => {
    await removeUser(user.user.token, id)
      .then((res) => {
        console.log("remove user success", res.data);
        toast.success("User removed successfully", {
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
        loadData(user.user.token);
      })
      .catch((err) => console.log(err));
  };

  const TableData = data.map((item, index) => ({
    key: item?._id,
    no: index + 1,
    name: item.name,
    role: item.role,
    createAt: formatDateTime(item?.createdAt ?? ""),
    updateAt: formatDateTime(item?.updatedAt ?? ""),
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (_, record) => (
        <select
          defaultValue={record.role}
          onChange={(e) => handleChangeRole(record.key, e)}
        >
          {roleUser.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      ),
    },
    {
      title: "Create At",
      dataIndex: "createAt",
    },
    {
      title: "Update At",
      dataIndex: "updateAt",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDeleteUser(record.key)}
          placement="left"
          okText="Yes"
          okType="primary"
        >
          <Tooltip title="Delete" placement="top">
            <button className="text-red-600 text-xl cursor-pointer border-2 p-1 rounded-md w-8 h-8 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out">
              <RiDeleteBin2Fill />
            </button>
          </Tooltip>
        </Popconfirm>
      ),
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
      pagination={{ pageSize: 30 }}
      style={{ overflowX: "scroll" }}
    />
  );
};
export default ManageUser;
