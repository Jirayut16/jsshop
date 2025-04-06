import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  createReview,
  deleteReview,
  editReview,
  getReview,
  getReviewPagination,
} from "../functions/reviewProduct";
import { useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import { Bounce, toast } from "react-toastify";
import { ReviewOneProductType } from "../utils/type";
import { Avatar, Divider, Pagination, Rate, Tooltip } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CustomRadioBox } from "./CustomRadio";
import ReviewOverall from "./ReviewOverall";

const ReviewFrom = () => {
  const user = useSelector((state: RootState) => state.user);
  const { id } = useParams();
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const pageSize = 5;
  const [reviewOneProduct, setReviewOneProduct] = useState<
    ReviewOneProductType[]
  >([]);
  const [reviewPagination, setReviewPagination] = useState<
    ReviewOneProductType[]
  >([]);
  //comment
  const [form, setForm] = useState({
    comment: "",
  });
  const [selectedReview, setSelectedReview] = useState({
    comment: "",
    rating: 0,
    _id: "",
  });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reviewFormRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getOneReview();
    getOneReviewPagination();
  }, [page]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const reviewData = {
      productId: id,
      name: user.user.name,
      rating: ratingValue,
      comment: form.comment,
      date: new Intl.DateTimeFormat("en-US").format(new Date()).toString(),
    };
    console.log("reviewData", reviewData);

    try {
      createReview(reviewData)
        .then((res) => {
          console.log("review res", res);
          toast.success(`Add Review Success`, {
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
          getOneReview();
          getOneReviewPagination();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message, {
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
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setForm({ comment: "" });
      setRatingValue(0);
    }
  };

  //get review
  const getOneReview = async () => {
    try {
      getReview(id).then((res) => {
        console.log("res", res.data);
        setReviewOneProduct(res.data?.reviews.reviews);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getOneReviewPagination = async () => {
    try {
      getReviewPagination(id, page, pageSize).then((res) => {
        console.log("res", res.data);

        setReviewPagination(res.data?.reviewsPaginated);
        setTotal(res.data.pagination.totalReviews);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("reviewOneProduct", reviewOneProduct);
  // console.log("reviewPagination", reviewPagination);

  //delete review
  const handleDelete = async (id: string, reviewId: string) => {
    try {
      deleteReview(id, reviewId).then((res) => {
        toast.success(res.data.message, {
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
        getOneReview();
        getOneReviewPagination();
      });
    } catch (error) {
      console.log(error);
    }
    closeEditModal();
  };

  //edit review
  const showEditModal = (review: ReviewOneProductType, isEdit: boolean) => {
    document.body.style.overflow = "hidden";
    document.body.style.opacity = "0.5";
    console.log("review", review);
    setEditing(isEdit ? true : false);
    setSelectedReview({
      comment: review.comment,
      rating: review.rating,
      _id: review._id ?? "", // use the nullish coalescing operator to default to an empty string if _id is undefined
    });
    dialogRef.current?.showModal();
  };
  const closeEditModal = () => {
    document.body.style.overflow = "visible";
    document.body.style.opacity = "1";
    setSelectedReview({
      comment: "",
      rating: 0,
      _id: "",
    });
    dialogRef.current?.close();
  };
  const handleConfirmEdit = async (id: string) => {
    const newComment = {
      comment: selectedReview.comment,
      rating: selectedReview.rating,
    };
    try {
      await editReview(id, selectedReview._id, newComment).then((res) => {
        toast.success(res.data.message, {
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
      });
    } catch (error) {
      console.log(error);
    } finally {
      closeEditModal();
      await getOneReview();
      await getOneReviewPagination();
    }
  };

  const submitEditForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editing) {
      handleConfirmEdit(id ?? "");
    } else {
      handleDelete(id ?? "", selectedReview._id);
    }
  };

  const ratingNumber = [
    {
      rating: 5,
      label: (
        <Rate
          className="responsive-rate"
          disabled
          value={5}
          count={5}
          style={{ color: "yellow" }}
        />
      ),
    },
    {
      rating: 4,
      label: (
        <Rate
          className="responsive-rate"
          disabled
          value={4}
          count={4}
          style={{ color: "yellow" }}
        />
      ),
    },
    {
      rating: 3,
      label: (
        <Rate
          className="responsive-rate"
          disabled
          value={3}
          count={3}
          style={{ color: "yellow" }}
        />
      ),
    },
    {
      rating: 2,
      label: (
        <Rate
          className="responsive-rate"
          disabled
          value={2}
          count={2}
          style={{ color: "yellow" }}
        />
      ),
    },
    {
      rating: 1,
      label: (
        <Rate
          className="responsive-rate"
          disabled
          value={1}
          count={1}
          style={{ color: "yellow" }}
        />
      ),
    },
  ];
  const handleRadioValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setRadioValue(value);
    }
  };
  const filteredReview = reviewPagination?.filter((item) =>
    item.rating?.toString().includes(radioValue)
  );

  const navigate = useNavigate();
  const location = useLocation();
  const goToLogin = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  return (
    <>
      <div className="container mx-auto">
        {/* 😁Review overall */}
        <ReviewOverall
          reviewOneProduct={reviewOneProduct}
          reviewFormRef={reviewFormRef}
        />

        {/* 😁Review Lists */}

        {reviewOneProduct.length === 0 ? null : (
          <div className="flex  md:flex-row flex-wrap gap-2 px-2 sm:px-0 md:gap-4 mt-8">
            <CustomRadioBox
              htmlFor="all"
              name="rate"
              index={ratingNumber.length}
              value=""
              onChange={handleRadioValue}
              checkedValue={radioValue === ""}
              id="all"
              label="All"
              key={ratingNumber.length}
            />
            {ratingNumber.map((rate, index) => (
              <>
                <CustomRadioBox
                  htmlFor={rate.rating.toString()}
                  name="rate"
                  index={index}
                  value={rate.rating.toString()}
                  onChange={handleRadioValue}
                  checkedValue={radioValue === rate.rating.toString()}
                  id={rate.rating.toString()}
                  label={rate.label}
                  key={index}
                />
              </>
            ))}
          </div>
        )}

        <div className=" flex flex-col gap-4 rounded-md mt-4 px-4 sm:px-0">
          {filteredReview.map((review, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 px-2 sm:px-8 py-4 bg-white dark:bg-soft-dark dark:text-text-dark rounded-md"
            >
              {/* 1 */}
              <div className=" flex flex-row gap-4 sm:gap-8 items-center">
                <div>
                  <Avatar
                    className="responsive-avatar"
                    size={60}
                    icon={<AiOutlineUser />}
                    style={{ backgroundColor: "red" }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <div className="text-sm sm:text-base flex">
                      <p className="font-semibold">
                        Review by:{" "}
                        <span className="font-extralight">{review.name}</span>
                      </p>
                    </div>
                    <Rate
                      className="responsive-rate"
                      disabled
                      value={review.rating}
                    ></Rate>
                  </div>
                  <div className="text-sm sm:text-base flex">
                    <p className="font-semibold">
                      Date:{" "}
                      <span className="font-extralight">{review.date}</span>
                    </p>
                  </div>
                </div>
              </div>
              <hr className="my-1 border-gray-300 dark:border-gray-500" />
              {/* 2 */}
              <div className="flex flex-col gap-2">
                <div className="flex">
                  <p className="font-semibold">
                    Comment:{" "}
                    <span className="font-extralight">{review.comment}</span>
                  </p>
                </div>
                {review.name === user?.user.name ? (
                  <div className="flex flex-row gap-4 justify-end">
                    <button onClick={() => showEditModal(review, false)}>
                      <Tooltip title="Delete" placement="top">
                        <RiDeleteBin2Fill className="text-red-600 dark:text-white text-xl cursor-pointer border-2 p-1 rounded-md w-8 h-8 hover:bg-red-500 hover:text-white dark:bg-red-500 transition-all duration-300 ease-in-out" />
                      </Tooltip>
                    </button>
                    <button onClick={() => showEditModal(review, true)}>
                      <Tooltip title="Edit" placement="top">
                        <BiSolidEdit className="text-green-600 text-xl cursor-pointer border-2 p-1 rounded-md w-8 h-8 hover:bg-green-500 hover:text-white dark:bg-green-500 dark:text-white transition-all duration-300 ease-in-out" />
                      </Tooltip>
                    </button>
                  </div>
                ) : null}
                {user.user.role === "admin" ? (
                  <div className="flex flex-row gap-4 justify-end">
                    <button onClick={() => showEditModal(review, false)}>
                      <Tooltip title="Delete" placement="top">
                        <RiDeleteBin2Fill className="text-red-600 dark:text-white text-xl cursor-pointer border-2 p-1 rounded-md w-8 h-8 hover:bg-red-500 hover:text-white dark:bg-red-500 transition-all duration-300 ease-in-out" />
                      </Tooltip>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          {reviewOneProduct.length === 0 ? null : (
            <div className="flex justify-center items-center">
              <Pagination
                current={page}
                total={total}
                pageSize={pageSize}
                onChange={(p) => setPage(p)}
                style={{ marginTop: "20px", textAlign: "center" }}
              ></Pagination>
            </div>
          )}
        </div>
        <Divider style={{ borderColor: "gray" }}></Divider>

        {/* 😁 review form */}
        {user.user.role === "admin" ? (
          <p className="text-center text-2xl text-red-500 font-semibold">
            Admin can't write a review
          </p>
        ) : (
          <div className="flex flex-col gap-4  bg-white dark:bg-soft-dark dark:text-text-dark rounded-md p-4 mx-4 sm:mx-0">
            <h2 className="font-semibold text-xl sm:text-2xl">
              Write a Review:
            </h2>
            <form onSubmit={handleSubmit} className="">
              <textarea
                name="comment"
                placeholder="Describe your experience with this product..."
                onChange={handleChange}
                value={form.comment}
                rows={6}
                required
                className="w-full p-2 my-2 rounded-md border border-gray-300 dark:border-gray-600"
                ref={reviewFormRef}
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center w-full sm:w-fit justify-between text-base sm:text-xl font-semibold">
                  <p>Rate This Product:</p>
                  <Rate
                    id="rateReview"
                    className="responsive-rate"
                    value={ratingValue}
                    tooltips={[
                      "Terrible",
                      "Bad",
                      "Normal",
                      "Good",
                      "Wonderful",
                    ]}
                    onChange={(value) => setRatingValue(value)}
                  />
                </div>
                <div className="sm:block hidden">
                  {store.getState().user.user.token ? (
                    <button
                      type="submit"
                      className={`${
                        loading
                          ? "opacity-50 cursor-not-allowed"
                          : "opacity-100"
                      } bg-red-500 dark:bg-accent-dark text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer`}
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit Review"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={goToLogin}
                      className=" bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer"
                    >
                      Login to Review
                    </button>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4 sm:hidden ">
                {store.getState().user.user.token ? (
                  <button
                    type="submit"
                    className={`${
                      loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
                    } bg-red-500 dark:bg-accent-dark text-white p-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer`}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Review"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goToLogin}
                    className=" bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer"
                  >
                    Login to Review
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      {/* 😁 edit review dialog*/}
      <div>
        <div>
          <dialog
            ref={dialogRef}
            className="px-8 py-4 w-3/4 md:w-1/2 dark:bg-soft-dark dark:text-text-dark rounded-md shadow-md justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {selectedReview && (
              <form onSubmit={submitEditForm}>
                <h2 className="font-semibold text-xl xl:text-2xl">
                  {editing ? "Edit Review" : "Delete Review"}
                </h2>
                <div>
                  {editing ? (
                    <>
                      <textarea
                        name="comment"
                        rows={6}
                        placeholder="Your Comment"
                        onChange={(e) =>
                          setSelectedReview({
                            ...selectedReview,
                            comment: e.target.value,
                          })
                        }
                        value={selectedReview.comment}
                        required
                        className="w-full p-2 border md:text-sm xl:text-base border-gray-300 rounded-md mt-4"
                      />
                      <div>
                        <p className="font-semibold">Rating:</p>
                        <Rate
                          value={selectedReview?.rating}
                          onChange={(value) =>
                            setSelectedReview({
                              ...selectedReview,
                              rating: value,
                            })
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <p className="my-4 text-lg">
                      Are you sure you want to delete this review?
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-4 mt-4 md:mt-0">
                  <button
                    type="button"
                    className="rounded bg-green-500 p-2 xl:px-4 xl:py-2 text-white border border-green-600 hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded font-semibold bg-red-500 p-2 xl:px-4 xl:py-2 text-white border border-red-600 hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer"
                  >
                    {editing ? "Confirm" : "Delete"}
                  </button>
                </div>
              </form>
            )}
          </dialog>
        </div>
      </div>
    </>
  );
};
export default ReviewFrom;
