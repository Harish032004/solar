
    document.addEventListener('DOMContentLoaded', () => {
        const track = document.getElementById('testimonialTrack');
        const originalCards = Array.from(track.children);
        
        // Setup clones for seamless infinite scroll
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });

        let index = 0;
        const totalOriginalCards = originalCards.length;

        function moveCarousel() {
            index++;
            
            const cardHeight = originalCards[0].offsetHeight + 20; // 20 is the gap
            
            track.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)';
            track.style.transform = `translateY(-${index * cardHeight}px)`;

            if (index === totalOriginalCards) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    index = 0;
                    track.style.transform = `translateY(0)`;
                }, 1000); 
            }
        }

        setInterval(moveCarousel, 3000);
    });
