import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const loaderData = useLoaderData() || {};

  const districts = loaderData.districts?.[2]?.data || [];
  const upazilas = loaderData.upazilas?.[2]?.data || [];

  const [isEdit, setIsEdit] = useState(false);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    avatar: "",
  });

  useEffect(() => {
    if (!user?.uid) return;

    axiosSecure.get(`/users/uid/${user.uid}`).then(res => {
      const data = res.data;
      setFormData({
        id: data._id,
        name: data.name || "",
        email: data.email,
        bloodGroup: data.bloodGroup || "",
        district: data.district || "",
        upazila: data.upazila || "",
        avatar: data.avatar || user.photoURL || "",
      });
    });
  }, [user, axiosSecure]);

  useEffect(() => {
    if (!formData.district) {
      setFilteredUpazilas([]);
      return;
    }
    const matched = upazilas.filter(
      u => String(u.district_id) === String(formData.district)
    );
    setFilteredUpazilas(matched);
  }, [formData.district, upazilas]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await axiosSecure.put('/users/profile', formData);
    Swal.fire("Success", "Profile Updated", "success");
    setIsEdit(false);
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-2xl border border-gray-200">
      
      {/* Top section: Avatar + Name/Email */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 mb-10">
        <div className="relative">
          <img
            src={formData.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-36 h-36 rounded-full border-4 border-red-500 object-cover shadow-xl"
          />
          {isEdit && (
            <div className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-2 cursor-pointer hover:bg-red-600 transition-all">
              ✎
            </div>
          )}
        </div>

        <div className="mt-6 md:mt-0 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">{formData.name || "Your Name"}</h2>
            {!isEdit ? (
              <button
                onClick={() => setIsEdit(true)}
                className="px-5 py-2 rounded-full border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Save
              </button>
            )}
          </div>

          <p className="text-gray-500 mb-2"><strong>Email:</strong> {formData.email}</p>
          <p className="text-gray-500 mb-2"><strong>Blood Group:</strong> {formData.bloodGroup || "-"}</p>
          <p className="text-gray-500 mb-2"><strong>District:</strong> {districts.find(d => d.id === formData.district)?.name || "-"}</p>
          <p className="text-gray-500"><strong>Upazila:</strong> {formData.upazila || "-"}</p>
        </div>
      </div>

      {/* Editable Form */}
      {isEdit && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-500 font-medium mb-1">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full rounded-xl border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 font-medium mb-1">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="select select-bordered w-full rounded-xl border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
            >
              <option value="">Select Blood Group</option>
              {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 font-medium mb-1">District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="select select-bordered w-full rounded-xl border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
            >
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 font-medium mb-1">Upazila</label>
            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              className="select select-bordered w-full rounded-xl border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
