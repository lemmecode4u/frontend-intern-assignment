document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");

  const searchBar = document.getElementById("search-bar");
  const searchBtn = document.getElementById("search-btn");
  const categoryFilter = document.getElementById("category-filter");
  const sortBy = document.getElementById("sort-by");

  const modal = document.getElementById("product-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalPrice = document.getElementById("modal-price");
  const closeBtn = document.querySelector(".close-btn");

  let products = [];

  async function fetchProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    products = await res.json();
    applyFilters(); // load initial
  }

  function displayProducts(list) {
    productGrid.innerHTML = "";
    list.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" />
        <h3>${product.title}</h3>
        <p>${product.category}</p>
        <p>$${product.price}</p>
      `;

      card.addEventListener("click", () => openModal(product));
      productGrid.appendChild(card);
    });
  }

  function applyFilters() {
    let result = [...products];

    // SEARCH FIXED
    const searchValue = searchBar.value.toLowerCase().trim();
    if (searchValue !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchValue)
      );
    }

    // CATEGORY
    if (categoryFilter.value) {
      result = result.filter((p) => p.category === categoryFilter.value);
    }

    // SORT
    if (sortBy.value === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else {
      result.sort((a, b) => b.price - a.price);
    }

    displayProducts(result);
  }

  function openModal(product) {
    modalTitle.textContent = product.title;
    modalImage.src = product.image;
    modalDescription.textContent = product.description;
    modalPrice.textContent = product.price;
    modal.style.display = "flex";
  }

  closeBtn.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // EVENTS
  searchBtn.addEventListener("click", applyFilters); // SEARCH BUTTON WORKS NOW
  searchBar.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);
  sortBy.addEventListener("change", applyFilters);

  fetchProducts();
});
