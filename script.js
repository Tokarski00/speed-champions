// ====== USTAWIENIA ======
const STORAGE_KEY = "speed-champions-owned-v2";
const PLACEHOLDER_IMG = "images/placeholder.jpg";

// Jeśli nie masz jeszcze wszystkich zdjęć, zostaw placeholdery.
// Docelowo podmienisz img na prawdziwe pliki w folderze /images.
const cars = [
  { name: "Acura NSX GT3", img: "images/acura-nsx-gt3.jpg" },
  { name: "Aston Martin Valkyrie AMR Pro", img: "images/aston-martin-valkyrie-amr-pro.jpg" },
  { name: "Aston Martin Vantage GT3", img: "images/aston-martin-vantage-gt3.jpg" },
  { name: "Audi S1 E-tron Quattro", img: "images/audi-s1-e-tron-quattro.jpg" },
  { name: "Audi R8 LMS GT3", img: "images/audi-r8-lms-gt3.jpg" },
  { name: "Audi R18 e-tron quattro", img: "images/audi-r18-e-tron-quattro.jpg" },
  { name: "BMW M4 GT3", img: "images/bmw-m4-gt3.jpg" },
  { name: "BMW M Hybrid V8", img: "images/bmw-m-hybrid-v8.jpg" },
  { name: "Bugatti Chiron", img: "images/bugatti-chiron.jpg" },
  { name: "Bugatti Bolide", img: "images/bugatti-bolide.jpg" },
  { name: "Chevrolet Camaro ZL1", img: "images/chevrolet-camaro-zl1.jpg" },
  { name: "Chevrolet Corvette C8.R", img: "images/chevrolet-corvette-c8r.jpg" },
  { name: "Dodge Challenger SRT Demon", img: "images/dodge-challenger-srt-demon.jpg" },
  { name: "Dodge Charger R/T 1970", img: "images/dodge-charger-rt-1970.jpg" },
  { name: "Ferrari 488 GT3", img: "images/ferrari-488-gt3.jpg" },
  { name: "Ferrari 512 M", img: "images/ferrari-512-m.jpg" },
  { name: "Ferrari F8 Tributo", img: "images/ferrari-f8-tributo.jpg" },
  { name: "Ferrari 812 Competizione", img: "images/ferrari-812-competizione.jpg" },
  { name: "Ferrari 296 GTB", img: "images/ferrari-296-gtb.jpg" },
  { name: "Ferrari SF90 Stradale", img: "images/ferrari-sf90-stradale.jpg" },
  { name: "Ferrari F40 Competizione", img: "images/ferrari-f40-competizione.jpg" },
  { name: "Ford GT", img: "images/ford-gt.jpg" },
  { name: "Ford Mustang Fastback 1968", img: "images/ford-mustang-fastback-1968.jpg" },
  { name: "Ford Mustang Shelby GT500", img: "images/ford-mustang-shelby-gt500.jpg" },
  { name: "Ford Bronco R", img: "images/ford-bronco-r.jpg" },
  { name: "Hyundai IONIQ 5 N", img: "images/hyundai-ioniq-5-n.jpg" },
  { name: "Jaguar I-PACE eTROPHY", img: "images/jaguar-i-pace-etrophy.jpg" },
  { name: "Koenigsegg Jesko", img: "images/koenigsegg-jesko.jpg" },
  { name: "Lamborghini Huracán Super Trofeo EVO", img: "images/lamborghini-huracan-super-trofeo-evo.jpg" },
  { name: "Lamborghini Countach", img: "images/lamborghini-countach.jpg" },
  { name: "Lamborghini Sián FKP 37", img: "images/lamborghini-sian-fkp-37.jpg" },
  { name: "Lamborghini Lambo V12 Vision GT", img: "images/lamborghini-v12-vision-gt.jpg" },
  { name: "Lotus Evija", img: "images/lotus-evija.jpg" },
  { name: "McLaren Senna", img: "images/mclaren-senna.jpg" },
  { name: "McLaren Elva", img: "images/mclaren-elva.jpg" },
  { name: "McLaren Solus GT", img: "images/mclaren-solus-gt.jpg" },
  { name: "Mercedes-AMG GT3", img: "images/mercedes-amg-gt3.jpg" },
  { name: "Mercedes-AMG F1 W12 E Performance", img: "images/mercedes-amg-f1-w12.jpg" },
  { name: "Mercedes-AMG Project One", img: "images/mercedes-amg-project-one.jpg" },
  { name: "Mitsubishi Lancer Evolution IX", img: "images/mitsubishi-lancer-evo-ix.jpg" },
  { name: "Nissan GT-R NISMO", img: "images/nissan-gtr-nismo.jpg" },
  { name: "Nissan Skyline GT-R (R34)", img: "images/nissan-skyline-r34.jpg" },
  { name: "Pagani Utopia", img: "images/pagani-utopia.jpg" },
  { name: "Peugeot 9X8", img: "images/peugeot-9x8.jpg" },
  { name: "Porsche 911 RSR", img: "images/porsche-911-rsr.jpg" },
  { name: "Porsche 963", img: "images/porsche-963.jpg" },
  { name: "Toyota GR Supra", img: "images/toyota-gr-supra.jpg" },
  { name: "Toyota GR86", img: "images/toyota-gr86.jpg" },
  { name: "Volkswagen Golf GTI", img: "images/volkswagen-golf-gti.jpg" }
];

