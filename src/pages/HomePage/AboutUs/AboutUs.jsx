import React from "react";
import { FaUsers, FaHandsHelping, FaHeartbeat, FaEnvelope } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-red-500 via-red-600 to-red-700 text-white py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          About Blood Donation
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-90">
          Dedicated to saving lives through blood donation and spreading awareness.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-red-600">Our Mission</h2>
            <p className="text-gray-700 text-lg">
              To provide a reliable network for blood donation, ensuring that
              every patient in need has access to life-saving blood.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-red-600">Our Vision</h2>
            <p className="text-gray-700 text-lg">
              A world where no patient suffers due to a lack of blood. We strive
              to inspire and educate people about the importance of donating blood.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
          Our Impact
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <StatCard icon={<FaUsers />} value="500+" title="Volunteers" color="bg-red-100 text-red-600" />
          <StatCard icon={<FaHeartbeat />} value="2000+" title="Lives Saved" color="bg-red-100 text-red-600" />
          <StatCard icon={<FaHandsHelping />} value="3000+" title="Blood Donations" color="bg-red-100 text-red-600" />
          <StatCard icon={<FaEnvelope />} value="24/7" title="Support" color="bg-red-100 text-red-600" />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-red-600 text-center mb-12">
          Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <TeamMember name="Mehedi Hasan" role="Founder & CEO" image="https://i.ibb.co.com/BVKt1wwr/ruhi.jpg" />
          <TeamMember name="Rakibul Hassan" role="Project Manager" image="https://i.pravatar.cc/150?img=2" />
          <TeamMember name="Obayed Sarker" role="Volunteer Coordinator" image="https://i.ibb.co.com/Kx5CZ4PW/Whats-App-Image-2024-11-18-at-15-48-37.jpg" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-red-600 py-16 px-6 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <p className="mb-6">
          Email: support@blooddonation.com <br />
          Phone: +880 1234 567890
        </p>
        <button className="btn bg-white text-red-600 hover:bg-gray-100 transition">
          Get in Touch
        </button>
      </section>
    </div>
  );
};

const StatCard = ({ icon, value, title, color }) => (
  <div className={`rounded-xl shadow-md p-6 flex flex-col items-center justify-center ${color}`}>
    <div className="text-4xl mb-3">{icon}</div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-lg">{title}</p>
  </div>
);

const TeamMember = ({ name, role, image }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
    <img src={image} alt={name} className="mx-auto w-32 h-32 rounded-full mb-4 object-cover" />
    <h3 className="text-xl font-bold">{name}</h3>
    <p className="text-gray-500">{role}</p>
  </div>
);

export default AboutUs;
