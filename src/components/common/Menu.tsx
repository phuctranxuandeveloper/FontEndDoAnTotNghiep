import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { Playlist } from "../../models/Playlist";
import { addSongToPlaylist, getPlaylists } from "../../server/PlaylistService";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface Props {
  idSong : number;
}


export const Menu = (props: Props) => {
  const ref = useRef(null);
  const [playlists, setPlaylist] = useState<Playlist[]>([]);

  const fetchingPlaylists = () => {
    getPlaylists("2")
      .then((data) => {
        setPlaylist(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchingPlaylists();
  }, []);

  const eventAddSongToPlaylist = (idPlaylist : number) => {
    addSongToPlaylist(props.idSong, idPlaylist)
    .then((data) => {
      if(data){
        toast.success("Add song to playlist with id:"+idPlaylist+" successful!");
      }
    })
    .catch((err) => {
      if (err.response) {
        toast.error(err.response.data)
    } else if (err.request) {
        toast.error('No response received');
    } else {
        toast.error(err.message);
    }
    })
  }

  return (
    <div
      ref={ref}
      className={" absolute right-2 top-11 z-50 w-[258px] bg-slate-500 p-2 "}
    >
      <ul className=" list-none">
        <li className=" mb-2 flex w-full items-center rounded-md bg-gray">
          <CiSearch className=" ml-2" size={20} />
          <input
            type="text"
            className="mr-2 w-full bg-gray p-2 outline-none"
            placeholder="Find a playlist"
          />
        </li>
        <li className=" mb-2 rounded-md hover:bg-slate-600">
          <button className="flex items-center ">
            <FiPlus size={20} className="ml-2" />
            <span className="text-md p-2 text-whiter">Add new playlist</span>
          </button>
        </li>
        <div className="border-t border-primary p-2"></div>
        {playlists &&
          playlists.length > 0 &&
          playlists.map((item, i) => (
            <li className="mb-1 w-full py-2 rounded-md hover:bg-slate-600" key={i}>
              <button onClick={() => eventAddSongToPlaylist(item.id)}>
              <span className=" text-md p-2 text-whiter">{item.namePlaylist}</span>
              </button>
            </li>
          ))}
        
      </ul>
    </div>
  );
};
