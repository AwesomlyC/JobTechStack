import React, {createContext, useContext, useEffect, useState} from 'react'
import {useUser} from "@clerk/clerk-react";
import LoadingSpinner from './LoadingSpinner';
const UserContext = createContext(null);

export function UserProvider({children}) {
  const { user, isLoaded  } = useUser();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  // Debug to verify rendering
  if (!isLoaded) {
    return <LoadingSpinner />; // Render a fallback while Clerk loads
  }
  return (
    <UserContext.Provider value={userId}>
      {children}
    </UserContext.Provider>
  );
}
export function useUserContext(){
  return useContext(UserContext);
}
export default UserProvider;