function AstrologerCard({ astrologer, onBook }) {
  return (
    <div className="astro-card">
      <h4>{astrologer.name}</h4>
      <p>⭐ {astrologer.rating}</p>
      <p>Experience: {astrologer.experience} years</p>
      <p>Contact: {astrologer.contact}</p>
      <button onClick={() => onBook(astrologer)}>Book Appointment</button>
    </div>
  );
}

export default AstrologerCard;