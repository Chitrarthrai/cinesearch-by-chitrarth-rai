import React, { useState, useEffect } from "react";

import { Spinner } from "@bigbinary/neetoui";

import { useMovie } from "../../context/MovieContext";

const Thumbnail = () => {
  const { currentMovie } = useMovie();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentMovie) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 100);

      return () => clearTimeout(timer);
    }

    return () => {};
  }, [currentMovie]);

  if (!currentMovie) {
    return (
      <div className="min-h-72 mx-auto mb-3.5 mt-3.5 flex w-60 flex-col items-center justify-center gap-1 text-center">
        <h6 className="text-gray-500 mt-1.5 flex h-full w-full items-center justify-center italic">
          Please select a movie from search to see details!
        </h6>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-72 mx-auto mb-3.5 mt-3.5 flex w-60 flex-col items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-72 mx-auto mb-2 mt-10 flex w-48 flex-col items-center justify-center gap-1 text-center">
      <img
        alt={currentMovie.Title}
        className="h-[90%] object-contain"
        src={currentMovie.Poster}
      />
      <h5 className="mt-2 font-bold">{currentMovie.Title}</h5>
      <h5 className="font-bold">{currentMovie.Language?.split(",")[0]}</h5>
      <h5>
        <span className="font-bold">Type: </span>
        {currentMovie.Type}
      </h5>
      <h5>
        <span className="mb-3 font-bold">Year: </span>
        {currentMovie.Year}
      </h5>
    </div>
  );
};

export default Thumbnail;
