import React from "react";
import { BsPlayCircle, BsThreeDots } from "react-icons/bs";
import { AiFillPlayCircle, AiOutlineHeart } from "react-icons/ai";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface HeroItem {
  id: number;
  name: string;
  tag: string;
  cover: string;
}

interface ArrowProps {
  onClick: () => void;
}

const SampleNextArrow: React.FC<ArrowProps> = ({onClick}) => {
  return (
    <div
      onClick={onClick}
      className="clicknext absolute right-0 top-[50%] cursor-pointer text-white"
    >
      <MdKeyboardArrowRight size={50} />
    </div>
  );
}

const SamplePrevArrow: React.FC<ArrowProps> = ({onClick}) => {
  return (
    <div
      onClick={onClick}
      className="clickprev absolute left-0 top-[50%] z-10 cursor-pointer text-white"
    >
      <MdKeyboardArrowLeft size={50} />
    </div>
  );
}

export const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const hero1: HeroItem[] = [
    {
      id: 1,
      name: "New Album from Nouvelle",
      tag: "Nouvelle",
      cover: "../images/c1.jpg",
    },
    {
      id: 2,
      name: "Bind Me",
      tag: "Fifty",
      cover: "../images/c2.jpg",
    },
    {
      id: 3,
      name: "New Track from Pablo Nouvelle",
      tag: "Pablo Nouvelle",
      cover: "../images/c3.jpg",
    },
  ];

  const hero2: HeroItem[] = [
    {
      id: 1,
      name: "Pull Up",
      tag: "Summerella",
      cover: "../images/b4.jpg",
    },
    {
      id: 2,
      name: "Fireworks",
      tag: "Kygo",
      cover: "../images/b1.jpg",
    },
    {
      id: 3,
      name: "I Wanna Be In the Cavalry",
      tag: "Jeremy Scott",
      cover: "../images/b2.jpg",
    },
    {
      id: 4,
      name: "What A Time To Be Alive",
      tag: "Judith Garcia",
      cover: "../images/b3.jpg",
    },
  ];

  return (
    <>
      <section className="hero">
        <div className="h-auto w-full md:flex md:h-[92vh] md:justify-between">
          <div className="h-full w-full md:w-1/2 ">
            <Slider {...settings}>
              {hero1.map((item) => (
                <div className="box relative h-[92vh] w-full sm:mt-16">
                  <img
                    src={item.cover}
                    alt="cover"
                    className="h-full w-full object-cover"
                  />
                  <div className="text absolute left-0 top-0 p-5 text-white">
                    <h3 className="text-xl font-semibold ">{item.name}</h3>
                    <span className="text-gray-400">{item.tag}</span>
                  </div>
                  <div className="overlay icon absolute left-[40%] top-1/2 text-white">
                    <BsPlayCircle size={45} className="show" />
                    <AiFillPlayCircle
                      size={50}
                      className="hide absolute -left-1 -top-1"
                    />
                  </div>
                  <div className="overlay absolute bottom-0 right-0 text-white">
                    <div className="flex p-3">
                      <AiOutlineHeart size={22} className="mx-3" />
                      <BsThreeDots size={22} />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="grid h-full w-full grid-cols-2 sm:grid-cols-1 md:w-1/2">
            {hero2.map((item) => (
              <div className="box relative">
                <img
                  src={item.cover}
                  alt="cover"
                  className="h-full w-full object-cover"
                />
                <div className="text absolute left-0 top-0 p-5 text-white">
                  <h3 className="text-xl font-semibold ">{item.name}</h3>
                  <span className="text-gray-400">{item.tag}</span>
                </div>
                <div className="overlay icon absolute left-[40%] top-1/2 text-white">
                  <BsPlayCircle size={45} className="show" />
                  <AiFillPlayCircle
                    size={50}
                    className="hide absolute -left-1 -top-1"
                  />
                </div>
                <div className="overlay absolute bottom-0 right-0 text-white">
                  <div className="flex p-3">
                    <AiOutlineHeart size={22} className="mx-3" />
                    <BsThreeDots size={22} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
