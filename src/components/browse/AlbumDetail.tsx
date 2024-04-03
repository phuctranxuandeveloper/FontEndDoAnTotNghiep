import React, { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { Album } from "../../models/Album";
import { Song } from "../../models/Song";
import { Artist } from "../../models/Artist";
import { getSingleAlbum } from "../../server/AlbumService";
import { useParams, Link } from "react-router-dom";
import { Card_sm } from "../common/Card_sm";

type Params = {
  id: string;
};

// Lay ra ten nhung ca si
const getArtist = (song: Song) => {
  const listArtist: Artist[] = song.artists;
  const listStringArtist: string[] = [];
  listArtist.map((item) => {
    listStringArtist.push(item.nameArtist);
  });
  return listStringArtist.join(", ");
};

export const AlbumDetail = () => {
  const [album, setAlbum] = useState<Album | null>(null);
  const [listSong, setListSong] = useState<Song[]>([]);
  const { id } = useParams<Params>();

  const fetchingSingleAlbum = () => {
    if (id) {
      getSingleAlbum(id)
        .then((data) => {
          console.log(data);
          setAlbum(data);
          setListSong(data.songs);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(">>>>>id khong ton tai");
    }
  };

  useEffect(() => {
    fetchingSingleAlbum();
  }, []);
  if (album != null) {
    return (
      <>
        <section className="treading hero mt-8 sm:mt-20">
          <div className="flex items-end">
            <div className="img relative mr-5 h-52 w-52">
              <img
                src="https://i.scdn.co/image/ab67616d00001e0206a4d1fd269dc47911d37eb3"
                alt="cover"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text">
              <h3 className="cursor-pointer py-4 text-3xl font-semibold text-gray-500">
                <Link to="">{album.nameAlbum}</Link>
              </h3>
              <span className="flex cursor-pointer pb-4 text-xl text-gray-400">
                <Link to={`/artists/${album.artist.id}`} className="mr-2">
                  {album.artist.nameArtist}
                </Link>
              </span>
              <span className=" text-md flex pb-4 text-gray-400">
                {album.track}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="action flex items-center">
              <AiFillPlayCircle
                size={52}
                className="ml-5 cursor-pointer text-green-500 hover:scale-110"
              />
              <CiCirclePlus
                size={40}
                className=" ml-5 cursor-pointer text-gray-500 hover:text-gray-800"
              />
              <BsThreeDots
                size={28}
                className=" ml-5 cursor-pointer text-gray-400 hover:text-gray-800"
              />
            </div>
          </div>
          <div className="top-song mt-4">
            <h1 className="mb-5 text-3xl font-bold text-green-500">Top Song</h1>
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
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <div className="">
          <h1 className="mb-5 text-3xl font-bold text-primary">
            Không có bài hát nào phù hợp
          </h1>
        </div>
      </>
    );
  }
};
