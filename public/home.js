document.addEventListener("DOMContentLoaded", function() {
    // Ripple effect for course cards
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 50px;
                height: 50px;
                background: rgba(255,255,255,0.4);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: ripple 0.6s linear;
            `;
            
            const rect = card.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.target.closest('.course-card')?.click();
        }
    });

    // Animate progress bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.progress');
                progress.style.width = progress.style.width;
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.progress-bar').forEach(bar => {
        observer.observe(bar);
    });
});