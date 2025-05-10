import React, {createContext, useContext, useEffect, useState} from 'react'
import {useUser} from "@clerk/clerk-react";
import LoadingSpinner from './LoadingSpinner';
const UserContext = createContext(null);
const UserDetailContext = createContext(null);

export function UserProvider({children}) {
  const { user, isLoaded  } = useUser();
  const [userDetails, setUserDetail] = useState(null);

  useEffect(() => {
    if (user) {
      setUserDetail(user);
    }
  }, [user]);

  // Debug to verify rendering
  if (!isLoaded) {
    return <LoadingSpinner isLoading={!isLoaded} />; // Render a fallback while Clerk loads
  }
  return (
    <UserContext.Provider value={userDetails}>
      {children}
    </UserContext.Provider>
  );
}
export function useUserContext(){
  return useContext(UserContext);
}

export function useUserDetailContext(){
  return useContext(UserDetailContext);
}

export default UserProvider;