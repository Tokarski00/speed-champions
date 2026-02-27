// ====== USTAWIENIA ======
const PLACEHOLDER_IMG = "images/placeholder.jpg";

// Dwie listy (tu na start daję img jako placeholder).
// Jak wrzucisz zdjęcia do /images, podmieniasz img na np. "images/bugatti-chiron.jpg"
const LISTS = {
  speed: [
    { name: "LaFerrari", img: "images/LaFerrari.jpg" },
    { name: "Ferrari 458 Italia GT2", img: PLACEHOLDER_IMG },
    { name: "McLaren P1", img: PLACEHOLDER_IMG },
    { name: "Porsche 918 Spyder", img: PLACEHOLDER_IMG },
    { name: "Chevrolet Corvette Z06", img: PLACEHOLDER_IMG },
    { name: "Ford Mustang GT", img: PLACEHOLDER_IMG },
    { name: "Audi R18 e-tron quattro", img: PLACEHOLDER_IMG },
    { name: "Audi R8 LMS ultra", img: PLACEHOLDER_IMG },
    { name: "Chevrolet Camaro Drag Race", img: PLACEHOLDER_IMG },
    { name: "Ford F-150 Raptor & Ford Model A Hot Rod", img: PLACEHOLDER_IMG },
    { name: "Porsche 919 Hybrid & Porsche 917K Pit Lane", img: PLACEHOLDER_IMG },
    { name: "Mercedes-AMG GT3", img: PLACEHOLDER_IMG },
    { name: "Bugatti Chiron", img: PLACEHOLDER_IMG },
    { name: "McLaren 720S", img: PLACEHOLDER_IMG },
    { name: "2016 Ford GT & 1966 Ford GT40", img: PLACEHOLDER_IMG },
    { name: "Ferrari FXX K & Development Center", img: PLACEHOLDER_IMG },
    { name: "1968 Ford Mustang Fastback", img: PLACEHOLDER_IMG },
    { name: "Ford Fiesta M-Sport WRC", img: PLACEHOLDER_IMG },
    { name: "Ferrari 488 GT3 “Scuderia Corsa”", img: PLACEHOLDER_IMG },
    { name: "James Bond Aston Martin DB5", img: PLACEHOLDER_IMG },
    { name: "Dominic Toretto’s 1970 Dodge Charger R/T", img: PLACEHOLDER_IMG },
    { name: "2 Fast 2 Furious Nissan Skyline GT-R (R34)", img: PLACEHOLDER_IMG },
    { name: "Ferrari 812 Competizione", img: PLACEHOLDER_IMG },
    { name: "Pagani Utopia", img: PLACEHOLDER_IMG },
    { name: "Porsche 963", img: PLACEHOLDER_IMG },
    { name: "McLaren Solus GT & McLaren F1 LM", img: PLACEHOLDER_IMG },
    { name: "Ford Mustang Dark Horse", img: PLACEHOLDER_IMG },
    { name: "Audi S1 e-tron quattro", img: PLACEHOLDER_IMG },
    { name: "BMW M4 GT3 & BMW M Hybrid V8", img: PLACEHOLDER_IMG },
    { name: "Lamborghini Lambo V12 Vision Gran Turismo", img: PLACEHOLDER_IMG },
    { name: "Mercedes-AMG G 63 & Mercedes-AMG SL 63", img: PLACEHOLDER_IMG },
  ],
  f1: [
    { name: "McLaren Mercedes Pit Stop (F1)", img: PLACEHOLDER_IMG },
    { name: "Ferrari F14 T (F1)", img: PLACEHOLDER_IMG },
    { name: "Scuderia Ferrari SF16-H (F1)", img: PLACEHOLDER_IMG },
    { name: "Mercedes AMG Petronas Formula One Team (F1)", img: PLACEHOLDER_IMG },
    { name: "2023 McLaren Formula 1 Car (F1)", img: PLACEHOLDER_IMG },
    { name: "Ferrari SF-24 (F1)", img: PLACEHOLDER_IMG },
    { name: "Oracle Red Bull Racing RB20 (F1)", img: PLACEHOLDER_IMG },
    { name: "Mercedes-AMG PETRONAS W15 E Performance (F1)", img: PLACEHOLDER_IMG },
    { name: "Aston Martin Aramco AMR24 (F1)", img: PLACEHOLDER_IMG },
    { name: "Visa Cash App VCARB 01 (F1)", img: PLACEHOLDER_IMG },
    { name: "KICK Sauber C44 (F1)", img: PLACEHOLDER_IMG },
    { name: "BWT Alpine A524 (F1)", img: PLACEHOLDER_IMG },
    { name: "Williams Racing FW46 (F1)", img: PLACEHOLDER_IMG },
    { name: "MoneyGram Haas VF-24 (F1)", img: PLACEHOLDER_IMG },
    { name: "McLaren F1 Team MCL38 (F1)", img: PLACEHOLDER_IMG },
  ],
};

