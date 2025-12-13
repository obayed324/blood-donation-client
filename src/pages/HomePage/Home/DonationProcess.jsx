import React from "react";
import { FaUserPlus, FaSearch, FaHandHoldingMedical, FaHeartbeat } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="w-10 h-10 text-primary" />,
    title: "Register as Donor",
    desc: "Sign up quickly and join the RedHope donor community."
  },
  {
    icon: <FaSearch className="w-10 h-10 text-secondary" />,
    title: "Check Requests",
    desc: "View donation requests near you and choose who to help."
  },
  {
    icon: <FaHandHoldingMedical className="w-10 h-10 text-accent" />,
    title: "Donate Blood",
    desc: "Visit the center and donate blood safely."
  },
  {
    icon: <FaHeartbeat className="w-10 h-10 text-red-600" />,
    title: "Track Impact",
    desc: "See how your donation has helped save lives."
  }
];

const DonationProcess = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How <span className="text-primary">RedHope</span> Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationProcess;
