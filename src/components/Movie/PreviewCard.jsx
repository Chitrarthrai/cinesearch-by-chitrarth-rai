import React from "react";

import { useMovie } from "../../context/MovieContext";

const PreviewCard = ({ info }) => {
  const { currentMovie, setCurrentMovie, history, setHistory } = useMovie();
  const isSelected = currentMovie?.imdbID === info.imdbID;

  const handleClick = () => {
    setCurrentMovie(info);
    if (!history.some(movie => movie.imdbID === info.imdbID)) {
      setHistory(prevHistory => [...prevHistory, info]);
    }
  };

  return (
    <div
      className={`min-h-55 flex w-40 cursor-pointer flex-col items-center gap-1 rounded-md border-4 p-2 shadow-md transition-transform duration-300 ease-linear hover:scale-105 ${
        isSelected ? "border-lightblue bg-blue" : "border-lightblue"
      }`}
      onClick={handleClick}
    >
      <img
        alt=""
        className="h-[70%] w-[100%] rounded-sm object-contain"
        src={info.Poster}
      />
      <h5 className="text-gray-900 m-0 mt-2 text-center text-sm font-bold">
        {info.Title}
      </h5>
      {isSelected && (
        <>
          <h3>{info.Type}</h3>
          <h3>{info.Year}</h3>
        </>
      )}
    </div>
  );
};

export default PreviewCard;
