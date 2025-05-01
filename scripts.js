// Initialize AOS (Animate on Scroll) for scroll animations
AOS.init({
    duration: 1000, // Animation duration (in ms)
    once: true, // Only animate once when the element is in view
    offset: 200, // Offset to trigger the animation earlier or later
  });
  
  // Highlight active navigation links based on the current page
  const navLinks = document.querySelectorAll('nav ul li a');
  const currentPage = window.location.pathname.split('/').pop(); // Get the current page name
  
  navLinks.forEach(link => {
    // Add 'active' class to the link matching the current page
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
  
  // Smooth scrolling behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
  