import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Modal = ({ isOpen, onClose, children }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Discussion Modal"
  >
    {children}
  </ReactModal>
);

export default Modal;