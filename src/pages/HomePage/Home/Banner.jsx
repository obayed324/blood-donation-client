import React from "react";
import { Link } from "react-router";
import BannerImg from "../../../assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-base-100 overflow-hidden relative">
      <div className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* LEFT CONTENT */}
        <div className="space-y-6 z-10 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Donate Blood, <span className="text-primary">Save Lives</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-lg">
            Join our community of heroes. Your one donation can bring hope,
            health, and life to someone in need.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="btn btn-primary px-8 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              Join as a Donor
            </Link>

            <Link to="/search" className="btn btn-outline btn-primary px-8 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Search Donors
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center z-10">
          <div className="relative w-full max-w-lg">

            {/* Banner Image */}
            <img
              src={BannerImg}
              alt="Blood Donation"
              className="object-contain max-h-112.5 w-full rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105"
            />

            {/* Soft Animated Gradient Overlay */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-red-500/30 via-transparent to-red-200/10 animate-pulse"></div>

            {/* Glass Info Card */}
            <div className="absolute -bottom-6 -left-6 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl px-6 py-4 border border-white/30 hover:scale-105 transition-transform duration-300">
              <p className="text-sm text-gray-700">Lives Saved</p>
              <h3 className="text-2xl font-bold text-primary">12,000+</h3>
            </div>

            {/* Animated Glowing Lines */}
            <div className="absolute top-5 -left-10 w-2 h-32 bg-linear-to-b from-red-500/50 to-transparent rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-10 -right-8 w-2 h-24 bg-linear-to-t from-red-400/40 to-transparent rounded-full animate-pulse-slow delay-1500"></div>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-175 h-175 bg-red-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
    </section>
  );
};

export default Banner;
