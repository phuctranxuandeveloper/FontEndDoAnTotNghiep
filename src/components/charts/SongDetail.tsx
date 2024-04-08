import React, { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { Song } from "../../models/Song";
import { getSingleSong } from "../../server/SongService";
import { Artist } from "../../models/Artist";
import { Genre } from "../../models/Genre";
import { useAppDispatch } from "../../hook";
import { playingMusic } from "../../store/playingMusic/playingMusicSlice";
import Loader from "../common/Loader";

type Params = {
  id: string;
};

export const SongDetail = () => {
  const [song, setSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [listArtist, setListSong] = useState<Artist[]>([]);
  const [listGenre, setListGenre] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const { id } = useParams<Params>();

  const fetchingSongSingle = () => {
    if (id) {
      getSingleSong(id)
        .then((data) => {
          setSong(data);
          setListSong(data.artists);
          setListGenre(data.genres);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setSong(null);
          setListSong([]);
          setListGenre([]);
        });
    } else {
      setSong(null);
    }
  };

  useEffect(() => {
    fetchingSongSingle();
  }, []);

  const togglePlayMusic = () => {
    if (song != null) {
      setIsPlaying(true);
      dispatch(
        playingMusic({
          songid: song.id,
          isPlaying: isPlaying,
          duration: 0,
          currentTime: 0,
        }),
      );
    }
  };

  if (song != null) {
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <section className="treading hero mt-8 sm:mt-20">
            <div className="flex items-end">
              <div className="img relative mr-5 h-52 w-52">
                <img
                  src={song.avatar}
                  alt="cover"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text">
                <h3 className="cursor-pointer py-4 text-3xl font-semibold text-body">
                  <Link to="">{song.nameSong}</Link>
                </h3>
                <span className="flex cursor-pointer pb-4 text-xl text-black-2">
                  {listArtist.map((artist, i) => (
                    <Link to={`/artists/${artist.id}`} key={i} className="mr-2">
                      {artist.nameArtist}{" "}
                    </Link>
                  ))}
                </span>
                <span className=" text-md text-gray-400 flex pb-4">
                  {listGenre.map((genre, i) => (
                    <p key={i} className="mr-2">
                      {genre.nameGenre}
                    </p>
                  ))}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="action flex items-center">
                <AiFillPlayCircle
                  size={52}
                  className="ml-5 cursor-pointer text-green-500 hover:scale-110"
                  onClick={() => togglePlayMusic()}
                />
                <CiCirclePlus
                  size={40}
                  className=" text-gray-500 hover:text-gray-800 ml-5 cursor-pointer"
                />
                <BsThreeDots
                  size={28}
                  className=" text-gray-400 hover:text-gray-800 ml-5 cursor-pointer"
                />
              </div>
            </div>
            <div className="drescib mt-4">
              <h1 className="mb-5 text-3xl font-bold text-green-500">
                Description
              </h1>
              <div
                className=" text-md text-gray-500 mb-5 font-medium"
                dangerouslySetInnerHTML={{ __html: song.describe }}
              >
                {/* {song.describe} */}
              </div>
            </div>
          </section>
        )}
      </>
    );
  } else {
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="">
            <h1 className="mb-5 text-3xl font-bold text-green-500">
              Không có bài hát nào phù hợp
            </h1>
          </div>
        )}
      </>
    );
  }
};
