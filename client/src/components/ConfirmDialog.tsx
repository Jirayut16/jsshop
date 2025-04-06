import { Divider } from "antd";
import { MouseEvent } from "react";
import { IoWarningSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ConfirmDialog = ({
  confirmDialogRef,
}: {
  confirmDialogRef: React.RefObject<HTMLDialogElement>;
}) => {
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate("/login");
    closeEditModal();
  };

  const handleToSignup = () => {
    navigate("/register");
    closeEditModal();
  };

  const closeEditModal = () => {
    confirmDialogRef.current?.close();
    document.body.style.overflow = "visible";
    document.body.style.opacity = "1";
  };

  const clickOutside = (e: MouseEvent) => {
    if (e.target === confirmDialogRef.current) {
      closeEditModal();
    }
  };
  return (
    <>
      <div>
        <dialog
          ref={confirmDialogRef}
          className="px-8 py-4 w-full lg:w-1/3  rounded-md shadow-md justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={clickOutside}
        >
          <div className="flex flex-col p-0 lg:p-2 gap-8">
            <div className="justify-center items-center flex flex-col gap-2">
              <IoWarningSharp size={100} style={{ color: "red" }} />
              <p className="text-xl lg:text-2xl font-semibold">
                Please Login before adding to cart !
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="rounded bg-black px-4 py-1 text-white hover:bg-zinc-800 transition duration-300 ease-in-out cursor-pointer"
                onClick={handleToLogin}
              >
                Login
              </button>
              <button
                type="button"
                className="rounded bg-black px-4 py-1 text-white hover:bg-zinc-800 transition duration-300 ease-in-out cursor-pointer"
                onClick={handleToSignup}
              >
                Not a member?, Sign up
              </button>
              <Divider style={{ borderColor: "gray" }} />
              <button
                onClick={closeEditModal}
                className="rounded bg-button px-4 py-1 text-white border border-red-600 hover:bg-red-500 transition duration-300 ease-in-out cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};
export default ConfirmDialog;
