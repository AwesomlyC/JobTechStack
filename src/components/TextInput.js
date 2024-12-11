import React, {useState} from 'react'
import axios from 'axios'
import '../styles/TextInput.css'
function TextInput() {

    const [userInput, setUserInput] = useState('');
    const [wordMap, setWordMap] = useState({});
    const [companyName, setCompanyName] = useState('');
    const [companyLocation, setCompanyLocation] = useState(''); 
    const [dateOfSubmission, setDateOfSubmission] = useState('');   // Calendar Icon
    const [companyURL, setCompanyURL] = useState(''); // optional

    const submitChanges = () => {

        const data = {
            userInput,
            companyName,
            companyLocation,
            dateOfSubmission,
            companyURL
        }
        axios.get(
            `${process.env.REACT_APP_SERVER_URL}/parse`,
            { params: data }
            
        ).then ( res => {
            console.log("Returned Data -->", res.data);
            console.log(typeof res.data);
            setWordMap(res.data);
        }).catch(error => {
            console.error("error occurred:", error);
        });
        
    }

  return (
    <div className='text-container'>
        <textarea 
            className='text-input'
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
        />

        <button 
            className='text-submit-button'
            onClick={submitChanges}
        >
            Parse Input
        </button>
        <div className='result'>

            {Object.entries(wordMap).map( ([key,value]) =>
                <div>
                    {key} - {value}
                </div>   
            )}

        </div>
    </div>
  )
}

export default TextInput