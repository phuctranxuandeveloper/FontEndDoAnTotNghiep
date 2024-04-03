import React from "react";
import { Title } from "../common/Title";
import { Card_lg } from "../common/Card_lg";

interface ItemNews {
  id: number;
  name: string;
  tag: string;
  cover: string;
}

export const News = () => {
  const news: ItemNews[] = [
    {
      id: 1,
      name: "Simple Place To Be",
      tag: "RYD",
      cover: "../images/b7.jpg",
    },
    {
      id: 2,
      name: "Reflection (Deluxe)",
      tag: "Fifth Harmony",
      cover: "../images/b8.jpg",
    },
    {
      id: 3,
      name: "The Open Road",
      tag: "Postiljonen",
      cover: "../images/b9.jpg",
    },
    {
      id: 4,
      name: "Body on me",
      tag: "Rita Ora",
      cover: "../images/b6.jpg",
    },
    {
      id: 5,
      name: "I Wanna Be In the Cavalry",
      tag: "Jeremy Scott",
      cover: "../images/b2.jpg",
    },
    {
      id: 6,
      name: "Pull Up",
      tag: "Summerella",
      cover: "../images/b4.jpg",
    },
    {
      id: 7,
      name: "What A Time To Be Alive",
      tag: "Judith Garcia",
      cover: "../images/b3.jpg",
    },
    {
      id: 8,
      name: "Live Radio",
      tag: "Radionomy",
      cover: "../images/b5.jpg",
    },
  ];
  return (
    <>
      <section className="treading hero">
        <Title title="New" />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-1  md:grid-cols-4">
          {news.map((item, i) => (
            <div className="box card hero" key={i}>
              <Card_lg cover={item.cover} name={item.name} tag={item.tag} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
