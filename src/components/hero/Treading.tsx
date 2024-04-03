import React from "react";
import { Title } from "../common/Title";
import { Card_lg } from "../common/Card_lg";
import Slider from "react-slick";

interface ItemTreading {
  id: number;
  name: string;
  tag: string;
  cover: string;
}

export const Treading = () => {
  const treading: ItemTreading[] = [
    {
      id: 1,
      name: "What A Time To Be Alive",
      tag: "Judith Garcia",
      cover: "../images/b3.jpg",
    },
    {
      id: 2,
      name: "Live Radio",
      tag: "Radionomy",
      cover: "../images/b2.jpg",
    },
    {
      id: 3,
      name: "I Wanna Be In the Cavalry",
      tag: "Jeremy Scott",
      cover: "../images/b5.jpg",
    },
    {
      id: 4,
      name: "Body on me",
      tag: "Rita Ora",
      cover: "../images/b6.jpg",
    },
    {
      id: 5,
      name: "Fireworks",
      tag: "Kygo",
      cover: "../images/b1.jpg",
    },
    {
      id: 6,
      name: "Simple Place To Be",
      tag: "RYD",
      cover: "../images/b7.jpg",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <section className="treading hero">
        <Title title="Treading" />
        <Slider {...settings}>
          {treading.map((item, i) => (
            <div className="box card hero m-5" key={i}>
              <div className="mr-5">
                <Card_lg cover={item.cover} name={item.name} tag={item.tag} />
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};
