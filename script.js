/* ===================================
   PRELOADER
   =================================== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 1000);
});

/* ===================================
   NAVIGATION MENU
   =================================== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/* ===================================
   ACTIVE LINK ON SCROLL
   =================================== */
const sections = document.querySelectorAll('.section');

function activeLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.classList.add('active-link');
        } else {
            link?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', activeLink);

/* ===================================
   STICKY HEADER
   =================================== */
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/* ===================================
   DARK/LIGHT THEME
   =================================== */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    updateThemeIcon(currentTheme);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    const theme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark-theme') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

/* ===================================
   TYPING EFFECT
   =================================== */
const typingText = document.querySelector('.typing-text');
const texts = [
    'Electronics & Communication Engineering Student',
    'VLSI Design Enthusiast',
    'Embedded Systems Developer',
    'IoT Innovation Builder',
    'Signal Processing Expert'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before next text
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

/* ===================================
   STATS COUNTER ANIMATION
   =================================== */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat__number');
            const target = parseInt(entry.target.dataset.target);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__item').forEach(stat => {
    statsObserver.observe(stat);
});

/* ===================================
   SKILLS PROGRESS BARS ANIMATION
   =================================== */
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const percentageBar = entry.target.querySelector('.skills__percentage');
            const percentage = percentageBar.dataset.percentage;
            
            setTimeout(() => {
                percentageBar.style.setProperty('--percentage', percentage + '%');
                percentageBar.classList.add('animate');
            }, 100);
            
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills__data').forEach(skill => {
    skillsObserver.observe(skill);
});

/* ===================================
   PROJECTS FILTER
   =================================== */
const filterButtons = document.querySelectorAll('.filter__btn');
const projectCards = document.querySelectorAll('.project__card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('filter-active'));
        // Add active class to clicked button
        button.classList.add('filter-active');
        
        const filterValue = button.dataset.filter;
        
        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hide');
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.6s ease-out';
                }, 100);
            } else {
                const categories = card.dataset.category.split(' ');
                if (categories.includes(filterValue)) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.animation = 'fadeIn 0.6s ease-out';
                    }, 100);
                } else {
                    card.classList.add('hide');
                }
            }
        });
    });
});

/* ===================================
   SCROLL ANIMATIONS
   =================================== */
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            scrollAnimationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe elements for scroll animation
document.querySelectorAll('.project__card, .cert__card, .skills__content, .interest__item, .publication__item, .achievement__item').forEach(el => {
    scrollAnimationObserver.observe(el);
});

/* ===================================
   CONTACT FORM
   =================================== */
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    console.log('Form Data:', formData);
    
    // Show success toast
    showToast('Message sent successfully!', 'success');
    
    // Reset form
    contactForm.reset();
    
    // In production, you would send this data to a server
    // Example:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        showToast('Message sent successfully!', 'success');
        contactForm.reset();
    })
    .catch(error => {
        showToast('Failed to send message. Please try again.', 'error');
    });
    */
});

function showToast(message, type = 'success') {
    const toastMessage = toast.querySelector('.toast__message');
    const toastIcon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
    } else {
        toastIcon.className = 'fas fa-exclamation-circle';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ===================================
   BACK TO TOP BUTTON
   =================================== */
const backToTop = document.getElementById('back-to-top');

function toggleBackToTop() {
    if (window.scrollY >= 560) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

window.addEventListener('scroll', toggleBackToTop);

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ===================================
   DOWNLOAD RESUME
   =================================== */
const downloadResumeBtn = document.getElementById('download-resume');

downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // In production, replace with actual resume file path
    showToast('Resume download will start shortly...', 'success');
    
    // Example download logic:
    /*
    const link = document.createElement('a');
    link.href = 'path/to/your/resume.pdf';
    link.download = 'Vaibhav_Parashar_Resume.pdf';
    link.click();
    */
});

/* ===================================
   LAZY LOADING IMAGES
   =================================== */
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

/* ===================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   =================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ===================================
   PREVENT FORM RESUBMISSION
   =================================== */
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

/* ===================================
   ACCESSIBILITY ENHANCEMENTS
   =================================== */

// Keyboard navigation for mobile menu
navMenu?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
        navToggle.focus();
    }
});

// Focus trap for mobile menu
const focusableElements = navMenu?.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
);

if (focusableElements?.length > 0) {
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    navMenu?.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

/* ===================================
   PERFORMANCE OPTIMIZATION
   =================================== */

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll functions
window.addEventListener('scroll', debounce(scrollHeader));
window.addEventListener('scroll', debounce(activeLink));
window.addEventListener('scroll', debounce(toggleBackToTop));

/* ===================================
   CONSOLE EASTER EGG
   =================================== */
console.log('%c👋 Hello, Developer!', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #764ba2; font-size: 16px;');
console.log('%cVaibhav Parashar - ECE Specialist', 'color: #10b981; font-size: 14px;');

/* ===================================
   INITIALIZATION
   =================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add initial animations
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});