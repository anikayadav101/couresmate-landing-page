// ===== COURSEMATE LANDING PAGE JAVASCRIPT =====

// Global state
let currentFeatureIndex = 0;
let focusedSection = 'hero';
let isMobileMenuOpen = false;
let countdownTimer = null;
let featuresAutoTimer = null;

// Countdown timer state
let timeLeft = {
    hours: 23,
    minutes: 59,
    seconds: 45
};

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    initializeFeaturesCarousel();
    initializeScrollEffects();
    initializeEscapeKeyHandlers();
    
    console.log('🎓 CourseMate landing page loaded successfully!');
});

// ===== COUNTDOWN TIMER =====

function initializeCountdown() {
    countdownTimer = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    
    if (timeLeft.seconds > 0) {
        timeLeft.seconds--;
    } else if (timeLeft.minutes > 0) {
        timeLeft.minutes--;
        timeLeft.seconds = 59;
    } else if (timeLeft.hours > 0) {
        timeLeft.hours--;
        timeLeft.minutes = 59;
        timeLeft.seconds = 59;
    } else {
        // Reset timer when it reaches 0
        timeLeft = { hours: 23, minutes: 59, seconds: 59 };
    }
    
    // Update display
    const formattedTime = `${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;
    if (countdownElement) {
        countdownElement.textContent = formattedTime;
    }
}

// ===== FEATURES CAROUSEL =====

function initializeFeaturesCarousel() {
    updateFeaturesDisplay();
    
    // Auto-rotate features every 3 seconds
    featuresAutoTimer = setInterval(() => {
        changeFeature(1);
    }, 3000);
}

function changeFeature(direction) {
    const totalFeatures = 6;
    
    if (direction > 0) {
        currentFeatureIndex = (currentFeatureIndex + 1) % totalFeatures;
    } else {
        currentFeatureIndex = (currentFeatureIndex - 1 + totalFeatures) % totalFeatures;
    }
    
    updateFeaturesDisplay();
}

function setFeature(index) {
    currentFeatureIndex = index;
    updateFeaturesDisplay();
    
    // Reset auto-timer when user manually changes
    if (featuresAutoTimer) {
        clearInterval(featuresAutoTimer);
        featuresAutoTimer = setInterval(() => {
            changeFeature(1);
        }, 3000);
    }
}

function updateFeaturesDisplay() {
    const wrapper = document.getElementById('features-wrapper');
    const dots = document.querySelectorAll('.feature-dot');
    const cards = document.querySelectorAll('.feature-card');
    
    if (wrapper) {
        // Calculate transform based on current index
        const translateX = currentFeatureIndex * (280 + 32); // card width + gap
        wrapper.style.transform = `translateX(-${translateX}px)`;
    }
    
    // Update active states for cards
    cards.forEach((card, index) => {
        if (index === currentFeatureIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Update indicator dots
    dots.forEach((dot, index) => {
        if (index === currentFeatureIndex) {
            dot.classList.add('active');
            dot.style.backgroundColor = 'white';
        } else {
            dot.classList.remove('active');
            dot.style.backgroundColor = '#6b7280';
        }
    });
}

// ===== SCROLL EFFECTS =====

function initializeScrollEffects() {
    // Create intersection observer for scroll effects
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setFocusedSection(entry.target.id);
            }
        });
    }, observerOptions);

    // Observe all scroll sections
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

function setFocusedSection(sectionId) {
    focusedSection = sectionId;
    
    // Update focused classes
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('focused');
        } else {
            section.classList.remove('focused');
        }
    });
}

// ===== NAVIGATION & SCROLLING =====

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
    
    if (mobileMenu) {
        isMobileMenuOpen = !isMobileMenuOpen;
        
        if (isMobileMenuOpen) {
            mobileMenu.classList.remove('hidden');
            if (menuButton) menuButton.textContent = '✕';
        } else {
            mobileMenu.classList.add('hidden');
            if (menuButton) menuButton.textContent = '☰';
        }
    }
}

// ===== MODAL MANAGEMENT =====

function showModal(modalType) {
    const modal = document.getElementById(`${modalType}-modal`);
    if (modal) {
        modal.classList.remove('hidden');
        // Focus trap and prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus first input if available
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function hideModal(modalType) {
    const modal = document.getElementById(`${modalType}-modal`);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function hideAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
    document.body.style.overflow = '';
}

// ===== FORM HANDLING =====

function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simulate login process
    console.log('Login attempt:', { email, password });
    alert(`Welcome back! Login attempt for: ${email}`);
    
    hideModal('login');
    event.target.reset();
}

function handleSignup(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simulate signup process
    console.log('Signup attempt:', { name, email, password });
    alert(`🎉 Welcome to CourseMate, ${name}!\n\nAccount created successfully for: ${email}\n\nYour free trial has started!`);
    
    hideModal('signup');
    event.target.reset();
}

function handleClaimOffer() {
    // Show signup modal for claiming offer
    showModal('signup');
    
    // Add special offer tracking
    console.log('🔥 Special offer claimed!');
}

// ===== KEYBOARD HANDLERS =====

function initializeEscapeKeyHandlers() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            hideAllModals();
        }
    });
    
    // Click outside modal to close
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            const modalType = event.target.id.replace('-modal', '');
            hideModal(modalType);
        }
    });
}

// ===== DEMO FUNCTIONALITY =====

function watchDemo() {
    showModal('demo');
    console.log('🎬 Demo requested');
}

// ===== ANALYTICS & TRACKING (Placeholder) =====

function trackEvent(eventName, properties = {}) {
    console.log(`📊 Event tracked: ${eventName}`, properties);
    
    // Here you would integrate with your analytics service
    // Examples: Google Analytics, Mixpanel, Amplitude, etc.
    
    // Google Analytics 4 example:
    // gtag('event', eventName, properties);
    
    // Mixpanel example:
    // mixpanel.track(eventName, properties);
}

// Track button clicks
document.addEventListener('click', function(event) {
    const button = event.target.closest('button');
    if (button) {
        const buttonText = button.textContent.trim();
        const section = button.closest('section')?.id || 'unknown';
        
        trackEvent('button_click', {
            button_text: buttonText,
            section: section,
            timestamp: new Date().toISOString()
        });
    }
});

// Track section views
function trackSectionView(sectionId) {
    trackEvent('section_view', {
        section: sectionId,
        timestamp: new Date().toISOString()
    });
}

// Update the setFocusedSection function to include tracking
const originalSetFocusedSection = setFocusedSection;
setFocusedSection = function(sectionId) {
    originalSetFocusedSection(sectionId);
    trackSectionView(sectionId);
};

// ===== UTILITY FUNCTIONS =====

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

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

// ===== PERFORMANCE OPTIMIZATIONS =====

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Additional scroll-based functionality can be added here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ERROR HANDLING =====

window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    
    // Track errors for debugging
    trackEvent('javascript_error', {
        message: event.error?.message || 'Unknown error',
        filename: event.filename,
        lineno: event.lineno,
        timestamp: new Date().toISOString()
    });
});

// ===== CLEANUP =====

window.addEventListener('beforeunload', function() {
    // Clean up timers
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }
    if (featuresAutoTimer) {
        clearInterval(featuresAutoTimer);
    }
});

// ===== DEVELOPMENT HELPERS =====

// Debug mode (remove in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.coursemate = {
        currentFeatureIndex: () => currentFeatureIndex,
        focusedSection: () => focusedSection,
        timeLeft: () => timeLeft,
        setFeature: setFeature,
        showModal: showModal,
        hideModal: hideModal,
        scrollToSection: scrollToSection
    };
    
    console.log('🔧 Development mode: window.coursemate helpers available');
    console.log('📖 Try: coursemate.setFeature(2) or coursemate.showModal("demo")');
}

// ===== EXPORT FOR MODULE SYSTEMS (if needed) =====

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        showModal,
        hideModal,
        setFeature,
        changeFeature,
        handleLogin,
        handleSignup,
        handleClaimOffer
    };
}