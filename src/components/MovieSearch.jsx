import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

import MovieList from "./MovieList";

const debounce = (func, delay) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const fetchMovies = async searchQuery => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=your_api_key&s=${searchQuery}`
    );
    setMovies(response.data.Search || []);
  };

  const debouncedSearch = useCallback(debounce(fetchMovies, 500), []);

  const handleChange = e => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== "") {
      debouncedSearch(value);
      navigate(`/?query=${value}`);
    }
  };

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setQuery(query);
      debouncedSearch(query);
    }
  }, [searchParams, debouncedSearch]);

  return (
    <div className="search-container">
      <input
        className="search-input"
        id="search-input"
        placeholder="Search for a movie or series..."
        type="text"
        value={query}
        onChange={handleChange}
      />
      <MovieList movies={movies} />
    </div>
  );
};

export default MovieSearch;
