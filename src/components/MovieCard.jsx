import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Details from "../assets/details.png";
import Link from "../assets/Link.png";
import Marked from "../assets/Marked.png";
import Share from "../assets/share.png";
import Remove from "../assets/remove.png";
import logo from "../assets/logo.png";
import { useWatchlist } from "../components/WatchlistContext";


function MovieCard({
  id,
  poster,
  title,
  duration,
  status,
  year,
  genre,
  time_left,
  time,
  ispower=false,
  progress,
  openCardId,
  setOpenCardId,
  category,
  rank,
  type,
  titl,
  teamName,
  league,
  date,
  typ,
  isHigh=false,
  description,
  isComing = false,
  isTop10 = false,
  variant = "default",
  isCircular = false,
  isMatch = false, 
   istea = false,
   isNewRelease = false,
   isPowerplay = false,
   isbigc=false,
   isCategory=false,
   teams,       // NEW
  home_team,              // NEW
  away_team// new prop: "appleTV", "MLS", etc.
}) {
  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(id);

  const isOpen = openCardId === id;
  const canHover = !openCardId || isOpen;

  const handleClick = () => {
    if (category) {
      // Navigate to /category/{id or genre name}
      navigate(`/category/${title?.toLowerCase() || id}`);
    }
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpenCardId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setOpenCardId]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setOpenCardId(isOpen ? null : id);
  };

  const handleWatchlistToggle = () => {
    if (inWatchlist) removeFromWatchlist(id);
    else addToWatchlist({ id, poster, title, duration, status, year });
    setOpenCardId(null);
  };

  const menuItems = isComing
    ? [
      { label: "Share", icon: Share, action: () => { } },
      { label: "Copy Link", icon: Link, action: () => { } },
    ]
    : [
      {
        label: inWatchlist ? "Remove from Watchlist" : "Add to Watchlist",
        icon: inWatchlist ? Remove : Marked,
        action: handleWatchlistToggle,
      },
      { label: "Mark as Watched", icon: Marked, action: () => { } },
      { label: "View Details", icon: Details, action: () => { } },
      { label: "Share", icon: Share, action: () => { } },
      { label: "Copy Link", icon: Link, action: () => { } },
    ];

  // Conditional CSS based on variant

const isPowerMode = isPowerplay || ispower; // combine both

