import Banner from "../../components/Banner";
import NewArrive from "../../components/NewArrive";
import CTA from "../../components/CTA";
import GenderCate from "../../components/GenderCate";
import BestSeller from "../../components/BestSeller";
import Testimonial from "../../components/Testimonial";
import SpecialDeal from "../../components/SpecialDeal";
import AboutShopping from "../../components/AboutShopping";
import { FloatButton } from "antd";
import { BsChevronDoubleUp } from "react-icons/bs";

const HomePageUser = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Banner></Banner>

        <NewArrive></NewArrive>

        <CTA></CTA>

        <GenderCate></GenderCate>

        <BestSeller></BestSeller>

        <Testimonial></Testimonial>

        <SpecialDeal></SpecialDeal>

        <AboutShopping></AboutShopping>

        <FloatButton.BackTop icon={<BsChevronDoubleUp />} />
      </div>
    </>
  );
};
export default HomePageUser;
