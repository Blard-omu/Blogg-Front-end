import React from 'react';
import '../css/Modal.css' // Import your CSS file for styling

const Modal = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="close-button" onClick={handleClose}>X</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
