import React from "react";
import { Card_sm } from "./Card_sm";
import { AiFillApple, } from "react-icons/ai";
import { IoPlaySharp } from "react-icons/io5";

interface ItemRecomand {
  id: number;
  name: string;
  tag: string;
  cover: string;
}

export const Sidebar = () => {
  const recommand: ItemRecomand[] = [
    {
      id: 1,
      name: "Simple Place To Be",
      tag: "RYD",
      cover: "../images/b1.jpg",
    },
    {
      id: 2,
      name: "Reflection (Deluxe)",
      tag: "Fifth Harmony",
      cover: "../images/b2.jpg",
    },
    {
      id: 3,
      name: "The Open Road",
      tag: "Postiljonen",
      cover: "../images/b3.jpg",
    },
    {
      id: 4,
      name: "Body on me",
      tag: "Rita Ora",
      cover: "../images/b4.jpg",
    },
    {
      id: 5,
      name: "I Wanna Be In the Cavalry",
      tag: "Jeremy Scott",
      cover: "../images/b5.jpg",
    },
    {
      id: 6,
      name: "Pull Up",
      tag: "Summerella",
      cover: "../images/b6.jpg",
    },
    {
      id: 7,
      name: "What A Time To Be Alive",
      tag: "Judith Garcia",
      cover: "../images/b7.jpg",
    },
    {
      id: 8,
      name: "Live Radio",
      tag: "Radionomy",
      cover: "../images/b8.jpg",
    },
    {
      id: 9,
      name: "What A Time To Be Alive",
      tag: "Judith Garcia",
      cover: "../images/b3.jpg",
    },
    {
      id: 10,
      name: "Live Radio",
      tag: "Radionomy",
      cover: "../images/b2.jpg",
    },
  ];
  return (
    <>
      <section className="sidebar hero">
        <h1 className="mb-5 text-lg font-semibold text-gray-600">5 Likes</h1>
        {
            recommand.slice(0, 5).map((item, i) => (
                <div className="mb-3" key={i}>
                    <Card_sm urlAvatar={item.cover} tag={item.tag} name={item.name} i={i} show={false}/>
                </div>
            ))
        }
        <h1 className="mb-5 text-lg font-semibold text-gray-600 mt-5">
            Go Mobile
        </h1>
        <div className='flex justify-between'>
          <div className='bg-secondary text-white flex center px-2 py-0.5 rounded-md'>
            <div>
              <AiFillApple size={30} />
            </div>
            <div className=''>
              <span className='text-gray-300 text-[12px]'>Download on the</span>
              <h1 className='text-md font-semibold'>App Store</h1>
            </div>
          </div>
          <div className='bg-secondary text-white flex center px-2 py-0.5 rounded-md'>
            <div>
              <IoPlaySharp size={30} />
            </div>
            <div className=''>
              <span className='text-gray-300 text-[12px]'>Download on the</span>
              <h1 className='text-md font-semibold'>Google Play</h1>
            </div>
          </div>
        </div>
        <p className="text-sm mt-3">About Contact Legal Policy</p>
        <span className="text-gray-500 text-[12px]">© Copyright 2022</span>
      </section>
    </>
  );
};
