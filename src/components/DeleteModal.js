import React, {useRef} from 'react'
import './../styles/DeleteModal.css'
import { FaTrashCan } from "react-icons/fa6";
import axios from 'axios';

function DeleteModal({isOpen, onClose, flipDeleteMode, setHasRetrieve, currentDeleteInfo, setCurrentDeleteInfo}) {
    
  
    const modalRef = useRef(null);
    
    if (!isOpen){
        return null;
    }

    const deleteID = (info) => {
        axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/delete-post`,
          { data: currentDeleteInfo }
        ).then(response => {
          console.log(response.data);
        }).catch(error => {
          console.error("Occurred during axios callback - delete:", error);
        })

        cancelDeleteModal();

      };

      const cancelDeleteModal = () => {
        flipDeleteMode(false);
        setHasRetrieve(false);
        setCurrentDeleteInfo({});
      }

      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          cancelDeleteModal();
            onClose();
        }
    }
    return (
        <div
            className='modal-popup'
            onClick={handleClickOutside}
        >
            <div className='modal' ref={modalRef}>
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