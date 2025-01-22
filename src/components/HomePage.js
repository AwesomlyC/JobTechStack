import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useUserContext } from './UserProvider';
import LoadingSpinner from './LoadingSpinner';

function HomePage() {

  const userDetail = useUserContext();
  const [username, setUsername] = useState(null);
  useEffect(() => {

    const retrieveUserData = async () => {
      if (!userDetail){
        return;
      }
      // await axios.post(
      //   `${process.env.REACT_APP_SERVER_URL}/api`
      // )
      console.log(userDetail);
      // Set the name to either their username or primary email address used for sign in.
      setUsername(userDetail.username ? userDetail.username : userDetail.primaryEmailAddress.emailAddress)
    };

    retrieveUserData();
  }, [userDetail]);

  if (!userDetail){
    return <div><LoadingSpinner /></div>

  }
  return (
    <div>
      <h1>Welcome {username}</h1>
    </div>
  )
}

export default HomePage