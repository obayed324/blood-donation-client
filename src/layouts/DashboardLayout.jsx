import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/BloodLogo.png";
import { FaUser, FaTint, FaUsers, FaHome } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-72 sticky top-0 h-screen bg-linear-to-b from-red-600 to-red-700 text-white flex flex-col">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 px-6 py-6 border-b border-red-500">
          <img src={logo} alt="RedHope" className="w-12 h-12 brightness-0 invert" />
          <div>
            <h2 className="text-2xl font-bold">RedHope</h2>
            <p className="text-sm opacity-80">Blood Donation System</p>
          </div>
        </Link>

        {/* Menu */}
        <ul className="menu px-4 py-6 gap-2">
          <SidebarLink to="/dashboard" icon={<FaHome />} label="Home" />
          <SidebarLink to="/dashboard/profile" icon={<FaUser />} label="My Profile" />
          <SidebarLink to="/dashboard/donations" icon={<FaTint />} label="My Donations" />
          <SidebarLink
            to="/dashboard/create-donation-request"
            icon={<FaTint />}
            label="Create Donation Request"
          />
          <SidebarLink to="/dashboard/users" icon={<FaUsers />} label="All Donors" />
        </ul>

        <div className="mt-auto px-6 py-4 text-sm opacity-70 border-t border-red-500">
          © {new Date().getFullYear()} RedHope
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="h-20 bg-white shadow flex items-center justify-center sticky top-0 z-10">
          <h1 className="text-3xl font-extrabold text-red-600">
            RedHope Dashboard
          </h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

/* Sidebar Link */
const SidebarLink = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
        ${
          isActive
            ? "bg-white text-red-600 font-semibold shadow-md"
            : "hover:bg-red-500 hover:text-white"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  </li>
);

export default DashboardLayout;
