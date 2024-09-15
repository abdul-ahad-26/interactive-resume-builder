document.addEventListener("DOMContentLoaded", () => {
  // Handle form submission
  document
    .getElementById("resumeForm")
    ?.addEventListener("submit", function (event: Event) {
      event.preventDefault(); // Prevent traditional form submission

      // Get the resume output  and create container
      const resumeElement = document.getElementById(
        "resumeOutput"
      ) as HTMLElement | null;
      const createContainer = document.getElementById(
        "createContainer"
      ) as HTMLElement | null;

      // Check if resume output element is found
      if (resumeElement) {
        // Remove the 'hidden' class to show the resume output

        resumeElement.classList.remove("hidden"); // Show the resume output
        createContainer?.classList.add("hidden"); // Hide the create container

        // Retrieve input values from the form
        // const username = (document.getElementById('username') as HTMLInputElement).value;
        const name = (document.getElementById("name") as HTMLInputElement)
          .value;
          const fatherName = (document.getElementById("fatherName") as HTMLInputElement)
          .value;
        const email = (document.getElementById("email") as HTMLInputElement)
          .value;
        const contact = (document.getElementById("contact") as HTMLInputElement)
          .value;
        const education = (
          document.getElementById("education") as HTMLTextAreaElement
        ).value;
        const skills = (
          document.getElementById("skills") as HTMLTextAreaElement
        ).value;
        const workExperience = (
          document.getElementById("workExperience") as HTMLTextAreaElement
        ).value;
        // username = name.replace()
        const username =  name.replace(/\s+/g, '').toLowerCase();

        // Handle Profile Picture upload
        const profilePictureInput = document.getElementById(
          "profilePicture"
        ) as HTMLInputElement;
        let profilePictureURL = "";

        if (
          profilePictureInput &&
          profilePictureInput.files &&
          profilePictureInput.files.length > 0
        ) {
          const file = profilePictureInput.files[0];
          profilePictureURL = URL.createObjectURL(file); // Create a URL for the image
        }

        resumeElement.innerHTML = `
                <h2>Resume</h2>
                <section class="personal-info">
                <div class="info-sec">
                  <p id="editable-name"><strong>Name:</strong><span contenteditable="true"> ${name}</span><strong> s/o: </strong><span contenteditable="true"> ${fatherName}</span></p>
                  <p id="editable-email"><strong>Email:</strong> <span contenteditable="true">${email}</span> </p>
                  <p id="editable-contact"><strong>Contact:</strong> <span contenteditable="true">${contact}</span> </p>
                </div>
                
                <div class="image-sec">
                  ${
                    profilePictureURL
                      ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">`
                      : ""
                  }
                </div>
                </section>      
                <div class="container">
                <h3>Education</h3>
                <p contenteditable="true"  id="editable-education">${education}</p>
                </div>
                <div class="container">
                <h3>Skills</h3>
                <p contenteditable="true" id="editable-skills">${skills}</p>
                </div>

                <div class="container">                
                <h3>Work Experience</h3>
                <p contenteditable="true"  id="editable-work-experience">${workExperience}</p>
                </div>
                <div class="container"> 
                
                <p ><strong>Unique URL: </strong><a href="#"> ${username}.vercel.app/resume</a>. </p>
                


                </div>
                
                
                 <button class="btnDownload" id="downloadPDF">Download PDF</button>
                
                 <div id="footerRights" class="footerRights"> Copyright &#169; job catcher</div>
            `;
        // Add event listener for PDF download
        const downloadButton = document.getElementById("downloadPDF");
        if (downloadButton) {
          downloadButton.addEventListener("click", downloadResumeAsPDF);
        }
      } else {
        console.error("Element with id 'resumeOutput' not found.");
      }
    });

  // Toggle visibility for each section
  document.querySelectorAll(".btn-toggle").forEach((button) => {
    button.addEventListener("click", function () {
      // Get the target section ID from data attribute
      const targetId = (this as HTMLElement).getAttribute("data-target");
      if (targetId) {
        const sectionContent = document.getElementById(targetId);

        // Toggle visibility
        if (sectionContent) {
          if (sectionContent.classList.contains("hidden")) {
            sectionContent.classList.remove("hidden");
            (this as HTMLElement).textContent = "-"; // Change button text to '-' when visible
          } else {
            sectionContent.classList.add("hidden");
            (this as HTMLElement).textContent = "+"; // Change button text to '+' when hidden
          }
        }
      }
    });
  });
});
function downloadResumeAsPDF() {
  const resumeElement = document.getElementById("resumeOutput");

  if (resumeElement) {
    // Temporarily hide elements that should not be included in the PDF
    const buttons = document.querySelectorAll("button");
    const footerRights = document.getElementById("footerRights");
    buttons.forEach((button) => (button.style.display = "none"));
    if (footerRights) {
      footerRights.style.display = "none";
    }

    // Trigger print, which allows the user to save the content as a PDF
    window.print();

    // Restore buttons after printing
    buttons.forEach((button) => (button.style.display = "inline-block"));
    if (footerRights) {
      footerRights.style.display = "block";
    }


  }
}
