import React, { useEffect, useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    block: "",
    roomNumber: "",
    serviceType: "",
    description: "",
  });

  const [status, setStatus] = useState(""); // Submission status
  const [complaints, setComplaints] = useState([]); // Previous complaints

  const token = localStorage.getItem("token");

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/hostel-info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { name, block, roomNumber } = await response.json();
      setFormData((prev) => ({ ...prev, name, block, roomNumber }));
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
  };

  const fetchPreviousComplaints = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/complaints", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setComplaints(data); // array of complaints
    } catch (err) {
      console.error("Failed to fetch previous complaints", err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchPreviousComplaints();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch("http://localhost:5000/api/users/complaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStatus("Complaint Submitted Successfully!");
      alert(data.message);

      setFormData({
        name: "",
        block: "",
        roomNumber: "",
        serviceType: "",
        description: "",
      });

      fetchPreviousComplaints(); // Refresh complaint list
    } catch (err) {
      console.error("Failed to submit complaint:", err);
      setStatus("Failed to submit complaint. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Complaint Form */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Hostel Complaint Form</h2>
          {status && (
            <div className="text-center mb-4 font-semibold text-blue-700">{status}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Type</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-xl"
                required
              >
                <option value="">Select service</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-xl"
                placeholder="Describe the issue in detail"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
            >
              Submit Complaint
            </button>
          </form>
        </div>

        {/* Previous Complaints Section */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Your Previous Complaints</h3>
          {complaints.length === 0 ? (
            <p className="text-gray-600">No complaints submitted yet.</p>
          ) : (
            <ul className="space-y-3">
              {complaints.map((complaint, idx) => (
                <li
                  key={idx}
                  className="border p-4 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div>
                    <p className="font-semibold">
                      {complaint.serviceType} — Room {complaint.roomNumber}, Block {complaint.block}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
                  </div>
                  <span
                    className={`mt-2 sm:mt-0 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      complaint.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : complaint.status === "Resolved"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
