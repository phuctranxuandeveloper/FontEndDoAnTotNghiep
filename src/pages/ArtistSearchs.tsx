import { useLocation } from "react-router-dom";
import { NavSearch } from "../components/layout/NavSearch";
import { ArtistSearch } from "../components/search/ArtistSearch";
import { LayoutSideBar } from "../router";

export const ArtistSearchs = () => {
  const {search} = useLocation();
  const queryParams = new URLSearchParams(search);
  const q = queryParams.get("q");
  return (
    <>
      <LayoutSideBar>
        <NavSearch query={q}/>
        <ArtistSearch query={q}/>
      </LayoutSideBar>
    </>
  );
};
