import React, { useState } from "react";
import slides from "../constants/slides.js";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

const SlideLotus = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const gotoSlide = (indexSlide) => {
        setCurrentIndex(indexSlide);
    }


    return (
        <div className="max-w-[780px] h-[400px] w-full m-auto py-8 px-4 relative group"   >
            <div >
                <img
                    className="w-full h-full rounded-2xl bg-center bg-cover  duration-500 "
                    src={slides[currentIndex]}
                    alt={`img${slides[currentIndex]}`} />
            </div>
            <div className=" hidden group-hover:block absolute top-[28%] -translate-x-0 -translate-y-[-50%] left-5 text-lg rounded-full p-3 bg-black/20 text-white cursor-pointer ">
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className=" hidden group-hover:block absolute top-[28%] -translate-x-0 -translate-y-[-50%] right-5 text-lg rounded-full p-3 bg-black/20 text-white cursor-pointer ">
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className="flex top-4 justify-center py-2">
                {
                    slides.map((slide, indexSlide) =>
                    (
                        <div
                            key={indexSlide}
                            className={(indexSlide === currentIndex) ? "text-lg text-red-400 cursor-pointer" : "text-lg cursor-pointer"}

                            onClick={() => gotoSlide(indexSlide)}
                        >
                            <RxDotFilled />
                        </div>
                    )
                    )
                }
            </div>
        </div >
    );
};

export default SlideLotus;