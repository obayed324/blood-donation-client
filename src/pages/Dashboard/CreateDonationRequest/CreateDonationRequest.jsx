import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const CreateDonationRequest = () => {
  const { user, userStatus } = useAuth(); // userStatus = "active" | "blocked"
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const loaderData = useLoaderData() || {};

  // ❗ DO NOT CHANGE (same as Profile page)
  const districts = loaderData.districts?.[2]?.data || [];
  const upazilas = loaderData.upazilas?.[2]?.data || [];

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  // 🔴 Blocked user protection
  useEffect(() => {
    if (userStatus === "blocked") {
      Swal.fire("Blocked", "You are not allowed to create donation request", "error");
      navigate("/dashboard");
    }
  }, [userStatus, navigate]);

  // 🔁 Filter upazilas by district
  useEffect(() => {
    if (!formData.recipientDistrict) {
      setFilteredUpazilas([]);
      return;
    }

    const matched = upazilas.filter(
      u => String(u.district_id) === String(formData.recipientDistrict)
    );
    setFilteredUpazilas(matched);
  }, [formData.recipientDistrict, upazilas]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const donationRequest = {
      requesterUid: user.uid,
      requesterName: user.displayName,
      requesterEmail: user.email,

      ...formData,

      donationStatus: "pending",
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/donation-requests", donationRequest);

      Swal.fire("Success", "Donation request created", "success");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to create request", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl border">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
        Create Donation Request
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

        {/* Requester Name */}
        <div>
          <label className="label">Requester Name</label>
          <input
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Requester Email */}
        <div>
          <label className="label">Requester Email</label>
          <input
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="label">Recipient Name</label>
          <input
            name="recipientName"
            required
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            required
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="label">Recipient District</label>
          <select
            name="recipientDistrict"
            required
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="label">Recipient Upazila</label>
          <select
            name="recipientUpazila"
            required
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map(u => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>

        {/* Hospital */}
        <div>
          <label className="label">Hospital Name</label>
          <input
            name="hospitalName"
            required
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Full Address */}
        <div>
          <label className="label">Full Address</label>
          <input
            name="fullAddress"
            required
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Date */}
        <div>
          <label className="label">Donation Date</label>
          <input
            type="date"
            name="donationDate"
            required
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Time */}
        <div>
          <label className="label">Donation Time</label>
          <input
            type="time"
            name="donationTime"
            required
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="label">Request Message</label>
          <textarea
            name="requestMessage"
            required
            rows="4"
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center">
          <button
            disabled={userStatus === "blocked"}
            className="btn btn-error px-10 text-white"
          >
            Request Blood
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateDonationRequest;
