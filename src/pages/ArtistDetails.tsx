import React from 'react';
import { LayoutSideBar } from "../router";
import { ArtistDetail } from '../components/artists/ArtistDetail';

export const ArtistDetails = () => {
  return (
    <>
        <LayoutSideBar>
            <ArtistDetail />
        </LayoutSideBar>
    </>
  )
}
