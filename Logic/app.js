// Global App JavaScript - Mobile Navigation and Utilities
$(document).ready(function () {
    // Mobile Menu Toggle
    $('#mobileMenuButton').on('click', function (e) {
        e.stopPropagation(); // Prevent event bubbling
        toggleMobileMenu();
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function () {
        closeMobileMenu();
    });

    // Prevent mobile menu close when clicking inside menu
    $(document).on('click', '#mobileMenu', function (e) {
        e.stopPropagation();
    });

    // Close menu when clicking on menu links
    $(document).on('click', '#mobileMenu a', function () {
        closeMobileMenu();
    });

    // Initialize other features
    initializeGlobalFeatures();
});

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = $('#mobileMenu');

    if (mobileMenu.length && mobileMenu.is(':visible')) {
        closeMobileMenu();
    } else {
        createMobileMenu();
    }
}

function createMobileMenu() {
    // Remove existing mobile menu if any
    $('#mobileMenu').remove();

    const navItems = [
        { path: 'index.html', label: 'Beranda', icon: '🏠' },
        { path: 'calculator.html', label: 'Kalkulator Skala', icon: '📐' },
        { path: 'aspect-ratio.html', label: 'Rasio Aspek', icon: '🔲' },
        { path: 'bar-scale.html', label: 'Generator Skala Batang', icon: '📏' },
        { path: 'articles.html', label: 'Artikel', icon: '📚' }
    ];

    const mobileMenuHTML = `
        <div id="mobileMenu" class="md:hidden fixed top-16 left-0 right-0 bg-white shadow-xl border-t border-blue-200 z-50 transform transition-transform duration-300 ease-in-out">
            <div class="container mx-auto px-4 py-4">
                <div class="space-y-1">
                    ${navItems.map(item => `
                        <a href="${item.path}" 
                           class="flex items-center px-4 py-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all duration-200 border-b border-gray-100 last:border-b-0">
                            <span class="text-lg mr-3">${item.icon}</span>
                            <span class="flex-1">${item.label}</span>
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    `).join('')}
                </div>
                
                <!-- Close button for mobile -->
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <button onclick="closeMobileMenu()" class="w-full flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Tutup Menu
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Backdrop -->
        <div id="mobileMenuBackdrop" class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onclick="closeMobileMenu()"></div>
    `;

    $('body').append(mobileMenuHTML);

    // Animate in
    setTimeout(() => {
        $('#mobileMenu').addClass('translate-y-0');
        $('#mobileMenuBackdrop').addClass('opacity-100');
    }, 10);
}

function closeMobileMenu() {
    const mobileMenu = $('#mobileMenu');
    const backdrop = $('#mobileMenuBackdrop');

    if (mobileMenu.length) {
        mobileMenu.removeClass('translate-y-0').addClass('-translate-y-full');
        backdrop.removeClass('opacity-100').addClass('opacity-0');

        setTimeout(() => {
            mobileMenu.remove();
            backdrop.remove();
        }, 300);
    }
}

// Global Features Initialization
function initializeGlobalFeatures() {
    // Add loading states to buttons
    $('button').on('click', function () {
        const $btn = $(this);
        if ($btn.attr('type') !== 'submit' && !$btn.hasClass('no-loading')) {
            $btn.addClass('opacity-75 cursor-not-allowed');
            setTimeout(() => {
                $btn.removeClass('opacity-75 cursor-not-allowed');
            }, 1000);
        }
    });

    // Auto-format number inputs
    $('input[type="number"]').on('blur', function () {
        const value = parseFloat($(this).val());
        if (!isNaN(value)) {
            $(this).val(formatNumber(value));
        }
    });

    // Add smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Initialize current page indicator
    highlightCurrentPage();
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('nav a').each(function () {
        const linkHref = $(this).attr('href');
        if (linkHref === currentPage) {
            $(this).addClass('bg-blue-500 text-white shadow-md');
            $(this).removeClass('text-gray-600 hover:text-blue-500 hover:bg-blue-50');
        }
    });
}

// Utility function to format numbers in inputs
function formatNumber(num) {
    if (!num && num !== 0) return '';
    return parseFloat(num).toString();
}

