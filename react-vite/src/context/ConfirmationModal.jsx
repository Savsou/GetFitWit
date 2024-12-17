import '../context/ConfirmationModal.css'

function ConfirmationModal({ onClose, message }) {
  const handleCloseClick = (e) => {
    if (e.target.className === "confirmation-modal-overlay") {
      onClose();
    }
  }

  return (
    <div className="confirmation-modal-overlay" onClick={handleCloseClick}>
      <div className="confirmation-modal-content">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ConfirmationModal;
