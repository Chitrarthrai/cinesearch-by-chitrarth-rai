import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import SearchHistory from "./components/History/SearchHistory";
import Thumbnail from "./components/Movie/Thumbnail";
import MovieSearch from "./components/Search/MovieSearch";
import { MovieProvider } from "./context/MovieContext";
import { queryClient } from "./utils/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MovieProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <div className="flex h-full w-2/3 flex-col items-center justify-center p-2">
          <MovieSearch />
        </div>
        <div className="h-screen w-1/3 flex-col border-l">
          <div className="flex h-3/5 w-full items-center justify-center border-b">
            <Thumbnail />
          </div>
          <div className="h-2/5 w-full flex-col gap-3">
            <SearchHistory />
          </div>
        </div>
      </div>
    </MovieProvider>
  </QueryClientProvider>
);

export default App;
