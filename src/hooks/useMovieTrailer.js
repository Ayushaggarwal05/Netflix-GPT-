import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    if (!movieId) return;
    // console.log(movieId);

    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );

    const json = await data.json();
    // console.log(json);

    const filterData = json.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterData?.length ? filterData[0] : json.results?.[0];
    // console.log(trailer);

    if (trailer) {
      dispatch(addTrailerVideo(trailer));
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, [movieId]); // ✅ so it updates when movieId changes
};

export default useMovieTrailer;
