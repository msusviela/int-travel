import City from "../city.js";
import TripManager from "../tripManager.js";

describe("TripManager", () => {
  let manager;
  beforeEach(() => {
    manager = new TripManager();
  });

  test("add a city", () => {
    const c = new City(
      "Madrid",
      "Spain",
      new Date("2023-04-01"),
      new Date("2023-04-02"),
    );
    manager.addCity(c);
    expect(manager.getAllCities().length).toBe(1);
    expect(manager.getAllCities()[0].getName()).toBe("Madrid");
  });

  test("find city by name", () => {
    manager.addCity(
      new City(
        "Lisbon",
        "Portugal",
        new Date("2023-06-01"),
        new Date("2023-06-03"),
      ),
    );
    expect(manager.findCityByName("Lisbon").getName()).toBe("Lisbon");
    expect(manager.findCityByName("Unknown")).toBeNull();
  });

  test("should throw error if added value is not a city", () => {
    // Arrange
    const invalidCity = { name: "Madrid" };

    // Act
    const act = () => manager.addCity(invalidCity);

    // Assert
    expect(act).toThrow("El parámetro debe ser una instancia de City");
  });
});
