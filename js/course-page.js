/**
 * Course Page Specific JavaScript
 * Handles course page specific interactions like curriculum toggles and FAQs
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeCurriculumToggles();
  initializeFaqToggles();
});

/**
 * Initialize curriculum week toggles
 */
function initializeCurriculumToggles() {
  const weekHeaders = document.querySelectorAll('.week-header');
  
  weekHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const weekContent = header.nextElementSibling;
      const toggleIcon = header.querySelector('.toggle-icon');
      const parentWeek = header.parentElement;
      
      // Toggle the active class
      parentWeek.classList.toggle('active-week');
      
      // Change the icon
      if (parentWeek.classList.contains('active-week')) {
        toggleIcon.textContent = '-';
        weekContent.style.display = 'block';
      } else {
        toggleIcon.textContent = '+';
        weekContent.style.display = 'none';
      }
    });
  });
  
  // Open the first week by default
  if (weekHeaders.length > 0) {
    weekHeaders[0].click();
  }
}

/**
 * Initialize FAQ toggles
 */
function initializeFaqToggles() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqAnswer = question.nextElementSibling;
      const toggleIcon = question.querySelector('.toggle-icon');
      const parentFaq = question.parentElement;
      
      // Toggle the active class
      parentFaq.classList.toggle('active-faq');
      
      // Change the icon
      if (parentFaq.classList.contains('active-faq')) {
        toggleIcon.textContent = '-';
        faqAnswer.style.display = 'block';
      } else {
        toggleIcon.textContent = '+';
        faqAnswer.style.display = 'none';
      }
    });
  });
}

/**
 * Handle registration form
 */
document.addEventListener('DOMContentLoaded', () => {
  const reserveButtons = document.querySelectorAll('.course-option .btn');
  
  reserveButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const courseOption = button.closest('.course-option');
      const courseTime = courseOption.querySelector('h3').textContent;
      
      // For demo purposes, show an alert
      alert(`Thank you for your interest in the ${courseTime}! In a real implementation, this would open a registration form or take you to a checkout page.`);
    });
  });
  
  // Add smooth scrolling to registration button in CTA
  const ctaButton = document.querySelector('.cta-section .btn');
  if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      const registrationSection = document.getElementById('registration');
      if (registrationSection) {
        registrationSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

/**
 * Course Progress Tracking
 * In a real implementation, this would store user progress through the course
 */
document.addEventListener('DOMContentLoaded', () => {
  // This is a demo implementation that simulates course progress
  const progressDemo = {
    init: function() {
      // Add progress indicators to curriculum weeks
      const weeks = document.querySelectorAll('.curriculum-week');
      
      weeks.forEach((week, index) => {
        const header = week.querySelector('.week-header');
        
        // Create progress indicator
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'progress-indicator';
        
        // Set progress based on index (for demo)
        if (index === 0) {
          progressIndicator.classList.add('completed');
          progressIndicator.setAttribute('title', 'Completed');
        } else if (index === 1) {
          progressIndicator.classList.add('in-progress');
          progressIndicator.setAttribute('title', 'In Progress');
        } else {
          progressIndicator.classList.add('upcoming');
          progressIndicator.setAttribute('title', 'Upcoming');
        }
        
        // Add to header
        header.insertBefore(progressIndicator, header.firstChild);
      });
      
      // Add styling for progress indicators
      const style = document.createElement('style');
      style.textContent = `
        .progress-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 10px;
        }
        
        .progress-indicator.completed {
          background-color: #28a745;
        }
        
        .progress-indicator.in-progress {
          background-color: #ffc107;
        }
        
        .progress-indicator.upcoming {
          background-color: #e9ecef;
          border: 1px solid #ced4da;
        }
      `;
      document.head.appendChild(style);
    }
  };
  
  // Initialize progress demo if this is a logged-in view
  // In a real implementation, this would check user authentication
  // For this demo, we're keeping it commented out
  // progressDemo.init();
});