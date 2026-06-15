import Accommodation from "../accommodation.js";

describe("Accommodation", () => {
  describe("Accommodation name", () => {
    test("should set name from constructor", () => {
      // Arrange
      const name = "Hotel Central";
      const cost = 120;

      // Act
      const accommodation = new Accommodation(name, cost);

      // Assert
      expect(accommodation.getName()).toBe(name);
    });

    test("should set name with setter", () => {
      // Arrange
      const accommodation = new Accommodation("Hotel Central", 120);
      const name = "Hostel Sur";

      // Act
      accommodation.setName(name);

      // Assert
      expect(accommodation.getName()).toBe(name);
    });

    test("should throw error if name is empty", () => {
      // Arrange
      const name = "";
      const cost = 120;

      // Act
      const act = () => new Accommodation(name, cost);

      // Assert
      expect(act).toThrow("Name must be a non-empty string");
    });

    test("should throw error if name is null", () => {
      // Arrange
      const name = null;
      const cost = 120;

      // Act
      const act = () => new Accommodation(name, cost);

      // Assert
      expect(act).toThrow("Name must be a non-empty string");
    });

    test("should throw error if name is undefined", () => {
      // Arrange
      const name = undefined;
      const cost = 120;

      // Act
      const act = () => new Accommodation(name, cost);

      // Assert
      expect(act).toThrow("Name must be a non-empty string");
    });

    test("should throw error if name is not a string", () => {
      // Arrange
      const accommodation = new Accommodation("Hotel Central", 120);
      const name = 123;

      // Act
      const act = () => accommodation.setName(name);

      // Assert
      expect(act).toThrow("Name must be a non-empty string");
    });
  });

  describe("Accommodation cost", () => {
    test("should set cost from constructor", () => {
      // Arrange
      const name = "Hotel Central";
      const cost = 120;

      // Act
      const accommodation = new Accommodation(name, cost);

      // Assert
      expect(accommodation.getCost()).toBe(cost);
    });

    test("should set cost with setter", () => {
      // Arrange
      const accommodation = new Accommodation("Hotel Central", 120);
      const cost = 0;

      // Act
      accommodation.setCost(cost);

      // Assert
      expect(accommodation.getCost()).toBe(cost);
    });

    test("should throw error if constructor cost is not a number", () => {
      // Arrange
      const name = "Hotel Central";
      const cost = "120";

      // Act
      const act = () => new Accommodation(name, cost);

      // Assert
      expect(act).toThrow("Cost must be a number");
    });

    test("should throw error if setter cost is null", () => {
      // Arrange
      const accommodation = new Accommodation("Hotel Central", 120);
      const cost = null;

      // Act
      const act = () => accommodation.setCost(cost);

      // Assert
      expect(act).toThrow("Cost must be a number");
    });

    test("should throw error if setter cost is undefined", () => {
      // Arrange
      const accommodation = new Accommodation("Hotel Central", 120);
      const cost = undefined;

      // Act
      const act = () => accommodation.setCost(cost);

      // Assert
      expect(act).toThrow("Cost must be a number");
    });

    test("should throw error if constructor cost is negative", () => {
      // Arrange
      const name = "Hotel Central";
      const cost = -1;

      // Act
      const act = () => new Accommodation(name, cost);

      // Assert
      expect(act).toThrow("Cost must be a number greater than or equal to 0");
    });

    test("should throw error if setter cost is negative", () => {
      // Arrange
      const accommodation = new Accommodation("Hotel Central", 120);
      const cost = -25;

      // Act
      const act = () => accommodation.setCost(cost);

      // Assert
      expect(act).toThrow("Cost must be a number greater than or equal to 0");
    });
  });
});
