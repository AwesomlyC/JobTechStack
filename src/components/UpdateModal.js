import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import DatePicker from "react-datepicker";

import './../styles/UpdateModal.css'
import 'react-datepicker/dist/react-datepicker.css'

function UpdateModal({isOpen, onClose, flipUpdateMode, setHasRetrieve, currentUpdateInfo, setCurrentUpdateInfo}) {

    const [companyName, setCompanyName] = useState(currentUpdateInfo.companyName);
    const [jobTitle, setJobTitle] = useState(currentUpdateInfo.jobTitle);
    const [companyLocation, setCompanyLocation] = useState(currentUpdateInfo.companyLocation);
    const [dateOfSubmission, setDateOfSubmission] = useState(currentUpdateInfo.dateOfSubmission  ? new Date(currentUpdateInfo.dateOfSubmission) : new Date());
    const [companyURL, setCompanyURL] = useState(currentUpdateInfo.companyURL);
    
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
        setDateOfSubmission(currentUpdateInfo.companyLocation)
        setDateOfSubmission(currentUpdateInfo.dateOfSubmission)
        setCompanyURL(currentUpdateInfo.companyURL)
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
        <div className='modal'>
            <>
                <span className='update-icon'><FaRegEdit /></span>

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