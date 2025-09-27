import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

// ✅ Import JSON directly from src/Data/
import Top10TVshows from "../Data/Top10TVshows.json";
import Top10Movies from "../Data/Top10Movies.json";
import ForYou from "../Data/ForYou.json";
import NewReleases from "../Data/NewRelease.json";
import Coming from "../Data/Coming+.json";
import Mustsee from "../Data/mustseehits.json";

function CategoryPage() {
  const { categoryName, genreName } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCardId, setOpenCardId] = useState(null);

  // Map categories to imported JSON
  const dataMap = {
    top10tvshows: Top10TVshows,
    top10movies: Top10Movies,
    foryou: ForYou,
    newrelease: NewReleases,
    coming: Coming,
    mustsee: Mustsee,
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      try {
        console.log("👉 Params:", { categoryName, genreName });

        let allMovies = [];

        if (genreName && genreName.toLowerCase() === "movies") {
          // ✅ Collect all movies from all main sources
          const movieSources = [Top10Movies, ForYou, NewReleases, Mustsee];

          // Flatten each source's inner arrays and combine into a single array
          allMovies = movieSources.flatMap((source) =>
            Object.values(source).flat()
          );

          console.log("👉 All Movies (before removing duplicates):", allMovies);
        } else if (genreName) {
          allMovies = Object.values(dataMap)
            .flatMap((source) => Object.values(source).flat())
            .filter(
              (m) =>
                (m.genre || m.status || "").toLowerCase() ===
                genreName.toLowerCase()
            );
        } else if (categoryName) {
          const categoryData = dataMap[categoryName.toLowerCase()];
          if (categoryData) {
            allMovies = Object.values(categoryData).flat();
          }
        }

        // ✅ Remove duplicates based on title (case-insensitive)
        const uniqueMoviesMap = new Map();
        allMovies.forEach((movie) => {
          const titleKey = (movie.title || "").trim().toLowerCase();
          if (!uniqueMoviesMap.has(titleKey)) {
            uniqueMoviesMap.set(titleKey, movie);
          }
        });

        const uniqueMovies = Array.from(uniqueMoviesMap.values());
        console.log("👉 Final uniqueMovies:", uniqueMovies);

        setMovies(uniqueMovies);
      } catch (err) {
        console.error("❌ Error loading JSON:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName, genreName]);

  if (loading) return <p className="p-6 text-lg">Loading...</p>;

  const heading = genreName || categoryName || "Movies";

  return (
    <div className="h-px w-[96%] mx-auto mt-0 shadow-sm">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 capitalize">
        {heading}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard
              key={`${movie.title}-${index}`}
              id={movie.id}
              poster={movie.poster}
              title={movie.title}
              duration={movie.duration}
              status={movie.genre || movie.status}
              year={movie.year}
              progress={movie.progress}
              openCardId={openCardId}
              setOpenCardId={setOpenCardId}
              category={categoryName}
            />
          ))
        ) : (
          <p>No movies found for {heading}.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
