document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
    // Button hover effects - ripple
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Subtle entrance animations for nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.animation = `fadeInDown 0.5s ease-out ${index * 0.1}s forwards`;
    });

    // Scroll Reveal effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Advanced Math-based Carousel Logic
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const track = document.querySelector('.carousel-track');
        const cards = Array.from(document.querySelectorAll('.carousel-card'));
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        const dots = Array.from(document.querySelectorAll('.dot'));
        
        const cardWidth = 350; // width (320px) + gap (30px)
        const totalCards = cards.length;
        const totalWidth = totalCards * cardWidth;
        
        let targetOffset = 0;
        let currentOffset = 0;
        let activeIndex = 0;
        let autoplayInterval;
        
        function render() {
            // Smooth ease
            currentOffset += (targetOffset - currentOffset) * 0.08;
            
            cards.forEach((card, i) => {
                let physicalPos = (i * cardWidth) - currentOffset;
                
                // Geometry wrapping for seamless infinite scroll
                while (physicalPos < -totalWidth / 2) physicalPos += totalWidth;
                while (physicalPos > totalWidth / 2) physicalPos -= totalWidth;
                
                let absPos = Math.abs(physicalPos);
                let scale, opacity, zIndex, translateY;
                
                if (absPos < cardWidth) {
                    let ratio = absPos / cardWidth; // 0 to 1
                    scale = 1.15 - (0.2 * ratio); 
                    opacity = 1 - (0.3 * ratio);
                    zIndex = 10 - Math.round(ratio*5);
                    translateY = ratio * 15; // Un-lift as it moves away
                } else {
                    scale = 0.95;
                    opacity = 0.7;
                    zIndex = 1;
                    translateY = 15;
                }
                
                card.style.transform = `translate(${physicalPos}px, ${translateY}px) scale(${scale})`;
                card.style.opacity = opacity;
                card.style.zIndex = zIndex;
                
                if (absPos < cardWidth * 0.5) {
                    card.classList.add('active');
                    activeIndex = i;
                    updateDots();
                } else {
                    card.classList.remove('active');
                }
            });
            
            requestAnimationFrame(render);
        }
        
        requestAnimationFrame(render);
        
        function resetAutoplay() {
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(() => {
                targetOffset += cardWidth;
            }, 2500);
        }
        
        nextBtn.addEventListener('click', () => { targetOffset += cardWidth; resetAutoplay(); });
        prevBtn.addEventListener('click', () => { targetOffset -= cardWidth; resetAutoplay(); });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                let diff = index - activeIndex;
                if (diff > totalCards/2) diff -= totalCards;
                if (diff < -totalCards/2) diff += totalCards;
                targetOffset += diff * cardWidth;
                resetAutoplay();
            });
        });
        
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }
    
        // Drag Handling
        let isDragging = false;
        let startX = 0;
        let dragStartOffset = 0;
        
        function touchStart(e) {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            dragStartOffset = targetOffset;
            track.style.cursor = 'grabbing';
            clearInterval(autoplayInterval);
        }
        
        function touchMove(e) {
            if (!isDragging) return;
            const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            const walked = (startX - x) * 1.5; 
            targetOffset = dragStartOffset + walked;
        }
        
        function touchEnd() {
            if (!isDragging) return;
            isDragging = false;
            track.style.cursor = 'grab';
            targetOffset = Math.round(targetOffset / cardWidth) * cardWidth;
            resetAutoplay();
        }
        
        track.addEventListener('mousedown', touchStart);
        track.addEventListener('touchstart', touchStart, {passive: true});
        track.addEventListener('mousemove', touchMove);
        track.addEventListener('touchmove', touchMove, {passive: true});
        document.addEventListener('mouseup', () => { if(isDragging) touchEnd(); });
        track.addEventListener('touchend', touchEnd);
        
        resetAutoplay(); // start autoplay immediately on load
    }
});
