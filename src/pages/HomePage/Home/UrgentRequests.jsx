import React from "react";
import { FaTint } from "react-icons/fa";

const requests = [
  {
    name: "Michael P.",
    bloodType: "A+",
    location: "City Hospital",
    urgency: "High"
  },
  {
    name: "Lisa W.",
    bloodType: "O-",
    location: "Community Center",
    urgency: "Medium"
  },
  {
    name: "Robert K.",
    bloodType: "B+",
    location: "RedHope Center",
    urgency: "High"
  }
];

const UrgentRequests = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Urgent Blood Requests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requests.map((req, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 relative">
              <div className="absolute -top-5 right-5 bg-red-500/20 w-12 h-12 flex items-center justify-center rounded-full">
                <FaTint className="text-red-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-1">{req.name}</h3>
              <p className="text-gray-500 mb-2">{req.location}</p>
              <p className="text-red-600 font-bold">Blood Type: {req.bloodType}</p>
              <p className="mt-2 text-sm text-gray-600">Urgency: {req.urgency}</p>
              <button className="btn btn-primary text-white mt-4 w-full">Donate Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UrgentRequests;
