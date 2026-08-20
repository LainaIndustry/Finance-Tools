/**
 * Loan & Finance Calculators - Main JavaScript
 * Handles navigation, search, and shared functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== Hamburger Menu =====
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu on link click
        mobileNav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ===== Search Functionality =====
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // List of all calculators for search
    const calculators = [
        { name: 'EMI Calculator', slug: '/emi-calculator.html', category: 'loan' },
        { name: 'Loan Calculator', slug: '/loan-calculator.html', category: 'loan' },
        { name: 'Personal Loan Calculator', slug: '/personal-loan-calculator.html', category: 'loan' },
        { name: 'Home Loan Calculator', slug: '/home-loan-calculator.html', category: 'loan' },
        { name: 'Car Loan Calculator', slug: '/car-loan-calculator.html', category: 'loan' },
        { name: 'Mortgage Calculator', slug: '/mortgage-calculator.html', category: 'loan' },
        { name: 'Loan Affordability Calculator', slug: '/affordability-calculator.html', category: 'loan' },
        { name: 'Amortization Calculator', slug: '/amortization-calculator.html', category: 'loan' },
        { name: 'Simple Interest Calculator', slug: '/simple-interest-calculator.html', category: 'interest' },
        { name: 'Compound Interest Calculator', slug: '/compound-interest-calculator.html', category: 'interest' },
        { name: 'SIP Calculator', slug: '/sip-calculator.html', category: 'investment' },
        { name: 'FD Calculator', slug: '/fd-calculator.html', category: 'savings' },
        { name: 'RD Calculator', slug: '/rd-calculator.html', category: 'savings' },
        { name: 'Investment Calculator', slug: '/investment-calculator.html', category: 'investment' },
        { name: 'Interest Calculator', slug: '/interest-calculator.html', category: 'interest' },
        { name: 'Savings Calculator', slug: '/savings-calculator.html', category: 'savings' },
    ];

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            // Show all calculators in a dropdown or message
            return;
        }

        const results = calculators.filter(function(calc) {
            return calc.name.toLowerCase().includes(query) || 
                   calc.category.includes(query);
        });

        if (results.length === 0) {
            alert('No calculators found. Try searching for "EMI", "loan", "investment", or "interest".');
            return;
        }

        if (results.length === 1) {
            window.location.href = results[0].slug;
        } else {
            // Redirect to calculators page with search param
            const searchParams = new URLSearchParams();
            searchParams.set('search', query);
            window.location.href = '/calculators.html?' + searchParams.toString();
        }
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

    // ===== Popular Calculator Cards =====
    const popularCalculators = [
        { name: 'EMI Calculator', icon: '📊', desc: 'Calculate monthly EMI', link: '/emi-calculator.html' },
        { name: 'Loan Calculator', icon: '🏦', desc: 'Total loan cost', link: '/loan-calculator.html' },
        { name: 'Personal Loan', icon: '💳', desc: 'Personal loan EMI', link: '/personal-loan-calculator.html' },
        { name: 'Home Loan', icon: '🏠', desc: 'Home loan EMI', link: '/home-loan-calculator.html' },
        { name: 'Car Loan', icon: '🚗', desc: 'Car loan EMI', link: '/car-loan-calculator.html' },
        { name: 'Mortgage', icon: '🏡', desc: 'Mortgage payment', link: '/mortgage-calculator.html' },
        { name: 'Compound Interest', icon: '📈', desc: 'Compound growth', link: '/compound-interest-calculator.html' },
        { name: 'SIP Calculator', icon: '💰', desc: 'SIP returns', link: '/sip-calculator.html' },
        { name: 'FD Calculator', icon: '🏦', desc: 'Fixed deposit', link: '/fd-calculator.html' },
        { name: 'RD Calculator', icon: '📆', desc: 'Recurring deposit', link: '/rd-calculator.html' },
    ];

    const cardContainer = document.getElementById('popularCards');
    if (cardContainer) {
        popularCalculators.forEach(function(calc) {
            const card = document.createElement('div');
            card.className = 'calc-card';
            card.innerHTML = 
                '<span class="icon">' + calc.icon + '</span>' +
                '<h3>' + calc.name + '</h3>' +
                '<p>' + calc.desc + '</p>' +
                '<a href="' + calc.link + '" class="btn">Calculate Now</a>';
            cardContainer.appendChild(card);
        });
    }

    // ===== Category Pill Click Handler =====
    document.querySelectorAll('.category-pill').forEach(function(pill) {
        pill.addEventListener('click', function() {
            const text = this.textContent.trim();
            // Map category to a search term
            let searchTerm = '';
            if (text.includes('Loan')) searchTerm = 'loan';
            else if (text.includes('Investment')) searchTerm = 'investment';
            else if (text.includes('Interest')) searchTerm = 'interest';
            else if (text.includes('Savings')) searchTerm = 'savings';
            else if (text.includes('Mortgage')) searchTerm = 'mortgage';
            else if (text.includes('Personal Finance')) searchTerm = 'loan';
            
            if (searchTerm) {
                window.location.href = '/calculators.html?search=' + encodeURIComponent(searchTerm);
            }
        });
    });

    // ===== Utility: Format Currency =====
    window.formatCurrency = function(amount, currency = '₹') {
        if (isNaN(amount) || !isFinite(amount)) return currency + '0';
        return currency + Number(amount).toLocaleString('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    };

    // ===== Utility: Format Number =====
    window.formatNumber = function(num) {
        if (isNaN(num) || !isFinite(num)) return '0';
        return Number(num).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    console.log('Loan & Finance Calculators loaded successfully.');
});
