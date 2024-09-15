document.addEventListener("DOMContentLoaded", function () {
    var _a;
    // Handle form submission
    (_a = document
        .getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent traditional form submission
        // Get the resume output  and create container
        var resumeElement = document.getElementById("resumeOutput");
        var createContainer = document.getElementById("createContainer");
        // Check if resume output element is found
        if (resumeElement) {
            // Remove the 'hidden' class to show the resume output
            resumeElement.classList.remove("hidden"); // Show the resume output
            createContainer === null || createContainer === void 0 ? void 0 : createContainer.classList.add("hidden"); // Hide the create container
            // Retrieve input values from the form
            // const username = (document.getElementById('username') as HTMLInputElement).value;
            var name_1 = document.getElementById("name")
                .value;
            var fatherName = document.getElementById("fatherName")
                .value;
            var email = document.getElementById("email")
                .value;
            var contact = document.getElementById("contact")
                .value;
            var education = document.getElementById("education").value;
            var skills = document.getElementById("skills").value;
            var workExperience = document.getElementById("workExperience").value;
            // username = name.replace()
            var username = name_1.replace(/\s+/g, '').toLowerCase();
            // Handle Profile Picture upload
            var profilePictureInput = document.getElementById("profilePicture");
            var profilePictureURL = "";
            if (profilePictureInput &&
                profilePictureInput.files &&
                profilePictureInput.files.length > 0) {
                var file = profilePictureInput.files[0];
                profilePictureURL = URL.createObjectURL(file); // Create a URL for the image
            }
            resumeElement.innerHTML = "\n                <h2>Resume</h2>\n                <section class=\"personal-info\">\n                <div class=\"info-sec\">\n                  <p id=\"editable-name\"><strong>Name:</strong><span contenteditable=\"true\"> ".concat(name_1, "</span><strong> s/o: </strong><span contenteditable=\"true\"> ").concat(fatherName, "</span></p>\n                  <p id=\"editable-email\"><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span> </p>\n                  <p id=\"editable-contact\"><strong>Contact:</strong> <span contenteditable=\"true\">").concat(contact, "</span> </p>\n                </div>\n                \n                <div class=\"image-sec\">\n                  ").concat(profilePictureURL
                ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">")
                : "", "\n                </div>\n                </section>      \n                <div class=\"container\">\n                <h3>Education</h3>\n                <p contenteditable=\"true\"  id=\"editable-education\">").concat(education, "</p>\n                </div>\n                <div class=\"container\">\n                <h3>Skills</h3>\n                <p contenteditable=\"true\" id=\"editable-skills\">").concat(skills, "</p>\n                </div>\n\n                <div class=\"container\">                \n                <h3>Work Experience</h3>\n                <p contenteditable=\"true\"  id=\"editable-work-experience\">").concat(workExperience, "</p>\n                </div>\n                <div class=\"container\"> \n                \n                <p ><strong>Unique URL: </strong><a href=\"#\"> ").concat(username, ".vercel.app/resume</a>. </p>\n                \n\n\n                </div>\n                \n                \n                 <button class=\"btnDownload\" id=\"downloadPDF\">Download PDF</button>\n                \n                 <div id=\"footerRights\" class=\"footerRights\"> Copyright &#169; job catcher</div>\n            ");
            // Add event listener for PDF download
            var downloadButton = document.getElementById("downloadPDF");
            if (downloadButton) {
                downloadButton.addEventListener("click", downloadResumeAsPDF);
            }
        }
        else {
            console.error("Element with id 'resumeOutput' not found.");
        }
    });
    // Toggle visibility for each section
    document.querySelectorAll(".btn-toggle").forEach(function (button) {
        button.addEventListener("click", function () {
            // Get the target section ID from data attribute
            var targetId = this.getAttribute("data-target");
            if (targetId) {
                var sectionContent = document.getElementById(targetId);
                // Toggle visibility
                if (sectionContent) {
                    if (sectionContent.classList.contains("hidden")) {
                        sectionContent.classList.remove("hidden");
                        this.textContent = "-"; // Change button text to '-' when visible
                    }
                    else {
                        sectionContent.classList.add("hidden");
                        this.textContent = "+"; // Change button text to '+' when hidden
                    }
                }
            }
        });
    });
});
function downloadResumeAsPDF() {
    var resumeElement = document.getElementById("resumeOutput");
    if (resumeElement) {
        // Temporarily hide elements that should not be included in the PDF
        var buttons = document.querySelectorAll("button");
        var footerRights = document.getElementById("footerRights");
        buttons.forEach(function (button) { return (button.style.display = "none"); });
        if (footerRights) {
            footerRights.style.display = "none";
        }
        // Trigger print, which allows the user to save the content as a PDF
        window.print();
        // Restore buttons after printing
        buttons.forEach(function (button) { return (button.style.display = "inline-block"); });
        if (footerRights) {
            footerRights.style.display = "block";
        }
    }
}
