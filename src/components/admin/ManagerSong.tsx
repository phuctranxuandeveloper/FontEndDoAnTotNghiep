import React, { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumbs/Breadcrumb";
import { Song } from "../../models/Song";
import { getSongs } from "../../server/SongService";
import { TableThreeSong } from "../tables/TableThreeSong";
import { Paging } from "../common/Paging";
import { useSearchParams } from "react-router-dom";

export const ManagerSong = () => {
  const [listSong, setListSong] = useState<Song[]>([]);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const fetchingListSong = () => {
    const per_page = searchParams.get("size") ?? 4;
    const page = searchParams.get("page") ?? 0;
    setIsLoading(true);
    getSongs(Number(per_page), Number(page))
      .then((data) => {
        setListSong(data._embedded.songList);
        setCurrentPage(data.page.number);
        setTotalPage(data.page.totalPages);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchingListSong();
  }, [searchParams]);

  console.log(listSong);

  return (
    <>
      <Breadcrumb pageName="Manager Song" />
      <div className="flex flex-col gap-10">
        <TableThreeSong listSong={listSong} setListSong={setListSong} isLoading={isLoading}/>
      </div>
      <Paging
        id="song"
        totalPage={totalPage}
        currentPage={currentPage}
        nextPage={getNextPage()}
        prevPage={getPrevPage()}
      />
    </>
  );
};
