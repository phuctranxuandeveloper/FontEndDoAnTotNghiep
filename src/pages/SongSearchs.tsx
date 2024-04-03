import React from "react";
import { NavSearch } from "../components/layout/NavSearch";
import { SongSearch } from "../components/search/SongSearch";
import { LayoutSideBar } from "../router";
import { useLocation } from "react-router-dom";

export const SongSearchs = () => {
  const {search} = useLocation();
  const queryParams = new URLSearchParams(search);
  const q = queryParams.get("q");
  return (
    <>
      <LayoutSideBar>
        <NavSearch query={q}/>
        <SongSearch query={q}/>
      </LayoutSideBar>
    </>
  );
};
