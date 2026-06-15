class Accommodation {
  #cost;
  #name;

  constructor(name, cost) {
    this.setName(name);
    this.setCost(cost);
  }

  getName() {
    return this.#name;
  }

  setName(name) {
    if (typeof name !== "string" || name === "") {
      throw new Error("Name must be a non-empty string");
    }
    this.#name = name;
  }

  getCost() {
    return this.#cost;
  }

  setCost(cost) {
    if (typeof cost !== "number") {
      throw new Error("Cost must be a number");
    }
    if (cost < 0) {
      throw new Error("Cost must be a number greater than or equal to 0");
    }
    this.#cost = cost;
  }
}

export default Accommodation;
