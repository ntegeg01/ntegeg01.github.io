document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("introForm");
    const clearBtn = document.getElementById("clearBtn");
    const addCourseBtn = document.getElementById("addCourse");
    const result = document.getElementById("result");
    const coursesContainer = document.getElementById("courses");
  
    // Prevent default form refresh
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      displayResult();
    });
  
    // Add new course fields
    addCourseBtn.addEventListener("click", () => {
      const div = document.createElement("div");
      div.classList.add("course");
      div.innerHTML = `
        <input type="text" name="courseDept" placeholder="Dept" required>
        <input type="text" name="courseNum" placeholder="Number" required>
        <input type="text" name="courseName" placeholder="Course name" required>
        <input type="text" name="courseReason" placeholder="Reason" required>
        <button type="button" class="deleteCourse">Delete</button>
      `;
      coursesContainer.appendChild(div);
  
      div.querySelector(".deleteCourse").addEventListener("click", () => div.remove());
    });
  
    // Clear button (empties all fields)
    clearBtn.addEventListener("click", () => {
      Array.from(form.querySelectorAll("input, textarea")).forEach(el => el.value = "");
    });
  
    // Build result section dynamically
    function displayResult() {
      const data = Object.fromEntries(new FormData(form).entries());
      const courseElements = coursesContainer.querySelectorAll(".course");
      const courses = Array.from(courseElements).map(c => {
        const [dept, num, name, reason] = Array.from(c.querySelectorAll("input")).map(i => i.value);
        return `<li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>`;
      });
  
      const imgSrc = form.picture.files[0]
        ? URL.createObjectURL(form.picture.files[0])
        : "images/default.jpg";
  
      result.innerHTML = `
        <h2>Introduction</h2>
        <figure>
          <img src="${imgSrc}" alt="Profile Image" width="200">
          <figcaption>${data.caption}</figcaption>
        </figure>
        <p>${data.personalStatement}</p>
        <ul>
          <li><strong>Personal Background:</strong> ${data.bullet1}</li>
          <li><strong>Professional Background:</strong> ${data.bullet2}</li>
          <li><strong>Academic Background:</strong> ${data.bullet3}</li>
          <li><strong>Background in this Subject:</strong> ${data.bullet4}</li>
          <li><strong>Primary Computer Platform:</strong> ${data.bullet5}</li>
          <li><strong>Courses Currently Taking:</strong>
            <ul>${courses.join("")}</ul>
          </li>
          <li><strong>Quote:</strong> “${data.quote}” — ${data.quoteAuthor}</li>
          ${data.funnyThing ? `<li><strong>Funny Thing:</strong> ${data.funnyThing}</li>` : ""}
          ${data.share ? `<li><strong>Something to Share:</strong> ${data.share}</li>` : ""}
        </ul>
        <p><strong>Links:</strong></p>
        <ul>
          ${[data.link1, data.link2, data.link3, data.link4, data.link5]
            .filter(l => l)
            .map(l => `<li><a href="${l}" target="_blank">${l}</a></li>`).join("")}
        </ul>
        <button id="resetResult">Reset</button>
      `;
  
      document.getElementById("resetResult").addEventListener("click", () => {
        result.innerHTML = "";
        form.reset();
      });
    }
  });
  