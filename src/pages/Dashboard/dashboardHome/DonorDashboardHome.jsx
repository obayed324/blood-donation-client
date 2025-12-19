import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const DonorDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch donation requests
  const fetchRequests = () => {
    axiosSecure
      .get(`/dashboard/my-donation-requests/${user.uid}`)
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, [axiosSecure, user.uid]);

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/donation-requests/${id}`);
          Swal.fire("Deleted!", "Donation request has been deleted.", "success");
          // Refresh the list
          setRequests(requests.filter(r => r._id !== id));
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete donation request", "error");
        }
      }
    });
  };

  const handleStatusChange = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this donation as ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/donation-requests/status/${id}`, {
            status,
          });

          Swal.fire(
            "Updated!",
            `Donation marked as ${status}.`,
            "success"
          );

          // Update UI instantly
          setRequests(prev =>
            prev.map(req =>
              req._id === id ? { ...req, status } : req
            )
          );
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to update status", "error");
        }
      }
    });
  };


  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6 shadow">
        <h2 className="text-3xl font-bold">
          Welcome back, {user.displayName} 👋
        </h2>
        <p className="opacity-90 mt-1">
          Manage and track your donation requests
        </p>
      </div>

      {/* Donation Requests Table */}
      {requests.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-4 text-center mt-6">
            Recent Donation Requests
          </h3>

          <div className="overflow-x-auto bg-white shadow rounded-lg">
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
                {requests.map(req => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td><span className="badge badge-outline">{req.status}</span></td>
                    <td>
                      {(req.status === "inprogress" || req.status === "done") && req.donor ? (
                        <>
                          <p>{req.donor.name}</p>
                          <p className="text-sm">{req.donor.email}</p>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>


                    <td className="space-x-1">
                      {/* View */}
                      <button
                        onClick={() => navigate(`/donation-requests/${req._id}`)}
                        className="btn btn-xs btn-info  text-white"
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => navigate(`/dashboard/edit-donation/${req._id}`)}
                        className="btn btn-xs btn-warning  text-white"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-xs btn-error text-white"
                      >
                        Delete
                      </button>


                      {/* Done / Cancel */}
                      {req.status === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req._id, "done")}
                            className="btn btn-xs btn-success text-white"
                          >
                            Done
                          </button>

                          <button
                            onClick={() => handleStatusChange(req._id, "canceled")}
                            className="btn btn-xs btn-outline btn-error bg-amber-800 text-white"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View All */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/dashboard/my-donation-requests")}
              className="btn btn-outline btn-error"
            >
              View My All Requests
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DonorDashboardHome;
