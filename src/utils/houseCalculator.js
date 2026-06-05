// src/utils/houseCalculator.js

export function getHouseNumber(lagnaRashi, planetRashi) {
  return ((planetRashi - lagnaRashi + 12) % 12) + 1;
}

export function generateRashiSequence(lagnaRashi) {
  let sequence = [];

  for (let i = 0; i < 12; i++) {
    let rashiNumber = ((lagnaRashi + i - 1) % 12) + 1;
    sequence.push(rashiNumber);
  }

  return sequence;
}

export function mapPlanetsToHouses(lagnaRashi, planets) {
  let houses = {};

  // 12 empty houses
  for (let i = 1; i <= 12; i++) {
    houses[i] = [];
  }

  planets.forEach((planet) => {
    let houseNo = getHouseNumber(lagnaRashi, planet.rashi);
    houses[houseNo].push(planet.name);
  });

  return houses;
}