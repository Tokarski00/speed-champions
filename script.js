const cars = [
  "Acura NSX GT3",
  "Aston Martin Valkyrie AMR Pro",
  "Aston Martin Vantage GT3",
  "Audi S1 E-tron Quattro",
  "Audi R8 LMS GT3",
  "Audi R18 e-tron quattro",
  "BMW M4 GT3",
  "BMW M Hybrid V8",
  "Bugatti Chiron",
  "Bugatti Bolide",
  "Chevrolet Camaro ZL1",
  "Chevrolet Corvette C8.R",
  "Dodge Challenger SRT Demon",
  "Dodge Charger R/T 1970",
  "Ferrari 488 GT3",
  "Ferrari 512 M",
  "Ferrari F8 Tributo",
  "Ferrari 812 Competizione",
  "Ferrari 296 GTB",
  "Ferrari SF90 Stradale",
  "Ferrari F40 Competizione",
  "Ford GT",
  "Ford Mustang Fastback 1968",
  "Ford Mustang Shelby GT500",
  "Ford Bronco R",
  "Hyundai IONIQ 5 N",
  "Jaguar I-PACE eTROPHY",
  "Koenigsegg Jesko",
  "Lamborghini Huracán Super Trofeo EVO",
  "Lamborghini Countach",
  "Lamborghini Sián FKP 37",
  "Lamborghini Lambo V12 Vision GT",
  "Lotus Evija",
  "McLaren Senna",
  "McLaren Elva",
  "McLaren Solus GT",
  "Mercedes-AMG GT3",
  "Mercedes-AMG F1 W12 E Performance",
  "Mercedes-AMG Project One",
  "Nissan GT-R NISMO",
  "Nissan Skyline GT-R (R34)",
  "Pagani Utopia",
  "Peugeot 9X8",
  "Porsche 911 RSR",
  "Porsche 963",
  "Toyota GR Supra",
  "Toyota GR86",
  "Volkswagen Golf GTI",
  "Mitsubishi Lancer Evolution IX"
];

// Klucz w localStorage (żeby nie mieszać z innymi stronami)
const STORAGE_KEY = "speed-champions-owned-v1";

const carList = document.getElementById("carList");
const search = document.getElementById("search");
const countOwned = document.getElementById("countOwned");
const countTotal = document.getElementById("countTotal");
const barFill = document.getElementById("barFill");
const btnAll = document.getElementById("btnAll");
const btnNone = document.getElementById("btnNone");

countTotal.textContent = cars.length.toString();

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

function updateStats() {
  const owned = Object.values(state).filter(Boolean).length;
  countOwned.textContent = owned.toString();
  const pct = cars.length ? Math.round((owned / cars.length) * 100) : 0;
  barFill.style.width = `${pct}%`;
}

function render(filterText = "") {
  carList.innerHTML = "";
  const q = filterText.trim().toLowerCase();

  cars
    .filter(name => name.toLowerCase().includes(q))
    .forEach(name => {
      const card = document.createElement("div");
      card.className = "card";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!state[name];
      cb.addEventListener("change", () => {
        state[name] = cb.checked;
        saveState(state);
        updateStats();
      });

      const label = document.createElement("label");
      label.textContent = name;

      card.appendChild(cb);
      card.appendChild(label);
      carList.appendChild(card);
    });

  updateStats();
}

search.addEventListener("input", () => render(search.value));

btnAll.addEventListener("click", () => {
  cars.forEach(c => (state[c] = true));
  saveState(state);
  render(search.value);
});

btnNone.addEventListener("click", () => {
  cars.forEach(c => (state[c] = false));
  saveState(state);
  render(search.value);
});

render();
