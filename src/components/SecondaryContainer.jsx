import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log(movies.popularMovies);
  return (
    <div className="bg-black">
      <div className="-mt-54 relative z-20 pl-6">
        <MovieList title={"Now Playing "} movies={movies.nowPlayingMovies} />
        <MovieList title={"Top Rated "} movies={movies.topRatedMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming "} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
