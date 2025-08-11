/* --- START OF FILE product-pages.js --- */
/* Shared JavaScript for product category pages (products-*.html) */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const subCategoryTabContainer = document.querySelector('.subcategory-tabs-container');
    const productGrid = document.querySelector('.products-showcase-grid');

    // --- Product Sub-Category Filtering Logic ---
    function applyProductFilter(filterValue) {
        if (!productGrid) return;
        const productCards = productGrid.querySelectorAll('.product-card');
        const currentLang = document.documentElement.lang || 'ar'; // Get current language

        productCards.forEach(card => {
            const cardSubCategories = (card.getAttribute('data-subcategory') || '').trim().split(' ');
            // Check if the filter is 'all' OR if the card's subcategories array includes the filter value
            const shouldShow = (filterValue === 'all' || cardSubCategories.includes(filterValue));

            if (shouldShow) {
                card.classList.remove('hidden');
                // Ensure correct language is shown for visible cards
                card.querySelectorAll(`.lang-${currentLang === 'ar' ? 'en' : 'ar'}`).forEach(el => el.style.display = 'none');
                card.querySelectorAll(`.lang-${currentLang}`).forEach(el => el.style.display = '');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    function initProductSubCategoryTabs() {
        if (!subCategoryTabContainer || !productGrid) {
            // If no filter tabs but products exist, ensure initial language visibility is set
            if (productGrid) {
                 const currentLang = document.documentElement.lang || 'ar';
                 const productCards = productGrid.querySelectorAll('.product-card');
                 productCards.forEach(card => {
                     card.querySelectorAll(`.lang-${currentLang === 'ar' ? 'en' : 'ar'}`).forEach(el => el.style.display = 'none');
                     card.querySelectorAll(`.lang-${currentLang}`).forEach(el => el.style.display = '');
                 });
            }
             return; // Exit if containers not found
        }

        const subCategoryTabButtons = subCategoryTabContainer.querySelectorAll('.subcategory-tab-button');
        const productCards = productGrid.querySelectorAll('.product-card'); // Select cards within the grid

        if (subCategoryTabButtons.length > 0 && productCards.length > 0) {
            subCategoryTabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Prevent re-filtering if already active
                    if (this.classList.contains('active')) return;

                    // Update active state
                    subCategoryTabButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    // Get filter value and apply filter
                    const filterValue = this.getAttribute('data-filter');
                    applyProductFilter(filterValue);
                });
            });

             // Apply initial filter based on the 'active' button on page load
             let initialFilterButton = subCategoryTabContainer.querySelector('.subcategory-tab-button.active');
             // If no button is explicitly active, default to 'all'
             if (!initialFilterButton) {
                 const allButton = subCategoryTabContainer.querySelector('.subcategory-tab-button[data-filter="all"]');
                 if (allButton) {
                     allButton.classList.add('active'); // Set 'all' as active visually
                     initialFilterButton = allButton;
                 } else {
                    // Fallback: activate the first button if 'all' doesn't exist
                    const firstButton = subCategoryTabContainer.querySelector('.subcategory-tab-button');
                    if (firstButton) {
                         firstButton.classList.add('active');
                         initialFilterButton = firstButton;
                    }
                 }
             }

             // Apply the determined initial filter
             if (initialFilterButton) {
                applyProductFilter(initialFilterButton.getAttribute('data-filter'));
             } else {
                 applyProductFilter('all'); // Default if no buttons found at all
             }

        } else if (productCards.length > 0) {
             // If no filter buttons but products exist, ensure language visibility is set
             const currentLang = document.documentElement.lang || 'ar';
             productCards.forEach(card => {
                 card.querySelectorAll(`.lang-${currentLang === 'ar' ? 'en' : 'ar'}`).forEach(el => el.style.display = 'none');
                 card.querySelectorAll(`.lang-${currentLang}`).forEach(el => el.style.display = '');
             });
        }
    }

    // Initialize components specific to Product Pages
    initProductSubCategoryTabs();

    // console.log("Product pages shared JavaScript loaded.");

});
/* --- END OF FILE product-pages.js --- */