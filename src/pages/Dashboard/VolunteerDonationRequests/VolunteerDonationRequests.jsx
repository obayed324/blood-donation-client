import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import districts from "../../../../public/districts.json";

const districtMap = (() => {
    const table = districts.find(
        (item) => item.type === "table" && item.name === "districts"
    );

    const map = {};
    table.data.forEach((d) => {
        map[d.id] = d.name; // English name
        // map[d.id] = d.bn_name; // Bangla if needed
    });

    return map;
})();

const ITEMS_PER_PAGE = 10;

const VolunteerDonationRequests = () => {
    const axiosSecure = useAxiosSecure();

    const [allRequests, setAllRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // Fetch all donation requests (volunteers can see all)
    useEffect(() => {
        axiosSecure
            .get("/volunteer/donation-requests")
            .then((res) => {
                setAllRequests(res.data);
                setFilteredRequests(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosSecure]);

    // Filtering
    useEffect(() => {
        setTimeout(() => {
            if (statusFilter === "all") {
                setFilteredRequests(allRequests);
            } else {
                setFilteredRequests(
                    allRequests.filter(
                        (req) => req.status?.toLowerCase() === statusFilter
                    )
                );
            }
            setCurrentPage(1);
        }, 0);
    }, [statusFilter, allRequests]);

    // Pagination
    const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedRequests = filteredRequests.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Update status (only allowed for volunteers)
    const handleStatusChange = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/donation-requests/${id}/status`, {
                status: newStatus,
            });
            setAllRequests((prev) =>
                prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
            );
            Swal.fire("Updated!", `Status changed to ${newStatus}.`, "success");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update status.", "error");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-red-600">
                All Blood Donation Requests 🩸
            </h2>

            {/* Filter */}
            <div className="mb-4 flex gap-3">
                <select
                    className="select select-bordered max-w-xs"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="table table-zebra">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Blood</th>
                            <th>Status</th>
                            <th>Donor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedRequests.map((req) => (
                            <tr key={req._id}>
                                <td>{req.recipientName}</td>
                                <td>
                                    {districtMap[req.recipientDistrict] || "Unknown"},{" "}
                                    {req.recipientUpazila}
                                </td>

                                <td>{req.donationDate}</td>
                                <td>{req.donationTime}</td>
                                <td>{req.bloodGroup}</td>

                                <td>
                                    <span
                                        className={`badge text-white ${req.status === "pending" && "badge-warning"
                                            } ${req.status === "inprogress" && "badge-info"} ${req.status === "done" && "badge-success"
                                            } ${req.status === "canceled" && "badge-error"}`}
                                    >
                                        {req.status}
                                    </span>
                                </td>

                                <td>
                                    {(req.status === "inprogress" || req.status === "done") &&
                                        req.donor ? (
                                        <>
                                            <p>{req.donor.name}</p>
                                            <p className="text-xs">{req.donor.email}</p>
                                        </>
                                    ) : (
                                        "-"
                                    )}
                                </td>

                                {/* Actions - only status update */}
                                <td className="space-x-1">
                                    <select
                                        className="select select-bordered select-sm max-w-[120px]"
                                        value={req.status}
                                        onChange={(e) =>
                                            handleStatusChange(req._id, e.target.value)
                                        }
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="inprogress">In Progress</option>
                                        <option value="done">Done</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}

                        {paginatedRequests.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-6">
                                    No donation requests found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num}
                            onClick={() => setCurrentPage(num + 1)}
                            className={`btn btn-sm ${currentPage === num + 1 ? "btn-error" : "btn-outline"
                                }`}
                        >
                            {num + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VolunteerDonationRequests;
