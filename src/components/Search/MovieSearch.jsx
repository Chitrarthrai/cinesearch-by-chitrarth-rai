import React, { useState, useCallback } from "react";

import { Close } from "@bigbinary/neeto-icons";
import { Input, Spinner } from "@bigbinary/neetoui";
import axios from "axios";

import { useMovie } from "../../context/MovieContext";
import PreviewCard from "../Movie/PreviewCard";

const debounce = (func, delay) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const MovieSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  /* eslint-disable-next-line */
  const { setCurrentMovie, history, setHistory } = useMovie();
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const fetchMovies = async searchQuery => {
    try {
      setIsLoading(true);
      setError("");
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=e4fc4dee&s=${searchQuery}`
      );

      if (data.Response === "False") {
        setError(
          data.Error === "Incorrect IMDb ID."
            ? "Please type a query to retrieve relevant results"
            : data.Error
        );
      } else {
        setMovieList(data.Search || []);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 1000), []);

  const handleChange = e => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      debouncedFetchMovies(value);
    } else {
      setMovieList([]);
      setError("");
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    setMovieList([]);
    setError("");
  };

  return (
    <div className="text-white mt-8 flex h-screen w-full flex-col items-center bg-gradient-to-b">
      <div className="relative mb-1 mt-5 w-full max-w-lg">
        <Input
          className="text-gray-800 focus:ring-blue-500 w-full rounded-lg p-4 pr-10 shadow-lg focus:ring-2"
          disabled={isLoading}
          placeholder="Search for movies..."
          value={query}
          onChange={handleChange}
        />
        {query && (
          <Close
            className="text-gray-800 hover:text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
            size={24}
            onClick={handleClearSearch}
          />
        )}
      </div>
      {isLoading ? (
        <Spinner className="mt-6" size="large" />
      ) : (
        <div className="mt-6 flex h-full w-full max-w-6xl flex-wrap justify-center gap-8 overflow-y-auto">
          {error ? (
            <h2 className="text-red-500">{error}</h2>
          ) : (
            movieList.map(itm => <PreviewCard info={itm} key={itm.imdbID} />)
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
