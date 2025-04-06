import { useEffect, useState } from "react";
//antd----------------------
import {
  AppstoreAddOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Layout, Menu, theme, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;
//redux---------------------
import { logout } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import ThemeToggle from "../../components/ThemeToggle";
import { Footer } from "antd/es/layout/layout";

const SideBarAdmin = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // ตรวจสอบขนาดหน้าจอ
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      {!isMobile && (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <div style={{ padding: "20px", textAlign: "center" }}>
            <Avatar size={collapsed ? 40 : 64} icon={<UserOutlined />} />
            <Title
              level={3}
              style={{ color: "white", marginTop: "10px" }}
              className={collapsed ? "hidden" : ""}
            >
              Admin Panel
            </Title>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ minHeight: "100vh" }}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to={"/admin/dashboard"}>Admin Home</Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to={"/admin/manage"}>Manage User</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
              <Link to={"/admin/addproduct"}>Add Product</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ProductOutlined />}>
              <Link to={"/admin/productlist"}>Product List</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      )}
      <Layout>
        <Header
          style={{
            padding: 0,
          }}
          className="flex flex-row justify-between items-center "
        >
          {!isMobile && (
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined
                    className="hover:scale-125"
                    style={{ fontSize: "24px", color: "red" }}
                  />
                ) : (
                  <MenuFoldOutlined
                    className="hover:scale-125"
                    style={{ fontSize: "24px", color: "red" }}
                  />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          )}
          <div className="flex flex-row gap-2 max-[400px]:gap-1 md:gap-8 mx-8 justify-end items-center w-full">
            <div className="mt-3 me-8 md:me-0 ">
              <ThemeToggle />
            </div>
            <div>
              <Link to={"/"}>
                <button className="text-sm max-[400px]:text-xs md:text-xl text-text dark:text-text-dark font-light cursor-pointer hover:text-primary dark:hover:text-accent-dark hover:border-b-2 hover:scale-105 tracking-wide transition-all duration-300 ease-in-out ">
                  <HomeOutlined
                    style={
                      isMobile
                        ? { fontSize: "16px", marginRight: "8px" }
                        : { fontSize: "24px", marginRight: "8px" }
                    }
                  />
                  Back to Homepage
                </button>
              </Link>
            </div>
            <Divider
              type="vertical"
              orientation="center"
              style={
                isMobile
                  ? {
                      height: "20px",
                      borderColor: "black",
                      borderWidth: "1px",
                    }
                  : {
                      height: "40px",
                      borderColor: "black",
                      borderWidth: "1px",
                    }
              }
            ></Divider>
            <div>
              <Link to={"/"}>
                <button
                  onClick={handleLogout}
                  className="text-sm max-[400px]:text-xs md:text-xl text-button dark:text-red-500 font-medium cursor-pointer tracking-wide hover:text-accent-dark hover:border-b-2 hover:scale-105 transition-all duration-300 ease-in-out uppercase "
                >
                  <LogoutOutlined
                    style={
                      isMobile
                        ? { fontSize: "16px", marginRight: "8px" }
                        : { fontSize: "24px", marginRight: "8px" }
                    }
                  />
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            // padding: 24,
            minHeight: "calc(100vh - 64px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "้hidden",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingBottom: isMobile ? "60px" : "0px",
          }}
        >
          <div className="site-layout-background ">{children}</div>
        </Content>
        {/* Nav mobile */}
        {isMobile && (
          <Footer
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              padding: 0,
              background: "#001529",
              zIndex: 100,
            }}
          >
            <Menu
              mode="horizontal"
              theme="dark"
              style={{ display: "flex", justifyContent: "space-around" }}
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to={"/admin/dashboard"}>Admin Home</Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to={"/admin/manage"}>Manage User</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
                <Link to={"/admin/addproduct"}>Add Product</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<ProductOutlined />}>
                <Link to={"/admin/productlist"}>Product List</Link>
              </Menu.Item>
            </Menu>
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};

export default SideBarAdmin;
