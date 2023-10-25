"use client";
import React from "react";

const Banner = () => {
  const imageUrl = "http://csmthemes.com/themes/camra/v1c/img/bg-t.jpg";

  return (
    <div
      id="home"
      className="bg-cover bg-center h-[380px] relative flex flex-col items-center lg:items-end xl:items-end justify-end"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h1 className="text-6xl text-white font-cursive mb-4 mr-2">BLOG</h1>
    </div>
  );
};

export default Banner;
