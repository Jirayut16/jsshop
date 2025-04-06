import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="mt-20 w-full h-[80vh]">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-[url('/young-men-looking-woman-standing-center.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="flex flex-col items-center justify-center z-10 text-light absolute w-full h-full">
          <div className="text-xl sm:text-4xl lg:text-6xl font-semibold">
            <h2>JSSHOP - WHERE FASHION BEGINS!</h2>
          </div>

          <div className="flex flex-col gap-2 text-xl sm:text-2xl font-light text-center mt-4">
            <p>
              Upgrade your style with the latest trends and must-have pieces.
            </p>
            <p>Chic, stylish, and made just for you.</p>
            <p>Don’t just follow fashion—own it! Shop now and stand out !</p>
          </div>
          <Link to="/allproduct">
            <button className="bg-primary text-white text-2xl p-4  mt-8 cursor-pointer rounded-sm hover:bg-button transition-all duration-300 ease-in-out">
              Discover Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CTA;
