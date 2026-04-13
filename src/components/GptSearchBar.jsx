import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import getChatCompletion from "../utils/openai";
import { addGptMoviResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "http://localhost:3001/api/search/movie?query=" + encodeURIComponent(movie)
    );

    const json = await data.json();
    return json.results; // for all movies related  and down there specific movie
    // return json.results.filter(
    //   (result) => result.title.toLowerCase() === movie.trim().toLowerCase()
    // );
  };

  const handleGptSearchClick = async () => {
    //Make an API call to GPT API and get movie result
    const gptQuery =
      "You are a Movie Recommendation System. Based on the query: " +
      searchText.current.value +
      ", suggest exactly 5 relevant movie names, comma-separated (e.g., Gadar, Shiddat, Don, Sholay, Koi Mil Gaya). " +
      "Return only movie names — no explanation, no extra text. Do not repeat movie names within or across responses. " +
      "Each response must return a different set of movies if asked again. If no suggestions are available, return nothing.";

    const result = await getChatCompletion(gptQuery);
    // console.log(result.message);
    const gptMovies = result.message.split(",");
    console.log(gptMovies);

    if (!result.message) {
      console.error("Error getting movie recommendations:");
    }

    const promiseArray = gptMovies.map((movies) => searchMovieTMDB(movies)); // provide me [ promise , promise , promise , promise , promise]
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMoviResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[40%] md:pt-[8%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 text-white"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2px-4 bg-red-700 text-white rounded-lg cursor-pointer"
          onClick={handleGptSearchClick}>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
