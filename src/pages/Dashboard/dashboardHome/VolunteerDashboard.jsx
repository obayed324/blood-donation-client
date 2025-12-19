import { useQuery } from "@tanstack/react-query";
import {
  FaHandsHelping,
  FaTint,
  FaUser,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const VolunteerDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["volunteer-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/volunteer/stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-10 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-red-500 via-red-600 to-red-700 p-8 md:p-10 shadow-xl text-white">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative flex items-center gap-6">
          <div className="p-5 bg-white/20 rounded-2xl backdrop-blur-md">
            <FaHandsHelping className="text-5xl" />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Welcome, {user?.displayName}
            </h2>
            <p className="mt-2 text-white/90 max-w-xl">
              Manage blood donation requests and help donors connect with patients.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          icon={<FaTint />}
          title="Total Requests"
          value={stats.totalRequests}
          gradient="from-red-500 to-pink-600"
        />

        <StatCard
          icon={<FaHandsHelping />}
          title="Pending Requests"
          value={stats.pendingRequests}
          gradient="from-yellow-500 to-orange-500"
        />

        <StatCard
          icon={<FaUser />}
          title="Completed Requests"
          value={stats.completedRequests}
          gradient="from-green-500 to-emerald-600"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, gradient }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
    <div
      className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-10 transition`}
    ></div>

    <div className="relative p-6 flex items-center gap-5">
      <div
        className={`p-4 rounded-xl text-white bg-linear-to-br ${gradient} shadow-md`}
      >
        <span className="text-3xl">{icon}</span>
      </div>

      <div>
        <h3 className="text-sm text-gray-500 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-3xl font-bold text-gray-800 mt-1">
          {value}
        </p>
      </div>
    </div>
  </div>
);

export default VolunteerDashboardHome;
