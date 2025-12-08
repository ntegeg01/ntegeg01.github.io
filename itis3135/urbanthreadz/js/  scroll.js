window.onscroll = function () {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;
  
  btn.style.display = window.scrollY > 250 ? "block" : "none";
};

function scrollTopFunc() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Connect the button click event
document.addEventListener("DOMContentLoaded", function() {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", scrollTopFunc);
  }
});