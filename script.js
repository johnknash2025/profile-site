// Modern JavaScript for portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initMobileMenu();
    initBackToTop();
    initContactForm();
    initSkillAnimations();
    initStatsCounter();
    initSmoothScrolling();
    initTypingEffect();
    initParallaxEffect();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Update active navigation link based on scroll position
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.hero-content, .about-text, .about-stats, .skill-item, .stat-card, .project-card, .contact-info, .contact-form, .section-reveal'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('show');
        
        // Toggle hamburger icon
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading-spinner"></span> 送信中...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        try {
            await simulateFormSubmission();
            showMessage('メッセージが正常に送信されました！', 'success');
            form.reset();
        } catch (error) {
            showMessage('送信中にエラーが発生しました。もう一度お試しください。', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Simulate form submission
function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (90% chance)
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Simulated error'));
            }
        }, 2000);
    });
}

// Show success/error messages
function showMessage(message, type) {
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
            ${message}
        </div>
    `;

    const form = document.getElementById('contact-form');
    form.appendChild(messageDiv);

    // Show message with animation
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 100);

    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 5000);
}

// Skill progress bar animations
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200); // Stagger animation
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// Stats counter animation
function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.text-3xl');
                const finalNumber = numberElement.textContent;
                animateCounter(numberElement, finalNumber);
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => {
        statsObserver.observe(card);
    });
}

// Counter animation function
function animateCounter(element, finalValue) {
    const isPercentage = finalValue.includes('%');
    const isPlusSign = finalValue.includes('+');
    const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
    
    let currentValue = 0;
    const increment = numericValue / 50; // 50 steps
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(currentValue);
        if (isPlusSign) displayValue += '+';
        if (isPercentage) displayValue += '%';
        
        element.textContent = displayValue;
    }, stepTime);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    const nameSpan = heroTitle.querySelector('.text-primary');
    
    if (nameSpan) {
        const name = nameSpan.textContent;
        const beforeName = originalText.split(nameSpan.outerHTML)[0];
        const afterName = originalText.split(nameSpan.outerHTML)[1];
        
        // Start typing effect after page load
        setTimeout(() => {
            typeText(heroTitle, beforeName, name, afterName);
        }, 500);
    }
}

// Typing animation function
function typeText(element, beforeText, nameText, afterText) {
    element.innerHTML = '';
    let i = 0;
    
    function typeChar() {
        if (i < beforeText.length) {
            element.innerHTML += beforeText.charAt(i);
            i++;
            setTimeout(typeChar, 50);
        } else {
            // Add the name with styling
            element.innerHTML += `<span class="text-primary">${nameText}</span>`;
            // Add the rest of the text
            let j = 0;
            function typeAfter() {
                if (j < afterText.length) {
                    element.innerHTML += afterText.charAt(j);
                    j++;
                    setTimeout(typeAfter, 50);
                }
            }
            setTimeout(typeAfter, 200);
        }
    }
    
    typeChar();
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.getElementById('home');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Any scroll-based functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Add loading class to body until page is fully loaded
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animate');
        }, 200);
    }
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking with Google Analytics 4
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Console log for debugging
    console.log('Event tracked:', eventName, eventData);
}

// Track button clicks and interactions
document.addEventListener('click', (e) => {
    // Track CTA buttons
    if (e.target.matches('.btn-primary, .btn-secondary')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_location: e.target.closest('section')?.id || 'unknown'
        });
    }
    
    // Track navigation clicks
    if (e.target.matches('.nav-link')) {
        trackEvent('navigation_click', {
            nav_item: e.target.textContent.trim(),
            target_section: e.target.getAttribute('href')
        });
    }
    
    // Track project link clicks
    if (e.target.closest('a[href*="github.com"]')) {
        trackEvent('project_click', {
            project_name: 'Discord Farm Bot',
            link_type: 'github'
        });
    }
    
    // Track social media clicks
    if (e.target.closest('a[href*="x.com"], a[href*="twitter.com"]')) {
        trackEvent('social_click', {
            platform: 'twitter',
            location: e.target.closest('footer') ? 'footer' : 'contact'
        });
    }
    
    if (e.target.closest('a[href*="github.com"]') && !e.target.closest('a[href*="discord-farmbot"]')) {
        trackEvent('social_click', {
            platform: 'github',
            location: e.target.closest('footer') ? 'footer' : 'contact'
        });
    }
});

// Track form submissions and interactions
document.getElementById('contact-form').addEventListener('submit', () => {
    trackEvent('form_submit', {
        form_type: 'contact'
    });
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track milestone scroll depths
        if (scrollDepth >= 25 && maxScrollDepth < 25) {
            trackEvent('scroll_depth', { depth: '25%' });
        } else if (scrollDepth >= 50 && maxScrollDepth < 50) {
            trackEvent('scroll_depth', { depth: '50%' });
        } else if (scrollDepth >= 75 && maxScrollDepth < 75) {
            trackEvent('scroll_depth', { depth: '75%' });
        } else if (scrollDepth >= 90 && maxScrollDepth < 90) {
            trackEvent('scroll_depth', { depth: '90%' });
        }
    }
});

// Track section views using Intersection Observer
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('section_view', {
                section: entry.target.id || 'unknown'
            });
        }
    });
}, { threshold: 0.5 });

// Observe all main sections
document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You can send error reports to your analytics service here
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You can send error reports to your analytics service here
});