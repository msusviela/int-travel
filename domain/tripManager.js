import City from "./city.js";

class TripManager {
  #cities;

  constructor() {
    this.#cities = [];
  }

  addCity(city) {
    if (!(city instanceof City)) {
      throw new Error("El parámetro debe ser una instancia de City");
    }
    this.#cities.push(city);
    return city;
  }

  getAllCities() {
    return this.#cities.slice();
  }

  findCityByName(name) {
    return this.#cities.find((c) => c.getName() === name) || null;
  }
}

export default TripManager;
