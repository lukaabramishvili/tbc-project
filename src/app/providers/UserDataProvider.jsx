// UserDataProvider.js (Server Component)

import { createContext, useContext, useState, useEffect } from 'react';

// Create context to provide user data
const UserDataContext = createContext();

// Custom hook to access user data context
export const useUserDataContext = () => useContext(UserDataContext);

// Function to fetch user data from the server-side API
async function fetchUserData() {
  const response = await fetch('http://localhost:3000/api/userSession/getUserSession');
  const data = await response.json();
  return data.user;
}

// UserDataProvider component to fetch and provide user data
export default async function UserDataProvider({ children }) {
  // Fetch the user data server-side
  const userData = await fetchUserData();

  // Return the context provider with the fetched user data
  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
}
