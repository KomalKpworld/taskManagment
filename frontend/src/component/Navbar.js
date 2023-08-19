import React, { useState , useEffect} from 'react';
import { Link,useNavigate,   } from 'react-router-dom';

import axios from 'axios';
const Navbar = ({logout}) => {
  const [showDropdown, setShowDropdown] = useState(false);
const [user, setUser] = useState([]);
 const history = useNavigate();
useEffect(() => {
  const token = localStorage.getItem('jwtToken')
  const id = localStorage.getItem('user')
  const getUser = async () => {
  const response = await axios.get(`http://localhost:3001/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the access token in the Authorization header
      },
    }); 
    setUser(response.data);
  };
  getUser();
}, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
  
    localStorage.removeItem('jwtToken');
localStorage.removeItem('user');
    history('/');
  };

  return (
    <nav className="bg-blue-900 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {user && (
          <div className="relative">
            <button
              className="p-1 rounded-full bg-blue-800 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
              onClick={handleDropdownToggle}
            >
              <img
                src={user[0]?.profile} 
                alt="Profile"
                className="w-9 h-9 rounded-full"
              />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border border-blue-100 rounded-lg shadow">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-blue-700 hover:bg-blue-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-blue-700 hover:bg-blue-100 focus:outline-none"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
