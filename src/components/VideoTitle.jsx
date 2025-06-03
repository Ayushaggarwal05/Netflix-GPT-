import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[18%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div>
        <button className="bg-white text-black p-4 px-12 text-lg  rounded-lg cursor-pointer hover:bg-gray-200  ">
          ▶️Play
        </button>
        <button className="bg-gray-500 mx-2 text-white p-4 px-10 text-lg bg-opacity-50 rounded-lg cursor-pointer ">
          ℹ️More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
