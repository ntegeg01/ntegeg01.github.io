let slideIndex = 0;

function showSlides() {
  const slides = document.getElementsByClassName("slide");
  
  // Safety check: ensure slides exist
  if (!slides || slides.length === 0) return;
  
  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  // Increment and wrap around
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  
  // Show current slide
  slides[slideIndex - 1].style.display = "block";
  
  // Continue slideshow
  setTimeout(showSlides, 3000);
}

document.addEventListener("DOMContentLoaded", showSlides);
