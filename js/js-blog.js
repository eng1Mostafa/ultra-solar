document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
    
    // Language toggling event listener
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            // After language is toggled by the main script
            setTimeout(() => {
                // Get the current language
                const currentLang = document.documentElement.lang;
                // Update blog post displays based on the language
                updateBlogPostLanguage(currentLang);
            }, 100);
        });
    }
});

/**
 * Load blog posts from the JSON file
 */
function loadBlogPosts() {
    fetch('/data/blog-posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayBlogPosts(data.posts);
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            document.getElementById('blog-posts-container').innerHTML = `
                <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 50px 0;">
                    <i class="fas fa-exclamation-triangle fa-3x" style="color: #ff6b6b; margin-bottom: 20px;"></i>
                    <p>
                        <span class="lang-ar" style="display: ${document.documentElement.lang === 'ar' ? 'block' : 'none'}">
                            عذراً، حدث خطأ أثناء تحميل المقالات. يرجى المحاولة مرة أخرى لاحقاً.
                        </span>
                        <span class="lang-en" style="display: ${document.documentElement.lang === 'en' ? 'block' : 'none'}">
                            Sorry, an error occurred while loading the articles. Please try again later.
                        </span>
                    </p>
                </div>
            `;
        });
}

/**
 * Display blog posts in the container
 */
function displayBlogPosts(posts) {
    const container = document.getElementById('blog-posts-container');
    const currentLang = document.documentElement.lang || 'ar';
    
    // Clear loading spinner
    container.innerHTML = '';
    
    if (!posts || posts.length === 0) {
        container.innerHTML = `
            <div class="no-posts-message" style="grid-column: 1 / -1; text-align: center; padding: 50px 0;">
                <i class="fas fa-newspaper fa-3x" style="color: #6c757d; margin-bottom: 20px;"></i>
                <p>
                    <span class="lang-ar" style="display: ${currentLang === 'ar' ? 'block' : 'none'}">
                        لا توجد مقالات متاحة حالياً. يرجى العودة لاحقاً.
                    </span>
                    <span class="lang-en" style="display: ${currentLang === 'en' ? 'block' : 'none'}">
                        No articles available at the moment. Please check back later.
                    </span>
                </p>
            </div>
        `;
        return;
    }
    
    // Create a card for each blog post
    posts.forEach(post => {
        const postElement = createBlogPostCard(post, currentLang);
        container.appendChild(postElement);
    });
}

/**
 * Create a blog post card element
 */
function createBlogPostCard(post, lang) {
    // Create the main card element
    const card = document.createElement('article');
    card.className = 'blog-card animated-card';
    card.setAttribute('data-post-id', post.id);
    
    // Extract content based on language
    const title = post.title[lang] || post.title['en'] || 'Untitled';
    const content = post.content[lang] || post.content['en'] || '';
    const author = post.author[lang] || post.author['en'] || '';
    
    // Create excerpt from content (first 150 characters)
    let excerpt = '';
    if (content) {
        // Remove markdown formatting for excerpt
        const plainText = content.replace(/#+\s|[*_~`]/g, '').replace(/\n/g, ' ');
        excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
    }
    
    // Format date
    const postDate = new Date(post.date);
    const formattedDate = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(postDate);
    
    // Build card HTML
    card.innerHTML = `
        <div class="blog-image">
            <img src="${post.image || 'images/blog/default-blog.jpg'}" alt="${title}">
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <div class="blog-date">
                    <i class="far fa-calendar-alt"></i>
                    <span>${formattedDate}</span>
                </div>
                <div class="blog-author">
                    <i class="far fa-user"></i>
                    <span>${author}</span>
                </div>
            </div>
            <h2 class="blog-title">${title}</h2>
            <div class="blog-excerpt">${excerpt}</div>
            <div class="blog-tags">
                ${post.tags.map(tag => `
                    <span class="blog-tag">${tag}</span>
                `).join('')}
            </div>
            <a href="blog-post.html?id=${post.id}" class="blog-read-more">
                <span class="lang-ar" style="display: ${lang === 'ar' ? 'inline' : 'none'}">قراءة المزيد</span>
                <span class="lang-en" style="display: ${lang === 'en' ? 'inline' : 'none'}">Read More</span>
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return card;
}

/**
 * Update the displayed language for blog posts
 */
function updateBlogPostLanguage(lang) {
    const blogCards = document.querySelectorAll('.blog-card');
    if (blogCards.length === 0) return;
    
    // Re-fetch the blog posts to get fresh data
    fetch('/data/blog-posts.json')
        .then(response => response.json())
        .then(data => {
            blogCards.forEach(card => {
                const postId = parseInt(card.getAttribute('data-post-id'), 10);
                const post = data.posts.find(p => p.id === postId);
                
                if (post) {
                    // Update title
                    const titleElement = card.querySelector('.blog-title');
                    if (titleElement) {
                        titleElement.textContent = post.title[lang] || post.title['en'] || 'Untitled';
                    }
                    
                    // Update excerpt
                    const excerptElement = card.querySelector('.blog-excerpt');
                    if (excerptElement) {
                        const content = post.content[lang] || post.content['en'] || '';
                        const plainText = content.replace(/#+\s|[*_~`]/g, '').replace(/\n/g, ' ');
                        excerptElement.textContent = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
                    }
                    
                    // Update author
                    const authorElement = card.querySelector('.blog-author span');
                    if (authorElement) {
                        authorElement.textContent = post.author[lang] || post.author['en'] || '';
                    }
                    
                    // Update date format
                    const dateElement = card.querySelector('.blog-date span');
                    if (dateElement) {
                        const postDate = new Date(post.date);
                        dateElement.textContent = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }).format(postDate);
                    }
                    
                    // Update read more button
                    const readMoreArElements = card.querySelectorAll('.blog-read-more .lang-ar');
                    const readMoreEnElements = card.querySelectorAll('.blog-read-more .lang-en');
                    
                    readMoreArElements.forEach(el => {
                        el.style.display = lang === 'ar' ? 'inline' : 'none';
                    });
                    
                    readMoreEnElements.forEach(el => {
                        el.style.display = lang === 'en' ? 'inline' : 'none';
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error updating blog post language:', error);
        });
}
