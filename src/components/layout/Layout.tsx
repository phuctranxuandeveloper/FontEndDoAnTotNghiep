import React, { ReactNode } from "react";
import { Header } from "../header/Header";
import { MusicPlay } from "../footer/MusicPlay";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mt-[4%]">{children}</main>
      <Toaster position="top-right"/>
      <MusicPlay />
    </>
  );
};
