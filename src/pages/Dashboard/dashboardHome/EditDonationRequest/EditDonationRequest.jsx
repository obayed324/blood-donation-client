import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const EditDonationRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const loaderData = useLoaderData() || {};

  const districts = loaderData.districts?.[2]?.data || [];
  const upazilas = loaderData.upazilas?.[2]?.data || [];

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

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch donation request by ID
  useEffect(() => {
    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch donation request", "error");
        setLoading(false);
      });
  }, [id, axiosSecure]);

  // Filter upazilas when district changes
  useEffect(() => {
    if (!formData.recipientDistrict) {
      setFilteredUpazilas([]);
      return;
    }
    const matched = upazilas.filter(
      (u) => String(u.district_id) === String(formData.recipientDistrict)
    );
    setFilteredUpazilas(matched);
  }, [formData.recipientDistrict, upazilas]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remove _id if present
      const { _id, ...updateData } = formData;

      await axiosSecure.put(`/donation-requests/${id}`, updateData);
      Swal.fire("Success", "Donation request updated", "success");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update donation request", "error");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl border">
      <h2 className="text-3xl font-bold text-red-600 text-center mb-8">
        Edit Donation Request
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        {/* Recipient Name */}
        <div>
          <label className="label">Recipient Name</label>
          <input
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="label">Recipient District</label>
          <select
            name="recipientDistrict"
            value={formData.recipientDistrict}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="label">Recipient Upazila</label>
          <select
            name="recipientUpazila"
            value={formData.recipientUpazila}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital */}
        <div>
          <label className="label">Hospital Name</label>
          <input
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Full Address */}
        <div>
          <label className="label">Full Address</label>
          <input
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Donation Date */}
        <div>
          <label className="label">Donation Date</label>
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Donation Time */}
        <div>
          <label className="label">Donation Time</label>
          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Request Message */}
        <div className="md:col-span-2">
          <label className="label">Request Message</label>
          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={4}
            required
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center">
          <button className="btn btn-success px-10 text-white">
            Update Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonationRequest;