const styles = {
  // 🎥 Container styles
  container: (() => {
    // ✅ Force AppleTV / Continue Watching / MLS sections
    if (category === "continueWatching" || category === "MLS") {
      return "w-[300px] h-[180px] rounded-lg shadow-xl";
    }
     if (variant === "appleTV") {
      return "w-[200px] h-[180px] rounded-lg shadow-xl";
    }

    if (isCircular) return "w-50 h-50 rounded-2xl shadow-lg overflow-hidden"; // Circular card
    if (isbigc) return "w-[1815px] h-[670px] rounded-3xl"; // Big featured card
    if (isPowerMode) return "w-[430px] h-[530px] rounded-2xl"; // Powerplay & Power
    return "w-[345px] h-[213px] rounded-xl shadow-lg"; // Default
  })(),

  // ▶️ Play button styles
  playButton: (() => {
    if (variant === "appleTV" || category === "continueWatching" || category === "MLS") {
      return "p-3 bg-white/60 hover:bg-blue-500";
    }
    if (isCircular) return "p-3 bg-white/70 hover:bg-red-500 rounded-full";
    if (isbigc) return "p-5 bg-white/70 hover:bg-green-500";
    if (isPowerMode) return "p-4 bg-white/60 hover:bg-blue-500";
    return "p-2 bg-white/70 hover:bg-blue-400";
  })(),

  // 📝 Title text styles
  titleText: (() => {
    if (variant === "appleTV" || category === "continueWatching" || category === "MLS") {
      return "text-lg sm:text-xl font-semibold";
    }
    if (isCircular) return "text-lg font-bold text-center text-black";
    if (isbigc) return "text-3xl font-extrabold text-black";
    if (isPowerMode) return "text-xl font-bold text-black";
    return "text-lg font-medium";
  })(),

  // 📄 Subtitle / description styles
  subText: (() => {
    if (variant === "appleTV" || category === "continueWatching" || category === "MLS") {
      return "text-sm sm:text-base opacity-90";
    }
    if (isCircular) return "text-sm text-center text-gray-500";
    if (isbigc) return "text-lg font-semibold text-gray-700 opacity-90";
    if (isPowerMode) return "text-base font-semibold text-gray-600";
    return "text-base opacity-80";
  })(),
};
  return (
    <div
      className="flex flex-col relative gap-0"
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Card */}
      <div
        className={`relative overflow-hidden ${styles.container} hover:cursor-pointer bg-center bg-cover`}
        style={{ backgroundImage: `url(${poster})` }}

      >
        {isMatch && time && (
          <div className="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded-md shadow-md">
            {time}
          </div>
        )}
         {isPowerplay && title && (
          <div className="absolute top-100 left-2  text-white text-5xl font-bold px-2 py-1 ">
            {title}
          </div>
        )}
        {isPowerplay  && type && genre &&(
  <div className="absolute top-117 left-3 flex items-center gap-2 text-gray-300 text-lg font-semibold px-2 py-1">
    {/* Image before text */}
    <img 
      src={logo}   // <-- replace with your imported image or prop
      alt="icon"
      className="w-6 h-6 object-contain rounded-4xl"
    />
    <span>{type} . {genre}</span>
  </div>
)}
     {ispower && time && (
          <div className="absolute top-90 left-3 bg-black border-white border-1 text-white text-xs font-semibold px-2 py-1 rounded-2xl shadow-md">
            {time}
          </div>
        )}
         {ispower && title && (
          <div className="absolute top-95 left-2  text-white text-5xl font-bold px-2 py-1 ">
            {title}
          </div>
        )}
        {ispower  && typ && (
  <div className="absolute top-109 left-3 flex items-center gap-2 text-gray-300 text-sm font-semibold px-2 py-1">
    {/* Image before text */}
    <img 
      src={logo}   // <-- replace with your imported image or prop
      alt="icon"
      className="w-6 h-6 object-contain rounded-4xl"
    />
      <span>{typ}</span>
  </div>
)}{ispower && description && (
          <div className="absolute top-116 left-3  text-gray-300 text-base font-regular px-2 py-1 ">
            {description}
          </div>
        )}
         
      
         {isbigc && title && (
          <div className="absolute top-130 left-6  text-white text-5xl font-bold px-2 py-1 ">
            {title}
          </div>
        )}
        {isbigc  && typ && (
  <div className="absolute top-147 left-7 flex items-center gap-2 text-gray-300 text-sm font-semibold px-2 py-1">
    {/* Image before text */}
    <img 
      src={logo}   // <-- replace with your imported image or prop
      alt="icon"
      className="w-6 h-6 object-contain rounded-4xl"
    />
      <span>{typ} . {genre}</span>
  </div>
)}{isbigc && description && (
          <div className="absolute top-155 left-7  text-gray-300 text-base font-regular px-2 py-1 ">
            {description}
          </div>
        )}
        {/* Play Button Overlay */}
        {(!isCategory && !isbigc && !isPowerplay && !ispower  && !isCircular && (canHover && isHovered || isNewRelease) && !isOpen) && (
  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
    <div className={`btn-glass ${styles.playButton} rounded-full`}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-white fill-white`} viewBox="0 0 24 24">
        <path d="M14.752 11.168l-5.197-3.028A1 1 0 008 9.028v5.944a1 1 0 001.555.832l5.197-3.028a1 1 0 000-1.664z" />
      </svg>
    </div>
  </div>
)}

        {/* Progress Bar */}
        {progress && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="w-full h-1 bg-gray-500 rounded-full overflow-hidden">
              <div className="h-full bg-white" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Three-dot Button */}
       {(!isCategory && !isbigc && !isPowerplay && !ispower && !isCircular && (((canHover && isHovered) || isOpen) || isNewRelease)) && (
  <div className="absolute bottom-2 right-2 transition">
    <button
      ref={buttonRef}
      onClick={handleMenuToggle}
      className="btn-glass bg-white/70 rounded-full p-2 hover:bg-blue-400 focus:outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white fill-white" viewBox="0 0 24 24">
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
      </svg>
    </button>
  </div>
)}
      </div>


      {/* Title / Info */}
      <div className="mt-2 text-black relative">
        {!isbigc && !isPowerplay && !ispower && <div className={styles.titleText}>{title}</div>}

        {isCircular && teamName && (
          <div className="flex flex-col items-center text-base font-semibold text-black-700 mt-1">{teamName}</div>
        )}

        {!isPowerplay && !ispower && (
  <div className={styles.subText}>
    {status} {duration ? `· ${duration}` : year && `· ${year}`}
  </div>
)}

        {isMatch && home_team && away_team && (
          <div className="flex flex-col mt-1 px-1">
            <div className="text-base font-semibold text-gray-700">{home_team} vs {away_team}</div>
            {league && <div className="text-base font-medium text-gray-500 mt-1">{league}</div>}
          </div>
        )}

        {/* High / Description Section (NEW) */}
        {isHigh && description && (
          <div className="mt-1 text-sm  font-normal text-gray-500">
            {description}
          </div>
        )}
        {isNewRelease && description && (
  <div className="mt-1 text-sm font-normal  text-gray-500">
    {description}
  </div>
)}
        {istea && teams &&(
          <div className="flex flex-col mt-1 ml-1 px-1">
            <div className="text-base font-semibold text-gray-700">{teams}</div>
            {league && <div className="text-base font-medium text-gray-500 mt-1">{league}</div>}
          </div>
        )}

        {/* High / Description Section (NEW) */}
        {istea && teams && (
          <div className="mt-1 ml-2 text-sm font-normal text-gray-500">
            {date}
          </div>
        )}
      </div>
      
      {/* Portal Popup Menu */}
      {isOpen &&
        buttonRef.current &&
        createPortal(
          <div
            ref={menuRef}
            className="w-[198px] text-xs font-thin rounded-lg shadow-xl z-[9999]"
            style={{
              position: "absolute",
              top: buttonRef.current.getBoundingClientRect().bottom + window.scrollY + 8,
              left: Math.min(buttonRef.current.getBoundingClientRect().left + window.scrollX, window.innerWidth - 258),
              background: "linear-gradient(to bottom, rgba(240,240,245,0.98), rgba(235,235,240,0.95))",
              border: "1px solid rgba(220,220,220,0.9)",
            }}
          >
            <div className="flex flex-col divide-y divide-gray-300">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex items-center justify-between py-2 px-3 text-black font-medium hover:bg-gray-200 text-left"
                >
                  <span>{item.label}</span>
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default MovieCard;
