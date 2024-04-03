import { useEffect, useState } from 'react'
import { Album } from '../../models/Album';
import { searchAlbum } from '../../server/AlbumService';
import { Card_lg } from '../common/Card_lg';

interface Props {
  query: string | null;
}


export const AlbumSearch = (props : Props) => {
  const [listAlbum, setListAlbum] = useState<Album[]>([]);
  
  const fetchingAlbum = () => {
    if (props.query != null) {
      console.log(props.query);
      searchAlbum(props.query)
        .then((data) => {
          setListAlbum(data._embedded.albumList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      setListAlbum([]);
    }
  };

  useEffect(() => {
    fetchingAlbum();
  }, [props.query]);
  
  if (listAlbum.length != 0) {
    return (
      <>
        <section className="treading hero mt-8 sm:mt-20 mx-5 py-8">
          <h1 className="mb-5 text-5xl font-bold text-primary">Albums</h1>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-1  md:grid-cols-4">
            {listAlbum.map((item, i) => (
              <div className="box card hero" key={i}>
                <Card_lg
                  cover="https://i.scdn.co/image/ab67616d00001e0206a4d1fd269dc47911d37eb3"
                  name={item.nameAlbum}
                  tag={item.artist.nameArtist}
                  link_one={`/albums/${item.id}`}
                  link_two={`/artists/${item.artist.id}`}
                />
              </div>
            ))}
          </div>
        </section>
      </>
    )
  }
  else
  {
    return (
      <>
        <div className=" mx-5 py-8">
          <h1 className="mb-5 text-3xl font-bold text-gray-800">
            Không tìm thấy album nào phù hợp
          </h1>
        </div>
      </>
    )
  }
}
