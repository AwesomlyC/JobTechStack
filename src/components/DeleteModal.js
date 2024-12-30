import React from 'react'
import './../styles/DeleteModal.css'
import { FaTrashCan } from "react-icons/fa6";
import axios from 'axios';

function DeleteModal({isOpen, onClose, flipDeleteMode, setHasRetrieve, currentDeleteInfo, setCurrentDeleteInfo}) {
    if (!isOpen){
        return null;
    }

    const deleteID = (info) => {
        axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/delete-post`,
          { data: currentDeleteInfo }
        ).then(response => {
          console.log(response.data);
          cancelDeleteModal();
        }).catch(error => {
          console.error("Occurred during axios callback - delete:", error);
        })
      };

      const cancelDeleteModal = () => {
        flipDeleteMode(false);
        setHasRetrieve(false);
        setCurrentDeleteInfo({});
      }
    return (
        <div
            onClick={onClose}
            className='modal-popup'
        >
            <div className='modal'>
            <>
                <span className='trash-icon'><FaTrashCan /></span>

                
                <div className='delete-text'>
                    <span><strong>You are about to delete this posting</strong></span>
                    <span>Are you sure?</span>
                    
                </div>
                <div className='button-options'>
                    <button className = 'cancel' onClick = {cancelDeleteModal}>Cancel</button>
                    <button className = 'delete' onClick = {(info) => deleteID(info)}>Delete</button>
                </div>
            </>
            </div>
        </div>
    );
}

export default DeleteModal;