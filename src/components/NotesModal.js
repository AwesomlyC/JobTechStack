import React from 'react'

import './../styles/NotesModal.css'
function NotesModal({isOpen, onClose, flipNotesMode, setHasRetrieve, currentNotesInfo}) {

  if (!isOpen){
    return null;
  }
  return (
    <div onClick={onClose}>NotesModal</div>
  )
}

export default NotesModal