import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../provider/UserContext.jsx';

function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold mb-2 text-gray-800">
          Welcome, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600 mb-6">
          Email: {user?.email || "Not available"}
        </p>
        <button onClick={() => navigate("/profile")} className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded transition-all mr-4">Profile</button>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded transition-all">Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;