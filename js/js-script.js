/* --- START OF FILE script.js --- */
/* Core JavaScript for Timetech Egypt Website */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // --- Element Selectors (Globally Needed) ---
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');
    const currentYearSpan = document.getElementById('current-year');

    // --- State Variables ---
    let currentLang = localStorage.getItem('language') || 'ar';
    let currentTheme = localStorage.getItem('theme') || 'light';
    let dateUpdateInterval = null;
    let timeUpdateInterval = null;

    // --- Language & Theme Functions ---
    function applyLanguage(lang) {
        if (!['ar', 'en'].includes(lang)) lang = 'ar'; // Default to Arabic if invalid
        htmlElement.lang = lang;
        htmlElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        bodyElement.style.fontFamily = lang === 'ar' ? 'var(--font-family-ar)' : 'var(--font-family-en)';
        currentLang = lang;
        localStorage.setItem('language', lang);

        updateLanguageVisibility(lang);
        updateDate();
        updateTime();
        updateAriaLabels(lang); // Update accessibility labels
        // Note: Product filter language update is now handled within applyLanguageVisibility
    }

    function updateLanguageVisibility(langToShow) {
        const langToHide = langToShow === 'ar' ? 'en' : 'ar';

        // General selector for all language spans
        const allLangSpans = document.querySelectorAll(`.lang-${langToHide}, .lang-${langToShow}`);

        allLangSpans.forEach(el => {
            // Check if the element is within a hidden product card (if productGrid exists)
            const isInsideHiddenProduct = document.querySelector('.products-showcase-grid') && el.closest('.product-card.hidden');

            if (!isInsideHiddenProduct) {
                if (el.classList.contains(`lang-${langToHide}`)) {
                    el.style.display = 'none';
                } else if (el.classList.contains(`lang-${langToShow}`)) {
                    el.style.display = ''; // Revert to default display (usually inline or block depending on original CSS)
                }
            }
        });
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.querySelector('i')?.classList.replace('fa-moon', 'fa-sun');
            currentTheme = 'dark';
        } else {
            htmlElement.classList.remove('dark-mode');
            if (darkModeToggle) darkModeToggle.querySelector('i')?.classList.replace('fa-sun', 'fa-moon');
            currentTheme = 'light';
        }
        localStorage.setItem('theme', theme);
        updateAriaLabels(currentLang); // Update dark mode toggle label
    }

    function updateAriaLabels(lang) {
         const labels = {
            ar: {
                menuToggle: 'تبديل القائمة',
                darkModeToggle: currentTheme === 'light' ? 'تفعيل الوضع الداكن' : 'إلغاء تفعيل الوضع الداكن',
                languageToggle: 'التبديل إلى الإنجليزية',
            },
            en: {
                menuToggle: 'Toggle menu',
                darkModeToggle: currentTheme === 'light' ? 'Enable Dark Mode' : 'Disable Dark Mode',
                languageToggle: 'Switch to Arabic',
            }
        };
        const currentLabels = labels[lang];
        if (menuToggle) menuToggle.setAttribute('aria-label', currentLabels.menuToggle);
        if (darkModeToggle) darkModeToggle.setAttribute('aria-label', currentLabels.darkModeToggle);
        if (languageToggle) languageToggle.setAttribute('aria-label', currentLabels.languageToggle);
    }

    // --- Footer Year Update ---
    function updateFooterYear() { if (currentYearSpan) { currentYearSpan.textContent = new Date().getFullYear(); } }

    // --- Date & Time Widget Functions ---
    function updateDate() { if (!dateElement) return; try { const now = new Date(); const locale = currentLang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US'; const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; dateElement.textContent = now.toLocaleDateString(locale, dateOptions); } catch (error) { console.error("Error updating date:", error); dateElement.textContent = " "; } }
    function updateTime() { if (!timeElement) { if (timeUpdateInterval) clearInterval(timeUpdateInterval); return; } try { const now = new Date(); const locale = currentLang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US'; const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true }; let formattedTime = now.toLocaleTimeString(locale, timeOptions); formattedTime = formattedTime.replace(/am/i, 'ص').replace(/pm/i, 'م'); // Basic Arabic AM/PM
                if(currentLang === 'en') { formattedTime = formattedTime.replace(/ص/i, 'AM').replace(/م/i, 'PM'); } // Ensure English uses AM/PM
 timeElement.textContent = formattedTime; } catch (error) { console.error("Error updating time:", error); timeElement.textContent = "--:-- --"; } }

    // --- Scroll Animation & Counter Function ---
    function initScrollObserver() { const elementsToAnimate = document.querySelectorAll('.animated-title, .animated-text, .animated-card, .animated-cta'); const counters = document.querySelectorAll('.stat-number[data-target]'); if (!('IntersectionObserver' in window)) { console.warn("IntersectionObserver not supported, animations and counters disabled."); elementsToAnimate.forEach(el => el.style.opacity = 1); counters.forEach(counter => { const prefix = counter.textContent.match(/^\D*/)?.[0] || ''; const suffix = counter.textContent.match(/\D*$/)?.[0] || ''; const targetVal = counter.dataset.target; counter.textContent = prefix + targetVal + suffix; }); return; } const observerCallback = (entries, observer) => { entries.forEach(entry => { if (entry.isIntersecting) { let animationName = 'fadeInUp'; // Default animation
 entry.target.style.animation = `${animationName} 0.8s ease-out forwards`; entry.target.style.opacity = '1'; if (entry.target.classList.contains('stat-number') && entry.target.dataset.target && !entry.target.classList.contains('animated')) { animateCounter(entry.target); entry.target.classList.add('animated'); } observer.unobserve(entry.target); } }); }; const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 }); elementsToAnimate.forEach(el => { el.style.opacity = '0'; observer.observe(el); }); counters.forEach(counter => { counter.style.opacity = '0'; observer.observe(counter); }); }
    function animateCounter(counterElement) { const rawTarget = counterElement.dataset.target; const isPercentage = rawTarget.includes('%'); const target = parseFloat(rawTarget.replace(/[^0-9.]/g, '')); if (isNaN(target)) { counterElement.style.opacity = '1'; return; } const duration = 1500; // Slightly faster
 const prefix = counterElement.textContent.match(/^\D*/)?.[0] || ''; const suffix = isPercentage ? '%' : (counterElement.textContent.match(/\D*$/)?.[0] || ''); const startValue = 0; let startTime = null; const step = (timestamp) => { if (!startTime) startTime = timestamp; const progress = Math.min((timestamp - startTime) / duration, 1); const currentVal = Math.floor(progress * (target - startValue) + startValue); counterElement.textContent = prefix + currentVal + suffix; counterElement.style.opacity = '1'; if (progress < 1) { requestAnimationFrame(step); } else { counterElement.textContent = prefix + target + suffix; // Ensure final value is exact
 } }; requestAnimationFrame(step); }

    // --- Mobile Menu Logic ---
    function initMobileMenu() {
        if (!menuToggle || !mainNav) return;

        menuToggle.addEventListener('click', () => {
            const isActive = mainNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
            menuToggle.querySelector('i')?.classList.toggle('fa-bars', !isActive);
            menuToggle.querySelector('i')?.classList.toggle('fa-times', isActive);
            bodyElement.classList.toggle('no-scroll', isActive);
        });

        // Close menu when clicking outside or on a link
        document.addEventListener('click', (event) => {
            if (mainNav.classList.contains('active')) {
                const isClickInsideNav = mainNav.contains(event.target);
                const isClickOnToggle = menuToggle.contains(event.target);
                const isLinkClicked = event.target.tagName === 'A' && mainNav.contains(event.target);

                // Close if clicking outside OR clicking a link inside
                if (isLinkClicked || (!isClickInsideNav && !isClickOnToggle)) {
                    closeMobileMenu();
                }
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    function closeMobileMenu() { if (mainNav?.classList.contains('active')) { mainNav.classList.remove('active'); menuToggle?.setAttribute('aria-expanded', 'false'); menuToggle?.querySelector('i')?.classList.replace('fa-times', 'fa-bars'); bodyElement.classList.remove('no-scroll'); } }

    // --- Dark Mode Toggle Logic ---
    function initDarkModeToggle() { if (darkModeToggle) darkModeToggle.addEventListener('click', () => applyTheme(currentTheme === 'light' ? 'dark' : 'light')); }

    // --- Language Toggle Logic ---
    function initLanguageToggle() { if (languageToggle) languageToggle.addEventListener('click', () => applyLanguage(currentLang === 'ar' ? 'en' : 'ar')); }

    // --- Initialisation ---
    function initializeSite() {
        // Apply initial settings from localStorage
        applyTheme(currentTheme);
        applyLanguage(currentLang); // Apply language first

        // Update dynamic content
        updateFooterYear();
        updateDate();
        updateTime();
        if (timeElement) {
            if (timeUpdateInterval) clearInterval(timeUpdateInterval);
            timeUpdateInterval = setInterval(updateTime, 30000); // Update every 30s
        }
         // Correctly set the initial date interval
        if (dateElement) {
            if (dateUpdateInterval) clearInterval(dateUpdateInterval);
            const now = new Date();
            const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now;
            setTimeout(() => { // Update at midnight
                updateDate();
                if (dateUpdateInterval) clearInterval(dateUpdateInterval); // Clear previous after first run
                dateUpdateInterval = setInterval(updateDate, 24 * 60 * 60 * 1000); // Then update daily
            }, msUntilMidnight);
        }

        // Initialize UI components
        initMobileMenu();
        initDarkModeToggle();
        initLanguageToggle();

        // Initialize scroll animations & counters AFTER content is likely stable
        setTimeout(initScrollObserver, 150);

    }

    // Run Initialization
    initializeSite();

}); // End DOMContentLoaded
/* --- END OF FILE script.js --- */