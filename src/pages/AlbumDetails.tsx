import React from "react";
import { LayoutSideBar } from "../router";
import { AlbumDetail } from "../components/browse/AlbumDetail";

export const AlbumDetails = () => {
  return (
    <>
      <LayoutSideBar>
        <AlbumDetail />
      </LayoutSideBar>
    </>
  );
};
