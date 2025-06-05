import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import DatePicker from "react-datepicker";

import './../styles/UpdateModal.css'
import 'react-datepicker/dist/react-datepicker.css'

function UpdateModal({ isOpen, onClose, flipUpdateMode, setHasRetrieve, currentUpdateInfo, setCurrentUpdateInfo }) {

    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [dateOfSubmission, setDateOfSubmission] = useState(null);
    const [companyURL, setCompanyURL] = useState('');
    const [userInput, setUserInput] = useState('');

    const [documentID, setDocumentID] = useState(null);

    const modalRef = useRef(null);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            setUpdateInfo();
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }
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
    const verifyUserInputDetails = () => {

        if (!userInput || !companyName || !companyLocation || !jobTitle || !companyURL){
            if (!userInput){
                setErrorMessage("Missing Job's Description!");
            } else if (!companyName){
                setErrorMessage("Missing Company's Name!");
            } else if (!jobTitle){
                setErrorMessage("Missing Job's Title");
            } else if (!companyLocation){
                setErrorMessage("Missing Job's Location");
            } else if (!companyURL.includes('http') || !companyURL.includes('www')){
                setErrorMessage("Invalid Job's URL")
            }
            return false;
        }
        return true;
    }
    // Helper function to check date and set a valid date
    const checkDate = (dateOfSubmission) => {
        if (dateOfSubmission){
            // There are only two forms that the date string will be in 
            // yyyy-dd-mm or yyyy/dd/mm
            const [year, monthIndex, day] = dateOfSubmission.split('/')
            const newDate = new Date(year, monthIndex - 1, day)
            
            // Valid Date with / (slashes)
            if (!isNaN(newDate.getTime())){
                setDateOfSubmission(newDate)
            } else {
                const [year, monthIndex, day] = dateOfSubmission.split('-')
                const newDate = new Date(year, monthIndex - 1, day)
                
                // If splitting by '-' does not work, simply return today's date.
                if (!isNaN(newDate.getTime())){
                    setDateOfSubmission(newDate);
                } else {
                    setDateOfSubmission(new Date());
                }
            }
        }
    }
    const setUpdateInfo = () => {
        setCompanyName(currentUpdateInfo.companyName);
        setJobTitle(currentUpdateInfo.jobTitle);
        setCompanyLocation(currentUpdateInfo.companyLocation)

        // Find Valid Date
        checkDate(currentUpdateInfo.dateOfSubmission);

        setCompanyURL(currentUpdateInfo.companyURL)
        setUserInput(currentUpdateInfo.userInput);

        setDocumentID(currentUpdateInfo.documentID);
    }

    const updateID = async (info) => {
        if (!verifyUserInputDetails()){
            return;
        }
        const data = {
            userInput: userInput,
            companyName: companyName.trimEnd().trimStart(),
            jobTitle: jobTitle.trimEnd().trimStart(),
            companyLocation: companyLocation.trimEnd().trimStart(),
            dateOfSubmission  : modifyDate(dateOfSubmission.toLocaleDateString('en-US')),       
            companyURL: companyURL.trimEnd().trimStart(),
            documentID: documentID,
        }


        await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/update-info`,
            data
        ).then(response =>{
            setHasRetrieve(false);
            setErrorMessage('');
        
            cancelUpdateModal();

        }).catch(error =>  {
            console.error("Occurred during axios callback - update:", error);
        });

    }

    const cancelUpdateModal = () => {
        flipUpdateMode(false);
        // setHasRetrieve(false);
        setCurrentUpdateInfo({});
        onClose();
    }

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            cancelUpdateModal();
        }
    }

    const deleteID = () => {
        axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/delete-post`,
          { data: currentUpdateInfo }
        ).then(response => {
          
        }).catch(error => {
          console.error("Occurred during axios callback - delete:", error);
        })

        cancelUpdateModal();

      };
    return (
        <div
            className='modal-popup'
            onClick={handleClickOutside}
        >
            <div className='update-modal' ref = {modalRef}>
                <>
                    <span className='update-icon'>Edit Information<FaRegEdit /></span>

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
                    {errorMessage &&
              <div className='error-description'>Error: {errorMessage}</div>}

                    <div className='button-options' id='update-modal-options'>
                        <>
                            <button className='visit-page' onClick={() => window.open(currentUpdateInfo.companyURL)}>Visit Page</button>
                        </>

                        <div className='options'>
                            <button className='cancel' onClick={cancelUpdateModal}>Cancel</button>
                            <button className='update' onClick={(info) => updateID(info)}>Update</button>
                            <button className='delete' onClick={() => deleteID()}>Delete</button>
                        </div>
                    
                </div>
            </>
        </div>
    </div>
    )
}

export default UpdateModal