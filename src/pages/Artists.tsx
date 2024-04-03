import React from "react";
import { ListArtist } from "../components/artists/Artist";
import { LayoutSideBar } from "../router";

export const Artists = () => {
  return (
    <>
      <LayoutSideBar>
        <ListArtist />
      </LayoutSideBar>
    </>
  );
};
