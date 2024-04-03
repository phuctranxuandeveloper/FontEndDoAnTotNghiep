import { useEffect, useState } from "react";
import { Artist } from "../../models/Artist";
import { searchArtist } from "../../server/ArtistService";
import { Link } from "react-router-dom";

interface Props {
  query: string | null;
}

export const ArtistSearch = (props: Props) => {
  const [listArtist, setListArtist] = useState<Artist[]>([]);

  const fetchingArtists = () => {
    if (props.query != null) {
      console.log(props.query);
      searchArtist(props.query)
        .then((data) => {
          setListArtist(data._embedded.artistList);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setListArtist([]);
    }
  };

  useEffect(() => {
    fetchingArtists();
  }, [props.query]);

  if (listArtist.length != 0) {
    return (
      <>
        <section className="mx-5 mt-8 py-8 sm:mt-20">
          <h1 className="mb-5 text-5xl font-bold text-primary">Artists</h1>
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
                  <h3 className="text-md font-semibold text-gray-500">
                    {item.nameArtist}
                  </h3>
                  <span className="text-gray-400">Artist</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </>
    );
  } else {
    return (
      <div className=" mx-5 py-8">
        <h1 className="mb-5 text-3xl font-bold text-gray-800">
          Không tìm thấy artist nào phù hợp
        </h1>
      </div>
    );
  }
};
