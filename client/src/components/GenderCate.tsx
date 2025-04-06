import { Link } from "react-router-dom";

const GenderCate = () => {
  const genderCate = [
    { img: "/woman.jpg", name: "Lady", link: "/allproduct?gender=Women" },
    {
      img: "/young-japanese-couple_23-2148870759.jpg",
      name: "Unisex",
      link: "/allproduct?gender=Unisex",
    },
    { img: "/man.jpg", name: "Gentleman", link: "/allproduct?gender=Men" },
  ];
  return (
    <div className="container mx-auto mt-16 sm:mt-20 px-8 sm:border-2 sm:p-2 sm:border-gray-300 sm:dark:border-gray-600">
      <div className="flex sm:hidden flex-col w-full h-full text-4xl pb-16 font-semibold items-center justify-center dark:text-text-dark">
        <h1>Gender</h1>
        <p className="text-xl font-extralight mt-4">
          Find out your style, by gender
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1 */}
        {genderCate.map((gender, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center w-full h-full"
          >
            <div key={index} className="w-full h-full  group relative">
              <img
                src={gender.img}
                alt=""
                className="w-full h-full object-cover rounded-sm sm:rounded-none"
              />
              <div className="absolute inset-0 rounded-sm sm:rounded-none opacity-0 bg-black scale-80 flex items-center justify-center text-white font-light text-4xl group-hover:scale-100 group-hover:opacity-100 transition-all duration-400 ease-in-out">
                <Link to={gender.link}>
                  <p className="cursor-pointer hover:font-semibold hover:text-accent">
                    {gender.name}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GenderCate;
