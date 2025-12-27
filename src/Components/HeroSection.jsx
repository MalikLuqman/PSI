import { useScrollTrigger } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DonateBooksModal from "./DonateBooks/DonateBooksModal";

export const HeroSection = () => {
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSellClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/dashboard/books");
    } else {
      navigate("/login");
    }
  };

  const [openDonateBooksModal, setOpenDonateBookdModal] = useState(false);

  const openDonateBooksModalHandler = () => {
    setOpenDonateBookdModal(true);
  };
  const closeDonateBooksModalHandler = () => {
    setOpenDonateBookdModal(false);
  };

  return (
    <div className="pb-16 sm:pb-4 sm:pt-24 lg:pb-0 lg:pt-40 overflow-hidden bg-gray-100 min-h-screen">
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <div className="sm:max-w-lg">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Turn Books into Credits, Turn Credits into Books!
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Get the books you need, sell the ones you don’t — affordable
            learning for everyone!
          </p>
        </div>
        <div>
          <div className="mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="relative mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDmzQTPB3qNkQ7BJI91diIeHHXUcllTQ8dw&s",
                      "https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?cs=srgb&dl=pexels-mccutcheon-1148399.jpg&fm=jpg",
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2knulIvYhKYtWnEk3n7cClB7cHLd8SWTYwA&s",
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGf1PIMD6CVJkzKRsQFfjzhyTpcg3PbaTnrw&s",
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLFc_yxutcv2s8Ms-Is6RPa-Kdh5q46vcbkA&s",
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKnVp3abpKHU6VI-9TV3Rova8rKtVHp-b0Sg&s",
                    ].map((src, index) => (
                      <div
                        key={index}
                        className="h-64 w-44 overflow-hidden rounded-lg shadow-md"
                      >
                        <img
                          alt="Book"
                          src={src}
                          className="size-full object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-0">
              <Link
                to="/shop"
                className="inline-block mr-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 font-sans text-center font-bold text-white shadow-md transition-all hover:shadow-lg hover:from-orange-600 hover:to-red-600 focus:opacity-90 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Buy
              </Link>
              <button
                onClick={handleSellClick}
                className="inline-block mr-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 font-sans text-center font-bold text-white shadow-md transition-all hover:shadow-lg hover:from-orange-600 hover:to-red-600 focus:opacity-90 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Sell
              </button>
              <button
                onClick={openDonateBooksModalHandler}
                className="inline-block mr-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 font-sans text-center font-bold text-white shadow-md transition-all hover:shadow-lg hover:from-orange-600 hover:to-red-600 focus:opacity-90 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
      <DonateBooksModal
        isOpen={openDonateBooksModal}
        onClose={closeDonateBooksModalHandler}
      />
    </div>
  );
};
