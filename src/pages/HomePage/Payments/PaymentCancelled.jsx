import { FaTimesCircle, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";


export const PaymentCancelled = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
            <div className="card max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center">
                <div className="flex justify-center mb-6">
                    <FaTimesCircle className="text-red-500 text-6xl" />
                </div>


                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Payment Cancelled
                </h2>
                <p className="text-gray-600 mb-6">
                    Your donation process was cancelled. No money was charged.
                    You can try again anytime to help save lives.
                </p>


                <div className="flex flex-col gap-4">
                    <Link to="/funding" className="btn btn-error w-full">
                        Try Donation Again
                    </Link>


                    <Link
                        to="/"
                        className="btn btn-outline flex items-center justify-center gap-2"
                    >
                        <FaArrowLeft /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default PaymentCancelled;