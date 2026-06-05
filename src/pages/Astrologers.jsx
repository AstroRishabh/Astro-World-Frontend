import React from "react";
import AstrologerCard from "../components/AstrologerCard";

const Astrologers = () => {
  const astrologers = [
    {
      name: "Pandit Sharma",
      rating: 4.8,
      experience: 15,
      fees: 500,
      contact: "9876543210",
      image: "https://i.imgur.com/1X6K5.jpg"
    },
    {
      name: "Dr. Mehta",
      rating: 4.6,
      experience: 12,
      fees: 700,
      contact: "9876541230",
      image: "https://i.imgur.com/1X6K6.jpg"
    }
  ];

  return (
    <div className="astro-grid">
      {astrologers.map((astro, index) => (
        <AstrologerCard key={index} astrologer={astro} />
      ))}
    </div>
  );
};

export default Astrologers;