import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 10;

const AdminAllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, setAllUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    axiosSecure
      .get("/admin/users")
      .then((res) => {
        setAllUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // Filtered users
  const filteredUsers = useMemo(() => {
    if (statusFilter === "all") return allUsers;
    return allUsers.filter((user) => user.status === statusFilter);
  }, [allUsers, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handle actions
  const updateUserStatus = async (userId, status) => {
    await axiosSecure.patch(`/admin/users/${userId}/status`, { status });
    setAllUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, status } : u))
    );
  };

  const updateUserRole = async (userId, role) => {
    await axiosSecure.patch(`/admin/users/${userId}/role`, { role });
    setAllUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role } : u))
    );
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-red-600">All Users 👤</h2>

      {/* Filter */}
      <div className="mb-4 flex gap-3">
        <select
          className="select select-bordered max-w-xs"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL || "https://i.pravatar.cc/150?img=3"}
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span
                    className={`badge text-white ${
                      user.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="space-x-1">
                  {user.status === "active" && (
                    <button
                      className="btn btn-xs btn-error text-white"
                      onClick={() => updateUserStatus(user._id, "blocked")}
                    >
                      Block
                    </button>
                  )}
                  {user.status === "blocked" && (
                    <button
                      className="btn btn-xs btn-success text-white"
                      onClick={() => updateUserStatus(user._id, "active")}
                    >
                      Unblock
                    </button>
                  )}
                  {user.role !== "volunteer" && (
                    <button
                      className="btn btn-xs btn-warning text-white"
                      onClick={() => updateUserRole(user._id, "volunteer")}
                    >
                      Make Volunteer
                    </button>
                  )}
                  {user.role !== "admin" && (
                    <button
                      className="btn btn-xs btn-info text-white"
                      onClick={() => updateUserRole(user._id, "admin")}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`btn btn-sm ${
                currentPage === num + 1 ? "btn-error" : "btn-outline"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllUsers;
