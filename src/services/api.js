export const matchKundli = async (
  data
) => {

  const response = await fetch(

    "https://astro-world-1.onrender.com/api/kundli-milan/match",

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)
    }
  );

  return await response.json();
};
