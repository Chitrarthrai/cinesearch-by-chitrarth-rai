import React, { useState, useEffect, useCallback } from "react";

import { Spinner } from "@bigbinary/neetoui";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const fetchMovies = async searchQuery => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=your_api_key&s=${searchQuery}`
      );
      if (response.data.Response === "False") {
        if (response.data.Error === "Too many results.") {
          setError("Too many results. Please refine your search.");
        } else {
          setError("No movies found.");
        }
        setMovies([]);
      } else {
        setMovies(response.data.Search || []);
      }
    } catch (error) {
      setError(error ? "An error occurred while fetching the data." : "");
    } finally {
      setLoading(false);
    }
  };

  // Debounce function to limit API calls
  const debouncedSearch = useCallback(
    debounce(value => fetchMovies(value), 500),
    []
  );

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
      {loading && <Spinner size="large" />}
      {error && <p className="error-message">{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MovieSearch;
