import React, { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumbs/Breadcrumb";
import { TableThreeArtist } from "../tables/TableThreeArtist";
import { Artist } from "../../models/Artist";
import { getArtists } from "../../server/ArtistService";
import { useSearchParams } from "react-router-dom";
import { Paging } from "../common/Paging";

export const ManagerArtist = () => {
  const [listArtist, setListArtist] = useState<Artist[]>([]);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getNextPage = (): number => {
    if (currentPage === totalPage - 1) {
      return 0;
    } else {
      return currentPage + 1;
    }
  };

  const getPrevPage = (): number => {
    if (currentPage === 0) {
      return totalPage - 1;
    } else {
      return currentPage - 1;
    }
  };

  const fetchingListArtist = () => {
    const per_page = searchParams.get("size") ?? 1;
    const page = searchParams.get("page") ?? 0;
    getArtists(Number(per_page), Number(page))
      .then((data) => {
        setListArtist(data._embedded.artistList);
        setCurrentPage(data.page.number);
        setTotalPage(data.page.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchingListArtist();
  }, [searchParams]);
  return (
    <>
      <Breadcrumb pageName="Manager Artist" />
      <div className="flex flex-col gap-10">
        <TableThreeArtist listArtist={listArtist} />
      </div>
      <Paging
        id="artist"
        totalPage={totalPage}
        currentPage={currentPage}
        nextPage={getNextPage()}
        prevPage={getPrevPage()}
      />
    </>
  );
};
