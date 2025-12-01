document.addEventListener("DOMContentLoaded", () => {
    const headerHTML = `
      <header>
        <h1>UrbanThreadz Apparel</h1>
        <button class="menu-btn">&#9776;</button>
  
        <nav class="nav-links">
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="lookbook.html">Lookbook</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>
      </header>
    `;
  
    const footerHTML = `
      <footer>
        <p>&copy; 2025 UrbanThreadz Apparel</p>
      </footer>
    `;
  
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  });
  