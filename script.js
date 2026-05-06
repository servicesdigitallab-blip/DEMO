document.addEventListener("DOMContentLoaded", () => {
    // --- INITIAL SETUP ---
    gsap.registerPlugin(ScrollTrigger);

    // Page Load Fade
    gsap.to("body", { opacity: 1, duration: 0.8, ease: "power2.out" });

    // Initialize Lenis (Smooth Scroll) - Only for Desktop to prevent mobile shaking
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

    // Expose lenis or standard scroll globally for buttons
    window.scrollToSection = (id) => {
        const target = document.querySelector(id);
        if (!target) return;
        if (lenis) {
            lenis.scrollTo(target);
        } else {
            target.scrollIntoView({ behavior: "smooth" });
        }
        // Close mobile menu if open
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
    };

    // --- GLOBAL ANIMATIONS ---
    const easePremium = "cubic-bezier(0.22, 1, 0.36, 1)";

    // --- NEW PREMIUM NAVBAR SCROLL & MOBILE LOGIC ---
    const navbar = document.querySelector('.navbar-wrapper');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileOverlay.classList.add('active');
        });
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
        });
    });

    // --- SECTION 1: HERO ANIMATIONS ---
    gsap.from(".hero-text-wrap", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: easePremium,
        delay: 0.4
    });

    // --- SECTION 2: PROJECT CAROUSEL (3D EFFECT) ---
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    const nextBtn = document.querySelector('.nav-arrow:last-child');
    const prevBtn = document.querySelector('.nav-arrow:first-child');
    
    let currentIndex = 4; // Start with center card active

    function updateCarousel() {
        if (!track) return;

        // Desktop vs Mobile check
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile handled by CSS scroll-snap
            return;
        }

        cards.forEach((card, index) => {
            card.classList.remove('active', 'side');
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.add('side');
            }
        });

        // Center the active card
        const cardWidth = 280 + 40; // width + gap
        const activeCardWidth = 800 + 40;
        
        // Calculate offset to center the 800px card
        // This is a bit complex due to varying widths
        let offset = 0;
        for(let i=0; i<currentIndex; i++) {
            offset += (i === currentIndex ? 800 : 280) + 40;
        }
        
        // We want the active card center to be at the viewport center
        // The track has padding-left: 50%, so 0 offset means first card center is at viewport center
        // But our track padding is 50%, so we just need to shift relative to that
        const shift = (currentIndex - 4) * (280 + 40);
        track.style.transform = `translateX(${-shift}px)`;
        
        // Update info
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

    // --- SECTION 3: BOOKING FORM — Much smoother reveal ---
    const bookingSec = document.querySelector('.booking-section');
    if (bookingSec) {
        const formEls = bookingSec.querySelectorAll('.booking-pre-title, .title, .booking-desc, .booking-form-card, .feature-item');
        
        gsap.set(formEls, { opacity: 0, y: 30 });

        ScrollTrigger.create({
            trigger: bookingSec,
            start: "top 80%",
            onEnter: () => {
                gsap.to(formEls, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.out",
                    overwrite: true
                });
            },
            onLeaveBack: () => {
                gsap.to(formEls, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power2.in",
                    overwrite: true
                });
            }
        });
    }

    // MULTI-STEP LOGIC
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const dots = document.querySelectorAll('.dot');
    const stepText = document.getElementById('step-text');

    function showStep(step) {
        formSteps.forEach(s => s.classList.remove('active'));
        document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
        
        dots.forEach(d => {
            d.classList.remove('active');
            if (parseInt(d.dataset.step) <= step) d.classList.add('active');
        });
        
        if (stepText) stepText.textContent = `Step ${step} of 3`;
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = parseInt(btn.closest('.form-step').dataset.step);
            if (currentStep < 3) showStep(currentStep + 1);
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = parseInt(btn.closest('.form-step').dataset.step);
            if (currentStep > 1) showStep(currentStep - 1);
        });
    });

    // Date Pill Selection
    const datePillsContainer = document.getElementById('dynamic-date-pills');
    if (datePillsContainer) {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const today = new Date();
        
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            
            const pill = document.createElement('div');
            pill.className = 'pill' + (i === 0 ? ' active' : '');
            pill.innerHTML = `<span>${days[date.getDay()]}</span><strong>${date.getDate()}</strong>`;
            
            pill.addEventListener('click', () => {
                document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
            
            datePillsContainer.appendChild(pill);
        }
    }

    const timePills = document.querySelectorAll('.pill-time');
    timePills.forEach(pill => {
        pill.addEventListener('click', () => {
            timePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // --- REVEAL SECTION LOGIC ---
    const revealWrapper = document.querySelector('.reveal-wrapper');
    const beforeLayer = document.querySelector('.layer-before');
    const handle = document.querySelector('.reveal-handle');

    if (revealWrapper && beforeLayer && handle) {
        let isDragging = false;

        function move(x) {
            const rect = revealWrapper.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            
            if (position < 0) position = 0;
            if (position > 100) position = 100;

            beforeLayer.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
            handle.style.left = `${position}%`;
        }

        revealWrapper.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            move(e.pageX);
        });

        // Touch support
        revealWrapper.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            move(e.touches[0].pageX);
        });

        // Initial position
        move(revealWrapper.getBoundingClientRect().left + revealWrapper.offsetWidth / 2);
    }

    // --- WHY CHOOSE US ANIMATIONS ---
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

    // --- TESTIMONIAL CAROUSEL ---
    const avatarBtns = document.querySelectorAll('.avatar-btn');
    const quoteEl = document.getElementById('testimonial-quote');
    const roleEl = document.getElementById('testimonial-role');

    avatarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            avatarBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Animate text change
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
