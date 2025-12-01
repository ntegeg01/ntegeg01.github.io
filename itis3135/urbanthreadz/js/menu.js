document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav-links");
  
    btn.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  });
  