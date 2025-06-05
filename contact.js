/**
 * contact.js - Handles contact form functionality
 * For Mohan's Portfolio Website
 */
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    // Get a reference to the submit button early
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
  
    if (!contactForm || !formStatus || !submitButton) {
      console.error("Required form elements or submit button not found");
      return;
    }
  
    // Ensure the button has the necessary structure for the spinner
    // This is a safety check; ideally, your HTML is already structured as <button><span>Text</span><div class="spinner"></div></button>
    let buttonTextSpan = submitButton.querySelector('span');
    let spinnerDiv = submitButton.querySelector('.spinner');
  
    if (!buttonTextSpan) {
      // If no span, create one and wrap the text
      buttonTextSpan = document.createElement('span');
      buttonTextSpan.textContent = submitButton.textContent;
      submitButton.innerHTML = ''; // Clear original text
      submitButton.appendChild(buttonTextSpan);
    }
    if (!spinnerDiv) {
      // If no spinner div, create one
      spinnerDiv = document.createElement('div');
      spinnerDiv.classList.add('spinner');
      submitButton.appendChild(spinnerDiv);
    }
  
  
    async function submitForm(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Get form data
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
  
      // Validate form data (client-side)
      if (!name || !email || !subject || !message) {
        formStatus.textContent = "All fields are required";
        formStatus.className = "error";
        return;
      }
  
      // --- Start: Integrate Loading Spinner Logic ---
      // Add the 'loading' class to show the spinner and hide text
      submitButton.classList.add('loading');
      submitButton.disabled = true; // Disable button during loading
      // Update status message
      formStatus.textContent = "Sending your message...";
      formStatus.className = "";
      // --- End: Integrate Loading Spinner Logic ---
  
      try {
        console.log("Sending to:", window.location.origin + "/api/contact");
  
        const response = await fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, subject, message }),
        });
  
        console.log("Response status:", response.status);
  
        const text = await response.text();
        console.log("Raw response:", text);
  
        let result;
        try {
          result = JSON.parse(text);
        } catch (e) {
          console.error("Failed to parse JSON:", e);
          throw new Error("Invalid response from server");
        }
  
        if (response.ok) {
          // Success case
          formStatus.textContent = "Message sent successfully!";
          formStatus.className = "success";
          contactForm.reset();
        } else {
          // Error from server
          throw new Error(result?.message || `Server error: ${response.status}`);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        formStatus.textContent = error.message || "Failed to send message. Please try again.";
        formStatus.className = "error";
      } finally {
        // --- Start: Integrate Loading Spinner Logic ---
        // Always remove the 'loading' class and re-enable button when done (success or error)
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        // --- End: Integrate Loading Spinner Logic ---
      }
    }
  
    // Add form submit listener
    contactForm.addEventListener("submit", submitForm);
  
    // Rest of your existing code (theme toggle, mobile nav)
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
  
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
  
    if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
      body.classList.add("dark-mode");
    }
  
    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        localStorage.setItem(
          "theme",
          body.classList.contains("dark-mode") ? "dark" : "light"
        );
      });
    }
  
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger) {
      hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
      });
    }
  });