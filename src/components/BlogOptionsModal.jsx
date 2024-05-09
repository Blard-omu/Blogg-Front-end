// BlogOptionsModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BlogOptionsModal = ({ show, handleClose, handlePublish, handleEdit, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button variant="primary" onClick={handlePublish}>
          Publish
        </Button>
        <Button variant="secondary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default BlogOptionsModal;
