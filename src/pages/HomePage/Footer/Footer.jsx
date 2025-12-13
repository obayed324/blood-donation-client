import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from "../../../assets/BloodLogo.png";

const Footer = () => {
  return (
    <footer className="bg-neutral bg-linear-to-t from-neutral to-neutral-focus text-neutral-content py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="RedHope Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-primary">RedHope</span>
          </div>
          <p className="text-gray-400 text-sm">
            Saving lives through blood donation. Join our community of heroes today.
          </p>
          <div className="flex gap-2 mt-2">
            <a href="#" className="hover:text-primary transition-colors duration-300 p-2 rounded-full bg-gray-700 hover:bg-primary">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300 p-2 rounded-full bg-gray-700 hover:bg-primary">
              <FaTwitter size={14} />
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300 p-2 rounded-full bg-gray-700 hover:bg-primary">
              <FaInstagram size={14} />
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300 p-2 rounded-full bg-gray-700 hover:bg-primary">
              <FaLinkedinIn size={14} />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold text-sm mb-3 uppercase tracking-wider text-gray-400">Useful Links</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/donation-requests" className="hover:text-primary transition-colors">Donation Requests</Link></li>
            <li><Link to="/funding" className="hover:text-primary transition-colors">Funding</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Donor Links */}
        <div>
          <h3 className="font-semibold text-sm mb-3 uppercase tracking-wider text-gray-400">Donor Links</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><Link to="/register" className="hover:text-primary transition-colors">Join as a Donor</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
            <li><Link to="/search" className="hover:text-primary transition-colors">Search Donors</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-sm mb-3 uppercase tracking-wider text-gray-400">Contact Info</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>Phone: 01634201818</li>
            <li>Phone: 01765432109</li>
            <li>Phone: 01876543210</li>
            <li>Email: info@redhope.org</li>
            <li>Address: 123 RedHope St, Dhaka</li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} RedHope. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
