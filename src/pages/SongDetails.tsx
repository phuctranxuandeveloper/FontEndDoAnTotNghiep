import React from 'react';
import { LayoutSideBar } from "../router";
import { SongDetail } from '../components/charts/SongDetail';

export const SongDetails = () => {
  return (
    <>
        <LayoutSideBar>
          <SongDetail />
        </LayoutSideBar>
    </>
  )
}
