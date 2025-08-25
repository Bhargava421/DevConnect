import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Stop page reload
    
    // Get the token directly and safely from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Token not found! Cannot update profile.");
        return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile.");

      const updatedProfile = await response.json();
      updateUser(updatedProfile); // This will now work correctly
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const backButtonHandler = () => navigate("/dashboard");
  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <img
          src={`https://ui-avatars.com/api/?name=${formData.name || 'User'}&background=0D8ABC&color=fff`}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
        />
        {isEditing ? (
          // Use onSubmit on the form, not onClick on the button
          <form onSubmit={handleFormSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Profile</h2>
            <div className="space-y-4">
              <input name="name" type="text" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-gray-50 rounded-lg border" />
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 bg-gray-50 rounded-lg border" />
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="flex justify-between space-x-3">
              <button type="submit" className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancel</button>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">My Profile</h2>
            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg border">
                <span className="font-medium text-gray-600">Name:</span>
                <span className="text-gray-800">{user?.name}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg border">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-800">{user?.email}</span>
              </div>
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="flex justify-between space-x-3">
              <button onClick={() => setIsEditing(true)} className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Edit Profile</button>
              <button onClick={backButtonHandler} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Dashboard</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;