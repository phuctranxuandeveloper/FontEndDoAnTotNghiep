import React, { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { Card_sm } from "../common/Card_sm";
import { Artist } from "../../models/Artist";
import {
  getListAlbumByArtist,
  getListSongByArtist,
  getSingleArtist,
} from "../../server/ArtistService";
import { useParams, Link } from "react-router-dom";
import { Song } from "../../models/Song";
import { Album } from "../../models/Album";

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

export const ArtistDetail = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [listSong, setListSong] = useState<Song[]>([]);
  const [listAlbum, setListAlbum] = useState<Album[]>([]);
  const { id } = useParams<Params>();

  const fetchingSinggleArtist = () => {
    if (id) {
      getSingleArtist(id)
        .then((data) => {
          console.log(data);
          setArtist(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(">>>>>id rỗng");
    }
  };

  const fetchingListSongByArtist = () => {
    if (id) {
      getListSongByArtist(id)
        .then((data) => {
          console.log(data);
          setListSong(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(">>>>>id rỗng");
    }
  };

  const fetchingListAlbumByArtist = () => {
    if (id) {
      getListAlbumByArtist(id)
        .then((data) => {
          console.log(data);
          setListAlbum(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(">>>>>id rỗng");
    }
  };

  useEffect(() => {
    fetchingSinggleArtist();
    fetchingListSongByArtist();
    fetchingListAlbumByArtist();
  }, []);
  if (artist != null) {
    return (
      <>
        <section className="treading hero mt-8 sm:mt-20">
          <div className="flex items-end">
            <div className="img relative mr-5 h-52 w-52">
              <img
                src={artist.avatar}
                alt="cover"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="text">
              <h3 className="cursor-pointer py-4 text-3xl font-semibold text-gray-500">
                <Link to="">{artist.nameArtist}</Link>
              </h3>
              <span className="flex cursor-pointer pb-4 text-xl text-gray-400">
                Artist
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
          <div className="top-album mt-4">
            <h1 className="mb-5 text-3xl font-bold text-green-500">Top Album</h1>
            <div className="grid grid-cols-1 gap-5">
              {listAlbum.map((item, i) => (
                <div className="box card hero" key={i}>
                  <Card_sm
                    id={item.id}
                    urlAvatar="https://i.scdn.co/image/ab67616d00001e0206a4d1fd269dc47911d37eb3"
                    name={item.nameAlbum}
                    tag={item.artist.nameArtist}
                    i={i}
                    show={true}
                    link_one={`/albums/${item.id}`}
                    link_two={`/artist/${item.artist.id}`}
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
          <h1 className="mb-5 text-3xl font-bold text-green-500">
            Không có bài hát nào phù hợp
          </h1>
        </div>
      </>
    );
  }
};