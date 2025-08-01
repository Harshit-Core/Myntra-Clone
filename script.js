// Navigation Elements
const men_section = document.querySelector('.men');
const women_section = document.querySelector('.women');
const kids_section = document.querySelector('.kids');
const home_section = document.querySelector('.homeliving');
const beauty_section = document.querySelector('.beauty');
const men_section_items = document.querySelector('.men-section-items');
const women_section_items = document.querySelector('.women-section-items');
const kids_section_items = document.querySelector('.kids-section-items');
const home_section_items = document.querySelector('.home-section-items');
const beauty_section_items = document.querySelector('.beauty-section-items');

// New Feature Elements
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchResults = document.getElementById('searchResults');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartCount = document.getElementById('cartCount');
const wishlistBtn = document.getElementById('wishlistBtn');
const wishlistCount = document.getElementById('wishlistCount');
const themeToggle = document.getElementById('themeToggle');

// Profile Elements
const profileBtn = document.querySelector('.profile');
const profileModal = document.getElementById('profileModal');
const profileOverlay = document.getElementById('profileOverlay');
const profileClose = document.getElementById('profileClose');

// Wishlist Modal Elements
const wishlistModal = document.getElementById('wishlistModal');
const wishlistOverlay = document.getElementById('wishlistOverlay');
const wishlistCloseBtn = document.getElementById('wishlistClose');

// Quick View Elements
const quickViewModal = document.getElementById('quickViewModal');
const quickViewOverlay = document.getElementById('quickViewOverlay');
const quickViewClose = document.getElementById('quickViewClose');

// Data
let cart = [];
let wishlist = [];
let currentTheme = 'light';

// Sample Products Data
const sampleProducts = [
    {
        id: 1,
        name: "Classic T-Shirt",
        brand: "H&M",
        price: 999,
        image: "https://raw.githubusercontent.com/Harshit-Core/Myntra-Clone/refs/heads/main/db1.avif",
        rating: 4.2,
        category: "men"
    },
    {
        id: 2,
        name: "Casual Jeans",
        brand: "Levi's",
        price: 2499,
        image: "https://raw.githubusercontent.com/Harshit-Core/Myntra-Clone/refs/heads/main/db2.jpeg",
        rating: 4.5,
        category: "men"
    },
    {
        id: 3,
        name: "Summer Dress",
        brand: "Zara",
        price: 1999,
        image: "https://raw.githubusercontent.com/Harshit-Core/Myntra-Clone/refs/heads/main/db3.jpeg",
        rating: 4.3,
        category: "women"
    },
    {
        id: 4,
        name: "Running Shoes",
        brand: "Nike",
        price: 4999,
        image: "https://raw.githubusercontent.com/Harshit-Core/Myntra-Clone/refs/heads/main/db4.jpeg",
        rating: 4.7,
        category: "men"
    },
    {
        id: 5,
        name: "Kids T-Shirt",
        brand: "Gap",
        price: 799,
        image: "https://raw.githubusercontent.com/Harshit-Core/Myntra-Clone/refs/heads/main/db5.avif",
        rating: 4.1,
        category: "kids"
    }
];

// Quick View State
let currentQuickViewProduct = null;
let selectedSize = null;
let selectedColor = null;
let productQuantity = 1;

// Search functionality
const searchSuggestionsList = [
    "T-shirts", "Jeans", "Dresses", "Shoes", "Jackets",
    "Nike", "Adidas", "H&M", "Zara", "Levi's",
    "Men's Fashion", "Women's Fashion", "Kids Wear"
];

// Navigation hover effects
men_section.onmouseover = () => {
    men_section_items.classList.remove('visibility');
}
men_section.onmouseout = () => {
    men_section_items.classList.add('visibility');
}

women_section.onmouseover = () => {
    women_section_items.classList.remove('visibility');
}
women_section.onmouseout = () => {
    women_section_items.classList.add('visibility');
}

kids_section.onmouseover = () => {
    kids_section_items.classList.remove('visibility');
}
kids_section.onmouseout = () => {
    kids_section_items.classList.add('visibility');
}

home_section.onmouseover = () => {
    home_section_items.classList.remove('visibility');
}
home_section.onmouseout = () => {
    home_section_items.classList.add('visibility');
}

beauty_section.onmouseover = () => {
    beauty_section_items.classList.remove('visibility');
}
beauty_section.onmouseout = () => {
    beauty_section_items.classList.add('visibility');
}

// Search Functionality
searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    
    if (query.length > 0) {
        const filteredSuggestions = searchSuggestionsList.filter(item => 
            item.toLowerCase().includes(query)
        );
        
        displaySearchSuggestions(filteredSuggestions);
    } else {
        hideSearchSuggestions();
    }
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch(e.target.value);
    }
});

