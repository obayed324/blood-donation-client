import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaUser, FaTint, FaUsers, FaHome, FaBars } from "react-icons/fa";
import logo from "../assets/BloodLogo.png";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  const links = [
    { to: "/dashboard", label: "Home", icon: <FaHome />, roles: ["donor", "admin", "volunteer"], exact: true },
    { to: "/dashboard/profile", label: "My Profile", icon: <FaUser />, roles: ["donor", "admin", "volunteer"] },
    { to: "/dashboard/my-donation-requests", label: "My Donations", icon: <FaTint />, roles: ["donor"] },
    { to: "/dashboard/create-donation-request", label: "Create Donation Request", icon: <FaTint />, roles: ["donor", "volunteer"] },
    { to: "/dashboard/all-blood-donation-request", label: "All Donation Requests", icon: <FaTint />, roles: ["admin"] },
    { to: "/dashboard/all-blood-donation-request-volunteer", label: "All Donation Requests", icon: <FaTint />, roles: ["volunteer"] },
    { to: "/dashboard/all-users", label: "All Users", icon: <FaUsers />, roles: ["admin"] },
  ];

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Header */}
        <header className="h-16 lg:h-20 bg-white shadow flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
          {/* Hamburger button (mobile only) */}
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
            <FaBars className="text-2xl" />
          </label>

          <h1 className="text-xl lg:text-3xl font-extrabold text-red-600 mx-auto lg:mx-0">
            RedHope Dashboard
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-64 bg-red-600 text-white flex flex-col h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 px-6 py-6 border-b border-red-500">
            <img src={logo} alt="RedHope" className="w-10 h-10 brightness-0 invert" />
            <div>
              <h2 className="text-xl font-bold">RedHope</h2>
              <p className="text-xs opacity-80">Blood Donation System</p>
            </div>
          </Link>

          {/* Menu */}
          <ul className="menu px-4 py-6 flex-1 flex flex-col gap-2">
            {links
              .filter(link => link.roles.includes(role))
              .map(link => (
                <SidebarLink
                  key={link.to}
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                  exact={link.exact}
                />
              ))}
          </ul>

          <div className="px-6 py-4 text-xs opacity-70 border-t border-red-500">
            © {new Date().getFullYear()} RedHope
          </div>
        </aside>
      </div>
    </div>
  );
};

/* Sidebar Link Component */
const SidebarLink = ({ to, icon, label, exact = false }) => (
  <li>
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm lg:text-base ${
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
