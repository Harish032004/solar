
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
                document.body.style.overflow = 'hidden'; // prevent background scroll
            }
        }
        
        // Function to close mobile menu
        function closeMobileMenu() {
            navMenu.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
            // Also close any open dropdowns when menu closes
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
        
        // Handle dropdown toggles in mobile view (prevent menu from closing)
        function setupMobileDropdowns() {
            if (window.innerWidth <= 880) {
                navItems.forEach(item => {
                    const link = item.querySelector('.nav-link');
                    const dropdown = item.querySelector('.dropdown-menu');
                    if (dropdown && link) {
                        // Remove existing listener to avoid duplication
                        link.removeEventListener('click', mobileDropdownHandler);
                        link.addEventListener('click', mobileDropdownHandler);
                    }
                });
            } else {
                // On desktop, remove active dropdown classes and event listeners
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
        
        // Handler for dropdown toggles on mobile (does NOT close the hamburger menu)
        function mobileDropdownHandler(e) {
            if (window.innerWidth <= 880) {
                e.preventDefault();
                e.stopPropagation();
                const parentItem = this.closest('.nav-item');
                if (!parentItem) return;
                
                const dropdownMenu = parentItem.querySelector('.dropdown-menu');
                if (!dropdownMenu) return;
                
                // Toggle the active-dropdown class on this nav-item
                parentItem.classList.toggle('active-dropdown');
                
                // Close other open dropdowns for better UX
                navItems.forEach(otherItem => {
                    if (otherItem !== parentItem && otherItem.classList.contains('active-dropdown')) {
                        otherItem.classList.remove('active-dropdown');
                    }
                });
            }
        }
        
        // For regular links without dropdown (Our Presence, Blog) - close menu after click (optional)
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
                // For links without dropdown, close the mobile menu after click (typical navigation behavior)
                // But don't close if it's just a dummy anchor
                e.preventDefault();
                closeMobileMenu();
                // Optionally simulate navigation
                console.log('Navigating to:', this.innerText);
            }
        }
        
        // Handle clicks on dropdown menu items (actual links inside dropdown)
        // These should NOT close the hamburger menu - keep it open for better UX
        function handleDropdownItemClicks() {
            const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
            dropdownLinks.forEach(link => {
                link.removeEventListener('click', dropdownItemHandler);
                link.addEventListener('click', dropdownItemHandler);
            });
        }
        
        function dropdownItemHandler(e) {
            if (window.innerWidth <= 880) {
                e.preventDefault();
                e.stopPropagation();
                // Do NOT close the hamburger menu - keep it open
                // Just log or perform action
                console.log('Dropdown item clicked, menu stays open:', this.innerText);
                // If you want to actually navigate and keep menu open, you could redirect but menu would stay.
                // For demo we prevent default to show the behavior.
                alert(`You clicked: ${this.innerText}\nMobile menu remains open.`);
            }
        }
        
        // Close menu when clicking outside via document (already handled by overlay, but additional safety)
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || (hamburger && hamburger.contains(event.target));
            if (!isClickInsideNav && navMenu.classList.contains('active') && window.innerWidth <= 880) {
                closeMobileMenu();
            }
        });
        
        // Prevent clicks inside navMenu from bubbling to document (to avoid accidental closing)
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // On window resize, if switching to desktop, ensure menu is closed and dropdowns reset
        window.addEventListener('resize', function() {
            if (window.innerWidth > 880) {
                if (navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                navItems.forEach(item => {
                    item.classList.remove('active-dropdown');
                });
            } else {
                // Ensure overlay is hidden if menu not active
                if (!navMenu.classList.contains('active') && overlay) {
                    overlay.classList.remove('active');
                }
            }
            setupMobileDropdowns();
            handleSimpleLinks();
            handleDropdownItemClicks();
        });
        
        // Also handle escape key to close menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Initial setup
        setupMobileDropdowns();
        handleSimpleLinks();
        handleDropdownItemClicks();
        
        // Additional fix: when clicking on the CTA button inside mobile menu, close menu? Usually it's a primary action.
        const ctaButton = document.querySelector('.nav-cta .cta-primary');
        if (ctaButton) {
            ctaButton.addEventListener('click', function(e) {
                if (window.innerWidth <= 880) {
                    e.preventDefault();
                    console.log('CTA clicked - closing menu');
                    closeMobileMenu();
                    alert('Get Free Solar Quote - demo action');
                }
            });
        }
        
        // For "Our Offerings", "Solar Solutions", "More" - ensure dropdown toggle doesn't close menu
        // Already handled by mobileDropdownHandler
        
        console.log('Mobile menu initialized - hamburger works, dropdowns stay open inside menu');
    })();
