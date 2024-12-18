import { useMediaQuery } from "@uidotdev/usehooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
const BlogHeader = () => {
  const isSmallResponsive = useMediaQuery("only screen and (min-width : 468px)");
  return (
    <div className="flex flex-col items-center gap-10 pt-10">
      <h1 className="text-[#C4C4C4] text-[40px] font-normal text-center">
        PRIVATE PERSONAL TRAINING
      </h1>
      <div className={`flex gap-[32px] ${!isSmallResponsive ? "flex-col" : "flex-row"}`}>
        <span className="p-[10px] px-[25px] rounded-[24px] border text-[#D7FD44] border-[#D7FD44]">
          Workout Routines
        </span>
        <span className="p-[10px] px-[25px] rounded-[24px] border text-[#D7FD44] border-[#D7FD44]">
          Nutrition and diet
        </span>
      </div>
      <div className="w-full mb-20 mt-7 bg-[#121212] max-w-[1780px] flex justify-center  mx-8">
        <LazyLoadImage
          src='/blogMainImage.jpeg'
          alt="Blog Header"
          className="w-full lg:rounded-xl max-h-[1100px] object-cover"
          effect="blur"
        />
      </div>
    </div>
  );
};

export default BlogHeader;
