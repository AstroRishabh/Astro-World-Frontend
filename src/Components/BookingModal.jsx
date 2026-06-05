export default function BookingModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Confirm Booking</h3>
        <input placeholder="Your Name" />
        <input type="date" />
        <button>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}