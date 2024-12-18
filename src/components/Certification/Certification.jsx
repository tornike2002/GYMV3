import arrows from "../../../public/threeArrow.svg";
import star5 from "../../../public/star5.svg";
import { useCertification } from "../../hooks/useCertification";
import About from "./About";
import GirlRun from "/girlRun.png";
import StoryCarousel from "../SuccessStory/StoryCarousel";
import Check from "/check.png";
import Skeleton from "react-loading-skeleton";
import { useContext } from "react";
import { Mycontext } from "../../context/Context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Certification = () => {
  const { isMobile } = useContext(Mycontext);
  const {
    data: certifications,
    isError,
    isLoading,
    error,
  } = useCertification();
  const certification = certifications?.data;

  if (isLoading) {
    return (
      <div className="ml-12">
        <Skeleton
          width={"95%"}
          height={"auto"}
          className="rounded-lg mx-auto w-[95%] md:w-[100%] mb-8"
          style={{ maxWidth: "100%", aspectRatio: "16/9" }}
        />
        <div className="flex flex-col gap-4 mb-8">
          <Skeleton width={"20%"} height={"46px"} />
          <div className=" md:grid-cols-2 md:grid  ">
            <Skeleton width={"90%"} height={"250px"} />
            <Skeleton width={"90%"} height={"250px"}  />

          </div>
          <Skeleton width={"20%"} height={"46px"} />
        </div>
        <div className=" md:grid-cols-2 md:grid  flex flex-col gap-10 mb-[5rem]">
          <Skeleton width={"90%"} height={"76px"} />
          <Skeleton width={"90%"} height={"76px"} />
          <Skeleton width={"90%"} height={"76px"} />
          <Skeleton width={"90%"} height={"76px"} />
        </div>
      </div>
    );
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="bg-[#121212] pb-[5rem]">
      <div className=" object-cover  mx-auto mb-[5rem] flex justify-center">
        <LazyLoadImage
          effect="blur"
          className="rounded-lg max-h-[900px] lg:h-[900px] mx-auto w-full md:w-[100%] "
          src={GirlRun}
        />
      </div>
      <div className="flex flex-col  items-center justify-center mx-auto w-[92%]">
        <About />
        <div className="flex flex-col w-full  pt-14  gap-10 bg-[#121212]">
          <div className="flex gap-3 items-center">
            <img src={arrows} className="w-[80px]" />
            <h3
              style={{
                background: "linear-gradient(180deg, #C4C4C4 0%, #737373 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className=" text-[16px] font-bold"
            >
              Certifications
            </h3>
          </div>
          <div className="text-white md:grid-cols-2 md:grid bg-[#121212] flex flex-col gap-10 mb-[5rem]">
            {certification?.map((certification, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-[#323232] hover:bg-[#3e3e3e] p-6 rounded-lg shadow-xl cursor-pointer transform scale-100 hover:scale-105 transition-transform duration-300"
              >
                <span className="flex text-[#FFFFFF] leading-[21.8px] items-start text-[14px] gap-2 w-[50%]">
                  <div className="relative flex items-center justify-center">
                    <div className="w-10">
                      <img className="w-10 h-10" src={star5} />
                    </div>
                    <img
                      className="absolute w-[0.94213rem] h-[0.94213rem] "
                      src={Check}
                      alt=""
                    />
                  </div>
                  {certification.name}
                </span>
                <div className="flex flex-col">
                  <p>
                    <b className="text-green-300">Start</b>{" "}
                    {certification.startDate}
                  </p>
                  <p>
                    <b className="text-red-300">End</b> {certification.endDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`lg:w-[98%] ${
          isMobile && "w-auto"
        } mx-auto flex items-center justify-center`}
      >
        <StoryCarousel />
      </div>
    </div>
  );
};

export default Certification;
