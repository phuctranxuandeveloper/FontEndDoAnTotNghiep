import React, { useEffect, useState } from "react";
import { Card_lg } from "../common/Card_lg";
import { Album } from "../../models/Album";
import { getAlbums } from "../../server/AlbumService";
import Loader from "../common/Loader";

export const Browse = () => {
  const [listAlbum, setListAlbum] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchingAlbum = () => {
    getAlbums(5, 0)
      .then((data) => {
        setListAlbum(data._embedded.albumList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchingAlbum();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="treading hero mt-8 sm:mt-20">
          <h1 className="mb-5 text-5xl font-bold text-green-500">Albums</h1>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-1  md:grid-cols-4">
            {listAlbum.map((item, i) => (
              <div className="box card hero" key={i}>
                <Card_lg
                  cover="https://i.scdn.co/image/ab67616d00001e0206a4d1fd269dc47911d37eb3"
                  name={item.nameAlbum}
                  tag={item.artist.nameArtist}
                  link_one={`/albums/${item.id}`}
                  link_two={`/artists/${item.artist.id}`}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
