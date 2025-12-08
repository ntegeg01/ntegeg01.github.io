document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const items = document.querySelectorAll(".product-card");
  
    searchInput.addEventListener("keyup", () => {
      let value = searchInput.value.toLowerCase();
  
      items.forEach((card) => {
        let name = card.querySelector(".product-name").textContent.toLowerCase();
        card.style.display = name.includes(value) ? "block" : "none";
      });
    });
  });
  