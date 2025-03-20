import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ handleLogout }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:5000';

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    alert('Failed to fetch user data. Redirecting to login.');
                    handleLogout();
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('An error occurred while fetching user data.');
            }
        };

        fetchUserData();
    }, [navigate, handleLogout]);

    if (!userData) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white">
                <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
                <div className="text-center mb-4">
                    <p><strong>Name:</strong> {userData.username}</p>
                    <p><strong>Registration Number:</strong> {userData.regNo}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
