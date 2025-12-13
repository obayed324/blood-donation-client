import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const stories = [
  {
    name: "Sarah J.",
    role: "Donor",
    photo: "https://i.ibb.co/4pDNDk1/avatar.png",
    quote: "I’ve donated blood 3 times with RedHope, and it feels amazing to save lives!"
  },
  {
    name: "John D.",
    role: "Recipient",
    photo: "https://i.ibb.co/y8wGJ6Q/avatar2.png",
    quote: "Thanks to RedHope, I received blood when I needed it most."
  },
  {
    name: "Emily R.",
    role: "Donor",
    photo: "https://i.ibb.co/4pDNDk1/avatar3.png",
    quote: "Joining RedHope was simple, and the impact is huge!"
  }
];

const FeaturedStories = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Stories from <span className="text-primary">RedHope</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
              <div className="flex items-center gap-4 mb-4">
                <img src={story.photo} alt={story.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold">{story.name}</h4>
                  <p className="text-sm text-gray-500">{story.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic"><FaQuoteLeft className="inline mr-1 text-red-500" />{story.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;
