
    (function() {
        const carousel = document.getElementById('blogCarousel');
        const prevBtn = document.getElementById('blogPrevBtn');
        const nextBtn = document.getElementById('blogNextBtn');
        const dots = document.querySelectorAll('#blogDots .dot');
        
        let currentIndex = 0;
        let cardsPerView = 3;
        let totalCards = 6;
        
        // Function to update cards per view based on screen width
        function updateCardsPerView() {
            if (window.innerWidth <= 768) {
                cardsPerView = 1;
            } else if (window.innerWidth <= 1024) {
                cardsPerView = 2;
            } else {
                cardsPerView = 3;
            }
            updateDotsActive();
        }
        
        // Get card width including gap
        function getCardWidth() {
            const cards = document.querySelectorAll('.sharabesh-blog__card');
            if (cards.length === 0) return 0;
            const card = cards[0];
            const style = getComputedStyle(card);
            const width = card.offsetWidth;
            const gap = 32; // gap from CSS
            return width + gap;
        }
        
        // Scroll to specific index
        function scrollToIndex(index) {
            const cardWidth = getCardWidth();
            if (cardWidth === 0) return;
            
            const maxIndex = totalCards - cardsPerView;
            if (index < 0) index = 0;
            if (index > maxIndex) index = maxIndex;
            
            carousel.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            currentIndex = index;
            updateDotsActive();
        }
        
        // Update active dot based on current index
        function updateDotsActive() {
            const maxIndex = totalCards - cardsPerView;
            const activeDotIndex = Math.min(currentIndex, maxIndex);
            
            dots.forEach((dot, idx) => {
                if (idx === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Handle scroll event to update current index and dots
        function handleScroll() {
            const scrollLeft = carousel.scrollLeft;
            const cardWidth = getCardWidth();
            if (cardWidth === 0) return;
            
            const newIndex = Math.round(scrollLeft / cardWidth);
            const maxIndex = totalCards - cardsPerView;
            
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= maxIndex) {
                currentIndex = newIndex;
                updateDotsActive();
            }
        }
        
        // Next slide
        function nextSlide() {
            const maxIndex = totalCards - cardsPerView;
            if (currentIndex < maxIndex) {
                scrollToIndex(currentIndex + 1);
            } else {
                scrollToIndex(0); // Loop back to start
            }
        }
        
        // Previous slide
        function prevSlide() {
            if (currentIndex > 0) {
                scrollToIndex(currentIndex - 1);
            } else {
                const maxIndex = totalCards - cardsPerView;
                scrollToIndex(maxIndex); // Loop to end
            }
        }
        
        // Dot click handler
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                const maxIndex = totalCards - cardsPerView;
                if (idx <= maxIndex) {
                    scrollToIndex(idx);
                }
            });
        });
        
        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (carousel) carousel.addEventListener('scroll', handleScroll);
        
        // Update on resize
        window.addEventListener('resize', () => {
            updateCardsPerView();
            setTimeout(() => {
                scrollToIndex(currentIndex);
            }, 100);
        });
        
        // Initialize
        updateCardsPerView();
        setTimeout(() => {
            scrollToIndex(0);
        }, 100);
        
        // Auto-scroll every 5 seconds
        let autoScrollInterval = setInterval(() => {
            const maxIndex = totalCards - cardsPerView;
            if (currentIndex >= maxIndex) {
                scrollToIndex(0);
            } else {
                scrollToIndex(currentIndex + 1);
            }
        }, 5000);
        
        // Pause auto-scroll on hover
        const carouselWrapper = document.querySelector('.sharabesh-blog__carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', () => {
                clearInterval(autoScrollInterval);
            });
            carouselWrapper.addEventListener('mouseleave', () => {
                autoScrollInterval = setInterval(() => {
                    const maxIndex = totalCards - cardsPerView;
                    if (currentIndex >= maxIndex) {
                        scrollToIndex(0);
                    } else {
                        scrollToIndex(currentIndex + 1);
                    }
                }, 5000);
            });
        }
    })();
