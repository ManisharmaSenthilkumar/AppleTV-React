import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import trailer1 from "../assets/chief.mp4";
import trailer2 from "../assets/trailer2.mp4";
import trailer3 from "../assets/trailer3.mp4";
import trailer4 from "../assets/trailer4.mp4";
import trailer5 from "../assets/trailer5.mp4";
import trailer6 from "../assets/trailer6.mp4";
import muteIcon from "../assets/mute.png";
import unmuteIcon from "../assets/vol.png";
import playIcon from "../assets/play.png";
import pauseIcon from "../assets/pause2.png";

const banners =[
  {
    title: "CHIEF OF WAR",
    subtitle: "JASON MOMOA",
    description:
      "An epic adventure about the origin of Hawai‘i, its people, and a dangerous fight for power.",
    genre: "TV Show · Drama · Action · A",
    poster:
      "https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/a5/5b/a7/a55ba76d-1bf8-bc8c-acb5-538e094d51d1/29e2b5b9-20b5-4ef1-ab5b-3ade160bd64d.png/2400x1350sr.webp",
    trailer: trailer1,
  },
  {
    title: "The Morning Show",
    subtitle: "",
    description: "Scandals,affairs,conspiriacies,And that's just a new team.",
    genre: "TV Show · Drama A",
    poster:
      "https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/2b/28/ac/2b28ac53-7e93-464b-11be-8f1dfe640462/5e0ae92a-0694-48aa-861a-583964a09d7c.png/2400x1350sr.webp",
    trailer: trailer2,
  },
    {
    title: "Slow Horses",
    subtitle: "",
    description: "Unprecedented chaos erupts when a string of attacks targets MI5 and all of London.",
    genre: "TV Show · Thriller . Drama A ",
    poster:
      "https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/5b/21/76/5b21769b-cdb2-2e98-fa8f-dbcd39148dff/86fc7ed9-096e-4b4b-a9be-bc768b3d59ac.png/2400x1350sr.webp",
    trailer: trailer3,
  },
    {
    title: "The Studio",
    subtitle: "",
    description: "Seth Rogen stars in an outrageous showbiz satire.",
    genre: "TV Show · Comedy  A",
    poster:
      "https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/62/ff/5a/62ff5a63-d433-12ce-815f-061534e98b62/6c90d766-7581-4539-963e-db9447efadbd.png/2400x1350sr.webp",
    trailer: trailer4,
  },
    {
    title: "Platonic",
    subtitle: "",
    description: "Some friends bring out the best in us—and the worst.",
    genre: "TV Show · Comedy  Ar",
    poster:
      "https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/be/5d/b2/be5db2ca-fb4d-2663-a503-959e0ede7655/c7e0a22b-2632-42d2-ac97-a5090d991e4d.png/2400x1350sr.webp",
    trailer: trailer5,
  },
    {
    title: "Smoke",
    subtitle: "",
    description: "Description for Movie 2",
    genre: "Action · Thriller",
    poster:
      "https://is1-ssl.mzstatic.com/image/thumb/hSl3JWUuY4c1SoHEt9MI6Q/2400x1350sr.webp",
    trailer: trailer6,
  },
];


function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPoster, setShowPoster] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const banner = banners[currentIndex];

  // Reset slider on mount and scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentIndex(0);
    setShowPoster(true);
    setIsPaused(false);
  }, []);

  // Handle poster timeout and video playback
  useEffect(() => {
    if (showPoster) {
      const timer = setTimeout(() => setShowPoster(false), 5000);
      return () => clearTimeout(timer);
    } else {
      const video = videoRef.current;
      if (!video) return;

      video.muted = isMuted;
      video.play();

      const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
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
          style={{ objectFit: "cover", transform: "scale(1.4)" }}
        />
      )}

      {/* Overlay */}
      <div
        style={{ top: "617px", left: "28px", right: "0px" }}
        className="absolute flex flex-col gap-2 md:gap-4 p-6"
      >
        <span className="max-w-[190px] bg-black text-white text-xs font-medium px-2 py-1 rounded-full border border-white inline-flex items-center justify-center">
          {banner.title === "CHIEF OF WAR" && "New Episode Every Friday"}
    {banner.title === "The Morning Show" && "New Episode Every Wednesday"}
    {banner.title === "Slow Horses" && "New Season"}
    {banner.title === "The Studio" && "2025 Emmy Winner"}
    {banner.title === "Platonic" && "New Episode Every Wednesday"}
    {banner.title === "Smoke" && "Now Streaming"}
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
    {banners.map((_, idx) => (
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

export default BannerSlider;
