import { useState } from "react";

function GenerateKundli() {

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    place: "",
    latitude: "",
    longitude: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("https://astro-world-1.onrender.com/api/kundli/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    console.log("Kundli:", data);
  };

  return (
    <form onSubmit={handleGenerate}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} />
      <input name="time" type="time" onChange={handleChange} />
      <input name="place" placeholder="Place" onChange={handleChange} />
      <input name="latitude" placeholder="Latitude" onChange={handleChange} />
      <input name="longitude" placeholder="Longitude" onChange={handleChange} />
      
      <button type="submit">Generate Kundli</button>
    </form>
  );
}

export default GenerateKundli;
