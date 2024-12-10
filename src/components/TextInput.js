import React, {useState} from 'react'
import axios from 'axios'
function TextInput() {

    const [userInput, setUserInput] = useState('');

    const submitChanges = () => {
        console.log(userInput);
        // console.log(process.env.REACT_APP_SERVER_URL)
        axios.get(
            `${process.env.REACT_APP_SERVER_URL}`,
            {userInput}
            
        ).then ( res => {
            console.log("Returned Data -->", res.data);
        }).catch(error => {
            console.error("error occurred:", error);
        });
        
    }

  return (
    <div>
        <input 
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
        />

        <button 
            onClick={submitChanges}
        >
            Parse Input
        </button>
        
    </div>
  )
}

export default TextInput