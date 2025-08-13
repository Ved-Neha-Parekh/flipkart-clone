const rows = document.getElementById("productRows");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const applyPrice = document.getElementById("applyPrice");
const assured = document.getElementById("assured");
const fastDelivery = document.getElementById("fastDelivery");
const sortBy = document.getElementById("sortBy");
const countText = document.getElementById("countText");
const searchBox =
  document.getElementById("searchInput") ||
  document.getElementById("searchInputMobile");
// All product cards
const items = Array.from(document.querySelectorAll(".product"));

function passes(el) {
  // Assured
  if (assured.checked && el.dataset.assured !== "1") return false;
  // Fast Delivery
  if (fastDelivery.checked && el.dataset.delivery !== "1") return false;

  return true;
}

function applyFilters() {
  let visibleProducts = 0;
  items.forEach((item) => {
    const OK = passes(item);
    item.classList.toggle("d-none", !OK);
    if (OK) visibleProducts++;
  });
  if (countText) countText.textContent = `Showing ${visibleProducts}`;
}

//? Events
assured.addEventListener("change", applyFilters);
fastDelivery.addEventListener("change", applyFilters);
applyFilters();

const sorted = items.toSorted();
console.log(sorted);
