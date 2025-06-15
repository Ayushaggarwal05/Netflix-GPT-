import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const handleGptSearchClick = async () => {
    //Make an API call to GPT API and get movie result
    const gptQuery =
      "Act as a Movie recommand system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give 5 movies , comman separated  like the example  result given ahead . Example Result : Gadar , Shiddat , Don , Sholay , Koi MIl Gaya.  and also don't repeat movies name.";

    const gptResults = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: gptQuery },
      ],
    });

    console.log(gptResults.choices[0].message);
  };

  return (
    <div className="py-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
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
