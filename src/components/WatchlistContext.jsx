import React, { createContext, useState, useContext, useEffect } from "react";

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
 const [watchlist, setWatchlist] = useState(() => {
    // Load from localStorage on first render
    const stored = localStorage.getItem("watchlist");
    return stored ? JSON.parse(stored) : [];
  });
    useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (prev.find((item) => item.id === movie.id)) return prev; // already exists
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWatchlist = (id) => {
    return watchlist.some((item) => item.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
