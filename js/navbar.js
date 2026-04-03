(function() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('menuOverlay');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Function to open mobile menu
    function openMobileMenu() {
        if (window.innerWidth <= 880) {
            navMenu.classList.add('active');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        navItems.forEach(item => {
            item.classList.remove('active-dropdown');
        });
    }
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    // Hamburger click event
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    // Overlay click closes menu
    if (overlay) {
        overlay.addEventListener('click', () => {
            closeMobileMenu();
        });
    }
    
    // Handle dropdown toggles in mobile view
    function setupMobileDropdowns() {
        if (window.innerWidth <= 880) {
            navItems.forEach(item => {
                const link = item.querySelector('.nav-link');
                const dropdown = item.querySelector('.dropdown-menu');
                if (dropdown && link) {
                    link.removeEventListener('click', mobileDropdownHandler);
                    link.addEventListener('click', mobileDropdownHandler);
                }
            });
        } else {
            navItems.forEach(item => {
                const link = item.querySelector('.nav-link');
                if (link) {
                    link.removeEventListener('click', mobileDropdownHandler);
                }
                if (item.classList.contains('active-dropdown')) {
                    item.classList.remove('active-dropdown');
                }
            });
        }
    }
    
    // Handler for dropdown toggles on mobile
    function mobileDropdownHandler(e) {
        if (window.innerWidth <= 880) {
            e.preventDefault();
            e.stopPropagation();
            const parentItem = this.closest('.nav-item');
            if (!parentItem) return;
            
            const dropdownMenu = parentItem.querySelector('.dropdown-menu');
            if (!dropdownMenu) return;
            
            parentItem.classList.toggle('active-dropdown');
            
            navItems.forEach(otherItem => {
                if (otherItem !== parentItem && otherItem.classList.contains('active-dropdown')) {
                    otherItem.classList.remove('active-dropdown');
                }
            });
        }
    }
    
    // Handle regular links (no dropdown) - CLOSE menu and navigate
    function handleSimpleLinks() {
        const allNavLinks = document.querySelectorAll('.nav-link');
        allNavLinks.forEach(link => {
            const parentItem = link.closest('.nav-item');
            const hasDropdown = parentItem ? parentItem.querySelector('.dropdown-menu') : null;
            if (!hasDropdown) {
                link.removeEventListener('click', simpleLinkHandler);
                link.addEventListener('click', simpleLinkHandler);
            }
        });
    }
    
    function simpleLinkHandler(e) {
        if (window.innerWidth <= 880) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href !== '') {
                closeMobileMenu();
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            } else {
                e.preventDefault();
                closeMobileMenu();
                console.log('Navigation to:', this.innerText);
            }
        }
    }
    
    // Handle dropdown menu items (actual links inside dropdown)
    // FIXED: These should navigate and close the menu
    function handleDropdownItemClicks() {
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.removeEventListener('click', dropdownItemHandler);
            link.addEventListener('click', dropdownItemHandler);
        });
    }
    
    function dropdownItemHandler(e) {
        if (window.innerWidth <= 880) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href !== '') {
                e.preventDefault();
                closeMobileMenu();
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            } else {
                e.preventDefault();
                closeMobileMenu();
                console.log('Dropdown navigation to:', this.innerText);
            }
        }
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || (hamburger && hamburger.contains(event.target));
        if (!isClickInsideNav && navMenu.classList.contains('active') && window.innerWidth <= 880) {
            closeMobileMenu();
        }
    });
    
    // Prevent clicks inside navMenu from bubbling
    if (navMenu) {
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // On window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 880) {
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
            navItems.forEach(item => {
                item.classList.remove('active-dropdown');
            });
        } else {
            if (!navMenu.classList.contains('active') && overlay) {
                overlay.classList.remove('active');
            }
        }
        setupMobileDropdowns();
        handleSimpleLinks();
        handleDropdownItemClicks();
    });
    
    // Escape key closes menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // CTA button - closes menu and navigates
    const ctaButton = document.querySelector('.nav-cta .cta-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            if (window.innerWidth <= 880) {
                e.preventDefault();
                const href = this.getAttribute('href');
                closeMobileMenu();
                if (href && href !== '#' && href !== '') {
                    setTimeout(() => {
                        window.location.href = href;
                    }, 150);
                } else {
                    console.log('CTA clicked - get free solar quote');
                }
            }
        });
    }
    
    // Initial setup
    setupMobileDropdowns();
    handleSimpleLinks();
    handleDropdownItemClicks();
    
    console.log('Mobile menu initialized - dropdown items now navigate and close menu properly');
})();