function displaySearchSuggestions(suggestions) {
    if (suggestions.length === 0) {
        hideSearchSuggestions();
        return;
    }
    
    const suggestionsHTML = suggestions.map(suggestion => 
        `<div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">${suggestion}</div>`
    ).join('');
    
    searchSuggestions.innerHTML = suggestionsHTML;
    searchSuggestions.style.display = 'block';
}

function hideSearchSuggestions() {
    searchSuggestions.style.display = 'none';
}

function selectSuggestion(suggestion) {
    searchInput.value = suggestion;
    hideSearchSuggestions();
    performSearch(suggestion);
}

function performSearch(query) {
    // Hide category sections
    hideAllSections();
    
    // Show search results
    document.getElementById('searchQuery').textContent = query;
    const filteredProducts = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
    );
    
    document.getElementById('resultsCount').textContent = filteredProducts.length;
    displayProducts(filteredProducts, 'productsGrid');
    searchResults.style.display = 'block';
}

function hideAllSections() {
    const sections = ['.men-section-items', '.women-section-items', '.kids-section-items', 
                     '.home-section-items', '.beauty-section-items', '.container', 
                     '.section', '.section1', '.section2', '.section3', '.section4', 
                     '.section5', '.section6', '.section7', '.section8'];
    
    sections.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.style.display = 'none');
    });
}

// Product Display
function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    
    const productsHTML = products.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-price">₹${product.price}</div>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}</span>
                    <span>(${product.rating})</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        Add to Cart
                    </button>
                    <button class="add-to-wishlist" onclick="event.stopPropagation(); addToWishlist(${product.id})">
                        ♡
                    </button>
                    <button class="quick-view-btn" onclick="event.stopPropagation(); openQuickView(${product.id})">
                        Quick View
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = productsHTML;
}

// Cart Functionality
function addToCart(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification('Added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa fa-shopping-bag"></i>
                <p>Your bag is empty</p>
                <p>Add some items to get started</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        const cartHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; background: #ff6b6b; color: white;">×</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        cartItems.innerHTML = cartHTML;
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cartTotal').textContent = total;
        cartFooter.style.display = 'block';
    }
}

