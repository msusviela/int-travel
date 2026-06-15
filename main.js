import TripManager from "./domain/tripManager.js";
import City from "./domain/city.js";
import Accommodation from "./domain/accommodation.js";

const manager = new TripManager();
const form = document.getElementById("city-form");
const citiesTbody = document.getElementById("cities-tbody");

form.addEventListener("submit", (e) => {
  handleCityFormSubmit(e);
});

function renderCities() {
  citiesTbody.innerHTML = "";
  manager.getAllCities().forEach((city, i) => {
    const accommodation = city.getAccommodation();
    renderCityRow(
      i,
      city.getName(),
      city.getCountry(),
      city.getDurationDays(),
      formatDateIso(city.getDateFrom()),
      formatDateIso(city.getDateTo()),
      accommodation ? accommodation.getName() : "",
      accommodation ? `$${accommodation.getCost()}` : "",
      String(city.getNotes() || ""),
    );
  });
}

function renderCityRow(
  index,
  name,
  country,
  duration,
  dateFrom,
  dateTo,
  accommodationName,
  accommodationCost,
  notesText,
) {
  const tr = document.createElement("tr");
  tr.dataset.index = String(index);
  tr.innerHTML = `<td>
  <strong>${name}</strong>
  </td>
  <td>${country}</td>
  <td>${duration ? duration + " días" : "—"}</td>
  <td>${dateFrom}</td>
  <td>${dateTo}</td>
  <td>${accommodationName}</td>
  <td>${accommodationCost}</td>
  <td>${notesText}</td>`;
  citiesTbody.appendChild(tr);
}

function handleCityFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("city-name").value;
  const country = document.getElementById("city-country").value;
  const dateFrom = document.getElementById("city-date-from").value;
  const dateTo = document.getElementById("city-date-to").value;
  const notes = document.getElementById("city-notes").value;
  const accommodationName = document.getElementById("accommodation-name").value;
  const accommodationCost =
    document.getElementById("accommodation-cost").valueAsNumber;

  const city = new City(
    name,
    country,
    new Date(dateFrom),
    new Date(dateTo),
    notes,
  );

  city.addAccommodation(
    new Accommodation(accommodationName, accommodationCost),
  );

  if (!saveCity(city)) return;
  showToast("Éxito", "Ciudad agregada", "success");
  renderCityRow(
    manager.getAllCities().length - 1,
    name,
    country,
    city.getDurationDays(),
    formatDateIso(city.getDateFrom()),
    formatDateIso(city.getDateTo()),
    accommodationName,
    `$${accommodationCost}`,
    notes,
  );
  form.reset();
  setDefaultDates();
}

function getTodayIso() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function setDefaultDates() {
  const today = getTodayIso();
  const from = document.getElementById("city-date-from");
  const to = document.getElementById("city-date-to");
  if (from && !from.value) from.value = today;
  if (to && !to.value) to.value = today;
}

function saveCity(city) {
  try {
    manager.addCity(city);
    return true;
  } catch (e) {
    showToast("Error", e.message || "No se pudo agregar la ciudad", "danger");
    return false;
  }
}

function formatDateIso(d) {
  if (!d) return "";
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return String(d);
    return dt.toLocaleDateString("es-ES");
  } catch {
    return String(d);
  }
}

function showToast(title, message, variant = "primary") {
  const container = document.getElementById("alert-container");
  if (!container) return;

  const variantClass = `alert-${variant}`;
  const wrapper = document.createElement("div");
  wrapper.className = `alert ${variantClass} alert-dismissible fade show`;
  wrapper.setAttribute("role", "alert");
  wrapper.innerHTML = `<strong>${title || "Aviso"}</strong> ${String(message || "")} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
  container.appendChild(wrapper);

  setTimeout(() => {
    try {
      if (window.bootstrap && window.bootstrap.Alert) {
        const inst = window.bootstrap.Alert.getOrCreateInstance(wrapper);
        if (inst && typeof inst.close === "function") {
          inst.close();
          return;
        }
      }
    } catch {
      // ignore and remove
    }
    if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
  }, 3000);
}

setDefaultDates();
renderCities();
