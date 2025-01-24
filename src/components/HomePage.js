import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useUserContext } from './UserProvider';
import LoadingSpinner from './LoadingSpinner';
import './../styles/HomePage.css'
function HomePage() {

  const userDetail = useUserContext();
  const [username, setUsername] = useState(null);
  const [numOfTotalCount, setNumOfTotalCount] = useState(null);
  const [numOfCurrentDateCount, setNumOfCurrentDateCount] = useState(null);
  const [numOfYesterdayDateCount, setNumOfYesterdayDateCount] = useState(null);
  const [userCreationDate, setUserCreationDate] = useState(null);
  const [updateKeywordStatus, setUpdateKeywordStatus] = useState(false);
  
  const modifyDate = (dateString) => {
    let [month, day, year] = dateString.split('/');
    if (month.length === 1){
        month = '0' + month[0];
    }
    if (day.length === 1){
        day = '0' + day[0];
    }
    return year + '/' + month + '/' + day;
}

  useEffect(() => {

    const retrieveUserData = async () => {
      if (!userDetail){
        return;
      }
      setUserCreationDate(modifyDate(new Date(userDetail.createdAt).toLocaleDateString('en-US')));
      let curDate = new Date();
      let prevDate = new Date()
      
      prevDate.setDate(curDate.getDate() - 1);

      curDate = modifyDate(curDate.toLocaleDateString('en-US'));
      prevDate = modifyDate(prevDate.toLocaleDateString('en-US'))
      
      console.log(curDate, prevDate);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/stats/user`,
        {userID: userDetail.id, curDate, prevDate},
      ).then(response => {
        console.log()
        setNumOfTotalCount(response.data.totalCount);
        setNumOfCurrentDateCount(response.data.curCount);
        setNumOfYesterdayDateCount(response.data.yesterdayCount);

      }).catch(error =>{
        console.error(error);
      });
      // Set the name to either their username or primary email address used for sign in.
      setUsername(userDetail.username ? userDetail.username : userDetail.primaryEmailAddress.emailAddress)
    };

    retrieveUserData();
  }, [userDetail]);


  const updateKeywordList = async () => {
    
    setUpdateKeywordStatus(true);
    
    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/stats/user/keyword/update`,
      {userID: userDetail.id}
    ).then (response => {
      setUpdateKeywordStatus(false);
    }).catch(error => {
      console.error("Unable to update properly");
      setUpdateKeywordStatus(false);
    });
  }
  const percentangeOfJobSubmitted = (curCount, prevCount) => {
    let cur = Number(curCount), prev = Number(prevCount);
    // Sanitize prev's value
    if (prev <= 0){
      return Math.round(cur * 100, 2); 
    }
    // Prevent negative percentange
    return Math.round(Math.abs(( (cur - prev) / prev ) * 100), 2)
  };

  if (!userDetail || !numOfTotalCount || !numOfCurrentDateCount || !numOfYesterdayDateCount || updateKeywordStatus){
    return <div><LoadingSpinner /></div>

  }

  return (
    <div className='home'>
      <div className='upper-container'>
        <text className='home-title'>Welcome {username}</text>
        <hr className='separator' />
      </div>
      <div className='lower-container'>

        <div className='stat-container'>
          <text className='stat-title'>Daily Statistics</text>
          <text>Num. of Submitted Jobs: <b>{numOfCurrentDateCount}</b></text>
          <text>Previous Num: <b>{numOfYesterdayDateCount}</b></text>

          <text>You've submitted <text style={{color: numOfCurrentDateCount > numOfYesterdayDateCount ? "blue" : "red", fontSize: "18px", fontWeight: "700"}}>{percentangeOfJobSubmitted(numOfCurrentDateCount, numOfYesterdayDateCount)}% </text> {numOfCurrentDateCount > numOfYesterdayDateCount ? "more" : "less"} compared to yesterday!
          </text>
        </div>

        <div className='stat-container'>
          <text className='stat-title'>Global Statistics</text>
          <text>Num. of Submitted Jobs: <b>{numOfTotalCount}</b></text>
          <text>Signed Up On: <b>{userCreationDate}</b></text>
          <button onClick={updateKeywordList}>Update keywords!</button>

        </div>
      </div>
    </div>
  )
}

export default HomePage