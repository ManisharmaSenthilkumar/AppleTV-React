import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import AppleTV from './components/AppleTV'
import MLS from './components/MLS'
import MLSSlider from './components/MLSSlider'
import Banner from './components/Banner'
import SeasonPassBanner from './components/seasonbanner'
import CategoryPage from './components/CategoryPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WatchlistProvider } from "./components/WatchlistContext";

function App() {
  return (
        <div className="flex justify-center bg-white min-h-screen">
      <div className="w-[1920px] bg-white ">
    <WatchlistProvider>   {/* ✅ wrap everything here */}
      <BrowserRouter>
        <Navbar />
        <div className="pt-[66px]">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <AppleTV />
                  <SeasonPassBanner />
                </>
              }
            />

            {/* MLS Page */}
            <Route path="/MLS" element={<><MLSSlider /><MLS /> <SeasonPassBanner /></>} />

            {/* Dynamic Category Page */}
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/category/genre/:genreName" element={<CategoryPage />} />

          </Routes>
        </div>
      </BrowserRouter>
    </WatchlistProvider>
    </div>
    </div>
  )
}

export default App
