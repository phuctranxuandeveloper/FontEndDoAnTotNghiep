import React from "react";
import { NavSearch } from "../components/layout/NavSearch";
import { AlbumSearch } from "../components/search/AlbumSearch";
import { LayoutSideBar } from "../router";
import { useLocation } from "react-router-dom";

export const AlbumSearchs = () => {
  const {search} = useLocation();
  const queryParams = new URLSearchParams(search);
  const q = queryParams.get("q");
  return (
    <>
      <LayoutSideBar>
        <NavSearch query={q}/>
        <AlbumSearch query={q}/>
      </LayoutSideBar>
    </>
  );
};
