import React from 'react';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import './../styles/UpdateModal.css'
function UpdateModal({isOpen, onClose, flipUpdateMode, setHasRetrieve, currentUpdateInfo, setCurrentUpdateInfo}) {
    
    if (!isOpen){
        return null;
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
    }

    return (
    <div
        onClick={onClose}
        className='modal-popup'
    >
        <div className='modal'>
            <>
                <span className='update-icon'><FaRegEdit /></span>

                <div className='update-fields'>

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