// Wishlist Functionality
function addToWishlist(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    const existingItem = wishlist.find(item => item.id === productId);
    
    if (!existingItem) {
        wishlist.push(product);
        updateWishlistUI();
        showNotification('Added to wishlist!');
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    updateWishlistUI();
    showNotification('Removed from wishlist!');
}

function moveToCartFromWishlist(productId) {
    addToCart(productId);
    removeFromWishlist(productId);
    showNotification('Moved to cart!');
}

function updateWishlistUI() {
    wishlistCount.textContent = wishlist.length;
    
    // Update wishlist modal content
    const wishlistItems = document.getElementById('wishlistItems');
    const wishlistFooter = document.getElementById('wishlistFooter');
    
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <i class="fa fa-heart-o"></i>
                <p>Your wishlist is empty</p>
                <p>Add items you love to your wishlist</p>
            </div>
        `;
        wishlistFooter.style.display = 'none';
    } else {
        const wishlistHTML = wishlist.map(item => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="wishlist-item-details">
                    <div class="wishlist-item-name">${item.name}</div>
                    <div class="wishlist-item-price">₹${item.price}</div>
                    <div class="wishlist-item-actions">
                        <button class="move-to-bag-btn" onclick="moveToCartFromWishlist(${item.id})">Move to Bag</button>
                        <button class="remove-wishlist-btn" onclick="removeFromWishlist(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        wishlistItems.innerHTML = wishlistHTML;
        wishlistFooter.style.display = 'block';
    }
}

// Quick View Functionality
function openQuickView(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    currentQuickViewProduct = product;
    
    // Populate quick view modal
    document.getElementById('quickViewBrand').textContent = product.brand;
    document.getElementById('quickViewName').textContent = product.name;
    document.getElementById('quickViewPrice').textContent = `₹${product.price}`;
    document.getElementById('quickViewRating').innerHTML = `
        <span class="stars">${'★'.repeat(Math.floor(product.rating))}</span>
        <span>(${product.rating})</span>
    `;
    
    // Set main image
    document.getElementById('quickViewMainImage').src = product.image;
    
    // Generate thumbnail images (using same image for demo)
    const thumbnailContainer = document.getElementById('thumbnailImages');
    thumbnailContainer.innerHTML = `
        <img src="${product.image}" alt="View 1" class="active" onclick="changeMainImage('${product.image}')">
        <img src="${product.image}" alt="View 2" onclick="changeMainImage('${product.image}')">
        <img src="${product.image}" alt="View 3" onclick="changeMainImage('${product.image}')">
    `;
    
    // Reset selections
    resetQuickViewSelections();
    
    // Show modal
    quickViewModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function changeMainImage(imageSrc) {
    document.getElementById('quickViewMainImage').src = imageSrc;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('#thumbnailImages img');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    event.target.classList.add('active');
}

function resetQuickViewSelections() {
    selectedSize = null;
    selectedColor = null;
    productQuantity = 1;
    
    // Reset size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Reset color options
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Reset quantity
    document.getElementById('productQuantity').textContent = '1';
}

function closeQuickView() {
    quickViewModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentQuickViewProduct = null;
}

// Modal Controls
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

cartClose.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

cartOverlay.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Profile Modal Controls
profileBtn.addEventListener('click', () => {
    profileModal.style.display = 'block';
});

profileClose.addEventListener('click', () => {
    profileModal.style.display = 'none';
});

profileOverlay.addEventListener('click', () => {
    profileModal.style.display = 'none';
});

// Wishlist Modal Controls
wishlistBtn.addEventListener('click', () => {
    updateWishlistUI();
    wishlistModal.style.display = 'block';
});

wishlistCloseBtn.addEventListener('click', () => {
    wishlistModal.style.display = 'none';
});

wishlistOverlay.addEventListener('click', () => {
    wishlistModal.style.display = 'none';
});

// Move All to Bag functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('move-all-to-bag-btn')) {
        wishlist.forEach(item => {
            addToCart(item.id);
        });
        wishlist = [];
        updateWishlistUI();
        wishlistModal.style.display = 'none';
        showNotification('All items moved to cart!');
    }
});

// Profile Menu Item Handlers
document.addEventListener('click', function(e) {
    if (e.target.closest('.menu-item')) {
        const menuItem = e.target.closest('.menu-item');
        const menuText = menuItem.querySelector('span').textContent;
        
        switch(menuText) {
            case 'My Orders':
                showNotification('Orders section - Coming Soon!');
                break;
            case 'My Wishlist':
                profileModal.style.display = 'none';
                wishlistModal.style.display = 'block';
                updateWishlistUI();
                break;
            case 'Account Settings':
                showNotification('Account Settings - Coming Soon!');
                break;
            case 'Saved Addresses':
                showNotification('Saved Addresses - Coming Soon!');
                break;
            case 'Payment Methods':
                showNotification('Payment Methods - Coming Soon!');
                break;
            case 'Myntra Insider':
                showNotification('Myntra Insider - Coming Soon!');
                break;
            case 'Help & Support':
                showNotification('Help & Support - Coming Soon!');
                break;
            case 'Logout':
                showNotification('Logout - Coming Soon!');
                break;
        }
    }
});

// Quick View Modal Controls
quickViewClose.addEventListener('click', closeQuickView);
quickViewModal.addEventListener('click', function(e) {
    if (e.target === quickViewModal) {
        closeQuickView();
    }
});

// Size Selection
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('size-btn')) {
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        e.target.classList.add('selected');
        selectedSize = e.target.textContent;
    }
});

// Color Selection
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('color-option')) {
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('selected');
        });
        e.target.classList.add('selected');
        selectedColor = e.target.getAttribute('data-color');
    }
});

// Quantity Controls
document.getElementById('decreaseQty').addEventListener('click', function() {
    if (productQuantity > 1) {
        productQuantity--;
        document.getElementById('productQuantity').textContent = productQuantity;
    }
});

document.getElementById('increaseQty').addEventListener('click', function() {
    if (productQuantity < 10) {
        productQuantity++;
        document.getElementById('productQuantity').textContent = productQuantity;
    }
});

// Add to Cart from Quick View
document.getElementById('addToCartQuick').addEventListener('click', function() {
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }
    if (!selectedColor) {
        alert('Please select a color');
        return;
    }
    
    // For Quick View, we'll add to cart with the current product ID
    // The size and color selection is just for UX demonstration
    addToCart(currentQuickViewProduct.id);
    closeQuickView();
});

// Add to Wishlist from Quick View
document.getElementById('addToWishlistQuick').addEventListener('click', function() {
    addToWishlist(currentQuickViewProduct.id);
    closeQuickView();
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && quickViewModal.style.display === 'block') {
        closeQuickView();
    }
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fa fa-sun-o';
    } else {
        icon.className = 'fa fa-moon-o';
    }
    
    // Save theme preference
    localStorage.setItem('theme', currentTheme);
});

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fa fa-sun-o';
    } else {
        icon.className = 'fa fa-moon-o';
    }
    
    // Load sample products on homepage
    const mainGrid = document.getElementById('mainProductsGrid');
    if (mainGrid) {
        displayProducts(sampleProducts, 'mainProductsGrid');
    }
});

// Utility Functions
function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function viewProduct(productId) {
    showNotification(`Viewing product ${productId}`);
    // Here you would typically navigate to a product detail page
}

// Hide search suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        hideSearchSuggestions();
    }
});

// Category navigation (make categories clickable)
document.querySelectorAll('.category-items').forEach(categoryItems => {
    categoryItems.addEventListener('click', (e) => {
        if (e.target.textContent.trim()) {
            performSearch(e.target.textContent.trim());
        }
    });
});

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
