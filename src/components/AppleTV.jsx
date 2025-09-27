import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { useNavigate } from "react-router-dom";
import ScrollableRow from './MovieCarousel';
import ArrowIcon from '../assets/Arrow.png';
import { useWatchlist } from "./WatchlistContext";

// ✅ Import JSON locally
import ContinueWatching from "../Data/Continuewatching.json";
import Top10TVshows from "../Data/Top10TVshows.json";
import Top10Movies from "../Data/Top10Movies.json";
import ForYou from "../Data/ForYou.json";
import NewReleases from "../Data/NewRelease.json";
import Coming from "../Data/Coming+.json";
import Mustsee from "../Data/mustseehits.json";
import Powerplay from "../Data/PowerPlay.json";
import Category from "../Data/category.json";

function convertToMinutes(timeStr) {
  let minutes = 0;
  const hourMatch = timeStr.match(/(\d+)h/);
  const minMatch = timeStr.match(/(\d+)m/);

  if (hourMatch) minutes += parseInt(hourMatch[1]) * 60;
  if (minMatch) minutes += parseInt(minMatch[1]);

  return minutes;
}

function AppleTV() {
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();
  const [watching, setWatching] = useState([]);
  const [top10shows, setTop10shows] = useState([]);
  const [top10movies, setTop10movies] = useState([]);
  const [foryou, setForyou] = useState([]);
  const [newrelease, setNewRelease] = useState([]);
  const [coming, setComing] = useState([]);
  const [category, setCategory] = useState([]);
  const [mustsee, setMustsee] = useState([]);
  const [powerplay, setPowerplay] = useState([]);
  const [openCardId, setOpenCardId] = useState(null);

  // ✅ Load data from local JSON instead of Axios
  useEffect(() => {
    // Continue Watching: calculate progress
    const updatedWatching = ContinueWatching.Continuewatching.map((movie) => {
      const total = convertToMinutes(movie.duration);
      const watched = convertToMinutes(movie.watched_duration);
      const remaining = total - watched;
      const progress = (watched / total) * 100;
      return {
        ...movie,
        remaining: `${remaining} MIN`,
        progress: Math.round(progress),
      };
    });
    setWatching(updatedWatching);

    setTop10shows(Object.values(Top10TVshows).flat());
    setTop10movies(Object.values(Top10Movies).flat());
    setForyou(Object.values(ForYou).flat());
    setNewRelease(Object.values(NewReleases).flat());
    setComing(Object.values(Coming).flat());
    setCategory(Object.values(Category).flat());
    setMustsee(Object.values(Mustsee).flat());
    setPowerplay(Object.values(Powerplay).flat());
  }, []);

  // Generic section renderer
  const renderSection = (
    title,
    data,
    route,
    cardProps = {},
    showArrow = true,
    isCategory = false,
    showDescription = false
  ) => (
    <div>
      {title && (
        <div className="ml-13 pb-4 -mt-2 flex items-center">
          <h1 className="text-[1.4em] font-bold text-black tracking-tight leading-snug">{title}</h1>
          {showArrow && (
            <button onClick={() => navigate(route)} className="ml-2 mt-1">
              <img src={ArrowIcon} alt="Arrow" className="w-4 h-8 cursor-pointer" />
            </button>
          )}
        </div>
      )}

      <ScrollableRow showArrows={data.length > 5}>
        {isCategory
          ? data.map(item => (
              <div
                key={`cat-${item.id}`}
                onClick={() => navigate(`/category/genre/${item.title}`)}
                className="cursor-pointer"
              >
                <MovieCard
                  id={`cat-${item.id}`}
                  poster={item.poster}
                  title={item.title}
                  comeap=""
                  isCategory={true}
                  openCardId={openCardId}
                  setOpenCardId={setOpenCardId}
                />
              </div>
            ))
          : data.map((item, index) => (
              <MovieCard
                key={item.id}
                id={item.id}
                poster={item.poster}
                title={item.title}
                duration={item.duration}
                status={cardProps.isPowerplay ? item.type : item.status || item.genre || item.type} 
                rank={index + 1}
                type={item.type}
                genre={item.genre}
                time_left={item.remaining}
                description={item.description}
                progress={item.progress}
                comeap={showDescription ? item.description : ""}
                openCardId={openCardId}
                setOpenCardId={setOpenCardId}
                {...cardProps}
              />
            ))
        }
      </ScrollableRow>

      <div className="h-px w-[96%] mx-auto mt-4 bg-gray-300 shadow-sm"></div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 mt-15">
      {renderSection("Continue Watching on Apple TV+", watching, "", { isWatchlist: false }, false)}
      {renderSection("Top 10 TV Shows", top10shows, "/category/top10tvshows", { isTop10: true }, true)}
      {renderSection("Top 10 Movies", top10movies, "/category/top10movies", { isTop10: true }, true)}
      {renderSection("For You", foryou, "/category/foryou")}
      {renderSection("Heroic Misfits", powerplay, "/category/powerplay", { isPowerplay: true }, false)}
      {renderSection("New Release", newrelease, "/category/newrelease",{isHigh : true})}
      {renderSection("Coming on Apple TV+", coming, "/category/coming", { isComing: true })}
      {renderSection("Browse by Category", category, "/category/category", {}, false, true, false)}
      {renderSection("Must-See Hits", mustsee, "/category/mustsee", { isMustSee: true })}

      {watchlist.length > 0 &&
        renderSection("My Watchlist", watchlist, "", { isWatchlist: true }, false)
      }
    </div>
  );
}

export default AppleTV;
