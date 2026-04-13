import React from "react";
import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-34 md:w-42 pr-4 hover:scale-115 overflow-hidden">
      <img
        alt="Movie card"
        className="rounded-2xl"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};

export default MovieCard;
