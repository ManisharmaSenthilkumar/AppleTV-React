import React, { useEffect, useState } from "react";
import MovieCard from './MovieCard';
import ScrollableRow from "./MovieCarousel";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../assets/Arrow.png";

function MLS() {
  const navigate = useNavigate();

  // MLS sections state
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [teams, setTeams] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [mlsis, setMlsis] = useState([]);
  const [hroic, setHroic] = useState([]);
  const [bigc, setBigc] = useState([]);
  const [openCardId, setOpenCardId] = useState(null);

  // Generic fetch function for local JSON
  const fetchJSON = (filePath, setter) => {
    fetch(filePath)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch ${filePath}`);
        return res.json();
      })
      .then(data => {
        // handle JSON with object root containing arrays
        if (!Array.isArray(data)) {
          const firstArray = Object.values(data).find(v => Array.isArray(v));
          data = firstArray || [];
        }
        setter(data);
      })
      .catch(err => {
        console.error(`Error loading ${filePath}:`, err);
        setter([]);
      });
  };

  // Fetch all JSON data on mount
  useEffect(() => {
    fetchJSON("/Data/Matches.json", setLiveMatches);
    fetchJSON("/Data/Allclubs.json", setUpcomingMatches);
    fetchJSON("/Data/hroic.json", setHroic);
    fetchJSON("/Data/stories.json", setTopPlayers);
    fetchJSON("/Data/matchmoments.json", setHighlights);
    fetchJSON("/Data/pastmatches.json", setTeams);
    fetchJSON("/Data/bigc.json", setBigc);
    fetchJSON("/Data/sfatl.json", setFavorites);
    fetchJSON("/Data/Mlsstudio.json", setMlsis);
  }, []);

  // Render a section with optional arrow and custom card props
  const renderSection = (title, data, route, cardProps = {}, showArrow = true) => (
    <div key={title + route}>
      <div className="ml-13 pb-4 -mt-2 flex items-center">
        {title && <h1 className="text-[1.4em] font-bold text-black tracking-tight leading-snug">{title}</h1>}
        {showArrow && (
          <button onClick={() => navigate(route)} className="ml-2 mt-1">
            <img src={ArrowIcon} alt="Arrow" className="w-4 h-8 cursor-pointer" />
          </button>
        )}
      </div>

      <ScrollableRow showArrows={data.length > 5}>
        {data.map(item => (
          <MovieCard
            key={item.id}
            id={item.id}
            typ={item.type}
            poster={item.poster}       // URLs inside JSON
            title={item.title}
            genre={item.genre}
            description={item.description}
            date={item.date}
            teamName={item.name}
            time={item.time}
            league={item.league}
            teams={item.teams}
            home_team={item.home_team}
            away_team={item.away_team}
            score={item.score}
            openCardId={openCardId}
            setOpenCardId={setOpenCardId}
            {...cardProps} // extra flags like isFavorite, isTopPlayer
          />
        ))}
      </ScrollableRow>

      <div className="h-px w-[96%] mx-auto mt-4 bg-gray-300 shadow-sm"></div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 mt-15">
      {renderSection("Matches", liveMatches, "/mls/live", { isMatch: true }, false)}
      {renderSection("All Clubs", upcomingMatches, "/mls/upcoming", { isCircular: true }, false)}
      {renderSection("", hroic, "/mls/hrolic", { ispower: true }, false)}
      {renderSection("Stories From Around the League", topPlayers, "/mls/topplayers", { isHigh: true }, false)}
      {renderSection("Match Highlights", highlights, "/mls/highlights", { isHigh: true }, false)}
      {renderSection("Past Matches", teams, "/mls/teams", { istea: true }, false)}
      {renderSection("", bigc, "/mls/bigc", { isbigc: true }, false)}

      {favorites.length > 0 &&
        renderSection("Stories From Around the League (en espanol)", favorites, "/mls/favorites", { isHigh: true }, false)}

      {renderSection("MLS in Studio", mlsis, "/mls/mlsis", { istea: true }, false)}
    </div>
  );
}

export default MLS;
