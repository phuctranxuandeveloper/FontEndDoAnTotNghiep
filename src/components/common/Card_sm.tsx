import { Link } from "react-router-dom";
import { BsPlayCircle, BsThreeDots } from "react-icons/bs";
import { AiFillPlayCircle, AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { playingMusic } from "../../store/playingMusic/playingMusicSlice";
import { Menu } from "./Menu";
import { useState, useRef, useEffect } from "react";
import {
  addSongToFavorist,
  checkSongToFavorist,
  removeSongToFavorist,
} from "../../server/FavoristService";
import toast from "react-hot-toast";

interface Props {
  id: number;
  urlAvatar: string;
  name: string;
  tag: string;
  i: number;
  show: boolean;
  link_one: string;
  link_two: string;
}

export const Card_sm = (props: Props) => {
  const [visibilityMenu, setVisibilityMenu] = useState<boolean>(false);
  const [isSongInFav, setIsSongInFav] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null!);

  const checkingSongInFav = () => {
    checkSongToFavorist(props.id, 5)
      .then((data) => {
        data ? setIsSongInFav(true) : setIsSongInFav(false);
      })
      .catch(() => setIsSongInFav(false));
  };

  const addSongToFav = () => {
    addSongToFavorist(props.id, 5)
      .then((data) => {
        if (data) {
          toast.success("Added Song with id: " + props.id + " to my favorist!");
          setIsSongInFav(true);
        } else {
          toast.error("Add Song to my favorist failed!");
          // setIsSongInFav(false);
        }
      })
      .catch((err) => {
        toast.error(err);
        // setIsSongInFav(false);
      });
  };

  const removeSongToFav = () => {
    removeSongToFavorist(props.id, 5)
      .then((data) => {
        if (data) {
          toast.success("Removed song with id: " + props.id + " in my favorist!");
          setIsSongInFav(false);
        }
        else{
          toast.error("Remove song with id: " + props.id + " in my favorist failed!");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const dispatch = useDispatch();

  const togglePlay = () => {
    dispatch(
      playingMusic({
        songid: props.id,
        isPlaying: true,
        duration: 0,
        currentTime: 0,
      }),
    );
    console.log(localStorage);
  };

  const toggleMenuHidden = () => {
    const stateMenu = visibilityMenu;
    setVisibilityMenu(!stateMenu);
    console.log("click");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setVisibilityMenu(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    checkingSongInFav();
  }, [isSongInFav]);

  return (
    <>
      <div
        className={
          !visibilityMenu
            ? "box card relative flex cursor-pointer rounded-md p-2 transition ease-in-out hover:bg-gray"
            : "box card relative flex cursor-pointer rounded-md bg-gray p-2 transition ease-in-out"
        }
        key={props.i}
      >
        {props.show && (
          <div className="mr-5 flex items-center text-lg text-gray">
            {props.i + 1}
          </div>
        )}
        <div className="img relative mr-5 h-16 w-16">
          <img
            src={props.urlAvatar}
            alt="cover"
            className="h-full w-full rounded-md object-cover"
          />
          <div
            className="overlay icon absolute left-2 top-3 text-white"
            onDoubleClick={togglePlay}
          >
            <BsPlayCircle size={45} className="show" />
            <AiFillPlayCircle
              size={50}
              className="hide absolute -left-1 -top-1"
            />
          </div>
        </div>
        <div className=" absolute bottom-0 right-0 text-black-2">
          <div className="relative flex p-3">
            {isSongInFav ? (
              <FaHeart size={22} color="red" className="mx-3 cursor-pointer" onClick={() => removeSongToFav()}/>
            ) : (
              <AiOutlineHeart size={22} className="mx-3 cursor-pointer" onClick={() => addSongToFav()}/>
            )}
            <BsThreeDots size={22} onClick={() => toggleMenuHidden()} />
          </div>
          <div ref={ref} className={visibilityMenu ? "visible" : "invisible"}>
            <Menu idSong={props.id} />
          </div>
        </div>
        <div className="text">
          <h3 className="text-md cursor-pointer font-semibold text-body">
            <Link to={props.link_one}>{props.name}</Link>
          </h3>
          <span className="cursor-pointer text-body">
            <Link to={props.link_two}>{props.tag}</Link>
          </span>
        </div>
      </div>
    </>
  );
};
