import Accommodation from "./accommodation.js";

class City {
  #cityName;
  #country;
  #dateFrom;
  #dateTo;
  #notes = "";

  constructor(cityName, country, dateFrom, dateTo, notes = "") {
    this.setName(cityName);
    this.setCountry(country);
    this.validateDatesOrder(dateFrom, dateTo);
    this.setDateFrom(dateFrom);
    this.setDateTo(dateTo);
    this.setNotes(notes);
  }

  getCountry() {
    return this.#country;
  }

  setCountry(country) {
    if (country === null || country === undefined) {
      throw new Error("Country must be a string");
    }
    if (typeof country !== "string") {
      throw new Error("Country must be a string");
    }
    this.#country = country.trim();
  }

  getName() {
    return this.#cityName;
  }

  getDateFrom() {
    return this.#dateFrom.toISOString().slice(0, 10);
  }

  setDateFrom(date) {
    if (date === null || date === undefined || date === "") {
      throw new Error("dateFrom is required");
    }
    if (!(date instanceof Date)) {
      throw new Error("Date must be a Date object");
    }
    this.#dateFrom = new Date(date.toISOString().slice(0, 10));
    return;
  }

  getDateTo() {
    return this.#dateTo.toISOString().slice(0, 10);
  }

  setDateTo(date) {
    if (date === null || date === undefined || date === "") {
      throw new Error("dateTo is required");
    }
    if (!(date instanceof Date)) {
      throw new Error("Date must be a Date object");
    }
    this.#dateTo = new Date(date.toISOString().slice(0, 10));
    return;
  }

  setName(cityName) {
    if (typeof cityName !== "string" || cityName.trim() === "") {
      throw new Error("El nombre de la ciudad debe ser una cadena no vacía");
    }
    this.#cityName = cityName.trim();
  }

  getNotes() {
    return this.#notes;
  }

  setNotes(text) {
    if (text === null || text === undefined) {
      this.#notes = "";
      return;
    }
    if (typeof text !== "string") {
      throw new Error("Notes must be a string");
    }
    this.#notes = text.trim();
  }

  getDurationDays() {
    if (!this.#dateFrom || !this.#dateTo) return 0;
    const a = new Date(this.#dateFrom);
    const b = new Date(this.#dateTo);
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
    const diff = Math.round((b - a) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  }
  
  validateDatesOrder(dateFrom = this.#dateFrom, dateTo = this.#dateTo) {
    if (!dateFrom || !dateTo) {
      throw new Error("Both dateFrom and dateTo are required");
    }
    const dateFromParsed = new Date(dateFrom);
    const dateToParsed = new Date(dateTo);
    if (
      Number.isNaN(dateFromParsed.getTime()) ||
      Number.isNaN(dateToParsed.getTime())
    ) {
      throw new Error("Invalid date format");
    }
    if (dateToParsed < dateFromParsed)
      throw new Error("dateTo cannot be earlier than dateFrom");
  }
}

export default City;
