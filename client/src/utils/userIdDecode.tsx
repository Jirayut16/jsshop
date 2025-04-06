import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  try {
    const decoded: { user: { user: string } } = jwtDecode(token);
    return decoded.user.user;
  } catch (err) {
    console.log(err);
  }
};
