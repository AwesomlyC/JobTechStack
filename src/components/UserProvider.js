import React, {createContext, useContext, useEffect, useState} from 'react'
import {useUser} from "@clerk/clerk-react";

const UserContext = createContext(null);

function UserProvider({children}) {
  const { user, isLoaded  } = useUser();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      console.log("THIS IS USER", user.id);
    }
  }, [user]);

  // Debug to verify rendering
  if (!isLoaded) {
    return <div>Loading...</div>; // Render a fallback while Clerk loads
  }
  return (
    <UserContext.Provider value={userId}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;