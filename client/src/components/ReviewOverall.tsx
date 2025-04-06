import { Progress, Rate } from "antd";
import { ReviewOneProductType } from "../utils/type";
import { LiaEditSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ReviewOverall = ({
  reviewOneProduct,
  reviewFormRef,
}: {
  reviewOneProduct: ReviewOneProductType[];
  reviewFormRef: React.RefObject<HTMLTextAreaElement>;
}) => {
  // rating รวม 1-5 ของทุกรีวิว เอามาหาค่าเฉลี่ย
  const getRating = reviewOneProduct.reduce(
    (total, review) => total + review.rating,
    0
  );

  //  ค่าเฉลี่ยทั้งหมดของคะแนนรีวิวสินค้านี้
  const AvgReviewRating = getRating / reviewOneProduct.length;

  //  นับคะแน rating ทั้งหมดว่ามีเอาไหร่ แสดงใน bar
  const ratingCounts = reviewOneProduct.reduce((acc, item) => {
    acc[item.rating] = (acc[item.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  // console.log("ratingCounts", ratingCounts);

  //  ค่าเฉลี่ยของ rating 1-5 จากทั้งหมด
  const getRatingCountPercentage = (rating: number) => {
    const totalReviews = reviewOneProduct.length;
    const count = ratingCounts[rating] || 0;
    return (count / totalReviews) * 100;
  };
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <h1 className="text-text dark:text-text-dark text-center bg-white dark:bg-soft-dark  py-2 rounded-md font-semibold max-[400px]:text-lg text-xl sm:text-2xl">
        Here are reviews from our customers:
      </h1>
      {/* 😁Review overall */}
      <div className="flex flex-col lg:flex-row gap-2 mt-4 bg-white dark:bg-soft-dark dark:text-text-dark rounded-md">
        {/* 1 */}
        <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-evenly justify-center items-center w-full lg:w-1/3 h-56 ">
          {reviewOneProduct.length === 0 ? (
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="text-2xl font-semibold">No review yet.</p>
              <p className="text-xl font-extralight">Be the first.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 sm:gap-4  justify-center items-center">
              <p className="text-2xl font-semibold">Total</p>
              <p className="text-3xl font-semibold">
                {AvgReviewRating.toFixed(2)} / 5
              </p>
              <Rate
                disabled
                allowHalf
                value={AvgReviewRating}
                tooltips={["Terrible", "Bad", "Normal", "Good", "Wonderful"]}
                style={{ fontSize: 30 }}
              ></Rate>
              <p className="font-extralight tracking-wider">
                From:
                {reviewOneProduct.length === 1
                  ? "1 Review"
                  : `${reviewOneProduct.length} Reviews`}
              </p>
            </div>
          )}
          <div className="lg:hidden flex flex-col justify-center items-center">
            <button
              onClick={() => reviewFormRef.current?.focus()}
              className={`${
                user.user.role === "admin"
                  ? "opacity-40 cursor-not-allowed"
                  : " hover:bg-zinc-700 cursor-pointer"
              } flex items-center gap-2 bg-black dark:bg-accent-dark text-white px-4 py-2 rounded-md   transition-all duration-300 ease-in-out`}
              disabled={user.user.role === "admin"}
            >
              Write a review
              <LiaEditSolid size={20} />
            </button>
          </div>
        </div>
        {/* 2 */}
        <div className="flex flex-col gap-2 justify-center items-center w-full lg:w-2/3 px-8 pb-4 lg:pb-0 lg:pe-4">
          <div className="flex flex-row gap-4 w-full  items-center">
            <span className="flex gap-2 w-12 text-xl font-semibold items-center justify-center">
              5 <Rate count={1} value={1} disabled></Rate>
            </span>
            <Progress
              percent={getRatingCountPercentage(5)}
              strokeColor="red"
              strokeWidth={10}
              showInfo={false}
            />
            <span className="text-xl w-4  flex justify-center font-extralight">
              {ratingCounts[5] ? ratingCounts[5] : 0}
            </span>
          </div>
          <div className="flex flex-row gap-4 w-full items-center">
            <span className="flex gap-2 w-12 text-xl font-semibold items-center justify-center">
              4 <Rate count={1} value={1} disabled></Rate>
            </span>
            <Progress
              percent={getRatingCountPercentage(4)}
              strokeColor="red"
              strokeWidth={10}
              showInfo={false}
            />
            <span className="text-xl w-4  flex justify-center font-extralight">
              {ratingCounts[4] ? ratingCounts[4] : 0}
            </span>
          </div>
          <div className="flex flex-row gap-4 w-full items-center">
            <span className="flex gap-2 w-12 text-xl font-semibold items-center justify-center">
              3 <Rate count={1} value={1} disabled></Rate>
            </span>
            <Progress
              percent={getRatingCountPercentage(3)}
              strokeColor="red"
              strokeWidth={10}
              showInfo={false}
            />
            <span className="text-xl w-4  flex justify-center font-extralight">
              {ratingCounts[3] ? ratingCounts[3] : 0}
            </span>
          </div>
          <div className="flex flex-row gap-4 w-full items-center">
            <span className="flex gap-2 w-12 text-xl font-semibold items-center justify-center">
              2 <Rate count={1} value={1} disabled></Rate>
            </span>
            <Progress
              percent={getRatingCountPercentage(2)}
              strokeColor="red"
              strokeWidth={10}
              showInfo={false}
            />
            <span className="text-xl w-4  flex justify-center font-extralight">
              {ratingCounts[2] ? ratingCounts[2] : 0}
            </span>
          </div>
          <div className="flex flex-row gap-4 w-full items-center">
            <span className="flex gap-2 w-12 text-xl font-semibold items-center justify-center">
              1 <Rate count={1} value={1} disabled></Rate>
            </span>
            <Progress
              percent={getRatingCountPercentage(1)}
              strokeColor="red"
              strokeWidth={10}
              showInfo={false}
            />
            <span className="text-xl w-4 flex justify-center font-extralight">
              {ratingCounts[1] ? ratingCounts[1] : 0}
            </span>
          </div>
        </div>
        {/* 3 */}
        <div className="hidden w-1/3 lg:flex flex-col justify-center items-center">
          <button
            onClick={() => reviewFormRef.current?.focus()}
            className={`${
              user.user.role === "admin"
                ? "opacity-40 cursor-not-allowed"
                : " hover:bg-zinc-700 cursor-pointer"
            } flex items-center gap-2 bg-black dark:bg-accent-dark text-white px-4 py-2 rounded-md   transition-all duration-300 ease-in-out`}
            disabled={user.user.role === "admin"}
          >
            Write a review
            <LiaEditSolid size={20} />
          </button>
        </div>
      </div>
    </>
  );
};
export default ReviewOverall;
