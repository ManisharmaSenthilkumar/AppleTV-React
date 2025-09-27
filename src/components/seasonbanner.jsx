import React from "react";
import mls from "../assets/mls logo.png";
import watch from "../assets/watch-here.png";
import svds from "../assets/svds.png";
function SeasonPassBanner() {
    return (
        <>
            <div className="bg-black text-white py-9 px-10 flex flex-col md:flex-row items-center justify-between">
                {/* Left Section (Logo + Title) */}
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                    <img
                        src={mls} // replace with your logo path
                        alt="MLS Logo"
                        className="h-24 w-auto ml-100" // 👈 margin only applies to logo
                    />
                    <span className="text-3xl font-semibold flex flex-col leading-tight">
                        <span>Season</span>
                        <span>Pass</span>
                    </span>
                </div>

                {/* Middle Section (Text) */}
                <p className="text-2xl font-bold max-w-lg text-center md:text-left">
                    <span className="block text-center md:text-left">
                        Every match. Every club. No blackouts.Only
                    </span>
                    <span className="block text-center">
                        on Apple&nbsp;TV.
                    </span>
                </p>

                {/* Right Section (Buttons) */}
                <div className="flex items-center flex-col gap-1 space-x-4 mt-4 md:mt-0 mr-100">
                    <button className="bg-white text-black font-semibold px-18 py-2 rounded-md hover:bg-gray-200 transition">
                        Subscribe
                    </button>
                    <button className="text-white text-sm hover:underline flex items-center">
                        Learn More <span className="ml-1">›</span>
                    </button>
                </div>
            </div>
            <div className="w-full bg-white flex justify-center py-10">
                <img
                    src={watch} // <-- replace with your actual image path
                    alt="Watch here and on your TV"
                    className="max-w-8xl w-full"
                />

            </div>
            <button className="text-blue-500 text-2xl font-bold hover:underline flex items-center ml-185">
                See all the ways to watch Apple TV+ <span className="ml-1">›</span>
            </button>
            <div className="w-full bg-white flex justify-center py-10">
                <img
                    src={svds} // <-- replace with your actual image path
                    alt="Watch here and on your TV"
                    className="max-w-8xl w-full"
                />
            </div>
            <footer className="bg-gray-100 text-gray-600 text-sm mt-10">
                <div className="px-6 md:px-12 py-6">
                    {/* Country */}
                    <p className="text-gray-500 mb-4">India</p>

                    {/* Copyright */}
                    <p className="mb-2 mt-7">
                        Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved.
                    </p>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 text-black">
                        <a href="#" className="hover:underline">International Service Terms</a>
                        <a href="#" className="hover:underline">| Apple Info &amp; Privacy</a>
                        <a href="#" className="hover:underline">| Cookie Policy</a>
                        <a href="#" className="hover:underline">| Support</a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default SeasonPassBanner;
