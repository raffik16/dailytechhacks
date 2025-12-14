/**
 * Daily Tech Hacks - Main JavaScript File
 * Minimal vanilla JS for navigation and interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeHeaderScroll();
    initializeNewsletterForm();
    initializeSmoothScrolling();
    initializeFilterTabs();
});

/**
 * Mobile Menu Toggle
 */
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Header scroll effect
 */
function initializeHeaderScroll() {
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * IPQS Email Validation (via serverless API)
 */
async function validateEmailWithIPQS(email) {
    try {
        const response = await fetch('/api/validate-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        // If validation fails, allow submission (fail open)
        console.error('Email validation error:', error);
        return { valid: true, message: null };
    }
}

/**
 * Newsletter form handling
 */
function initializeNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            const submitBtn = form.querySelector('button[type="submit"]');

            if (!email || !isValidEmail(email)) {
                showMessage(form, 'Please enter a valid email address', 'error');
                return;
            }

            // Disable button during validation
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Validating...';

            // IPQS email validation
            const ipqsResult = await validateEmailWithIPQS(email);
            if (!ipqsResult.valid) {
                showMessage(form, ipqsResult.message, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            submitBtn.textContent = 'Subscribing...';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showMessage(form, 'Thanks for subscribing! Check your inbox for confirmation.', 'success');
                    emailInput.value = '';
                } else {
                    showMessage(form, 'Oops! Something went wrong. Please try again.', 'error');
                }
            } catch (error) {
                showMessage(form, 'Oops! Something went wrong. Please try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            if (!name || !email || !message) {
                showMessage(contactForm, 'Please fill in all required fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage(contactForm, 'Please enter a valid email address', 'error');
                return;
            }

            // Disable button during validation
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Validating...';

            // IPQS email validation
            const ipqsResult = await validateEmailWithIPQS(email);
            if (!ipqsResult.valid) {
                showMessage(contactForm, ipqsResult.message, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

            submitBtn.textContent = 'Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showMessage(contactForm, 'Message sent successfully! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showMessage(contactForm, 'Oops! Something went wrong. Please try again.', 'error');
                }
            } catch (error) {
                showMessage(contactForm, 'Oops! Something went wrong. Please try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
}

/**
 * Show message helper
 */
function showMessage(container, text, type) {
    // Remove existing messages
    const existing = container.querySelector('.form-message');
    if (existing) existing.remove();

    const message = document.createElement('div');
    message.className = `form-message form-message-${type}`;
    message.style.cssText = `
        padding: 12px 16px;
        border-radius: 8px;
        margin-top: 16px;
        font-size: 0.9rem;
        text-align: center;
        ${type === 'success'
            ? 'background: rgba(0, 200, 83, 0.15); color: #00c853; border: 1px solid rgba(0, 200, 83, 0.3);'
            : 'background: rgba(255, 59, 48, 0.15); color: #ff3b30; border: 1px solid rgba(255, 59, 48, 0.3);'}
    `;
    message.textContent = text;

    container.appendChild(message);

    setTimeout(() => message.remove(), 5000);
}

/**
 * Email validation
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header')?.offsetHeight || 70;
                const offsetTop = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Filter tabs for hacks page
 */
function initializeFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const hackCards = document.querySelectorAll('.hack-card');

    if (!filterTabs.length || !hackCards.length) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;

            // Filter cards
            hackCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Copy code snippets
 */
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
}

/**
 * Reading progress indicator (for hack pages)
 */
function initializeReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    const article = document.querySelector('.article-main');

    if (!progressBar || !article) return;

    window.addEventListener('scroll', () => {
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        const progress = Math.min(
            Math.max((scrollPosition - articleTop + windowHeight) / articleHeight, 0),
            1
        );

        progressBar.style.width = `${progress * 100}%`;
    });
}

// Initialize reading progress on hack pages
if (document.querySelector('.hack-page')) {
    document.addEventListener('DOMContentLoaded', initializeReadingProgress);
}