// ====== ELEMENTY UI ======
const carList = document.getElementById("carList");
const search = document.getElementById("search");
const countOwned = document.getElementById("countOwned");
const countTotal = document.getElementById("countTotal");
const barFill = document.getElementById("barFill");
const btnAll = document.getElementById("btnAll");
const btnNone = document.getElementById("btnNone");

// ====== STORAGE ======
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

countTotal.textContent = String(cars.length);

// ====== STATYSTYKI ======
function updateStats() {
  const ownedCount = cars.reduce((acc, car) => acc + (state[car.name] ? 1 : 0), 0);
  countOwned.textContent = String(ownedCount);

  const pct = cars.length ? Math.round((ownedCount / cars.length) * 100) : 0;
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

  // jeśli plik nie istnieje, pokaż placeholder
  img.onerror = () => {
    if (img.src.includes(PLACEHOLDER_IMG)) return;
    img.src = PLACEHOLDER_IMG;
  };

  const right = document.createElement("div");
  right.style.display = "flex";
  right.style.flexDirection = "column";
  right.style.gap = "6px";
  right.style.width = "100%";

  const topRow = document.createElement("div");
  topRow.style.display = "flex";
  topRow.style.alignItems = "center";
  topRow.style.gap = "10px";

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = !!state[car.name];

  cb.addEventListener("change", () => {
    state[car.name] = cb.checked;
    saveState(state);
    updateStats();
    card.classList.toggle("owned", cb.checked);
  });

  const label = document.createElement("label");
  label.textContent = car.name;
  label.style.cursor = "pointer";

  // kliknięcie na nazwę przełącza checkbox
  label.addEventListener("click", () => {
    cb.checked = !cb.checked;
    cb.dispatchEvent(new Event("change"));
  });

  topRow.appendChild(cb);
  topRow.appendChild(label);

  right.appendChild(topRow);
  card.appendChild(img);
  card.appendChild(right);

  card.classList.toggle("owned", cb.checked);

  return card;
}

function render(filterText = "") {
  const q = filterText.trim().toLowerCase();
  carList.innerHTML = "";

  const filtered = cars.filter(car => car.name.toLowerCase().includes(q));

  filtered.forEach(car => {
    carList.appendChild(makeCard(car));
  });

  updateStats();
}

// ====== KONTROLKI ======
search?.addEventListener("input", () => render(search.value));

btnAll?.addEventListener("click", () => {
  cars.forEach(car => (state[car.name] = true));
  saveState(state);
  render(search.value);
});

btnNone?.addEventListener("click", () => {
  cars.forEach(car => (state[car.name] = false));
  saveState(state);
  render(search.value);
});

// ====== START ======
render();
