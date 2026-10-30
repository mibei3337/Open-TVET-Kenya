document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Mobile Navigation Toggle Functionality (Runs on all pages)
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
      menuToggle.textContent = isOpen ? "✕ Close" : "☰ Menu";
    });
  }

  // 2. Automatic Dynamic Copyright Year (Runs on all pages)
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 3. Course Search & Department Filtering Logic (Runs ONLY on courses.html)
  const searchInput = document.getElementById("course-search");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseListItems = document.querySelectorAll(".course-list-item");
  const noResults = document.getElementById("no-results");

  if (searchInput || filterButtons.length > 0) {
    let activeCategory = "all";

    function filterCourses() {
      const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
      let visibleCount = 0;

      courseListItems.forEach(function (item) {
        const category = item.dataset.category;
        const searchableText = (item.dataset.search + " " + item.innerText).toLowerCase();

        const matchesCategory = (activeCategory === "all" || category === activeCategory);
        const matchesSearch = searchableText.includes(searchTerm);
        const isVisible = matchesCategory && matchesSearch;

        item.style.display = isVisible ? "flex" : "none";
        if (isVisible) {
          visibleCount++;
        }
      });

      if (noResults) {
        noResults.style.display = (visibleCount === 0) ? "block" : "none";
      }
    }

    if (searchInput) {
      searchInput.addEventListener("input", filterCourses);
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeCategory = button.dataset.category;

        filterButtons.forEach(function (btn) {
          const isActive = (btn === button);
          btn.classList.toggle("active", isActive);
          btn.setAttribute("aria-pressed", isActive);
        });

        filterCourses();
      });
    });
  }

  // 4. Admissions Form Submission & Document Confirmation Handler (Runs ONLY on admissions.html)
  const admissionsForm = document.getElementById("admissions-form");
  const formMessage = document.getElementById("form-message");

  if (admissionsForm && formMessage) {
    admissionsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const applicantName = document.getElementById("full-name").value.trim();
      const fileInput = document.getElementById("kcse-cert");
      const fileName = fileInput && fileInput.files[0] ? fileInput.files[0].name : "KCSE certificate";

      formMessage.innerHTML = "Thank you, <strong>" + applicantName + "</strong>. Your application and document (<em>" + fileName + "</em>) have been successfully received.<br><br><strong>Status:</strong> Document confirmation is currently in process. Our admissions team will email you once verification is complete.";
      formMessage.style.display = "block";
      admissionsForm.reset();
    });
  }

  // 5. Contact Form Submission Handler (Runs ONLY on contact.html)
  const contactSubmitBtn = document.getElementById("contact-submit-btn");
  const contactForm = document.getElementById("contact-form");
  const contactMessageBox = document.getElementById("contact-message-box");

  if (contactSubmitBtn && contactForm && contactMessageBox) {
    contactSubmitBtn.addEventListener("click", function () {
      const nameInput = document.getElementById("contact-name").value.trim();
      const emailInput = document.getElementById("contact-email").value.trim();
      const subjectInput = document.getElementById("subject").value;
      const messageInput = document.getElementById("contact-message").value.trim();

      if (!nameInput || !emailInput || !subjectInput || !messageInput) {
        alert("Please fill out all required fields before submitting your message.");
        return;
      }

      contactMessageBox.innerHTML = "Thank you, <strong>" + nameInput + "</strong>! Your inquiry regarding <em>" + subjectInput + "</em> has been sent successfully. Our support team will respond via email shortly.";
      contactMessageBox.style.display = "block";
      contactForm.reset();
    });
  }

  // 6. Student Login Handler with Redirection (Runs ONLY on login.html)
  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");

  if (loginForm && loginMessage) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const userIdentifier = document.getElementById("login-email").value.trim();

      loginMessage.innerHTML = "Authentication successful for <strong>" + userIdentifier + "</strong>. Redirecting to your student dashboard...";
      loginMessage.style.display = "block";
      
      // Automatically redirect to dashboard.html after 1.5 seconds
      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 1500);
    });
  }

  // 7. Student Dashboard Practical Evidence Upload Handler (Runs ONLY on dashboard.html)
  const evidenceForm = document.getElementById("evidence-form");
  const evidenceMessage = document.getElementById("evidence-message");

  if (evidenceForm && evidenceMessage) {
    evidenceForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const unitSelect = document.getElementById("practical-unit").value;
      const fileInput = document.getElementById("practical-file");
      const fileName = fileInput && fileInput.files[0] ? fileInput.files[0].name : "practical file";

      evidenceMessage.innerHTML = "Success! Your practical evidence for <strong>" + unitSelect + "</strong> (file: <em>" + fileName + "</em>) has been uploaded to the Moodle LMS.<br><br><strong>Status:</strong> Submitted for instructor review and competency assessment.";
      evidenceMessage.style.display = "block";
      evidenceForm.reset();
    });
  }

});