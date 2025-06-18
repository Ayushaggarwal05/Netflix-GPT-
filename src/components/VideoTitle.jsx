import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[17%] px-4 md:px-20 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-m w-1/4">{overview}</p>
      <div className="my-3 md:my-0">
        <button className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-lg  rounded-lg cursor-pointer hover:bg-gray-200  ">
          ▶️Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 mx-2 text-white p-4 px-10 text-lg bg-opacity-50 rounded-lg cursor-pointer ">
          ℹ️More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
