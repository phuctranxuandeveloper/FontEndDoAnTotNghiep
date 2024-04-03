import React from 'react';
import { LayoutSideBar } from '../router';
import { Chart } from '../components/charts/Chart';

export const Charts = () => {
  return (
    <>
        <LayoutSideBar>
            <Chart />
        </LayoutSideBar>
    </>
  )
}
