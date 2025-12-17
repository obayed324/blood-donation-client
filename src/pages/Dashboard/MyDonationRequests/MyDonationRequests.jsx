import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ITEMS_PER_PAGE = 5;

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [allRequests, setAllRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch all donation requests
  useEffect(() => {
    axiosSecure
      .get(`/dashboard/my-donation-requests/${user.uid}`)
      .then(res => {
        setAllRequests(res.data);
        setFilteredRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure, user.uid]);

  // Filter by status
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredRequests(allRequests);
    } else {
      setFilteredRequests(
        allRequests.filter(req => req.status === statusFilter)
      );
    }
    setCurrentPage(1);
  }, [statusFilter, allRequests]);

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRequests = filteredRequests.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/donation-requests/${id}`);
        setAllRequests(prev => prev.filter(r => r._id !== id));
        Swal.fire("Deleted!", "Donation request removed.", "success");
      }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-red-600">
        My Donation Requests 🩸
      </h2>

      {/* Filter */}
      <div className="mb-4 flex gap-3">
        <select
          className="select select-bordered max-w-xs"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra">
          <thead className="bg-gray-100">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood</th>
              <th>Status</th>
              <th>Donor</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRequests.map(req => (
              <tr key={req._id}>
                <td>{req.recipientName}</td>
                <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                <td>{req.donationDate}</td>
                <td>{req.donationTime}</td>
                <td>{req.bloodGroup}</td>

                <td>
                  <span className="badge badge-outline">
                    {req.status}
                  </span>
                </td>

                <td>
                  {(req.status === "inprogress" || req.status === "done") && req.donor ? (
                    <>
                      <p>{req.donor.name}</p>
                      <p className="text-xs">{req.donor.email}</p>
                    </>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="space-x-1">
                  <button
                    onClick={() => navigate(`/donation-requests/${req._id}`)}
                    className="btn btn-xs btn-info"
                  >
                    View
                  </button>

                  <button
                    onClick={() => navigate(`/dashboard/edit-donation/${req._id}`)}
                    className="btn btn-xs btn-warning"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {paginatedRequests.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6">
                  No donation requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages).keys()].map(num => (
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

export default MyDonationRequests;
