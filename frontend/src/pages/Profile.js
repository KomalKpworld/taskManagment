import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../component";

const Profile = () => {
  const [users, setusers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const id = localStorage.getItem("user");
    const getUserusers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setusers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUserusers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:3001/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted user from the users state
      setusers((prevusers) => prevusers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold mb-4">User Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {users &&
            users.map((user) => (
              <div key={user._id} className="bg-white p-4 rounded shadow">
                <img
                  src={user.profile}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  alt={user.username}
                  style={{ backgroundColor: user.color }}
                />
                <h3 className="text-lg font-semibold mb-2">{user?.username}</h3>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                <div className="flex justify-between">
                  <button
                    className="bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600"
                    onClick={() => navigate(`/edit-profile/${user._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
