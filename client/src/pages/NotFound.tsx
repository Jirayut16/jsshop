import { Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-background w-full h-screen flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <button className="bg-primary text-white rounded-md text-xl p-4 mt-8 cursor-pointer hover:bg-button transition-all duration-300 ease-in-out">
              Back Home
            </button>
          </Link>
        }
      />
    </div>
  );
};
export default NotFound;
