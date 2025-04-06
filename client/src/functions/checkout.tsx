import axios from "axios";

export const checkout = async (
  token: string | null,
  orderid: string | undefined,
  orderLatestId: string | undefined
) =>
  await axios.post(
    import.meta.env.VITE_API + "/checkout",
    { orderLatestId, orderid },
    { headers: { token } }
  );
export const checkoutStatus = async (
  token: string | null,
  session: string | undefined,
  orderid: string | undefined
) =>
  await axios.get(
    import.meta.env.VITE_API + `/checkout-status/${session}/${orderid}`,
    { headers: { token } }
  );

export const getDashboard = async () =>
  await axios.get(import.meta.env.VITE_API + `/get-dashboard`);
