import React, { useEffect, useState } from "react";
import { Card_sm } from "../common/Card_sm";
import { Song } from "../../models/Song";
import { Artist } from "../../models/Artist";
import { getSongs } from "../../server/SongService";
import Loader from "../common/Loader";

// Lay ra ten nhung ca si
const getArtist = (song: Song) => {
  const listArtist: Artist[] = song.artists;
  const listStringArtist: string[] = [];
  listArtist.map((item) => {
    listStringArtist.push(item.nameArtist);
  });
  return listStringArtist.join(", ");
};

export const Chart = () => {
  const [listSong, setListSong] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchingSong = () => {
    getSongs(5, 0)
      .then((data) => {
        setListSong(data._embedded.songList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchingSong();
  }, []);
  console.log(listSong);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="treading hero mt-8 sm:mt-20">
          <h1 className="mb-5 text-5xl font-bold text-green-500">List Songs</h1>
          <div className="grid grid-cols-1 gap-5">
            {listSong.map((item, i) => (
              <div className="box card hero" key={i}>
                <Card_sm
                  id={item.id}
                  urlAvatar={item.avatar}
                  name={item.nameSong}
                  tag={getArtist(item)}
                  i={i}
                  show={true}
                  link_one={`/songs/${item.id}`}
                  link_two={`/artist/${item.id}`}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
