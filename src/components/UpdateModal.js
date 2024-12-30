import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import DatePicker from "react-datepicker";

import './../styles/UpdateModal.css'
import 'react-datepicker/dist/react-datepicker.css'

function UpdateModal({isOpen, onClose, flipUpdateMode, setHasRetrieve, currentUpdateInfo, setCurrentUpdateInfo}) {

    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [dateOfSubmission, setDateOfSubmission] = useState(null);
    const [companyURL, setCompanyURL] = useState('');
    const [userInput, setUserInput] = useState('');
    
    // if (!isOpen){
    //     return null;
    // }

    useEffect(() => {
        if (isOpen){
            console.log(currentUpdateInfo);
            console.log(dateOfSubmission);
            setUpdateInfo();
        }
    }, [isOpen]);

    if (!isOpen){
        return null;
    }
    const setUpdateInfo = () => {
        setCompanyName(currentUpdateInfo.companyName);
        setJobTitle(currentUpdateInfo.jobTitle);
        setCompanyLocation(currentUpdateInfo.companyLocation)
        if (currentUpdateInfo.dateOfSubmission){
            const [year,monthIndex,day] = currentUpdateInfo.dateOfSubmission.split('-')
            setDateOfSubmission(new Date(year, monthIndex - 1, day))
        } else{
            setDateOfSubmission(new Date());
        }
        setCompanyURL(currentUpdateInfo.companyURL)
        setUserInput(currentUpdateInfo.userInput);
    }
    const updateID = (info) => {
        // axios.post(

        // ).then(response =>{
        //     console.log(response.data);
        // }).catch(error =>  {
        //     console.error("Occurred during axios callback - update:", error);
        // });

        cancelDeleteModal();
    }

    const cancelDeleteModal = () => {
        flipUpdateMode(false);
        setHasRetrieve(false);
        setCurrentUpdateInfo({});
        onClose();
    }

    return (
    <div
        // onClick={onClose}
        className='modal-popup'
    >
        <div className='update-modal'>
            <>
                <span className='update-icon'><FaRegEdit /></span>

                <div className='update-container'>
                    <div className='update-description'>
                    <label>Job Description:</label>
                        <textarea 
                            className='text-input'
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                    </div>
                    <div className='update-fields'>
                    <label>Company Name:</label>
                    <input 
                        className='company-information'
                        type='text'
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder='Company Name'
                        required
                    />
                    <label>Job Title:</label>
                    <input 
                        className='company-information'
                        type='text'
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder='Job Title'
                        required
                    />

                    <label>Location: </label>
                    <select
                        className='company-information'
                        value={companyLocation}
                        onChange={(e) => setCompanyLocation(e.target.value)}
                    >
                        <option value='Remote'>Remote</option>
                        <option value='United_States'>United States</option>
                        <option value='California'>California</option>

                    </select>

                    <label>URL:</label>
                    <input 
                        className='company-information'
                        type='text'
                        value={companyURL}
                        onChange={(e) => setCompanyURL(e.target.value)}
                        placeholder='URL'
                    />
                    <label>Date submitted:</label>
                    <DatePicker 
                        selected={dateOfSubmission}
                        onChange={(date) => setDateOfSubmission(date)} 
                        />
                    </div>
                </div>

                <div className='delete-options'>
                    <button className = 'cancel' onClick = {cancelDeleteModal}>Cancel</button>
                    <button className = 'delete' onClick = {(info) => updateID(info)}>Update</button>
                </div>
            </>
        </div>
        


    </div>
  )
}

export default UpdateModal