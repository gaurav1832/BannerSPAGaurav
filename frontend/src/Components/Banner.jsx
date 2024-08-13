import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bannerImage from "../../src/banner-image.png";
import BannerDashboard from "./BannerDashboard";
const backend = "https://bannerspagaurav.onrender.com";

export default function Banner() {
  const [remainingTime, setRemainingTime] = useState(0);
  const [banner, setBanner] = useState({
    title: "",
    description: "",
    timer: 0,
    link: "",
    offer: "",
    visibility: 0,
  });

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${backend}/api/banner`);
      const bannerData = response.data;
      setBanner(bannerData);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  useEffect(() => {
    const fetchStartTime = async () => {
      try {
        const response = await axios.get(`${backend}/api/banner`);
        const { startTime, timer } = response.data;

        console.log("Start Time:", startTime);
        console.log("Duration:", timer);

        const currentTime = Math.floor(Date.now() / 1000);
        const elapsedTime = currentTime - startTime;
        const timeLeft = timer - elapsedTime;

        if (timeLeft > 0) {
          setRemainingTime(timeLeft);
        } else {
          setRemainingTime(0);
        }
      } catch (error) {
        console.error("Failed to fetch start time:", error);
      }
    };

    fetchStartTime();

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400); // 86400 seconds in a day
    const hours = Math.floor((seconds % 86400) / 3600); // 3600 seconds in an hour
    const minutes = Math.floor((seconds % 3600) / 60); // 60 seconds in a minute
    const secs = seconds % 60;

    return `${days}d, ${hours}h, ${minutes}m, ${secs}s`;
  };

  return (
    <>
      {banner.visibility === 1 && remainingTime > 0 ? (
        <section className="flex justify-center p-8 ">
          <div className="bg-gradient-to-r from-[#de496a] to-[#E11D48] rounded-xl shadow-xl opacity-90 border border-red-100 border-dashed">
            <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left p-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {banner.title}
                </h1>
                <p className="text-lg md:text-xl text-white/80">
                  {banner.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f86f8d] px-4 py-2 text-white">
                    <span className="text-lg font-medium">
                      🎉 {banner.offer}
                    </span>
                  </div>
                  <span className="text-lg text-white/80">
                    <p>Ends in: {formatTime(remainingTime)}</p>
                  </span>
                </div>
                <div>
                  <Link
                    to={banner.link}
                    className="inline-flex h-10 mt-2 items-center justify-center rounded-full bg-white px-8 py-6 text-md font-semibold text-[#E11D48]"
                  >
                    Sign Up Now
                  </Link>
                </div>
              </div>
              <div className="w-full max-w-md">
                <img src={bannerImage} alt="JavaScript Course" />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p className="flex justify-center p-12 text-lg text-red-100">
          No banner to show.
        </p>
      )}
      <p className="flex justify-center p-1 text-sm text-red-300">
         *Hold on, it can take a few seconds to show the banner due to the slow onrender backend. 
        </p>
      <BannerDashboard />
    </>
  );
}
