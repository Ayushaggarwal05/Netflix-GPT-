import React from "react";
import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-42 pr-4">
      <img alt="Movie card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
