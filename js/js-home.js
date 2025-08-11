/* --- START OF FILE home.js --- */
/* JavaScript specific to the index.html (Homepage) */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Add animation to solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    if (solutionCards.length) {
        solutionCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('fade-in-up');
        });
    }

    // Add hover effects to solution features
    const solutionFeatures = document.querySelectorAll('.solution-feature');
    if (solutionFeatures.length) {
        solutionFeatures.forEach(feature => {
            feature.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
                if (document.documentElement.classList.contains('dark-mode')) {
                    this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }
            });
            
            feature.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
        });
    }

    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length) {
        const revealOnScroll = function() {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('revealed');
                }
            });
        };
        
        window.addEventListener('scroll', revealOnScroll);
        // Initial check
        revealOnScroll();
    }
});
/* --- END OF FILE home.js --- */