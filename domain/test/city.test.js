import Accommodation from "../accommodation.js";
import City from "../city.js";

describe("City", () => {
  let city;
  beforeEach(() => {
    city = new City(
      "TestCity",
      "TestCountry",
      new Date("2023-05-01"),
      new Date("2023-05-04"),
      "Notas",
    );
  });

  describe("City name", () => {
    test("should get the correct name", () => {
      expect(city.getName()).toBe("TestCity");
    });

    test("should throw error if city name is empty", () => {
      expect(
        () =>
          new City(
            "",
            "TestCountry",
            new Date("2023-05-01"),
            new Date("2023-05-04"),
          ),
      ).toThrow();
    });

    test("should throw error if city name is not a string", () => {
      expect(
        () =>
          new City(
            123,
            "TestCountry",
            new Date("2023-05-01"),
            new Date("2023-05-04"),
          ),
      ).toThrow();
    });

    test("should throw error if city name is null or undefined", () => {
      expect(
        () =>
          new City(
            null,
            "TestCountry",
            new Date("2023-05-01"),
            new Date("2023-05-04"),
          ),
      ).toThrow();
      expect(
        () =>
          new City(
            undefined,
            "TestCountry",
            new Date("2023-05-01"),
            new Date("2023-05-04"),
          ),
      ).toThrow();
    });
  });

  describe("City country", () => {
    test("should set country correctly", () => {
      city.setCountry("Spain");
      expect(city.getCountry()).toBe("Spain");
    });

    test("should throw error if country is not a string", () => {
      expect(() => city.setCountry(123)).toThrow("Country must be a string");
    });

    test("should throw error if country is null or undefined", () => {
      expect(() => city.setCountry(null)).toThrow("Country must be a string");
      expect(() => city.setCountry(undefined)).toThrow(
        "Country must be a string",
      );
    });
  });

  describe("City dates", () => {
    test("should get correct dateFrom", () => {
      expect(city.getDateFrom()).toBe("2023-05-01");
    });

    test("should get correct dateTo", () => {
      expect(city.getDateTo()).toBe("2023-05-04");
    });

    test("should validate current city date order", () => {
      // Arrange
      const act = () => city.validateDatesOrder();

      // Act

      // Assert
      expect(act).not.toThrow();
    });

    test("should throw error if dateFrom is invalid", () => {
      expect(() => city.setDateFrom("")).toThrow("dateFrom is required");
      expect(() => city.setDateFrom(null)).toThrow("dateFrom is required");
      expect(() => city.setDateFrom(123)).toThrow("Date must be a Date object");
    });

    test("should throw error if dateTo is invalid", () => {
      expect(() => city.setDateTo("")).toThrow("dateTo is required");
      expect(() => city.setDateTo(null)).toThrow("dateTo is required");
      expect(() => city.setDateTo(123)).toThrow("Date must be a Date object");
    });

    test("should throw error if dateFrom is missing in date order validation", () => {
      // Arrange
      const dateFrom = null;
      const dateTo = new Date("2023-05-04");

      // Act
      const act = () => city.validateDatesOrder(dateFrom, dateTo);

      // Assert
      expect(act).toThrow("Both dateFrom and dateTo are required");
    });

    test("should throw error if dateFrom format is invalid", () => {
      // Arrange
      const dateFrom = "invalid-date";
      const dateTo = new Date("2023-05-04");

      // Act
      const act = () => city.validateDatesOrder(dateFrom, dateTo);

      // Assert
      expect(act).toThrow("Invalid date format");
    });

    test("should throw error if dateTo is earlier than dateFrom", () => {
      // Arrange
      const dateFrom = new Date("2023-05-04");
      const dateTo = new Date("2023-05-01");

      // Act
      const act = () => city.validateDatesOrder(dateFrom, dateTo);

      // Assert
      expect(act).toThrow("dateTo cannot be earlier than dateFrom");
    });
  });

  describe("City notes", () => {
    test("should set notes correctly", () => {
      city.setNotes("Nuevas notas");
      expect(city.getNotes()).toBe("Nuevas notas");
    });

    test("should throw error if notes is not a string", () => {
      expect(() => city.setNotes(123)).toThrow();
    });

    test("should allow empty notes", () => {
      city.setNotes("");
      expect(city.getNotes()).toBe("");
    });

    test("should set empty string if notes is null or undefined", () => {
      city.setNotes(null);
      expect(city.getNotes()).toBe("");
      city.setNotes(undefined);
      expect(city.getNotes()).toBe("");
    });

    test("should get notes correctly", () => {
      expect(city.getNotes()).toBe("Notas");
    });
  });

  describe("Duration in days", () => {
    test("should calculate duration correctly", () => {
      expect(city.getDurationDays()).toBe(4);
    });

    test("should calculate duration as 1 day if dateFrom equals dateTo", () => {
      const singleDayCity = new City(
        "SingleDayCity",
        "TestCountry",
        new Date("2023-05-01"),
        new Date("2023-05-01"),
      );
      expect(singleDayCity.getDurationDays()).toBe(1);
    });

    test("should return 0 if internal date is invalid", () => {
      // Arrange
      const invalidDate = new Date("2023-05-01");
      invalidDate.toISOString = () => "invalid-date";
      city.setDateFrom(invalidDate);

      // Act
      const result = city.getDurationDays();

      // Assert
      expect(result).toBe(0);
    });

    test("should return 0 if dateFrom is later than dateTo", () => {
      // Arrange
      city.setDateFrom(new Date("2023-05-10"));

      // Act
      const result = city.getDurationDays();

      // Assert
      expect(result).toBe(0);
    });
  });

  describe("Accommodation", () => {
    test("should add accommodation correctly", () => {
      const accommodation = new Accommodation("Hotel Central", 120);
      city.addAccommodation(accommodation);
      expect(city.getAccommodation()).toBe(accommodation);
      expect(city.getAccommodation().getName()).toBe("Hotel Central");
    });

    test("should throw error if accommodation is not valid", () => {
      // Acá setteamos un objeto que no es instancia de accomodation para ver si falla
      expect(() => city.addAccommodation({ name: "Hotel", cost: 120 })).toThrow(
        "Accommodation must be an instance of Accommodation",
      );
      // Se puede probar tambien que pasa si le paso null
      expect(() => city.setAccommodation(null)).toThrow(
        "Accommodation must be an instance of Accommodation",
      );
    });
  });
});
