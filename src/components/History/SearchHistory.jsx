import React, { useRef, useEffect } from "react";

import { useMovie } from "../../context/MovieContext";
import PreviewCard from "../Movie/PreviewCard";

const SearchHistory = () => {
  const { currentMovie, history } = useMovie();
  const historyRef = useRef(null);

  const scrollToElement = id => {
    if (historyRef.current) {
      const element = historyRef.current.querySelector(`#${id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (history.length > 0 && currentMovie) {
      if (history.some(movie => movie.imdbID === currentMovie.imdbID)) {
        scrollToElement(currentMovie.imdbID);
      }
    }
  }, [currentMovie, history]);

  return (
    <div
      className="flex h-full w-full flex-col items-center gap-2 overflow-y-auto p-2"
      ref={historyRef}
    >
      {history.length > 0 &&
        history.reverse().map(movie => (
          <div className="flex gap-4" id={movie.imdbID} key={movie.imdbID}>
            <PreviewCard info={movie} />
          </div>
        ))}
    </div>
  );
};

export default SearchHistory;
