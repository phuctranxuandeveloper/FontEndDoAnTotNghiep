import React from 'react'
import { Hero, Treading, LayoutSideBar, News, Recommand } from '../router'

export const Home = () => {
  return (
    <>
      <Hero />
      <LayoutSideBar>
        <Treading />
        <News />
        <Recommand />
      </LayoutSideBar>
    </>
  )
}
