import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonor = () => {
  const axiosSecure = useAxiosSecure();
  const loaderData = useLoaderData() || {};

  // Correctly access PHPMyAdmin JSON exported data
  const districts = loaderData.districts?.[2]?.data || [];
  const upazilas = loaderData.upazilas?.[2]?.data || [];

  const [form, setForm] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Filter upazilas by selected district */
  useEffect(() => {
    if (form.district) {
      const filtered = upazilas.filter(
        u => String(u.district_id) === String(form.district)
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [form.district, upazilas]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      // Map upazila ID to upazila name if selected
      let upazilaName = "";
      if (form.upazila) {
        const foundUpazila = filteredUpazilas.find(
          u => String(u.id) === String(form.upazila)
        );
        upazilaName = foundUpazila?.name || "";
      }

      // Send blood group, district ID, and upazila name to backend
      const res = await axiosSecure.get("/donors/search", {
        params: {
          bloodGroup: form.bloodGroup,
          district: form.district,
          upazila: upazilaName
        },
      });

      setDonors(res.data);
    } catch (err) {
      console.error(err);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const getDistrictName = id =>
    districts.find(d => String(d.id) === String(id))?.name || "-";

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-600">Search Blood Donors 🩸</h1>
        <p className="text-gray-600 mt-2">Find donors by blood group & location</p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-3xl shadow-xl p-8 grid md:grid-cols-4 gap-6"
      >
        <select
          name="bloodGroup"
          required
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Blood Group</option>
          {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
        </select>

        <select
          name="district"
          required
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">District</option>
          {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>

        <select
          name="upazila"
          required
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Upazila</option>
          {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>

        <button type="submit" className="btn btn-error text-white w-full">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results */}
      {searched && (
        <div className="mt-16">
          {donors.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No donors found 🥲</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {donors.map(donor => (
                <div
                  key={donor._id}
                  className="card bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition"
                >
                  <h3 className="text-xl font-bold text-red-600">{donor.name}</h3>
                  <p className="mt-2"><strong>Blood:</strong> {donor.bloodGroup}</p>
                  <p className="text-sm text-gray-600 mt-1">{donor.email}</p>
                  <p className="text-sm text-gray-600">
                    {getDistrictName(donor.district)}, {donor.upazila}
                  </p>
                  <div className="mt-4">
                    <span className="badge badge-error badge-outline">Available</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDonor;
