import { FaHandHoldingHeart, FaDonate, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Funding = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 🔹 Get logged-in user info (role, etc.)
  const { data: dbUser = {} } = useQuery({
    queryKey: ["user", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/uid/${user.uid}`);
      return res.data;
    },
  });

  // 🔹 Handle donation payment (fixed amount demo)
  const handlePayment = async (amount) => {
    if (!user) return alert("Please login to donate");

    const donationInfo = {
      amount,
      donorEmail: user.email,
      donorName: user.displayName,
      role: dbUser.role || "user",
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      donationInfo
    );

    window.location.assign(res.data.url);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-100 mb-40">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">
          Fund Blood Donation, Save Lives
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your funding helps manage blood requests, support donors, and ensure
          emergency blood availability across Bangladesh.
        </p>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <StatCard icon={<FaHandHoldingHeart />} value="10K+" label="Lives Saved" />
          <StatCard icon={<FaUsers />} value="5K+" label="Registered Donors" />
          <StatCard icon={<FaDonate />} value="৳2M+" label="Total Funding" />
        </div>
      </section>

      {/* Donation Plans */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose a Donation Amount
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <DonationCard title="Supporter" amount={500} onPay={handlePayment} />
          <DonationCard
            title="Life Saver"
            amount={1000}
            highlight
            onPay={handlePayment}
          />
          <DonationCard title="Hero" amount={5000} onPay={handlePayment} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Together We Can Save Lives</h2>
        <p className="mb-6">Every donation directly supports patients in need.</p>
        <button
          onClick={() => handlePayment(1000)}
          className="btn bg-white text-red-600 border-none px-8"
        >
          Start Funding
        </button>
      </section>
    </div>
  );
};

const StatCard = ({ icon, value, label }) => (
  <div className="card bg-red-50 shadow-md p-6 text-center">
    <div className="text-4xl text-red-500 mb-3 mx-auto">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    <p className="text-gray-600">{label}</p>
  </div>
);

const DonationCard = ({ title, amount, onPay, highlight }) => (
  <div
    className={`card shadow-xl p-8 text-center border transition ${{
      true: "border-red-500 scale-105",
      false: "border-gray-200",
    }[!!highlight]}`}
  >
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-3xl font-bold text-red-600 mb-6">৳{amount}</p>
    <button
      onClick={() => onPay(amount)}
      className="btn btn-error w-full text-white"
    >
      Donate Now
    </button>
  </div>
);

export default Funding;
