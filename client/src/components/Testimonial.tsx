import Marquee from "react-fast-marquee";
import { testimonialLists } from "../utils/testimonialLists";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  return (
    <div className="flex flex-col gap-2 my-16">
      <Marquee
        speed={50}
        pauseOnHover={true}
        gradient={true}
        gradientWidth={30}
      >
        <div className="flex flex-row gap-2 p-1 justify-between items-center">
          {testimonialLists.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-soft-dark text-black dark:text-text-dark w-96 border border-gray-400 dark:border-accent-dark drop-shadow-md min-h-[30vh] rounded-sm  flex flex-col gap-4  items-center p-4"
            >
              <div>
                <img
                  src={item.img}
                  alt=""
                  className="w-24 h-24 object-cover rounded-full border border-gray-400"
                />
              </div>

              <span className="text-center font-light italic text-sm relative ">
                <FaQuoteLeft />
                {item.review} "
              </span>

              <div>
                <h4 className="text-xl font-semibold">{item.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
      <div className="flex flex-col w-full h-full text-4xl font-semibold my-2 items-center justify-center dark:text-text-dark">
        <h1>Testimonial</h1>
        <p className="text-xl font-extralight mt-4">
          What's our customer say ?
        </p>
      </div>
      <Marquee
        speed={50}
        pauseOnHover={true}
        gradient={true}
        gradientWidth={30}
        direction="right"
      >
        <div className="flex flex-row gap-2 p-1 justify-between items-center">
          {testimonialLists.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-soft-dark text-black dark:text-text-dark w-96 border border-gray-400 dark:border-accent-dark drop-shadow-md min-h-[30vh] rounded-sm  flex flex-col gap-4  items-center p-4"
            >
              <div>
                <img
                  src={item.img}
                  alt=""
                  className="w-24 h-24 object-cover rounded-full border border-gray-400"
                />
              </div>

              <span className="text-center font-light italic text-sm relative ">
                <FaQuoteLeft />
                {item.review} "
              </span>

              <div>
                <h4 className="text-xl font-semibold">{item.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};
export default Testimonial;
