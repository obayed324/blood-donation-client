import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../../assets/BloodLogo.png";

const Navbar = () => {
  const auth = useAuth();

  
  if (!auth) return null;

  const { user, logOut } = auth;

  const handleLogOut = () => {
    logOut().catch(err => console.log(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/donation-requests">Donation Requests</NavLink>
      </li>
      <li>
        <NavLink to="/funding">Funding</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">

      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="RedHope Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-primary">RedHope</span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          {navLinks}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary text-white">
              Become a Donor
            </Link>
          </>
        ) : (
          <>
            {/* Donate CTA */}
            <Link
              to="/donate"
              className="btn btn-primary text-black hidden md:flex"
            >
              Donate Now
            </Link>

            {/* User Avatar */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="user"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="font-semibold px-2 py-1">
                  {user.displayName || "User"}
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
