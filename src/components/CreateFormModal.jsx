import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import thumbup from '../assets/images/0b8b6004c06b44fa4da516a65e361b4a.png'
export function FormModal(props) {
  return (
    <Modal
      {...props}
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="modal-content-create">
            <img src={thumbup} />
          <p style={{ fontWeight: 600 }}>Your work has been saved to drafts</p>
          <div className="d-flex gap-5">
          <button className="modal-button" onClick={props.onHide}>Continue</button>
          <button className="bg-light" style={{backgroundColor: 'white'}} onClick={props.handleProfile}>Back to Drafts</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
