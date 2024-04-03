import React from 'react';
import { LayoutSideBar } from '../router';
import { Browse } from '../components/browse/Browse';

export const Browser = () => {
  return (
    <div>
        <LayoutSideBar>
            <Browse />
        </LayoutSideBar>
    </div>
  )
}