// Error handling for calculator operations
function handleCalculationError(error, context = 'calculation') {
    console.error(`Error in ${context}:`, error);

    const errorMessage = {
        'scale': 'Terjadi kesalahan dalam menghitung skala. Periksa input Anda.',
        'conversion': 'Terjadi kesalahan dalam konversi satuan. Periksa input Anda.',
        'aspect-ratio': 'Terjadi kesalahan dalam menghitung rasio aspek.',
        'bar-scale': 'Terjadi kesalahan dalam membuat skala batang.'
    }[context] || 'Terjadi kesalahan. Periksa input Anda.';

    // Show error toast
    showToast(errorMessage, 'error');
}

// Toast notification system
function showToast(message, type = 'info') {
    const toastId = 'toast-' + Date.now();
    const bgColor = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'warning': 'bg-yellow-500',
        'info': 'bg-blue-500'
    }[type] || 'bg-blue-500';

    const toastHTML = `
        <div id="${toastId}" class="fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300">
            <div class="flex items-center space-x-3">
                <span>${message}</span>
                <button onclick="closeToast('${toastId}')" class="text-white hover:text-gray-200">
                    ×
                </button>
            </div>
        </div>
    `;

    $('body').append(toastHTML);

    // Animate in
    setTimeout(() => {
        $(`#${toastId}`).removeClass('translate-x-full');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        closeToast(toastId);
    }, 5000);
}

function closeToast(toastId) {
    const $toast = $(`#${toastId}`);
    $toast.addClass('translate-x-full');
    setTimeout(() => {
        $toast.remove();
    }, 300);
}

// Responsive helper functions
function isMobile() {
    return window.innerWidth < 768;
}

function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
}

function isDesktop() {
    return window.innerWidth >= 1024;
}

// Debounce function for resize events
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

// Handle window resize
$(window).on('resize', debounce(function () {
    if (isDesktop()) {
        closeMobileMenu();
    }
}, 250));


// Add to app.js - Body scroll lock functions
function lockBodyScroll() {
    $('body').addClass('menu-open');
    $('body').css('overflow', 'hidden');
}

function unlockBodyScroll() {
    $('body').removeClass('menu-open');
    $('body').css('overflow', '');
}

// Update the mobile menu functions
function createMobileMenu() {
    // Remove existing mobile menu if any
    $('#mobileMenu').remove();
    $('#mobileMenuBackdrop').remove();

    const navItems = [
        { path: 'index.html', label: 'Beranda', icon: '🏠' },
        { path: 'calculator.html', label: 'Kalkulator Skala', icon: '📐' },
        { path: 'aspect-ratio.html', label: 'Rasio Aspek', icon: '🔲' },
        { path: 'bar-scale.html', label: 'Generator Skala Batang', icon: '📏' },
        { path: 'articles.html', label: 'Artikel', icon: '📚' }
    ];

    const mobileMenuHTML = `
        <!-- Backdrop -->
        <div id="mobileMenuBackdrop" class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onclick="closeMobileMenu()"></div>
        
        <!-- Mobile Menu -->
        <div id="mobileMenu" class="md:hidden fixed top-16 left-0 right-0 bg-white shadow-xl border-t border-blue-200 z-50 transform -translate-y-full transition-transform duration-300 ease-in-out">
            <div class="container mx-auto px-4 py-4">
                <div class="space-y-1">
                    ${navItems.map(item => `
                        <a href="${item.path}" 
                           class="flex items-center px-4 py-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all duration-200 border-b border-gray-100 last:border-b-0">
                            <span class="text-lg mr-3">${item.icon}</span>
                            <span class="flex-1">${item.label}</span>
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    $('body').append(mobileMenuHTML);
    lockBodyScroll();

    // Animate in
    setTimeout(() => {
        $('#mobileMenu').removeClass('-translate-y-full').addClass('translate-y-0');
        $('#mobileMenuBackdrop').addClass('opacity-100');
    }, 10);
}

function closeMobileMenu() {
    const mobileMenu = $('#mobileMenu');
    const backdrop = $('#mobileMenuBackdrop');

    if (mobileMenu.length) {
        mobileMenu.removeClass('translate-y-0').addClass('-translate-y-full');
        backdrop.removeClass('opacity-100').addClass('opacity-0');

        setTimeout(() => {
            mobileMenu.remove();
            backdrop.remove();
            unlockBodyScroll();
        }, 300);
    }
}