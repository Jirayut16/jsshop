import {
  DownOutlined,
  HistoryOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown as AntDropdown, Avatar, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "My Profile",
      icon: <ProfileOutlined />,
      onClick: () => {
        navigate("/myprofile");
      },
    },
    {
      key: "3",
      label: "My Orders",
      icon: <HistoryOutlined />,
      onClick: () => {
        navigate("/my-orders");
      },
    },
    {
      type: "divider",
    },
    {
      label: "Logout",
      key: "4",
      danger: true,
      icon: <LogoutOutlined />,
      onClick: () => {
        dispatch(logout());
        navigate("/login");
      },
    },
  ];
  return (
    <AntDropdown
      menu={{ items }}
      trigger={["click", "hover"]}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div className="w-10 h-10">
            {user.user.picture ? (
              <img
                src={
                  typeof user.user.picture === "string" ? user.user.picture : ""
                }
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Avatar
                style={{ backgroundColor: "black" }}
                size={40}
                icon={<UserOutlined />}
              />
            )}
          </div>
          <DownOutlined />
        </Space>
      </a>
    </AntDropdown>
  );
};
export default Dropdown;
