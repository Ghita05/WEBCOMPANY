// Initialize AOS (Animate on Scroll) for scroll animations
AOS.init({
  duration: 1000,
  once: true,
  offset: 200,
});

// Highlight active navigation links based on the current page
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav ul li a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      // Add 'active' class to the link matching the current page
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html')) {
          link.classList.add('active');
      }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
              });
          }
      });
  });

  // Mobile menu toggle functionality
  const mobileMenuToggle = document.createElement('div');
  mobileMenuToggle.className = 'mobile-menu-toggle';
  mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
  document.querySelector('nav').prepend(mobileMenuToggle);

  mobileMenuToggle.addEventListener('click', function() {
      document.querySelector('nav ul').classList.toggle('active');
      this.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('nav ul li a').forEach(link => {
      link.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
              document.querySelector('nav ul').classList.remove('active');
              document.querySelector('.mobile-menu-toggle').classList.remove('active');
          }
      });
  });

  // Responsive adjustments
  function handleResize() {
      if (window.innerWidth > 768) {
          document.querySelector('nav ul').style.display = '';
      }
  }

  window.addEventListener('resize', handleResize);
});

// Form validation for contact forms
function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
      if (!field.value.trim()) {
          field.style.borderColor = 'red';
          isValid = false;
      } else {
          field.style.borderColor = '';
      }

      // Email validation
      if (field.type === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
              field.style.borderColor = 'red';
              isValid = false;
          }
      }
  });

  if (!isValid) {
      const errorElement = form.querySelector('.form-error') || document.createElement('div');
      errorElement.className = 'form-error';
      errorElement.textContent = 'Please fill in all required fields correctly.';
      if (!form.contains(errorElement)) {
          form.appendChild(errorElement);
      }
  }

  return isValid;
}

// Initialize all forms with validation
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
      form.addEventListener('submit', function(e) {
          if (!validateForm(this)) {
              e.preventDefault();
          }
      });
  });
});

// FAQ functionality (if not already in the HTML)
function setupFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
      faqQuestions.forEach(question => {
          question.addEventListener('click', function() {
              const answer = this.nextElementSibling;
              const isOpen = answer.style.display === 'block';
              
              // Close all answers first
              document.querySelectorAll('.faq-answer').forEach(ans => {
                  ans.style.display = 'none';
              });
              
              // Toggle the clicked one
              answer.style.display = isOpen ? 'none' : 'block';
              this.setAttribute('aria-expanded', !isOpen);
          });
      });
  }
}

// Call setup functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupFAQ();
});