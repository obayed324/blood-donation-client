import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // fetch request + districts + upazilas
  useEffect(() => {
    const loadData = async () => {
      try {
        const [reqRes, disRes, upaRes] = await Promise.all([
          axiosSecure.get(`/donation-requests/${id}`),
          fetch("/districts.json").then(res => res.json()),
          fetch("/upazilas.json").then(res => res.json()),
        ]);

        setRequest(reqRes.data);
        setDistricts(disRes?.[0]?.data || disRes?.[2]?.data || []);
        setUpazilas(upaRes?.[0]?.data || upaRes?.[2]?.data || []);
        setLoading(false);
      } catch (err) {
        Swal.fire("Error", "Failed to load data", "error");
        setLoading(false);
      }
    };

    loadData();
  }, [id, axiosSecure]);

  // helper functions
  const getDistrictName = (id) => {
    return districts.find(d => d.id === id)?.name || id;
  };

  const getUpazilaName = (id) => {
    return upazilas.find(u => u.id === id)?.name || id;
  };

  const handleConfirmDonate = async () => {
    try {
      await axiosSecure.patch(`/donation-requests/donate/${id}`, {
        donorName: user.displayName,
        donorEmail: user.email,
      });

      Swal.fire("Success", "Donation confirmed!", "success");
      navigate("/dashboard");
    } catch {
      Swal.fire("Error", "Failed to confirm donation", "error");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!request) return null;

  return (
    <div className="max-w-4xl mx-auto my-12 bg-white p-8 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Donation Request Details
      </h2>

      <div className="grid md:grid-cols-2 gap-4 text-gray-700">
        <p><strong>Recipient Name:</strong> {request.recipientName}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>

        <p>
          <strong>District:</strong>{" "}
          {getDistrictName(request.recipientDistrict)}
        </p>

        <p>
          <strong>Upazila:</strong>{" "}
          {getUpazilaName(request.recipientUpazila)}
        </p>

        <p><strong>Hospital:</strong> {request.hospitalName}</p>
        <p><strong>Address:</strong> {request.fullAddress}</p>
        <p><strong>Date:</strong> {request.donationDate}</p>
        <p><strong>Time:</strong> {request.donationTime}</p>

        <p className="md:col-span-2">
          <strong>Message:</strong> {request.requestMessage}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="text-red-600 font-semibold">
            {request.status}
          </span>
        </p>
      </div>

      {request.status === "pending" && (
        <div className="text-center mt-8">
          <button
            onClick={() => setOpenModal(true)}
            className="btn btn-error px-10 text-white"
          >
            Donate Blood
          </button>
        </div>
      )}

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">
              Confirm Donation
            </h3>

            <input
              value={user.displayName}
              readOnly
              className="input input-bordered w-full mb-3 bg-gray-100"
            />
            <input
              value={user.email}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDonate}
                className="btn btn-error text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
