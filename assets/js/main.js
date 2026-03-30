document.addEventListener("DOMContentLoaded", function () {
  const user = "hi";
  const domain = "coryso.com";
  const emailElement = document.getElementById("email-contact");
  if (emailElement) {
    emailElement.innerHTML = `<a href="mailto:${user}@${domain}">${user}@${domain}</a>`;
  }

  updateCopyright();
  loadProducts();
});

function updateCopyright() {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const yearText = currentYear > startYear ? `${startYear}-${currentYear}` : `${startYear}`;
  const copyrightElement = document.getElementById("copyright");
  if (copyrightElement) {
    copyrightElement.textContent = `Copyright © ${yearText}, Coryso LLC. All rights reserved.`;
  }
}

function loadProducts() {
  fetch("assets/data/products.json")
    .then((response) => response.json())
    .then((data) => {
      const productsGrid = document.querySelector(".products-grid");
      if (productsGrid && data.products) {
        productsGrid.innerHTML = "";
        data.products.forEach((product) => {
          const productCard = createProductCard(product);
          productsGrid.appendChild(productCard);
        });
      }
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  let iconHtml;
  if (product.icon_img) {
    iconHtml = `<img src="${product.icon_img}" alt="${product.name} icon">`;
  } else {
    iconHtml = product.icon || "📦";
  }

  const isLongName = product.name.length > 20;

  card.innerHTML = `
        <div class="product-header">
            <div class="product-icon">${iconHtml}</div>
            <div class="product-content">
                <h3 class="product-name ${isLongName ? "long-title" : ""}">${product.name}</h3>
            </div>
        </div>
        <div class="product-description">${product.description}</div>
        <div class="product-link">
            <a href="${product.link}" target="_blank" rel="noopener noreferrer">Learn More</a>
        </div>
    `;

  return card;
}
