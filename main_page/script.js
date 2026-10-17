const destinations = [
  {
    name: "Bali, Indonesia",
    category: "beach",
    days: 7,
    price: "29,999",
    rating: 4.9,
    image: "photo-1537996194471-e657df975ab4"
  },
  {
    name: "Swiss Alps, Switzerland",
    category: "mountain",
    days: 6,
    price: "1,49,999",
    rating: 4.9,
    image: "photo-1531366936337-7c912a4589a7"
  },
  {
    name: "Santorini, Greece",
    category: "beach",
    days: 5,
    price: "1,29,999",
    rating: 4.8,
    image: "photo-1613395877344-13d4a8e0d49e"
  },
  {
    name: "Kyoto, Japan",
    category: "culture",
    days: 8,
    price: "1,00,000",
    rating: 4.9,
    image: "photo-1493976040374-85c8e12f0c0e"
  },
  {
    name: "Amalfi Coast, Italy",
    category: "beach",
    days: 6,
    price: "90,000",
    rating: 4.8,
    image: "photo-1533105079780-92b9be482077"
  },
  {
    name: "Manali, India",
    category: "mountain",
    days: 5,
    price: "9,999",
    rating: 4.7,
    image: "photo-1506905925346-21bda4d32df4"
  }
];

let activeCategory = "all";
let searchTerm = "";
const saved = new Set();

const cards = document.getElementById("destinationCards");
const empty = document.getElementById("empty");

function renderDestinations() {
  const filtered = destinations.filter(d =>
    (activeCategory === "all" || d.category === activeCategory) &&
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  cards.innerHTML = filtered.map(d => `
    <article class="card">
      <div class="card-image">
        <img src="https://images.unsplash.com/${d.image}?w=800&q=80"
             alt="${d.name}" loading="lazy">
        <button class="favorite ${saved.has(d.name) ? 'saved' : ''}"
          data-favorite="${d.name}" aria-label="Save ${d.name}">
          ${saved.has(d.name) ? '♥' : '♡'}
        </button>
      </div>
      <div class="card-content">
        <div style="color:#c69b58;font-size:13px">★ ${d.rating} · ${d.days} days</div>
        <h3>${d.name}</h3>
        <p>${d.category.charAt(0).toUpperCase() + d.category.slice(1)} escape · Curated experience</p>
        <div class="card-bottom">
          <div class="price">₹${d.price} <small>/ person*</small></div>
          <button class="book-btn" data-book="${d.name}">Explore →</button>
        </div>
      </div>
    </article>
  `).join("");

  empty.style.display = filtered.length ? "none" : "block";
}

document.getElementById("filters").addEventListener("click", e => {
  const btn = e.target.closest("[data-category]");
  if (!btn) return;
  activeCategory = btn.dataset.category;
  document.getElementById("categorySelect").value = activeCategory;
  document.querySelectorAll(".filter").forEach(b =>
    b.classList.toggle("active", b === btn)
  );
  renderDestinations();
});

function searchTrips() {
  searchTerm = document.getElementById("searchInput").value.trim();
  activeCategory = document.getElementById("categorySelect").value;
  document.querySelectorAll(".filter").forEach(b =>
    b.classList.toggle("active", b.dataset.category === activeCategory)
  );
  renderDestinations();
  document.getElementById("destinations").scrollIntoView({behavior:"smooth"});
}

document.getElementById("searchButton").addEventListener("click", searchTrips);
document.getElementById("searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter") searchTrips();
});

cards.addEventListener("click", e => {
  const favorite = e.target.closest("[data-favorite]");
  const book = e.target.closest("[data-book]");
  if (favorite) {
    const name = favorite.dataset.favorite;
    saved.has(name) ? saved.delete(name) : saved.add(name);
    renderDestinations();
  }
  if (book) openBooking(book.dataset.book);
});

function openBooking(trip) {
  document.getElementById("selectedTrip").textContent = "Destination: " + trip;
  document.getElementById("formMessage").textContent = "";
  document.getElementById("bookingModal").classList.add("open");
}
function closeBooking() {
  document.getElementById("bookingModal").classList.remove("open");
}
document.getElementById("bookingModal").addEventListener("click", e => {
  if (e.target.id === "bookingModal") closeBooking();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeBooking();
});

document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formMessage").textContent =
    "Demo inquiry completed! Connect a backend to send real bookings.";
  e.target.reset();
});

const toggle = document.getElementById("menuToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", links.classList.contains("open"));
});
links.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

renderDestinations();