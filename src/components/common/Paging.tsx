import React from "react";
import { Link } from "react-router-dom";

interface Props {
  totalPage: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  id: string;
}

export const Paging = (props: Props) => {
  return (
    <>
      <div className="pagination mt-4">
        <ul className="flex items-center justify-center">
          <Link to={`/admin/manager/${props.id}?page=${props.prevPage}`} className="px-4 ">
            <button className=" text-body ">
              <p className="hover:underline hover:underline-offset-4">Prev</p>
            </button>
          </Link>
          {Array.from(Array(props.totalPage).keys()).map((item, i) => (
            <li key={i}>
              <Link to={`/admin/manager/${props.id}?page=${item}`} className="px-4">
                <button className={`h-[24px] w-[24px] rounded-full hover:bg-[#ccc] text-body ${item !== props.currentPage ? `null` : `bg-[#ccc]`}`}>
                  {(item + 1)}
                </button>
              </Link>
            </li>
          ))}
          <Link to={`/admin/manager/${props.id}?page=${props.nextPage}`} className="px-4 ">
            <button className=" text-body ">
              <p className="hover:underline hover:underline-offset-4">Next</p>
            </button>
          </Link>
        </ul>
      </div>
    </>
  );
};
