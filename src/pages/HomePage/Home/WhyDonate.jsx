import React from "react";
import { FaHeart, FaUsers, FaHospital } from "react-icons/fa";

const WhyDonate = () => {
  const features = [
    {
      icon: <FaHeart className="text-red-600 w-8 h-8" />,
      title: "Save Lives",
      desc: "One donation can save up to 3 lives. Make a difference today."
    },
    {
      icon: <FaUsers className="text-primary w-8 h-8" />,
      title: "Join Community",
      desc: "Be part of thousands of donors supporting those in need."
    },
    {
      icon: <FaHospital className="text-secondary w-8 h-8" />,
      title: "Support Hospitals",
      desc: "Help hospitals maintain a safe blood supply for patients."
    }
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Why Donate Blood with <span className="text-primary">RedHope</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 text-center shadow-lg rounded-2xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDonate;
