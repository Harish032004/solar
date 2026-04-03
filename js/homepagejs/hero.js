
    (function() {
        const slides = document.querySelectorAll('.sharabesh-premium-carousel__slide');
        const dots = document.querySelectorAll('.sharabesh-premium-carousel__dots .dot');
        const prevBtn = document.getElementById('premiumPrevBtn');
        const nextBtn = document.getElementById('premiumNextBtn');
        
        let currentIndex = 0;
        let slideInterval;
        const intervalTime = 3000; // 3 seconds
        
        // Function to show a specific slide
        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }
        
        // Next slide
        function nextSlide() {
            let newIndex = currentIndex + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }
        
        // Previous slide
        function prevSlide() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            showSlide(newIndex);
        }
        
        // Auto-slide functions
        function startAutoSlide() {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
        
        function stopAutoSlide() {
            if (slideInterval) clearInterval(slideInterval);
        }
        
        // Event listeners
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }
        
        // Pause on hover
        const container = document.querySelector('.sharabesh-premium-carousel__container');
        if (container) {
            container.addEventListener('mouseenter', stopAutoSlide);
            container.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Start auto-slide
        startAutoSlide();
    })();
