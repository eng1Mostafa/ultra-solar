/**
 * Blog functionality script for Ultra Solar
 */
document.addEventListener('DOMContentLoaded', function() {
    // Load blog posts if we're on the blog listing page
    if (document.querySelector('.blogs-grid')) {
        loadBlogPosts();
    }
    
    // Listen for language changes
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            // Update blog post display after language is toggled
            setTimeout(function() {
                if (document.querySelector('.blogs-grid')) {
                    updateBlogLanguageDisplay();
                }
            }, 100);
        });
    }
});

/**
 * Load blog posts from JSON file
 */
function loadBlogPosts() {
    fetch('data/blog-posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.posts && Array.isArray(data.posts)) {
                renderBlogPosts(data.posts);
            } else {
                showError('Invalid blog data structure');
            }
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            showError('Failed to load blog posts');
        });
}

/**
 * Render blog posts
 */
function renderBlogPosts(posts) {
    const blogsGrid = document.querySelector('.blogs-grid');
    if (!blogsGrid) return;
    
    // Clear existing content
    blogsGrid.innerHTML = '';
    
    // Sort posts by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const currentLang = document.documentElement.lang || 'ar';
    
    // Create blog cards
    sortedPosts.forEach(post => {
        const title = post.title[currentLang] || post.title.ar || post.title.en || 'Untitled';
        const content = post.content[currentLang] || post.content.ar || post.content.en || '';
        const author = post.author[currentLang] || post.author.ar || post.author.en || '';
        
        // Create a plain text excerpt from the content
        const excerpt = content
            .replace(/#+\s|[*_~`]/g, '')  // Remove markdown formatting
            .replace(/\n/g, ' ')          // Replace line breaks with spaces
            .substring(0, 120) + '...';    // Limit length
        
        // Format date
        const dateObj = new Date(post.date);
        const formattedDate = new Intl.DateTimeFormat(currentLang === 'ar' ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(dateObj);
        
        // Create blog card
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card animated-card';
        blogCard.innerHTML = `
            <div class="blog-image">
                <img src="${post.image}" alt="${title}">
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${title}</h3>
                <div class="blog-meta">
                    <span><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
                    <span><i class="far fa-user"></i> ${author}</span>
                </div>
                <p class="blog-excerpt">${excerpt}</p>
                <a href="blog-post.html?id=${post.id}" class="read-more">
                    <span class="lang-ar" ${currentLang !== 'ar' ? 'style="display:none"' : ''}>قراءة المزيد</span>
                    <span class="lang-en" ${currentLang !== 'en' ? 'style="display:none"' : ''}>Read More</span>
                    <i class="fas fa-${currentLang === 'ar' ? 'arrow-left' : 'arrow-right'}"></i>
                </a>
            </div>
        `;
        
        blogsGrid.appendChild(blogCard);
    });
    
    // If no posts, show message
    if (sortedPosts.length === 0) {
        const noPostsMessage = document.createElement('div');
        noPostsMessage.className = 'no-posts-message';
        noPostsMessage.innerHTML = `
            <i class="fas fa-newspaper"></i>
            <h3>
                <span class="lang-ar" ${currentLang !== 'ar' ? 'style="display:none"' : ''}>لا توجد مقالات متاحة حالياً</span>
                <span class="lang-en" ${currentLang !== 'en' ? 'style="display:none"' : ''}>No articles available at the moment</span>
            </h3>
            <p>
                <span class="lang-ar" ${currentLang !== 'ar' ? 'style="display:none"' : ''}>يرجى العودة لاحقاً لمشاهدة مقالاتنا الجديدة</span>
                <span class="lang-en" ${currentLang !== 'en' ? 'style="display:none"' : ''}>Please check back later for new articles</span>
            </p>
        `;
        blogsGrid.appendChild(noPostsMessage);
    }
}

/**
 * Show error message
 */
function showError(message) {
    const blogsGrid = document.querySelector('.blogs-grid');
    if (!blogsGrid) return;
    
    const currentLang = document.documentElement.lang || 'ar';
    
    blogsGrid.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>
                <span class="lang-ar" ${currentLang !== 'ar' ? 'style="display:none"' : ''}>حدث خطأ أثناء تحميل المقالات</span>
                <span class="lang-en" ${currentLang !== 'en' ? 'style="display:none"' : ''}>Error loading articles</span>
            </h3>
            <p>
                <span class="lang-ar" ${currentLang !== 'ar' ? 'style="display:none"' : ''}>يرجى المحاولة مرة أخرى لاحقاً</span>
                <span class="lang-en" ${currentLang !== 'en' ? 'style="display:none"' : ''}>Please try again later</span>
            </p>
        </div>
    `;
}

/**
 * Update blog post display when language changes
 */
function updateBlogLanguageDisplay() {
    const currentLang = document.documentElement.lang || 'ar';
    
    // Reload blog posts to update language
    loadBlogPosts();
    
    // Update read more direction
    document.querySelectorAll('.read-more i').forEach(icon => {
        if (currentLang === 'ar') {
            icon.className = 'fas fa-arrow-left';
        } else {
            icon.className = 'fas fa-arrow-right';
        }
    });
}
