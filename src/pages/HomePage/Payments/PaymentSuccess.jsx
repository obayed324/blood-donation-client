import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { FaCheckCircle, FaHandHoldingHeart, FaHome } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
      <div className="card max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful 
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for your generous contribution.  
          Your donation helps save lives through blood donation support.
        </p>

        {/* Transaction Info */}
        {paymentInfo.transactionId && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Transaction ID</p>
            <p className="font-mono text-green-700 break-all">
              {paymentInfo.transactionId}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Link to="/funding" className="btn btn-success w-full flex gap-2 text-white">
            <FaHandHoldingHeart /> Donate Again
          </Link>

          <Link
            to="/dashboard"
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            <FaHome /> Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
