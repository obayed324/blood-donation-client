import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateDonationRequest = () => {
  const { user, userStatus } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const loaderData = useLoaderData() || {};

  // ❗ DO NOT CHANGE
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
    requestMessage: ""
  });

  // 🔒 Blocked user protection
  useEffect(() => {
    if (userStatus === "blocked") {
      Swal.fire("Blocked", "You are not allowed to create donation request", "error");
      navigate("/dashboard");
    }
  }, [userStatus, navigate]);

  // 🔁 Filter upazilas
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
      ...formData
    };

    try {
      await axiosSecure.post("/donation-requests", donationRequest);

      Swal.fire("Success", "Donation request created successfully", "success");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.response?.data?.message || "Failed to create request", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl border">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
        Create Donation Request
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

        <Input label="Requester Name" value={user?.displayName} readOnly />
        <Input label="Requester Email" value={user?.email} readOnly />

        <Input label="Recipient Name" name="recipientName" onChange={handleChange} required />

        <Select
          label="Blood Group"
          name="bloodGroup"
          onChange={handleChange}
          options={["A+","A-","B+","B-","AB+","AB-","O+","O-"]}
        />

        <Select
          label="Recipient District"
          name="recipientDistrict"
          onChange={handleChange}
          options={districts.map(d => ({ value: d.id, label: d.name }))}
        />

        <Select
          label="Recipient Upazila"
          name="recipientUpazila"
          onChange={handleChange}
          options={filteredUpazilas.map(u => ({ value: u.name, label: u.name }))}
        />

        <Input label="Hospital Name" name="hospitalName" onChange={handleChange} required />
        <Input label="Full Address" name="fullAddress" onChange={handleChange} required />

        <Input type="date" label="Donation Date" name="donationDate" onChange={handleChange} required />
        <Input type="time" label="Donation Time" name="donationTime" onChange={handleChange} required />

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

        <div className="md:col-span-2 text-center">
          <button className="btn btn-error px-10 text-white">
            Request Blood
          </button>
        </div>
      </form>
    </div>
  );
};

/* Reusable Components */
const Input = ({ label, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <input {...props} className="input input-bordered w-full bg-gray-100" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <select {...props} required className="select select-bordered w-full">
      <option value="">Select</option>
      {options.map(opt =>
        typeof opt === "string" ? (
          <option key={opt} value={opt}>{opt}</option>
        ) : (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        )
      )}
    </select>
  </div>
);

export default CreateDonationRequest;
