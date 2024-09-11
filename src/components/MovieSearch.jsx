import React, { useState, useEffect, useCallback } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

const debounce = (func, delay) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = searchQuery => {
    // Reflect search query in the URL
    navigate(`/?query=${searchQuery}`);
    // Logic to call the OMDb API can go here
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const handleChange = e => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== "") {
      debouncedSearch(value);
    }
  };

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setQuery(query);
      debouncedSearch(query);
    }

    const handleSlashKey = event => {
      if (event.key === "/") {
        event.preventDefault();
        document.getElementById("search-input").focus();
      }
    };

    document.addEventListener("keydown", handleSlashKey);

    return () => document.removeEventListener("keydown", handleSlashKey);
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
    </div>
  );
};

export default MovieSearch;
