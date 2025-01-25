import React, {useRef, useState, useEffect} from 'react'
import './../styles/NotesModal.css'
import axios from 'axios';
function NotesModal({isOpen, onClose, flipNotesMode, setHasRetrieve, currentNotesInfo}) {

  const modalRef = useRef(null);

  const [userNotes, setUserNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUserNotes(currentNotesInfo.notes);
    }
  }, [isOpen])
  if (!isOpen){
    return null;
  }

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
    }
}

  const cancelNotesModal = () => {
    setUserNotes('');
    onClose();
  }

  const submitNotes = async () => {


    const data = {
      documentID: currentNotesInfo.documentID,
      userNotes,
    }
    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/update-notes`,
      data
    ).then(response => {
      
    }).catch(error => {
      console.error("Error occurred during notes submit:", error);
    });
    setHasRetrieve(false);
    cancelNotesModal();
  }
  return (
     <div
                className='modal-popup'
                onClick={handleClickOutside}
            >
                <div className='notes-modal' ref = {modalRef}>
                    <>
                        <span className='notes-title'>Add notes for: <em>{currentNotesInfo.companyName}</em></span>
                        <div className='notes-description'>
                            <textarea
                                className='text-input'
                                type="text"
                                placeholder="Type your notes here..."
                                value={userNotes}
                                onChange={(e) => setUserNotes(e.target.value)}
                            />
                        </div>
                        <div className='button-options' id = 'update-modal-options'>
                            <button className='cancel' onClick={cancelNotesModal}>Cancel</button>
                            <button className='update' onClick={submitNotes}>Submit</button>
                        </div>
                    </>
                </div>
        </div>

  )
}

export default NotesModal