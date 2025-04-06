import axios from "axios";
interface DataRegister {
  name: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  confirmPassword: FormDataEntryValue | null;
}
interface DataLogin {
  name: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
interface DataLoginLine {
  displayName?: string;
  pictureUrl?: string;
  userId?: string;
}

export const register = async (data: DataRegister) =>
  await axios.post(import.meta.env.VITE_API + "/register", data);

export const login = async (data: DataLogin) =>
  await axios.post(import.meta.env.VITE_API + "/login", data);

export const currentUser = async (authtoken: string | null) =>
  await axios.post(
    import.meta.env.VITE_API + "/current-user",
    {},
    { headers: { authtoken } }
  );

export const currentAdmin = async (authtoken: string) =>
  await axios.post(
    import.meta.env.VITE_API + "/current-admin",
    {},
    { headers: { authtoken } }
  );

export const loginLine = async (data: DataLoginLine) =>
  await axios.post(import.meta.env.VITE_API + "/login-line", data);

export const loginFacebook = async (data: unknown) =>
  await axios.post(import.meta.env.VITE_API + "/login-facebook", data);
