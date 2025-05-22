import { BrowserRouter, Route, Routes } from "react-router-dom";

//Page
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import HomePageUser from "../pages/user/HomePageUser";
import HomePageAdmin from "../pages/admin/HomePageAdmin";
import NotFound from "../pages/NotFound";
import ManageUser from "../pages/admin/ManageUser";
import Line from "../pages/auth/Line";
import ProductDetail from "../pages/product/ProductDetail";
import SideBarAdmin from "../pages/admin/AdminHome";
import AddProduct from "../pages/admin/AddProduct";
import ProductList from "../pages/admin/ProductList";
import EditProduct from "../pages/admin/EditProduct";
import AllProduct from "../pages/product/AllProduct";
import ProductDetailDiscount from "../pages/product/ProductDetailDiscount";
import CartDetail from "../pages/cart/CartDetail";
import Checkout from "../pages/payment/Checkout";
import ConfirmOrder from "../pages/payment/ConfirmOrder";
import CheckoutComplete from "../pages/payment/CheckoutComplete";
import Order from "../pages/user/Order";

//Routes
import UserRoutes from "./UserRoutes";
import AdminRoute from "./AdminRoute";

//Common
import MainLayout from "../layout/MainLayout";
import { currentUser } from "../functions/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { ThemeProvider } from "../components/ThemeContext";

// react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";

const AppRoute = () => {
  const dispatch = useDispatch();
  //ดึง token ออกมาจาก localStorage แล้ว dispatch ใส่ใน redux login state
  const token = localStorage.getItem("token");
  currentUser(token)
    .then((res) => {
      console.log(res);
      dispatch(
        login({
          name: res.data.name,
          role: res.data.role,
          token: token,
        })
      );
    })
    .catch((err) => console.log(err));
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <ToastContainer />
          {/* public */}
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePageUser />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/product/:id" element={<ProductDetail />}></Route>
              <Route
                path="/productdiscount/:id"
                element={<ProductDetailDiscount />}
              ></Route>
              <Route path="/allproduct" element={<AllProduct />}></Route>
              {/* user login */}
              <Route element={<UserRoutes />}>
                <Route path="/mycart" element={<CartDetail />}></Route>
                <Route path="/my-orders" element={<Order />}></Route>
                <Route
                  path="/order-confirmation"
                  element={<ConfirmOrder />}
                ></Route>
                <Route
                  path="/checkout/:orderid/:orderLatestId"
                  element={<Checkout />}
                ></Route>
                <Route
                  path="/checkout/complete/:session/:orderid"
                  element={<CheckoutComplete />}
                ></Route>
              </Route>
              {/* user login */}
            </Route>
            <Route path="/*" element={<NotFound />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/line" element={<Line />}></Route>

            {/* admin */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <SideBarAdmin>
                    <HomePageAdmin />
                  </SideBarAdmin>
                </AdminRoute>
              }
            ></Route>

            <Route
              path="/admin/manage"
              element={
                <AdminRoute>
                  <SideBarAdmin>
                    <ManageUser />
                  </SideBarAdmin>
                </AdminRoute>
              }
            ></Route>

            <Route
              path="/admin/addproduct"
              element={
                <AdminRoute>
                  <SideBarAdmin>
                    <AddProduct />
                  </SideBarAdmin>
                </AdminRoute>
              }
            ></Route>

            <Route
              path="/admin/productlist"
              element={
                <AdminRoute>
                  <SideBarAdmin>
                    <ProductList />
                  </SideBarAdmin>
                </AdminRoute>
              }
            ></Route>

            <Route
              path="/edit/:id"
              element={
                <AdminRoute>
                  <SideBarAdmin>
                    <EditProduct />
                  </SideBarAdmin>
                </AdminRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};
export default AppRoute;