// ====== UI ======
const carList = document.getElementById("carList");
const search = document.getElementById("search");
const countOwned = document.getElementById("countOwned");
const countTotal = document.getElementById("countTotal");
const barFill = document.getElementById("barFill");
const btnAll = document.getElementById("btnAll");
const btnNone = document.getElementById("btnNone");
const tabSpeed = document.getElementById("tabSpeed");
const tabF1 = document.getElementById("tabF1");

// ====== STAN ======
let currentListKey = "speed";
let cars = LISTS[currentListKey];
let state = loadState(currentListKey);

function storageKey(listKey) {
  return `speed-champions-owned-${listKey}-v1`;
}
function loadState(listKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(listKey)) || "{}");
  } catch {
    return {};
  }
}
function saveState(listKey, s) {
  localStorage.setItem(storageKey(listKey), JSON.stringify(s));
}

// ====== STATY ======
function updateStats() {
  const owned = cars.reduce((acc, c) => acc + (state[c.name] ? 1 : 0), 0);
  countOwned.textContent = String(owned);
  countTotal.textContent = String(cars.length);
  const pct = cars.length ? Math.round((owned / cars.length) * 100) : 0;
  barFill.style.width = pct + "%";
}

// ====== RENDER ======
function makeCard(car) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = car.img || PLACEHOLDER_IMG;
  img.alt = car.name;
  img.className = "car-img";
  img.onerror = () => (img.src = PLACEHOLDER_IMG);

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = !!state[car.name];
  cb.addEventListener("change", () => {
    state[car.name] = cb.checked;
    saveState(currentListKey, state);
    updateStats();
    card.classList.toggle("owned", cb.checked);
  });

  const label = document.createElement("label");
  label.textContent = car.name;
  label.addEventListener("click", () => {
    cb.checked = !cb.checked;
    cb.dispatchEvent(new Event("change"));
  });

  card.appendChild(img);
  card.appendChild(cb);
  card.appendChild(label);
  card.classList.toggle("owned", cb.checked);
  return card;
}

function render() {
  const q = (search?.value || "").trim().toLowerCase();
  carList.innerHTML = "";
  cars
    .filter(c => c.name.toLowerCase().includes(q))
    .forEach(c => carList.appendChild(makeCard(c)));
  updateStats();
}

// ====== PRZEŁĄCZANIE LIST ======
function setActiveList(listKey) {
  currentListKey = listKey;
  cars = LISTS[currentListKey];
  state = loadState(currentListKey);

  tabSpeed?.classList.toggle("active", listKey === "speed");
  tabF1?.classList.toggle("active", listKey === "f1");

  render();
}

tabSpeed?.addEventListener("click", () => setActiveList("speed"));
tabF1?.addEventListener("click", () => setActiveList("f1"));

// ====== KONTROLKI ======
search?.addEventListener("input", render);

btnAll?.addEventListener("click", () => {
  cars.forEach(c => (state[c.name] = true));
  saveState(currentListKey, state);
  render();
});

btnNone?.addEventListener("click", () => {
  cars.forEach(c => (state[c.name] = false));
  saveState(currentListKey, state);
  render();
});

// ====== START ======
setActiveList("speed");
