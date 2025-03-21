import React, { useState } from 'react';

const API_BASE_URL = "http://localhost:5000";

const ComplaintPage = () => {
    const [complaintType, setComplaintType] = useState("");
    const [description, setDescription] = useState("");
    const [roomNumber, setRoomNumber] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_BASE_URL}/api/complaints/file`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ complaintType, description, roomNumber })
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                setComplaintType("");
                setDescription("");
                setRoomNumber("");
            } else {
                alert(result.message || "Failed to file complaint.");
            }
        } catch (error) {
            console.error("Error filing complaint:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-6">File a Complaint</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <label className="block mb-2 font-semibold">Room Number</label>
                <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-4 w-full"
                    placeholder="Enter your room number"
                    required
                />

                <label className="block mb-2 font-semibold">Complaint Type</label>
                <input
                    type="text"
                    value={complaintType}
                    onChange={(e) => setComplaintType(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-4 w-full"
                    placeholder="e.g., Electrical, Plumbing, Maintenance"
                    required
                />

                <label className="block mb-2 font-semibold">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-4 w-full"
                    placeholder="Describe your complaint in detail"
                    required
                ></textarea>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Submit Complaint
                </button>
            </form>
        </div>
    );
};

export default ComplaintPage;
