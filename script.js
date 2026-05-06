(function() {
    // --- LENIS SMOOTH SCROLL ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // --- PRELOADER & INITIAL FADE ---
    window.addEventListener('load', () => {
        gsap.to('body', { opacity: 1, duration: 1, ease: 'power2.out' });
        
        // Initial hero text reveal
        gsap.from('.hero-text-wrap > *', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power4.out',
            delay: 0.5
        });
    });

    // --- CURSOR FOLLOWER (Premium Feel) ---
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorInner = document.createElement('div');
    cursorInner.className = 'custom-cursor-inner';
    document.body.appendChild(cursorInner);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power3.out' });
        gsap.to(cursorInner, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power1.out' });
    });

    // Hover effect for links
    document.querySelectorAll('a, button, .project-card, .pill').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorInner.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorInner.classList.remove('hover');
        });
    });

    // --- GSAP SCROLL ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in elements on scroll
    const fadeEls = document.querySelectorAll('.fade-in-up');
    fadeEls.forEach(el => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Section 1: Hero Parallax
    gsap.to('.hero-bg-full', {
        yPercent: 15, // Reduced from 20 for smoother feel
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Section 2: Projects Stagger
    const projectSec = document.querySelector('.projects-section');
    if (projectSec) {
        // Animation for the section header specifically
        const header = projectSec.querySelector('.section-header');
        if (header) {
            gsap.from(header.querySelectorAll('.subtitle, .title'), {
                opacity: 0,
                y: 50,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
        
        // Background/wrapper reveal
        gsap.from(projectSec, {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: projectSec,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // --- SECTION 3: BOOKING FORM — Smoother and delayed reveal ---
    const bookingSec = document.querySelector('.booking-section');
    if (bookingSec) {
        const formEls = bookingSec.querySelectorAll('.booking-content-col > *, .booking-form-card');
        gsap.from(formEls, {
            y: 80, // More movement for 'from' feel
            opacity: 0,
            duration: 1.4, // Slower duration
            stagger: 0.15, // More delay between items
            ease: 'power3.out',
            scrollTrigger: {
                trigger: bookingSec,
                start: 'top 75%', // Wait a bit more before triggering
                toggleActions: 'play none none reverse'
            }
        });
    }

    // --- SECTION 4: WHY CARDS — one by one reveal ---
    const whyCardEls = document.querySelectorAll('.why-card');
    if (whyCardEls.length > 0) {
        gsap.set(whyCardEls, { y: 60, opacity: 0, scale: 0.92 });
        ScrollTrigger.create({
            trigger: '.why-choose-section',
            start: 'top 75%',
            onEnter: () => gsap.to(whyCardEls, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }),
            onEnterBack: () => gsap.to(whyCardEls, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }),
            onLeave: () => gsap.to(whyCardEls, { y: -60, opacity: 0, scale: 0.92, duration: 0.35, stagger: 0.05, ease: 'power2.in' }),
            onLeaveBack: () => gsap.to(whyCardEls, { y: 60, opacity: 0, scale: 0.92, duration: 0.35, stagger: 0.05, ease: 'power2.in' })
        });
    }

    // --- REVEAL SECTION header & wrapper ---
    const revealSecEls = document.querySelectorAll('.reveal-section .section-header > *, .reveal-wrapper, .reveal-footer-stats .reveal-stat');
    if (revealSecEls.length > 0) {
        gsap.set(revealSecEls, { y: 50, opacity: 0 });
        ScrollTrigger.create({
            trigger: '.reveal-section',
            start: 'top 78%',
            onEnter: () => gsap.to(revealSecEls, { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out' }),
            onEnterBack: () => gsap.to(revealSecEls, { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out' }),
            onLeave: () => gsap.to(revealSecEls, { y: -50, opacity: 0, duration: 0.3, stagger: 0.04, ease: 'power2.in' }),
            onLeaveBack: () => gsap.to(revealSecEls, { y: 50, opacity: 0, duration: 0.3, stagger: 0.04, ease: 'power2.in' })
        });
    }

    // --- CTA & FOOTER generic reveal ---
    ['cta-section', 'footer'].forEach(cls => {
        const el = document.querySelector(`.${cls}`);
        if (!el) return;
        const items = el.querySelectorAll('.cta-content-col > *, .footer-col, .footer-bottom > *');
        if (items.length > 0) {
            gsap.set(items, { y: 40, opacity: 0 });
            ScrollTrigger.create({
                trigger: el,
                start: 'top 80%',
                onEnter: () => gsap.to(items, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }),
                onEnterBack: () => gsap.to(items, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }),
                onLeave: () => gsap.to(items, { y: -40, opacity: 0, duration: 0.3, stagger: 0.04 }),
                onLeaveBack: () => gsap.to(items, { y: 40, opacity: 0, duration: 0.3, stagger: 0.04 })
            });
        }
    });



    // --- CAROUSEL SYSTEM ---
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    
    if (track && window.innerWidth > 768) {
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                updateCarousel(index);
            });
        });

        function updateCarousel(activeIndex) {
            const container = document.querySelector('.carousel-container');
            const track = document.querySelector('.carousel-track');
            const activeCard = cards[activeIndex];

            cards.forEach((card, i) => {
                if (i === activeIndex) {
                    card.classList.add('active');
                    card.classList.remove('side');
                    gsap.to(card, {
                        scale: 1.1,
                        y: -10,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                } else {
                    card.classList.remove('active');
                    card.classList.add('side');
                    gsap.to(card, {
                        scale: 0.9,
                        y: 0,
                        opacity: 0.5,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });

            const containerRect = container.getBoundingClientRect();
            const cardRect = activeCard.getBoundingClientRect();
            const currentX = gsap.getProperty(track, "x") || 0;
            const containerCenter = containerRect.left + containerRect.width / 2;
            const cardCenter = cardRect.left + cardRect.width / 2;
            const offset = containerCenter - cardCenter;
            
            gsap.to(track, {
                x: currentX + offset,
                duration: 0.8,
                ease: "power4.out"
            });
        }
        
        // Set initial state
        setTimeout(() => {
            updateCarousel(Math.floor(cards.length / 2));
        }, 100);
    }

    // Stats Counter
    const stats = document.querySelectorAll('.stat-num');
    stats.forEach(stat => {
        const text = stat.innerText;
        const target = parseInt(text.replace(/\D/g, ''));
        if(!isNaN(target)) {
            ScrollTrigger.create({
                trigger: stat,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    gsap.fromTo(stat, { innerText: 0 }, {
                        innerText: target,
                        duration: 2.5,
                        snap: { innerText: 1 },
                        ease: "power2.out",
                        onUpdate: function() {
                            stat.innerHTML = Math.round(this.targets()[0].innerText) + text.replace(/[0-9]/g, '');
                        }
                    });
                }
            });
        }
    });

    // --- GLOW EFFECT TRACKING ---
    const glowCard = document.querySelector('.booking-form-card');
    if (glowCard) {
        glowCard.addEventListener('pointermove', (e) => {
            const rect = glowCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glowCard.style.setProperty('--x', `${x}px`);
            glowCard.style.setProperty('--y', `${y}px`);
        });
    }

    // --- AI DATE PICKER LOGIC ---
    const dateInput = document.getElementById('ai-date-input');
    const pillsContainer = document.getElementById('dynamic-date-pills');
    
    if (dateInput && pillsContainer) {
        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        
        const triggerChange = () => {
            const event = new Event('change');
            dateInput.dispatchEvent(event);
        };
        
        triggerChange();
        
        dateInput.addEventListener('change', (e) => {
            const date = new Date(e.target.value);
            if (!isNaN(date)) {
                // Clear and update pills
                pillsContainer.innerHTML = '';
                
                // Show selected date and surrounding dates
                for (let i = -2; i <= 2; i++) {
                    const d = new Date(date);
                    d.setDate(d.getDate() + i);
                    
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = d.getDate().toString().padStart(2, '0');
                    const isActive = i === 0 ? 'active' : '';
                    
                    const pill = document.createElement('div');
                    pill.className = `pill ${isActive}`;
                    pill.innerHTML = `<span>${dayName}</span><strong>${dayNum}</strong>`;
                    
                    pill.addEventListener('click', () => {
                        document.querySelectorAll('#dynamic-date-pills .pill').forEach(p => p.classList.remove('active'));
                        pill.classList.add('active');
                    });
                    
                    pillsContainer.appendChild(pill);
                }
            }
        });
    }

    // Form Pills Interaction for static elements
    const staticDatePills = document.querySelectorAll('.date-pills:not(#dynamic-date-pills) .pill');
    staticDatePills.forEach(pill => {
        pill.addEventListener('click', () => {
            staticDatePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    const timePills = document.querySelectorAll('.time-pills .pill-time');
    timePills.forEach(pill => {
        pill.addEventListener('click', () => {
            timePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // --- TRANSFORMATION REVEAL ---
    const revealWrapper = document.querySelector('.reveal-wrapper');
    const layerClear = document.querySelector('.layer-clear');
    const layerBefore = document.querySelector('.layer-before');
    const revealHandle = document.querySelector('.reveal-handle');

    if (revealWrapper && layerClear && layerBefore && revealHandle) {
        let isDragging = false;
        let currentX = 0;
        let isTicking = false;

        const updateReveal = () => {
            const rect = revealWrapper.getBoundingClientRect();
            // Safeguard against 0 width
            if (rect.width === 0) {
                isTicking = false;
                return;
            }
            let pos = ((currentX - rect.left) / rect.width) * 100;
            pos = Math.max(0, Math.min(100, pos));

            // Move handle
            revealHandle.style.left = `${pos}%`;

            // Reveal Layer 1 (Clear After) on the left
            layerClear.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;

            // Clip Layer 2 (Before) from the left
            layerBefore.style.clipPath = `inset(0 0 0 ${pos}%)`;
            
            isTicking = false;
        };

        const onMove = (x, y) => {
            if (isDragging) {
                currentX = x;
                if (!isTicking) {
                    window.requestAnimationFrame(updateReveal);
                    isTicking = true;
                }
            }
        };

        revealWrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            // Prevent default image drag or text selection
            e.preventDefault();
            onMove(e.clientX, e.clientY);
        });
        
        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                onMove(e.clientX, e.clientY);
            }
        });

        // Touch support
        revealWrapper.addEventListener('touchstart', (e) => {
            isDragging = true;
            // Prevent scrolling while dragging the slider
            if(e.cancelable) e.preventDefault();
            onMove(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: false });
        
        window.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        window.addEventListener('touchmove', (e) => {
            if (isDragging) {
                if(e.cancelable) e.preventDefault();
                onMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: false });

        // Initialize slider position robustly
        const initSlider = () => {
            const rect = revealWrapper.getBoundingClientRect();
            currentX = rect.left + rect.width / 2;
            updateReveal();
        };

        // Run init immediately, and also on load to ensure images are calculated
        initSlider();
        window.addEventListener('load', initSlider);
        window.addEventListener('resize', initSlider);
        setTimeout(initSlider, 500);
    }

    // --- SECTION 5 TESTIMONIALS ---
    const avatarBtns = document.querySelectorAll('.avatar-btn');
    const quoteDisplay = document.getElementById('testimonial-quote');
    const roleDisplay = document.getElementById('testimonial-role');
    
    if (avatarBtns.length > 0 && quoteDisplay && roleDisplay) {
        avatarBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('active')) return;
                
                // Add animating class for fade/blur
                quoteDisplay.classList.add('animating');
                roleDisplay.classList.add('animating');
                
                setTimeout(() => {
                    // Update content
                    avatarBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    quoteDisplay.innerText = `"${btn.dataset.quote}"`;
                    roleDisplay.innerText = btn.dataset.role;
                    
                    // Remove animating class
                    setTimeout(() => {
                        quoteDisplay.classList.remove('animating');
                        roleDisplay.classList.remove('animating');
                    }, 50);
                }, 250);
            });
        });
    }

    // --- MULTI-STEP FORM LOGIC ---
    const multiStepForm = document.getElementById('multi-step-form');
    const formSteps = document.querySelectorAll('.form-step');
    const stepDots = document.querySelectorAll('.steps .dot');
    const stepText = document.getElementById('step-text');
    let currentStepIndex = 1;

    const updateStepUI = (step) => {
        formSteps.forEach(s => s.classList.remove('active'));
        document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
        
        stepDots.forEach(dot => {
            if (parseInt(dot.dataset.step) <= step) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        stepText.innerText = `Step ${step} of 3`;
        currentStepIndex = step;
    };

    const validateStep = (step) => {
        const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required], input[type="text"], input[type="email"], input[type="tel"], select');
        let isValid = true;

        inputs.forEach(input => {
            // Remove existing error
            const existingError = input.parentElement.querySelector('.error-msg');
            if (existingError) existingError.remove();
            input.style.borderColor = '';

            if (input.value.trim() === '') {
                isValid = false;
                input.style.borderColor = '#ff4d4d';
                const error = document.createElement('span');
                error.className = 'error-msg';
                error.innerText = 'Please fill this';
                error.style.color = '#ff4d4d';
                error.style.fontSize = '10px';
                error.style.marginTop = '4px';
                error.style.display = 'block';
                input.parentElement.appendChild(error);
            }
        });

        // Special check for Step 1 Pills (Time)
        if (step === 1) {
            const activeTime = document.querySelector('.time-pills .pill-time.active');
            if (!activeTime) {
                isValid = false;
            }
        }

        return isValid;
    };

    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStepIndex)) {
                if (currentStepIndex < 3) {
                    updateStepUI(currentStepIndex + 1);
                }
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStepIndex > 1) {
                updateStepUI(currentStepIndex - 1);
            }
        });
    });

    // Success Message inside Card Helper
    const showSuccessInCard = () => {
        const formCard = document.querySelector('.booking-form-card');
        if (formCard) {
            // Fade out current content
            gsap.to(formCard.children, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                stagger: 0.1,
                onComplete: () => {
                    // Replace content with Success Message
                    formCard.innerHTML = `
                        <div class="success-message-inner">
                            <i class="fas fa-check-circle"></i>
                            <h2>Thank You!</h2>
                            <p>Thank you for reaching out! Our team will get back to you shortly via email to confirm your consultation.</p>
                            <button class="btn-solid" onclick="location.reload()">Back to Form</button>
                        </div>
                    `;
                    // Fade in new content
                    gsap.from('.success-message-inner > *', {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                        stagger: 0.2,
                        ease: "power2.out"
                    });
                }
            });
        }
    };

    if (multiStepForm) {
        multiStepForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateStep(3)) {
                showSuccessInCard();
            }
        });
    }

    // --- ANCHOR LINK SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                if (lenis) {
                    lenis.scrollTo(targetEl);
                } else {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Update active state in nav
                document.querySelectorAll('.navbar-menu a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Navbar background change
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar-wrapper');
        if (navbar && window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
    });
})();
