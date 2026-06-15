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

    // TODO: validar orden de fechas
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
  });
});
