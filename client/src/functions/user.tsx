import axios from "axios";

type Role = {
  id: string;
  role: string;
};
export const listUser = async (authtoken: string | undefined) =>
  await axios.get(import.meta.env.VITE_API + "/user", {
    headers: { authtoken },
  });
export const changeRole = async (authtoken: string, data: Role) =>
  await axios.post(
    import.meta.env.VITE_API + "/change-role",
    { data },
    {
      headers: { authtoken },
    }
  );

export const removeUser = async (authtoken: string, id: string) =>
  await axios.delete(import.meta.env.VITE_API + `/user/${id}`, {
    headers: { authtoken },
  });

export const profilePicture = async (
  authtoken: string,
  userId: string,
  data: FormData
) =>
  await axios.put(
    import.meta.env.VITE_API + `/profile-picture/${userId}`,
    data,
    { headers: { authtoken } }
  );

export const getCurrentUser = async (authtoken: string, id: string) =>
  await axios.get(import.meta.env.VITE_API + `/current-user/${id}`, {
    headers: { authtoken },
  });
