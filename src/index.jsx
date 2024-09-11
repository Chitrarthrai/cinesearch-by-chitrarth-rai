// src/index.jsx
import React from "react";

import movieQueryClient from "hooks/useMovieDetails";
import { QueryClientProvider } from "react-query";

import SearchHistory from "./History/SearchHistory";
import MoviePreviewCard from "./Movies/MoviePreviewCard";
import MovieSearch from "./MovieSearch";

const Movie = () => (
  <div className="flex h-screen w-[100vw] overflow-hidden">
    <div className="mb-3.5 flex h-screen w-2/3 flex-col items-center justify-center">
      <MovieSearch />
    </div>
    <div className="h-screen w-1/3 flex-col border-l-2">
      <div className="flex h-1/2 w-full items-center justify-center border-b-2">
        <QueryClientProvider client={movieQueryClient}>
          <MoviePreviewCard />
        </QueryClientProvider>
      </div>
      <div className="h-1/2 w-full flex-col gap-3">
        <SearchHistory />
      </div>
    </div>
  </div>
);

export default Movie;
