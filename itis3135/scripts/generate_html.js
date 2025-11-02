document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("introForm");
    const resultSection = document.getElementById("result");
    const h2 = document.querySelector("h2");

    // Function to escape HTML special characters for display
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, function (char) {
            switch (char) {
                case "&": return "&amp;";
                case "<": return "&lt;";
                case ">": return "&gt;";
                case "'": return "&#39;";
                case '"': return "&quot;";
                default: return char;
            }
        });
    }

    // Create "Generate HTML" button
    const generateBtn = document.createElement("button");
    generateBtn.type = "button";
    generateBtn.textContent = "Generate HTML";
    generateBtn.id = "generateHTMLBtn";
    document.querySelector(".buttons").appendChild(generateBtn);

    generateBtn.addEventListener("click", function () {
        const formData = new FormData(form);

        // Build HTML string
        const fullName =
            formData.get("firstName") + " " +
            (formData.get("middleName") ? formData.get("middleName") + " " : "") +
            '"' + formData.get("nickname") + '" ' +
            formData.get("lastName");

        const mascot = formData.get("mascotAdj") + " " + formData.get("mascotAnimal");
        const divider = formData.get("divider") || "~";

        let html = `
<h2>Introduction HTML</h2>
<h3>${fullName} ${divider} ${mascot}</h3>
<figure>
    <img src="${formData.get("picture") ? URL.createObjectURL(formData.get("picture")) : "#"}" alt="${formData.get("caption") || "Profile Picture"}" />
    <figcaption>${formData.get("caption") || ""}</figcaption>
</figure>
<ul>
    <li><strong>Personal Background:</strong> ${formData.get("bullet1")}</li>
    <li><strong>Professional Background:</strong> ${formData.get("bullet2")}</li>
    <li><strong>Academic Background:</strong> ${formData.get("bullet3")}</li>
    <li><strong>Background in this Subject:</strong> ${formData.get("bullet4")}</li>
    <li><strong>Primary Computer Platform:</strong> ${formData.get("bullet5")}</li>
</ul>
<h4>Courses Currently Taking</h4>
<ul>`;

        // Gather multiple courses
        const courseDepts = formData.getAll("courseDept");
        const courseNums = formData.getAll("courseNum");
        const courseNames = formData.getAll("courseName");
        const courseReasons = formData.getAll("courseReason");

        for (let i = 0; i < courseDepts.length; i++) {
            html += `
    <li>${courseDepts[i]} ${courseNums[i]} - ${courseNames[i]}: ${courseReasons[i]}</li>`;
        }

        html += `
</ul>
<p><em>“${formData.get("quote")}”</em> — ${formData.get("quoteAuthor")}</p>`;

        if (formData.get("funnyThing")) {
            html += `<p><strong>Funny Thing:</strong> ${formData.get("funnyThing")}</p>`;
        }

        if (formData.get("share")) {
            html += `<p><strong>Something to Share:</strong> ${formData.get("share")}</p>`;
        }

        html += `
<h4>Links</h4>
<ul>`;

        const links = [
            { name: "LinkedIn", value: formData.get("link1") },
            { name: "GitHub", value: formData.get("link2") },
            { name: "Personal Site", value: formData.get("link3") },
            { name: "Portfolio", value: formData.get("link4") },
            { name: "Other Link", value: formData.get("link5") }
        ];

        links.forEach(function (link) {
            if (link.value) {
                html += `<li><a href="${link.value}" target="_blank">${link.name}</a></li>`;
            }
        });

        html += "</ul>";

        // Replace form with highlighted HTML
        h2.textContent = "Introduction HTML";
        form.style.display = "none";

        resultSection.innerHTML = `
<h4>Generated HTML Code</h4>
<section class="code-section">
    <pre><code class="language-html">${escapeHTML(html)}</code></pre>
</section>`;

        // Highlight.js support
        if (window.hljs) {
            document.querySelectorAll("pre code").forEach(function (el) {
                hljs.highlightElement(el);
            });
        }
    });
});


