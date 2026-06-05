// Function to reduce any number to a single digit (1-9)
export const getSingleDigit = (num) => {
  if (num === 0) return 0;
  return ((num - 1) % 9) + 1;
};

// Calculate Psychic Number (Driver) from Day
export const calculatePsychic = (dateString) => {
  const day = new Date(dateString).getDate();
  return getSingleDigit(day);
};

// Calculate Destiny Number (Conductor) from Full DOB
export const calculateDestiny = (dateString) => {
  const date = new Date(dateString);
  const sum = date.getDate() + (date.getMonth() + 1) + date.getFullYear();
  
  // Reduce total sum to single digit
  let finalSum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  return getSingleDigit(finalSum);
};