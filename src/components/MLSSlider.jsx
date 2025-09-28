import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import muteIcon from "../assets/mute.png";
import unmuteIcon from "../assets/vol.png";
import playIcon from "../assets/play.png";
import pauseIcon from "../assets/pause2.png";

// MLS-specific banners
const mlsBanners = [
  {
    title: "Final",
    subtitle: "Get the 2025 season plan for a low price.",
    description: "Just in time for the MLS Cup playoffs.",
    genre: "Sports · Football · Live",
    poster:
      "https://is1-ssl.mzstatic.com/image/thumb/Features/v4/57/16/e7/5716e7f6-4937-3e25-71e1-3b99ae34ff46/47574a06-bf40-454b-8ced-6aedad35bdd0.png/2400x1350sr.webp",
    trailer: "https://res.cloudinary.com/dln6yimph/video/upload/v1759049200/mlst1_ki6ic9.mp4",
  },
  {
    title: "VANCOUVER VS PORTLAND",
    subtitle: "",
    description: "Brian White marks his return with a late equaliser off the bench to salvage a point.",
    genre: "Sports · Football · Highlights",
    poster:
      "https://is1-ssl.mzstatic.com/image/thumb/meDKQeCTgoXET0sM53qMpg/2400x1350sr.webp",
    trailer: "https://res.cloudinary.com/dln6yimph/video/upload/v1759049550/mlst2_icifwe.mp4",
  },
   {
    title: "NEW YORK CITY VS MIAMI",
    subtitle: "",
    description: "King in Queens: Messi dazzles at Citi Field with a brace to take command of the MORE",
    genre: "25 Sept 2025",
    poster:
      "https://is1-ssl.mzstatic.com/image/thumb/FxTfB0180bSTgXjOiTs5zg/2400x1350sr.webp",
    trailer: "https://res.cloudinary.com/dln6yimph/video/upload/v1759049612/mlst3_n4c9pw.mp4",
  },
   {
    title: "CINCINNATI VS ORLANDO",
    subtitle: "",
    description: "FCC scrap to keep pace in the Supporters’ Shield race against a potential playoff opponent.",
    genre: "MLS",
    poster:
      "https://is1-ssl.mzstatic.com/image/thumb/FpAUkEMu4ouVxHNfonFCkw/2400x1350sr.webp",
    trailer: "https://res.cloudinary.com/dln6yimph/video/upload/v1759049638/mlst4_e97agu.mp4",
  },
   {
    title: "SEATTLE VS VANCOUVER",
    subtitle: "",
    description: "Cascadia rivals rolling through historic seasons renew hostilities in a feud da.",
    genre: "MLS",
    poster:
      "https://is1-ssl.mzstatic.com/image/thumb/KoSo2aYDtfe-iPM-m1uMfw/2400x1350sr.webp",
    trailer: "https://res.cloudinary.com/dln6yimph/video/upload/v1759049612/mlst3_n4c9pw.mp4",
  },
  // Add more MLS banners if needed
];

function MLSSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPoster, setShowPoster] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const banner = mlsBanners[currentIndex];

  // Reset slider and scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentIndex(0);
    setShowPoster(true);
    setIsPaused(false);
  }, []);

  // Handle poster timeout and video play
  useEffect(() => {
    if (showPoster) {
      const timer = setTimeout(() => setShowPoster(false), 5000); // 5 seconds poster
      return () => clearTimeout(timer);
    } else {
      const video = videoRef.current;
      if (!video) return;

      video.muted = isMuted;
      video.play();

      const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % mlsBanners.length);
        setShowPoster(true);
        setIsPaused(false);
      };

      video.addEventListener("ended", handleNext);
      return () => video.removeEventListener("ended", handleNext);
    }
  }, [currentIndex, showPoster, isMuted]);

  const goToBanner = (index) => {
    setCurrentIndex(index);
    setShowPoster(true);
    setIsPaused(false);
  };

  const togglePause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="relative w-full h-[100vh] md:h-[140vh] overflow-hidden -mt-[66px]">
      {/* Poster / Video */}
      {showPoster ? (
        <img
          src={banner.poster}
          alt={banner.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src={banner.trailer}
          autoPlay
          muted={isMuted}
          className="absolute top-0 left-0 w-full h-full object-fill"
          style={{
            objectFit: "cover",
            transform: "scale(1.4)",
          }}
        />
      )}

      {/* Overlay */}
      <div
        style={{ top: "617px", left: "28px", right: "0px" }}
        className="absolute flex flex-col gap-2 md:gap-4 p-6"
      >
         <span className="max-w-[140px] bg-black text-white text-xs font-medium px-2 py-1 rounded-full border border-white inline-flex items-center justify-center">
    {banner.title === "Final" && "Subscribe"}
    {banner.title === "VANCOUVER VS PORTLAND" && "Final"}
    {banner.title === "NEW YORK CITY VS MIAMI" && "Final"}
    {banner.title === "CINCINNATI VS ORLANDO" && "Sun 16:00"}
    {banner.title === "SEATTLE VS VANCOUVER" && "Sun 19:30"}
        </span>

        <div style={{ marginLeft: "35px" }} className="flex flex-col items-start mt-2">
          <h1 className="-mb-1 text-2xl font-sfpro font-regular tracking-widest text-white leading-none">
            {banner.subtitle}
          </h1>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase leading-none text-white">
            {banner.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white overflow-hidden">
            <img src={logo} alt="Logo" className="w-3 h-3 scale-200 object-contain" />
          </div>
          <p className="text-sm font-normal text-gray-300">{banner.genre}</p>
        </div>

        <p className="text-base md:text-lg font-light text-gray-200 leading-relaxed max-w-[350px] mt-2">
          {banner.description}
        </p>

        <div className="flex gap-3 mt-4">
          <button className="bg-white text-black font-sfpro font-semibold text-lg px-10 py-4 rounded-full flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-black" viewBox="0 0 24 24">
              <path d="M4 2v20l18-10L4 2z" />
            </svg>
            Play
          </button>
          <button className="text-2xl bg-gray-700/18 text-white font-semibold px-6 py-1 rounded-full">
            +
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
  <div className="flex gap-2 bg-black/60 px-4 py-2 rounded-full">
    {mlsBanners.map((_, idx) => (
      <span
        key={idx}
        onClick={() => goToBanner(idx)}
        className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
          idx === currentIndex ? "bg-white" : "bg-gray-500/50"
        }`}
      ></span>
    ))}
  </div>
</div>


      {/* Pause & Mute buttons */}
      {!showPoster && (
        <div className="absolute bottom-6 right-6 flex flex-row gap-4">
          <button
            onClick={togglePause}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 border border-white"
          >
            <img src={isPaused ? playIcon : pauseIcon} alt={isPaused ? "Play" : "Pause"} className="w-5 h-5 object-contain" />
          </button>

          <button
            onClick={toggleMute}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 border border-white"
          >
            <img src={isMuted ? muteIcon : unmuteIcon} alt={isMuted ? "Muted" : "Unmuted"} className="w-5 h-5 object-contain" />
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default MLSSlider;
