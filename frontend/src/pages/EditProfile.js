import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../component";
import LocationMap from "../component/LocationMap";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const id = localStorage.getItem("user");

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        console.log(userData);
        setEmail(userData[0]?.email);
        setUsername(userData[0]?.username);
        setProfile(userData[0]?.profile);
        // You can populate other fields as needed
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfile(selectedFile);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("user");
    const token = localStorage.getItem("jwtToken");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    if (profile) {
      formData.append("profile", profile);
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/user/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );

      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold mb-4">Edit Profile</h2>

        <div className="bg-white p-4 rounded shadow">
          <form onSubmit={handleSave}>
            <div className="mb-4 ">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input ml-5"
              />
            </div>
            <div className="mb-4">
              <label>Email Address</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input ml-5"
              />
            </div>
            <div className="mb-4">
              <label>Profile Picture</label>
              <input
                type="file"
                onChange={handleProfileChange}
                className="form-input ml-5"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save Changes
              </button>
              <Link to="/profile">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
