const rows = document.getElementById("productRows");

const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const applyPrice = document.getElementById("applyPrice");
const assured = document.getElementById("assured");
const fastDelivery = document.getElementById("fastDelivery");
const sortBy = document.getElementById("sortBy");
const countText = document.getElementById("countText");
const assuredCheck = document.getElementById("assured");

assuredCheck.addEventListener("change", () => {
  const allProducts = document.querySelectorAll(".product");
  if (assuredCheck.checked) {
    allProducts.forEach((product) => {
      product.style.display =
        product.getAttribute("data-assured") === "1" ? "" : "none";
    });
  } else {
    allProducts.forEach((product) => {
      product.style.display = "";
    });
  }
});
