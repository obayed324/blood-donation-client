import React from "react";

const ContactUs = () => {
  const contactNumbers = ["01634201818", "01765432109", "01876543210"];
  const contactEmail = "info@redhope.org";
  const contactAddress = "123 RedHope Street, Dhaka, Bangladesh";

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Get in Touch with <span className="text-primary">RedHope</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full rounded-lg"
              />
              <textarea
                placeholder="Your Message"
                className="textarea textarea-bordered w-full rounded-lg h-32"
              ></textarea>
              <button
                type="submit"
                className="btn btn-primary w-full text-white mt-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex items-center gap-4">
              <span className="text-primary text-2xl">&#9742;</span>
              <div>
                <h4 className="font-semibold">Phone</h4>
                {contactNumbers.map((num, i) => (
                  <p key={i} className="text-gray-600">{num}</p>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex items-center gap-4">
              <span className="text-primary text-2xl">&#9993;</span>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-600">{contactEmail}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex items-center gap-4">
              <span className="text-primary text-2xl">&#127968;</span>
              <div>
                <h4 className="font-semibold">Address</h4>
                <p className="text-gray-600">{contactAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
