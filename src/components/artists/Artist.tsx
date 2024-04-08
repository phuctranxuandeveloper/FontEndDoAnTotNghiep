import React, { useState, useEffect } from "react";
import { Artist } from "../../models/Artist";
import { getArtists } from "../../server/ArtistService";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";

export const ListArtist = () => {
  const [listArtist, setListArtist] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchingArtists = () => {
    getArtists(5, 0)
      .then((data) => {
        setListArtist(data._embedded.artistList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchingArtists();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="mt-8 sm:mt-20">
          <h1 className="mb-5 text-5xl font-bold text-green-500">Artists</h1>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-1 md:grid-cols-4">
            {listArtist.map((item, i) => (
              <Link
                className="box card cursor-pointer text-center hover:scale-110"
                key={i}
                to={`/artists/${item.id}`}
              >
                <div className="img relative m-auto h-52 w-52">
                  <img
                    src={item.avatar}
                    alt="cover"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-md text-gray-500 font-semibold">
                    {item.nameArtist}
                  </h3>
                  <span className="text-gray-400">Artist</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
