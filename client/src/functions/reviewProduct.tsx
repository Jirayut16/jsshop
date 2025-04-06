import axios from "axios";
type ReviewData = {
  productId: string | undefined;
  name: string;
  rating: number;
  comment: string;
};
type newReviewData = {
  comment: string;
  rating: number;
};

export const createReview = async (data: ReviewData) => {
  return await axios.post(import.meta.env.VITE_API + "/create-review", data);
};
export const getReview = async (id: string | undefined) => {
  return await axios.get(import.meta.env.VITE_API + `/review/${id}`);
};
export const getReviewPagination = async (
  id: string | undefined,
  page: number,
  limit: number
) => {
  return await axios.get(
    import.meta.env.VITE_API + `/review/${id}?page=${page}&limit=${limit}`
  );
};
export const deleteReview = async (id: string, reviewId: string) => {
  return await axios.delete(
    import.meta.env.VITE_API + `/delete-review/${id}/${reviewId}`
  );
};
export const editReview = async (
  id: string,
  reviewId: string,
  newComment: newReviewData
) => {
  return await axios.put(
    import.meta.env.VITE_API + `/update-review/${id}/${reviewId}`,
    newComment
  );
};
