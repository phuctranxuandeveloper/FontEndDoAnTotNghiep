import React, { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumbs/Breadcrumb";
import { TableThreeAlbum } from "../tables/TableThreeAlbum";
import { Album } from "../../models/Album";
import { getAlbums } from "../../server/AlbumService";
import { useSearchParams } from "react-router-dom";
import { Paging } from "../common/Paging";

export const ManagerAlbum = () => {
  const [listAlbum, setListAlbum] = useState<Album[]>([]);
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

  const fetchingListAlbum = () => {
    const per_page = searchParams.get("size") ?? 1;
    const page = searchParams.get("page") ?? 0;
    getAlbums(Number(per_page), Number(page))
      .then((data) => {
        setListAlbum(data._embedded.albumList);
        setCurrentPage(data.page.number);
        setTotalPage(data.page.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchingListAlbum();
  }, [searchParams]);

  return (
    <>
      <Breadcrumb pageName="Manager Album" />
      <div className="flex flex-col gap-10">
        <TableThreeAlbum listAlbum={listAlbum} />
      </div>
      <Paging
        id="album"
        totalPage={totalPage}
        currentPage={currentPage}
        nextPage={getNextPage()}
        prevPage={getPrevPage()}
      />
    </>
  );
};
