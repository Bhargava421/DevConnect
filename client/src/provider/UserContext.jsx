import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setUser(JSON.parse(storedData));
    }
  }, []);

  const login = (userData) => {
    // userData is the full { token, user: {...} } object from the login API
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUser = (updatedProfileData) => {
    // updatedProfileData is the flat object { id, name, email } from your update API.

    // 1. Update the React state directly with the new flat user object.
    setUser(updatedProfileData);

    // 2. Update localStorage correctly to preserve the token.
    const storedData = JSON.parse(localStorage.getItem("user"));

    if (storedData) {
      // Create a new object that keeps the original token but uses the new user data.
      const newStorageData = updatedProfileData;
      // Save the complete, updated structure back to localStorage.
      localStorage.setItem("user", JSON.stringify(newStorageData));
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};