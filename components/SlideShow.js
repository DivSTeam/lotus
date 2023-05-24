/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Link from "next/link";

const slides = [
  { srcImg: "/images/slide1.png", linkTo: "/login" },
  { srcImg: "/images/slide2.png", linkTo: "/logout" },
  { srcImg: "/images/slide3.png", linkTo: "/login" },
  { srcImg: "/images/slide4.png", linkTo: "/login" },
  { srcImg: "/images/slide5.png", linkTo: "/login" },
];

// const handleLink = (link) => {
//   console.log(link);
// };
// const images = slides.map((s, i) => <img key={s.srcImg} src={s.srcImg} />);

const SlideLotus = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const time = setInterval(() => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 1000 * 5);
    return () => {
      clearInterval(time);
    };
  }, [currentIndex]);

  return (
    <div className=" flex w-full m-auto group">
      {/* <div
            className="flex transition-transform ease-out duration-500 text-center"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onClick={(e) => console.log(e)}
          >
            {images}
          </div> */}
      <button
        onClick={prevSlide}
        className="hidden group-hover:block rounded-full shadow bg-white/80 text-white hover:bg-white z-50 w-0"
      >
        <ChevronLeft className="ml-[20px] w-12 h-12" />
      </button>
      <div className=" w-full">
        <Link href={`${slides[currentIndex].linkTo}`}>
          <div>
            <img
              className="w-full h-full rounded-2xl bg-center bg-cover  duration-500 "
              src={slides[currentIndex].srcImg}
              alt={`img${slides[currentIndex].linkTo}`}
              key={slides[currentIndex].srcImg}
              loading="lazy"
            />
          </div>
        </Link>
        <div className="bottom-4 right-0 left-0 h-0">
          <div className="flex items-center justify-center gap-2 mt-[-20px]">
            {slides.map((s, i) => (
              <div
                key={s.srcImg}
                className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${currentIndex === i ? "p-2" : "bg-opacity-50"}
            `}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={nextSlide}
        className="hidden group-hover:block rounded-full shadow bg-white/80 text-white hover:bg-white z-50 w-0"
      >
        <ChevronRight className="ml-[-92px] w-12 h-12" />
      </button>
    </div>
  );

  //     <div
  //       className="
  //             max-w-[80%]
  //             max-h-[400px]
  //             w-full
  //             m-auto
  //             mb-10
  //             md:text-center
  //             py-8 px-4 relative group"
  //     >
  // <div>
  //   <img
  //     className="w-full h-full rounded-2xl bg-center bg-cover  duration-500 "
  //     src={slides[currentIndex]}
  //     alt={`img${slides[currentIndex]}`}
  //   />
  // </div>
  //       <div className=" hidden group-hover:block absolute top-[35%] -translate-x-0 -translate-y-[-50%] left-5 text-lg rounded-full p-3 bg-black/20 text-white cursor-pointer ">
  //         <BsChevronCompactLeft onClick={prevSlide} size={30} />
  //       </div>
  //       <div className=" hidden group-hover:block absolute top-[35%] -translate-x-0 -translate-y-[-50%] right-5 text-lg rounded-full p-3 bg-black/20 text-white cursor-pointer ">
  //         <BsChevronCompactRight onClick={nextSlide} size={30} />
  //       </div>
  //       <div className="flex top-4 justify-center py-2">
  //         {slides.map((slide, indexSlide) => (
  //           <div
  //             key={indexSlide}
  //             className={
  //               indexSlide === currentIndex
  //                 ? "text-lg text-red-400 cursor-pointer"
  //                 : "text-lg cursor-pointer"
  //             }
  //             onClick={() => gotoSlide(indexSlide)}
  //           >
  //             <RxDotFilled />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
};

export default SlideLotus;
