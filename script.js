document.addEventListener("DOMContentLoaded", () => {
    // --- INITIAL SETUP ---
    gsap.registerPlugin(ScrollTrigger);

    // Page Load Fade
    gsap.to("body", { opacity: 1, duration: 0.8, ease: "power2.out" });

    // Initialize Lenis (Smooth Scroll) - Only for Desktop
    let lenis;
    if (typeof Lenis !== 'undefined' && window.innerWidth > 1024) {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Robust Scroll Function
    window.scrollToSection = (id) => {
        const target = document.querySelector(id);
        if (!target) return;
        
        if (lenis && window.innerWidth > 1024) {
            lenis.scrollTo(target);
        } else {
            target.scrollIntoView({ behavior: "smooth" });
        }
        
        // Close mobile menu if open
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        if (mobileOverlay) {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    // --- NAVBAR LOGIC ---
    const navbar = document.querySelector('.navbar-wrapper');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMobile = document.querySelector('.close-mobile-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMobile) {
        closeMobile.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // --- HERO ANIMATIONS ---
    gsap.from(".hero-text-wrap", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.4
    });

    // --- SECTION 2: 3D CAROUSEL (LAPTOP ONLY) ---
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    const nextBtn = document.querySelector('.nav-arrow:last-child');
    const prevBtn = document.querySelector('.nav-arrow:first-child');
    
    if (track && window.innerWidth > 768) {
        let currentIndex = 4; // Center card (Luxurious Living)

        function updateCarousel() {
            cards.forEach((card, index) => {
                card.classList.remove('active', 'side');
                if (index === currentIndex) {
                    card.classList.add('active');
                    gsap.to(card, { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" });
                } else {
                    card.classList.add('side');
                    gsap.to(card, { scale: 0.85, opacity: 0.4, duration: 0.6, ease: "power3.out" });
                }
            });

            // Calculate exact shift to center the active card
            const shift = (currentIndex - 4) * (280 + 40);
            gsap.to(track, {
                x: -shift,
                duration: 0.8,
                ease: "power4.out"
            });

            // Update info text
            const activeCard = cards[currentIndex];
            const infoTitle = document.querySelector('.active-project-info h3');
            const infoType = document.querySelector('.active-project-info p');
            if (infoTitle && activeCard) {
                infoTitle.textContent = activeCard.querySelector('h3').textContent;
                infoType.textContent = activeCard.querySelector('p').textContent;
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < cards.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }

        // Initial call
        updateCarousel();
    }

    // --- SECTION 3: BOOKING FORM ---
    const bookingSec = document.querySelector('.booking-section');
    if (bookingSec) {
        const formEls = bookingSec.querySelectorAll('.booking-pre-title, .title, .booking-desc, .booking-form-card, .feature-item');
        gsap.from(formEls, {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: bookingSec,
                start: "top 80%"
            }
        });
    }

    // MULTI-STEP FORM LOGIC
    const multiStepForm = document.getElementById('multi-step-form');
    const formSteps = document.querySelectorAll('.form-step');
    const stepDots = document.querySelectorAll('.dot');
    const stepText = document.getElementById('step-text');
    let currentStep = 1;

    function showStep(step) {
        formSteps.forEach(s => s.classList.remove('active'));
        const stepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        if (stepEl) stepEl.classList.add('active');
        
        stepDots.forEach(d => {
            d.classList.remove('active');
            if (parseInt(d.dataset.step) <= step) d.classList.add('active');
        });
        
        if (stepText) stepText.textContent = `Step ${step} of 3`;
        currentStep = step;
    }

    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < 3) showStep(currentStep + 1);
        });
    });

    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) showStep(currentStep - 1);
        });
    });

    // --- REVEAL SECTION ---
    const revealWrapper = document.querySelector('.reveal-wrapper');
    const layerClear = document.querySelector('.layer-clear');
    const layerBefore = document.querySelector('.layer-before');
    const handle = document.querySelector('.reveal-handle');

    if (revealWrapper && layerClear && handle) {
        let isDragging = false;

        function move(x) {
            const rect = revealWrapper.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;
            pos = Math.max(0, Math.min(100, pos));

            if (layerClear) layerClear.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
            if (layerBefore) layerBefore.style.clipPath = `inset(0 0 0 ${pos}%)`;
            handle.style.left = `${pos}%`;
        }

        revealWrapper.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            move(e.pageX);
        });

        revealWrapper.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            move(e.touches[0].pageX);
        });

        // Initial Position
        move(revealWrapper.getBoundingClientRect().left + revealWrapper.offsetWidth / 2);
    }

    // --- WHY CHOOSE US ---
    gsap.from(".why-card", {
        scrollTrigger: {
            trigger: ".why-choose-section",
            start: "top 70%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // --- TESTIMONIALS ---
    const avatarBtns = document.querySelectorAll('.avatar-btn');
    const quoteEl = document.getElementById('testimonial-quote');
    const roleEl = document.getElementById('testimonial-role');

    avatarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            avatarBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            gsap.to([quoteEl, roleEl], {
                opacity: 0,
                y: 10,
                duration: 0.3,
                onComplete: () => {
                    quoteEl.textContent = `"${btn.dataset.quote}"`;
                    roleEl.textContent = btn.dataset.role;
                    gsap.to([quoteEl, roleEl], {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            });
        });
    });

});
