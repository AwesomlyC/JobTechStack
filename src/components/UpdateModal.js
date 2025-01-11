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

    const verifyUserInputDetails = () => {

        if (!userInput || !companyName || !companyLocation || !jobTitle || !companyURL){
            console.log(userInput, companyName, companyLocation, jobTitle);
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

    const setUpdateInfo = () => {
        setCompanyName(currentUpdateInfo.companyName);
        setJobTitle(currentUpdateInfo.jobTitle);
        setCompanyLocation(currentUpdateInfo.companyLocation)
        if (currentUpdateInfo.dateOfSubmission) {
            const [year, monthIndex, day] = currentUpdateInfo.dateOfSubmission.split('/')
            setDateOfSubmission(new Date(year, monthIndex - 1, day))
        } else {
            setDateOfSubmission(new Date());
        }
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
            dateOfSubmission: dateOfSubmission.toISOString().split('T')[0],       // Only keep the date, not the time
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
        setHasRetrieve(false);
        setCurrentUpdateInfo({});
        onClose();
    }

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            cancelUpdateModal();
        }
    }

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

                    <div className='button-options' id = 'update-modal-options'>
                        <button className='cancel' onClick={cancelUpdateModal}>Cancel</button>
                        <button className='update' onClick={(info) => updateID(info)}>Update</button>
                    </div>
                </>
            </div>
        </div>
    )
}

export default UpdateModal