// ========================================
// DOWN WITH THE BOOGIE - MAIN APP
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize smooth scrolling for nav links
    initializeSmoothScroll();
    
    // Initialize intersection observer for animations
    initializeIntersectionObserver();
    
    // Add event listeners
    addEventListeners();
    
    // Check for dark mode preference
    checkDarkModePreference();
}

// ========================================
// SMOOTH SCROLLING
// ========================================

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// INTERSECTION OBSERVER - LAZY ANIMATIONS
// ========================================

function initializeIntersectionObserver() {
    const elements = document.querySelectorAll('.episode-card, .feature, .section-header');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// EVENT LISTENERS
// ========================================

function addEventListeners() {
    // Navbar sticky effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 8px 20px rgba(255, 215, 0, 0.5)';
        } else {
            navbar.style.boxShadow = '';
        }
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Episode card interactions
    const episodeCards = document.querySelectorAll('.episode-card');
    episodeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ========================================
// DARK MODE
// ========================================

function checkDarkModePreference() {
    // Check if browser supports dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
    
    // Listen for changes in dark mode preference
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Toggle Mobile Menu
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Scroll to top smoothly
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add animation to element
function addAnimation(element, animationName) {
    if (element) {
        element.style.animation = `${animationName} 0.6s ease-out forwards`;
    }
}

// Remove animation from element
function removeAnimation(element) {
    if (element) {
        element.style.animation = 'none';
    }
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for window resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// ANALYTICS (Optional)
// ========================================

// Track button clicks
function trackButtonClick(buttonText) {
    if (window.gtag) {
        gtag('event', 'button_click', {
            'button_text': buttonText
        });
    }
    console.log('Button clicked:', buttonText);
}

// Track page sections
function trackSectionView(sectionName) {
    if (window.gtag) {
        gtag('event', 'section_view', {
            'section_name': sectionName
        });
    }
    console.log('Section viewed:', sectionName);
}

// ========================================
// ERROR HANDLING
// ========================================

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Error:', event.error);
    // Could send error to analytics or logging service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// ========================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ========================================

window.groovyApp = {
    toggleMobileMenu: toggleMobileMenu,
    scrollToTop: scrollToTop,
    addAnimation: addAnimation,
    removeAnimation: removeAnimation,
    trackButtonClick: trackButtonClick,
    trackSectionView: trackSectionView
};
