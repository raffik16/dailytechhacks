/**
 * Daily Tech Hacks - Main JavaScript File
 * Provides interactive functionality for the tech education website
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeMobileMenu();
  initializeTestimonialSlider();
  initializeFormValidation();
  initializeSmoothScrolling();
});

/**
 * Mobile Menu Toggle Functionality
 */
function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

/**
 * Testimonial Slider Functionality
 */
function initializeTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.testimonial-controls .prev');
  const nextButton = document.querySelector('.testimonial-controls .next');
  
  if (!testimonials.length || !dots.length) return;
  
  let currentSlide = 0;
  
  // Hide all testimonials except the first one
  for (let i = 1; i < testimonials.length; i++) {
    testimonials[i].style.display = 'none';
  }
  
  // Function to show a specific slide
  function showSlide(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.style.display = 'none';
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the selected testimonial
    testimonials[index].style.display = 'block';
    
    // Add active class to the corresponding dot
    dots[index].classList.add('active');
    
    // Update current slide index
    currentSlide = index;
  }
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // Event listener for prev button
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) {
        newIndex = testimonials.length - 1;
      }
      showSlide(newIndex);
    });
  }
  
  // Event listener for next button
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      let newIndex = currentSlide + 1;
      if (newIndex >= testimonials.length) {
        newIndex = 0;
      }
      showSlide(newIndex);
    });
  }
  
  // Auto-advance slides every 5 seconds
  setInterval(() => {
    let newIndex = currentSlide + 1;
    if (newIndex >= testimonials.length) {
      newIndex = 0;
    }
    showSlide(newIndex);
  }, 5000);
}

/**
 * Form Validation Functionality
 */
function initializeFormValidation() {
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      
      if (!name.value.trim()) {
        showValidationError(name, 'Please enter your name');
        return;
      }
      
      if (!email.value.trim()) {
        showValidationError(email, 'Please enter your email');
        return;
      }
      
      if (!isValidEmail(email.value)) {
        showValidationError(email, 'Please enter a valid email address');
        return;
      }
      
      // If validation passes, you would normally submit the form
      // For this demo, we'll show a success message
      showSuccessMessage(contactForm, 'Thank you for your submission! We will contact you soon.');
    });
  }
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      
      if (!emailInput.value.trim()) {
        showValidationError(emailInput, 'Please enter your email');
        return;
      }
      
      if (!isValidEmail(emailInput.value)) {
        showValidationError(emailInput, 'Please enter a valid email address');
        return;
      }
      
      // If validation passes
      showSuccessMessage(newsletterForm, 'Thank you for subscribing to our newsletter!');
    });
  }
}

/**
 * Show validation error message
 */
function showValidationError(inputElement, message) {
  // Remove any existing error messages
  const existingError = inputElement.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Create and add error message
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.style.color = '#dc3545';
  errorElement.style.fontSize = '0.875rem';
  errorElement.style.marginTop = '5px';
  errorElement.textContent = message;
  
  inputElement.parentElement.appendChild(errorElement);
  
  // Highlight the input field
  inputElement.style.borderColor = '#dc3545';
  
  // Remove error after 3 seconds
  setTimeout(() => {
    errorElement.remove();
    inputElement.style.borderColor = '';
  }, 3000);
  
  // Focus on the input
  inputElement.focus();
}

/**
 * Show success message after form submission
 */
function showSuccessMessage(formElement, message) {
  // Clear the form
  formElement.reset();
  
  // Create success message
  const successElement = document.createElement('div');
  successElement.className = 'success-message';
  successElement.style.backgroundColor = '#28a745';
  successElement.style.color = 'white';
  successElement.style.padding = '10px';
  successElement.style.borderRadius = '5px';
  successElement.style.marginTop = '20px';
  successElement.textContent = message;
  
  // Add success message to form
  formElement.appendChild(successElement);
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    successElement.remove();
  }, 5000);
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Get the header height for offset
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        
        // Calculate scroll position
        const offsetTop = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Add course module animations
 */
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});

/**
 * Animate elements when they come into view
 */
function animateOnScroll() {
  const elements = document.querySelectorAll('.course-card, .approach-feature, .timeline-item');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight * 0.9) {
      element.classList.add('fade-in');
    }
  });
}

/**
 * Add fade-in class for animation
 */
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .fade-in {
      animation: fadeIn 0.6s ease forwards;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .course-card, .approach-feature, .timeline-item {
      opacity: 0;
    }
  </style>
`);