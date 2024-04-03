import React from "react";
import { BsPlayCircle, BsThreeDots } from "react-icons/bs";
import { AiFillPlayCircle, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
  cover: string;
  name: string;
  tag: string;
  link_one: string;
  link_two: string;
}

export const Card_lg = (props: Props) => {
  return (
    <>
      <div className="img relative h-72">
        <img
          src={props.cover}
          alt="cover"
          className="h-full w-full rounded-md object-cover"
        />
        <div className="overlay icon absolute left-[40%] top-1/2 text-white">
          <BsPlayCircle size={45} className="show" />
          <AiFillPlayCircle
            size={50}
            className="hide absolute -left-1 -top-1"
          />
        </div>
      </div>
      <div className="overlay absolute bottom-0 right-0 text-secondary">
        <div className="flex p-3">
          <AiOutlineHeart size={22} className="mx-3" />
          <BsThreeDots size={22} />
        </div>
      </div>
      <div className="text">
        <Link to={props.link_one} className=" cursor-pointer"><h3 className="text-md font-semibold text-gray-500">{props.name}</h3></Link>
        <Link to={props.link_two} className=" cursor-pointer"><span className="text-gray-400">{props.tag}</span></Link>
      </div>
    </>
  );
};
