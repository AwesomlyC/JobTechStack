import React, {useState} from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import '../styles/TextInput.css'
import 'react-datepicker/dist/react-datepicker.css'

function TextInput() {

    const [userInput, setUserInput] = useState('');
    const [wordMap, setWordMap] = useState({});
    const [companyName, setCompanyName] = useState('');
    const [companyLocation, setCompanyLocation] = useState(''); 
    const [dateOfSubmission, setDateOfSubmission] = useState(new Date());   // Calendar Icon
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
        
            <div className='user-input-field'>
                <textarea 
                    className='text-input'
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <div className='company-information'>
                    <input 
                        type='text'
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder='Company Name'
                        required
                    />
                    <input 
                        type='text'
                        value={companyLocation}
                        onChange={(e) => setCompanyLocation(e.target.value)}
                        placeholder='Company Location'
                        required
                    />

                    <input 
                        type='text'
                        value={companyURL}
                        onChange={(e) => setCompanyURL(e.target.value)}
                        placeholder='URL'
                    />

                    <DatePicker 
                        selected={dateOfSubmission}
                        onChange={(date) => setDateOfSubmission(date)} 
                     />
                </div>
            </div>

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