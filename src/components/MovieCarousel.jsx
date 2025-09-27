import React, { useRef } from "react";
import RightArrow from '../assets/RightArrow.png'
import LeftArrow from '../assets/LeftArrow.png'

function ScrollableRow({ children, showArrows }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.children[0];
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const style = window.getComputedStyle(scrollRef.current);
      const gap = parseInt(style.gap) || 0; // use flex container gap

      const scrollAmount = (cardWidth + gap) * 5.1; // scroll 5 cards

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden group">
      {/* Left Arrow */}
      {showArrows && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-25 -translate-y-1/2 z-10 flex items-center justify-center p-2  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
           <img src={LeftArrow} alt="Left" className="w-7 h-24 rounded-lg" />
        </button>
      )}

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-7 overflow-x-auto scroll-smooth no-scrollbar px-12"
      >
        {children}
      </div>

      {/* Right Arrow */}
      {showArrows && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 ml-15 top-25 -translate-y-1/2 z-10 flex items-center justify-center rounded-lg p-2  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
           <img src={RightArrow} alt="Right" className="w-7 h-24 rounded-lg" />
        </button>
      )}
    </div>
  );
}

export default ScrollableRow;
