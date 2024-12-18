import React from 'react'
import './../styles/DeleteModal.css'
import { FaTrashCan } from "react-icons/fa6";
import axios from 'axios';

function DeleteModal({isOpen, onClose, flipDeleteMode, setHasRetrieve, currentDeleteInfo, setCurrentDeleteInfo}) {
    console.log("DELETEMODAL - ", isOpen);
    if (!isOpen){
        return null;
    }

    const deleteID = (info) => {
        console.log("CLICKED", info);
        axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/delete-post`,
          { data: currentDeleteInfo }
        ).then(response => {
          console.log(response.data);
          flipDeleteMode();
          setHasRetrieve(false);
          setCurrentDeleteInfo({});
        }).catch(error => {
          console.error("Occurred during axios callback:", error);
        })
      };

      const cancelModal = () => {
        flipDeleteMode(false);
        setHasRetrieve(false);
        setCurrentDeleteInfo({});
      }
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    height: 150,
                    width: 240,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                }}
            >
            <>
                <span className='trash-icon'><FaTrashCan /></span>
                <span><strong>You are about to delete this posting</strong></span>
                <span>Are you sure?</span>
                
                <div className='delete-options'>
                    <button onClick = {cancelModal}>Cancel</button>
                    <button onClick = {(info) => deleteID(info)}>Delete</button>

                </div>
            </>
            </div>
        </div>
    );
}

export default DeleteModal;