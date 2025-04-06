import axios from "axios";
import { FormValues } from "../pages/payment/ConfirmOrder";

export const submitOrder = async (formValue: FormValues, cartId?: string) => {
  return await axios.post(
    import.meta.env.VITE_API + `/submit-order/${cartId}`,
    formValue
  );
};

export const getOrders = async (userid: string) => {
  return await axios.post(import.meta.env.VITE_API + "/get-orders/", {
    userid,
  });
};
