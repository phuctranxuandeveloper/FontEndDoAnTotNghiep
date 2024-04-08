import React, { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumbs/Breadcrumb";
import { useParams } from "react-router-dom";
import { Album } from "../../models/Album";
import { getSingleAlbum, updateAlbum } from "../../server/AlbumService";
import toast from "react-hot-toast";
import { Artist } from "../../models/Artist";
import {
  getArtists,
  getListSongByArtist,
  getSingleArtist,
} from "../../server/ArtistService";
import { Song } from "../../models/Song";
import Loader from "../common/Loader";

type Params = {
  id: string;
};

export const ManagerAlbumEdit = () => {
  const { id } = useParams<Params>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [nameInput, setNameInput] = useState<string>("");
  const [urlAvatarInput, setUrlAvatarInput] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [listArtist, setListArtist] = useState<Artist[]>([]);
  const [listSongOption, setListSongOption] = useState<Song[]>([]);
  const [listSongSelected, setListSongSelected] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handleUrlAvatarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlAvatarInput(e.target.value);
  };

  const handleSave = () => {
    if (album !== null) {
      album.nameAlbum = nameInput;
      album.avatar = urlAvatarInput;
      album.songs = listSongSelected;
      getSingleArtist(selectedOption)
        .then((data) => {
          album.artist = data;
          toast.promise(updateAlbum(album), {
            loading: "Saving.....",
            success: (data) => `Successfully save ${data.nameAlbum}`,
            error: (err) => `This just happened: ${err}`,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSelectSong = (song: Song) => {
    setListSongSelected([...listSongSelected, song]);
    setListSongOption(listSongOption.filter((item) => item.id !== song.id));
  };

  const handleRemoveSong = (song: Song) => {
    setListSongSelected(listSongSelected.filter((item) => item.id !== song.id));
    setListSongOption([...listSongOption, song]);
  };

  const fetchingAlbum = () => {
    if (id) {
      getSingleAlbum(id)
        .then((data) => {
          setAlbum(data);
          setListSongSelected(data.songs);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fetchingArtists = () => {
    getArtists(100, 0)
      .then((data) => {
        setListArtist(data._embedded.artistList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchingListSongOption = () => {
    if (Number(selectedOption) !== 0) {
      getListSongByArtist(selectedOption)
        .then((data) => {
          if (listSongSelected.length > 0) {
            const newListSongOption: Song[] = [...data];
            for (let index = 0; index < listSongSelected.length; index++) {
              const element = listSongSelected[index];
              for (let i = 0; i < newListSongOption.length; i++) {
                const e = newListSongOption[i];
                if (e.id === element.id) {
                  console.log(e);
                  data = data.filter((item) => item.id !== e.id);
                }
              }
            }

            setListSongOption(data);
          } else {
            setListSongOption(data);
          }
        })
        .then((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchingAlbum();
    fetchingArtists();
  }, []);

  useEffect(() => {
    fetchingListSongOption();
  }, [selectedOption]);

  useEffect(() => {
    if (album) {
      setNameInput(album.nameAlbum);
      setUrlAvatarInput(album.avatar);
      setSelectedOption(String(album.artist.id));
      setListSongSelected(album.songs);
      // setListSongOption(listSongOption.filter(item => !album.songs.includes(item)));
    }
  }, [album]);

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Manager Artist / Add" />

        <div className="grid grid-cols-5 gap-8">
          <div className="xl:col-span-3 col-span-5">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Album with id:{id} Information
                </h3>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <div className="p-7">
                  <div>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Name Album
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Em của ngày hôm qua"
                            value={nameInput}
                            onChange={(e) => handleNameInputChange(e)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="urlAvatar"
                      >
                        Url Avatar
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="urlAvatar"
                          id="urlAvatar"
                          placeholder=""
                          value={urlAvatarInput}
                          onChange={(e) => handleUrlAvatarInput(e)}
                        />
                      </div>
                    </div>

                    <div className="mb-5.5">
                      <div>
                        <label className="mb-3 block text-black dark:text-white">
                          Select Artist
                        </label>

                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                                  fill="#637381"
                                ></path>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                                  fill="#637381"
                                ></path>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                                  fill="#637381"
                                ></path>
                              </g>
                            </svg>
                          </span>

                          <select
                            value={selectedOption}
                            onChange={(e) => {
                              setSelectedOption(e.target.value);
                              changeTextColor();
                            }}
                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                              isOptionSelected
                                ? "text-black dark:text-white"
                                : ""
                            }`}
                          >
                            <option
                              value=""
                              disabled
                              className="text-body dark:text-bodydark"
                            >
                              Select Artist
                            </option>
                            {listArtist &&
                              listArtist.length >= 0 &&
                              listArtist.map((item, i) => (
                                <option
                                  value={item.id}
                                  className="text-body dark:text-bodydark"
                                  key={i}
                                >
                                  {item.nameArtist}
                                </option>
                              ))}
                          </select>

                          <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                  fill="#637381"
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-5.5 ">
                      <div className="flex flex-row gap-5.5 sm:flex-col">
                        <div className="w-1/2 sm:w-full">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="urlAvatar"
                          >
                            Song Selected:
                          </label>
                          <div className="w-full border border-stroke">
                            <div className="max-w-full overflow-x-auto">
                              <table className="w-full table-auto">
                                <thead>
                                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="xl:pl-11 min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                                      Name
                                    </th>
                                    {/* <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Release date
                                  </th>
                                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                    Status
                                  </th> */}
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className=" max-h-30 overflow-scroll overflow-y-auto">
                                  {listSongSelected.length > 0 ? (
                                    listSongSelected.map((item, key) => (
                                      <tr key={key}>
                                        <td className="xl:pl-11 border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                                          <h5 className="font-medium text-black dark:text-white">
                                            {item.nameSong}
                                          </h5>
                                        </td>

                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                          <div className="flex items-center space-x-3.5">
                                            <button
                                              className="lg:px-4 xl:px-8 inline-flex items-center justify-center rounded-full bg-danger px-5 py-2 text-center font-medium text-whiten hover:bg-opacity-90"
                                              onClick={() =>
                                                handleRemoveSong(item)
                                              }
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <span className="text-center">
                                      List Song Selected is Empty !
                                    </span>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/2 sm:w-full">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="urlAvatar"
                          >
                            Song Option:
                          </label>
                          <div className="w-full border border-stroke">
                            <div className="max-w-full overflow-x-auto">
                              <table className="w-full table-auto">
                                <thead>
                                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="xl:pl-11 min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                                      Name
                                    </th>
                                    {/* <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Release date
                                  </th>
                                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                    Status
                                  </th> */}
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="max-h-30 overflow-scroll overflow-y-auto">
                                  {listSongOption.length !== 0 ? (
                                    listSongOption.map((item, key) => (
                                      <tr key={key}>
                                        <td className="xl:pl-11 border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                                          <h5 className="font-medium text-black dark:text-white">
                                            {item.nameSong}
                                          </h5>
                                        </td>

                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                          <div className="flex items-center space-x-3.5">
                                            <button
                                              className="lg:px-4 xl:px-8 inline-flex items-center justify-center rounded-full bg-success px-5 py-2 text-center font-medium text-whiten hover:bg-opacity-90"
                                              onClick={() =>
                                                handleSelectSong(item)
                                              }
                                            >
                                              Select
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <span className="text-center">
                                      List Song Option is Empty !
                                    </span>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                      >
                        Cancel
                      </button>
                      <button
                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                        onClick={() => handleSave()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
