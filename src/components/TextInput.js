import React, {useState} from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import '../styles/TextInput.css'
import 'react-datepicker/dist/react-datepicker.css'
import DisplayParseResults from './DisplayParseResults';

function TextInput() {

    const [userInput, setUserInput] = useState('');
    const [wordMap, setWordMap] = useState({});
    const [companyName, setCompanyName] = useState('');
    const [companyLocation, setCompanyLocation] = useState('Remote'); 
    const [dateOfSubmission, setDateOfSubmission] = useState(new Date());   // Calendar Icon
    const [jobTitle, setJobTitle] = useState('');   // Calendar Icon

    const [companyURL, setCompanyURL] = useState(''); // optional

    const submitChanges = () => {

        if (!userInput || !companyName || !companyLocation || !jobTitle){
            console.log(userInput ,companyName ,companyLocation,jobTitle) 
            return;
        }
        const data = {
            userInput,
            companyName: companyName.trimEnd().trimStart(),
            jobTitle: jobTitle.trimEnd().trimStart(),
            companyLocation: companyLocation.trimEnd().trimStart(),
            dateOfSubmission  : dateOfSubmission.toISOString().split('T')[0],       // Only keep the date, not the time
            companyURL: companyURL.trimEnd().trimStart()
        }

        
        axios.get(
            `${process.env.REACT_APP_SERVER_URL}/parse`,
            { params: data }
            
        ).then ( res => {
            console.log("Returned Data -->", res.data);
            setWordMap(res.data);
            resetFields();
        }).catch(error => {
            console.error("error occurred:", error);
        });
        
    }

    const resetFields = () => {
        setUserInput('');
        setCompanyName('');
        setCompanyLocation('Remote');
        setJobTitle('');
        setCompanyURL('');
        setDateOfSubmission(new Date());

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
                <div className='company-container'>
                    <input 
                        className='company-information'
                        type='text'
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder='Company Name'
                        required
                    />
                    <input 
                        className='company-information'
                        type='text'
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder='Job Title'
                        required
                    />


                    <select
                        className='company-information'
                        value={companyLocation}
                        onChange={(e) => setCompanyLocation(e.target.value)}
                    >
                        <option value='Remote'>Remote</option>
                        <option value='United_States'>United States</option>
                        <option value='California'>California</option>

                    </select>
                    <input 
                        className='company-information'
                        type='text'
                        value={companyURL}
                        onChange={(e) => setCompanyURL(e.target.value)}
                        placeholder='URL'
                    />

                    <DatePicker 
                        selected={dateOfSubmission}
                        onChange={(date) => setDateOfSubmission(date)} 
                     />

                     <button 
                        onClick={resetFields}
                        className='text-reset-button'
                    >
                        Reset Fields
                    </button>
                </div>
            </div>

        <button 
            className='text-submit-button'
            onClick={submitChanges}
        >
            Parse Input
        </button>
        <DisplayParseResults wordMap = {wordMap} />
    </div>
  )
}

export default TextInput