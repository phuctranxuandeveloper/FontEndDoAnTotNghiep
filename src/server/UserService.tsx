import instance from "./Axios"

const fetchAllSong = () => {
    return instance.get("/songs");
}

export {fetchAllSong};
