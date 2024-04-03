import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { MdRepeat } from "react-icons/md";
import { TbArrowsShuffle } from "react-icons/tb";
import { HiVolumeUp } from "react-icons/hi";
import { Song } from "../../models/Song";
import { getSingleSong } from "../../server/SongService";
import { useAppSelector } from "../../hook";

const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const MusicPlay = () => {
  const [idSongPlaying, setIdSongPlaying] = useState<number>(() =>
    localStorage.getItem("song") !== null
      ? JSON.parse(localStorage.getItem("song")!)
      : 0,
  );

  const idSong = useAppSelector((state) => state.playingMusic.songid);

  const [song, setSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const fetchingSingleSong = () => {
    if (idSongPlaying) {
      getSingleSong(String(idSongPlaying))
        .then((data) => {
          setSong(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSong(null);
    }
  };

  const audioPlayer = useRef<HTMLAudioElement>(null!);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(audioPlayer.current.duration);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioPlayer.current.currentTime);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = (Number(e.target.value) * duration) / 100;
    audioPlayer.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    fetchingSingleSong();
    
  }, [idSongPlaying]);

  useEffect(() => {
    setIdSongPlaying(idSong);
    
  }, [idSong]);

  return (
    <>
      <footer className="fixed bottom-0 w-full bg-gray-700 text-bodydark1 bg-graydark">
        <div className="flex h-20 items-center justify-center md:justify-between">
          <div className="img hidden items-center md:visible md:flex">
            <img
              src={song?.avatar}
              alt="img"
              className="mr-5 h-20 w-20 object-cover"
            />
            <h3>{song?.nameSong}</h3>
            <AiOutlineHeart size={20} className="ml-32" />
          </div>
          <div className=" w-[33%] flex-grow-0 items-center">
            <div className="flex items-center justify-center">
              <TbArrowsShuffle className="mr-5 text-gray-400" />
              <BiSkipPrevious size={30} />
              {!isPlaying ? (
                <BsPlayCircleFill
                  size={40}
                  className="mx-5 text-green-500"
                  onClick={() => togglePlayPause()}
                />
              ) : (
                <BsPauseCircleFill
                  size={40}
                  className="mx-5 text-green-500"
                  onClick={() => togglePlayPause()}
                />
              )}
              <BiSkipNext size={30} />
              <MdRepeat className="ml-5 text-gray-400" />
            </div>
            <div className="z-50 flex w-full flex-col px-10">
              <audio
                src={song?.urlMusic}
                ref={audioPlayer}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
              ></audio>
              <input
                type="range"
                id="song-percentage-played"
                className="amplitude-song-slider"
                step=".1"
                value={(currentTime / duration) * 100 || 0}
                onChange={(event) => handleSeek(event)}
              />
              <div className="flex w-full justify-between">
                <span className="amplitude-current-time font-sans text-xs font-medium tracking-wide text-sky-500 dark:text-sky-300"></span>
                <span className="amplitude-duration-time font-sans text-xs font-medium tracking-wide text-gray-500"></span>
              </div>
            </div>
          </div>
          <div className="mx-5 hidden items-center md:visible md:flex">
            <p className="text-sm text-gray-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
            <HiVolumeUp className="mx-8" />
            <AiOutlineMenu />
          </div>
        </div>
      </footer>
    </>
  );
};
