import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const DonationRequests = () => {
  const { user } = useAuth(); // Auth context
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/donation-requests?status=pending")
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch donation requests", "error");
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleViewDetails = (id) => {
    if (!user) {
      Swal.fire("Login Required", "Please login to view details", "warning");
      navigate("/login");
      return;
    }
    navigate(`/donation-requests/${id}`);
  };

  if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;
  if (requests.length === 0)
    return <p className="text-center mt-20 text-lg">No pending donation requests</p>;

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
        Pending Blood Donation Requests
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map(req => (
          <div key={req._id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">{req.recipientName}</h3>
              <p className="text-gray-700 mb-1">
                <strong>Location:</strong> {req.recipientDistrict}, {req.recipientUpazila}
              </p>
              <p className="text-gray-700 mb-1"><strong>Blood Group:</strong> {req.bloodGroup}</p>
              <p className="text-gray-700 mb-1"><strong>Date:</strong> {req.donationDate}</p>
              <p className="text-gray-700 mb-1"><strong>Time:</strong> {req.donationTime}</p>
            </div>

            <button
              onClick={() => handleViewDetails(req._id)}
              className="mt-4 btn btn-error w-full text-white"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
