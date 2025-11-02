document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("introForm");
    const resultSection = document.getElementById("result");
    const h2 = document.querySelector("h2");

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

    // Create "Generate JSON" button
    const generateBtn = document.createElement("button");
    generateBtn.type = "button";
    generateBtn.textContent = "Generate JSON";
    generateBtn.id = "generateJSONBtn";
    document.querySelector(".buttons").appendChild(generateBtn);

    generateBtn.addEventListener("click", function () {
        const formData = new FormData(form);

        // Build JSON object
        const jsonData = {
            firstName: formData.get("firstName"),
            preferredName: formData.get("nickname"),
            middleInitial: formData.get("middleName"),
            lastName: formData.get("lastName"),
            divider: formData.get("divider"),
            mascotAdjective: formData.get("mascotAdj"),
            mascotAnimal: formData.get("mascotAnimal"),
            image: "images/headshot.jpeg", // static example path
            imageCaption: formData.get("caption"),
            personalStatement: formData.get("personalStatement"),
            personalBackground: formData.get("bullet1"),
            professionalBackground: formData.get("bullet2"),
            academicBackground: formData.get("bullet3"),
            subjectBackground: formData.get("bullet4"),
            primaryComputer: formData.get("bullet5"),
            courses: [],
            links: []
        };

        // Gather courses
        const depts = formData.getAll("courseDept");
        const nums = formData.getAll("courseNum");
        const names = formData.getAll("courseName");
        const reasons = formData.getAll("courseReason");

        for (let i = 0; i < depts.length; i++) {
            jsonData.courses.push({
                department: depts[i],
                number: nums[i],
                name: names[i],
                reason: reasons[i]
            });
        }

        // Gather links
        const links = [
            { name: "LinkedIn", href: formData.get("link1") },
            { name: "GitHub", href: formData.get("link2") },
            { name: "Personal Site", href: formData.get("link3") },
            { name: "Portfolio", href: formData.get("link4") },
            { name: "Other Link", href: formData.get("link5") }
        ];
        links.forEach((link) => {
            if (link.href) jsonData.links.push(link);
        });

        // Convert to formatted JSON string
        const jsonString = JSON.stringify(jsonData, null, 2);

        // Replace form with pretty JSON output
        h2.textContent = "Introduction JSON";
        form.style.display = "none";

        resultSection.innerHTML = `
<h4>Generated JSON Output</h4>
<section class="code-section">
    <pre><code class="language-json">${escapeHTML(jsonString)}</code></pre>
</section>`;

        // Re-highlight JSON with Highlight.js
        if (window.hljs) {
            document.querySelectorAll("pre code").forEach((el) => {
                hljs.highlightElement(el);
            });
        }
    }); // ✅ closes the click event listener
}); // ✅ closes the DOMContentLoaded event listener

