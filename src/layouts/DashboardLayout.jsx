import React from "react";
import { NavLink, Outlet } from "react-router";
import logo from "../assets/BloodLogo.png";
import { FaUser, FaTint, FaUsers, FaHome } from "react-icons/fa";

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open h-screen bg-gray-50">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* Main Content */}
            <div className="drawer-content flex flex-col">
                {/* Top Header */}
                <div className="relative bg-white shadow-md h-20 flex items-center px-6">
                    {/* Mobile toggle */}
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-sm btn-primary lg:hidden absolute left-4"
                    >
                        ☰
                    </label>

                    {/* Center Title */}
                    <h1 className="mx-auto text-3xl font-extrabold tracking-wide bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                        RedHope Dashboard
                    </h1>
                </div>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side h-full">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <aside className="w-72 h-screen bg-linear-to-b from-red-600 to-red-700 text-white flex flex-col">
                    {/* Logo Section */}
                    <div className="flex items-center gap-4 px-6 py-6 border-b border-red-500">
                        <img src={logo} alt="RedHope" className="w-12 h-12" />
                        <div>
                            <h2 className="text-2xl font-bold tracking-wider">
                                RedHope
                            </h2>
                            <p className="text-sm opacity-80">
                                Blood Donation System
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <ul className="menu px-4 py-6 gap-2 text-base">
                        <SidebarLink to="/" icon={<FaHome />} label="Home" />
                        <SidebarLink
                            to="/dashboard/profile"
                            icon={<FaUser />}
                            label="My Profile"
                        />
                        <SidebarLink
                            to="/dashboard/donations"
                            icon={<FaTint />}
                            label="My Donations"
                        />
                        <SidebarLink
                            to="/dashboard/users"
                            icon={<FaUsers />}
                            label="All Donors"
                        />
                    </ul>

                    {/* Footer */}
                    <div className="mt-auto px-6 py-4 text-sm opacity-70 border-t border-red-500">
                        © {new Date().getFullYear()} RedHope
                    </div>
                </aside>
            </div>
        </div>
    );
};

/* Reusable Sidebar Link */
const SidebarLink = ({ to, icon, label }) => {
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive
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
};

export default DashboardLayout;
