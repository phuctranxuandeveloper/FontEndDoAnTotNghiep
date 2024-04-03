import { useEffect, useState } from "react";
import { Song } from "../../models/Song";
import { searchSong } from "../../server/SongService";
import { Card_sm } from "../common/Card_sm";
import { Artist } from "../../models/Artist";

// Lay ra ten nhung ca si
const getArtist = (song: Song) => {
  const listArtist: Artist[] = song.artists;
  const listStringArtist: string[] = [];
  listArtist.map((item) => {
    listStringArtist.push(item.nameArtist);
  });
  return listStringArtist.join(", ");
};
interface Props {
  query: string | null;
}

export const SongSearch = (props: Props) => {
  const [listSong, setListSong] = useState<Song[]>([]);

  const fetchingSong = () => {
    if (props.query != null) {
      console.log(props.query);
      searchSong(props.query)
        .then((data) => {
          setListSong(data._embedded.songList);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setListSong([]);
    }
  };

  useEffect(() => {
    fetchingSong();
  }, [props.query]);
  console.log(listSong);
  if (listSong.length != 0) {
    return (
      <>
        <section className="treading hero mt-8 sm:mt-20">
          <h1 className="mb-5 text-5xl font-bold text-primary">List Songs</h1>
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
      </>
    );
  } else {
    return (
      <div className=" mx-5 py-8">
        <h1 className="mb-5 text-3xl font-bold text-gray-800">
          Không tìm thấy song nào phù hợp
        </h1>
      </div>
    );
  }
};
