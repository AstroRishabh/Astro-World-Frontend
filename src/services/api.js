export const matchKundli = async (
  data
) => {

  const response = await fetch(

    "http://localhost:5000/api/kundli-milan/match",

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