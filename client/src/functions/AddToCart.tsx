import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CartItem, saveToCart } from "../store/cartSlice";
import { getUserIdFromToken } from "../utils/userIdDecode";
import { Bounce, toast } from "react-toastify";

const useAddToCart = ({
  confirmDialog,
}: {
  confirmDialog: React.RefObject<HTMLDialogElement>;
}) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const handleAddToCart = (productToAdd: CartItem) => {
    if (!user.user.token) {
      confirmDialog.current?.showModal();
      document.body.style.overflow = "hidden";
      document.body.style.opacity = "0.5";
    } else {
      dispatch(
        saveToCart({
          userId: getUserIdFromToken() ?? "",
          items: [productToAdd],
        })
      );
      toast.success("Product added to cart successfully", {
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
    }
  };

  return handleAddToCart;
};

export default useAddToCart;
