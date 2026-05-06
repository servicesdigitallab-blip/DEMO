document.addEventListener('DOMContentLoaded', () => {
    // LENIS SMOOTH SCROLL
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Initial Fade In
    gsap.to('body', { opacity: 1, duration: 1, ease: 'power2.out' });

    // NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.navbar-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // MOBILE MENU
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMobile = document.querySelector('.close-mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

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

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // HERO PARALLAX (Only if elements exist)
    if (window.innerWidth > 768) {
        const hero = document.querySelector('.immersive-hero');
        if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5);
            const yPos = (clientY / window.innerHeight - 0.5);

            gsap.to(".hero-bg-full", {
                x: xPos * 30,
                y: yPos * 30,
                duration: 1,
                ease: "power2.out"
            });
        });
    }
    }

    // Section 4: 3D Image Angle Change on Hover
    const whyCards = document.querySelectorAll('.why-card');
    whyCards.forEach(card => {
        const img = card.querySelector('img');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;

            gsap.to(img, {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.1,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(img, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });

    // ============================================================
    // PREMIUM SCROLL ANIMATIONS (21st.dev inspired)
    // ============================================================

    // --- SECTION 2: PROJECT CARDS — Simple reveal to avoid conflict with carousel ---
    const projectSec = document.querySelector('.projects-section');
    if (projectSec) {
        gsap.from(projectSec, {
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: projectSec,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // --- SECTION 3: BOOKING FORM — Much smoother reveal ---
    const bookingSec = document.querySelector('.booking-section');
    if (bookingSec) {
        const formEls = bookingSec.querySelectorAll('.booking-content-col > *, .booking-form-card');
        gsap.from(formEls, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'sine.out',
            scrollTrigger: {
                trigger: bookingSec,
                start: 'top 80%',
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

    // --- MULTI-STEP FORM ---
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const dots = document.querySelectorAll('.dot');
    const stepText = document.getElementById('step-text');
    let currentStep = 1;

    function updateFormSteps() {
        formSteps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            }
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.dataset.step) <= currentStep) {
                dot.classList.add('active');
            }
        });
        stepText.innerText = `Step ${currentStep} of 3`;
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < 3) {
                currentStep++;
                updateFormSteps();
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateFormSteps();
            }
        });
    });

    // Date Pills Generator
    const dynamicDatePills = document.getElementById('dynamic-date-pills');
    if (dynamicDatePills) {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const today = new Date();
        
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            const pill = document.createElement('div');
            pill.className = `pill ${i === 2 ? 'active' : ''}`;
            pill.innerHTML = `<span>${days[date.getDay()]}</span><strong>${date.getDate()}</strong><span>${months[date.getMonth()]}</span>`;
            dynamicDatePills.appendChild(pill);
            
            pill.addEventListener('click', () => {
                document.querySelectorAll('.date-pills .pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
        }
    }

    // Time Pills Interaction
    document.querySelectorAll('.pill-time').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.pill-time').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // Form Submission
    const bookingForm = document.getElementById('multi-step-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show Success Popup
            const popup = document.createElement('div');
            popup.className = 'thanks-popup-overlay show';
            popup.innerHTML = `
                <div class="thanks-card">
                    <i class="fas fa-check-circle"></i>
                    <h2>Thank You!</h2>
                    <p>Your booking request has been received. Our design team will contact you shortly to confirm your appointment.</p>
                    <button class="btn-close-popup">Back to Home</button>
                </div>
            `;
            document.body.appendChild(popup);
            
            popup.querySelector('.btn-close-popup').addEventListener('click', () => {
                popup.classList.remove('show');
                setTimeout(() => popup.remove(), 600);
            });
        });
    }

    // TESTIMONIALS SYSTEM
    const avatarBtns = document.querySelectorAll('.avatar-btn');
    const quoteDisplay = document.getElementById('testimonial-quote');
    const roleDisplay = document.getElementById('testimonial-role');

    avatarBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (btn.classList.contains('active')) return;
            
            // Animation out
            quoteDisplay.classList.add('animating');
            roleDisplay.classList.add('animating');
            
            setTimeout(() => {
                avatarBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                quoteDisplay.innerText = `"${btn.dataset.quote}"`;
                roleDisplay.innerText = btn.dataset.role;
                
                // Animation in
                quoteDisplay.classList.remove('animating');
                roleDisplay.classList.remove('animating');
            }, 300);
        });
    });

    // BEFORE/AFTER DRAG
    const revealWrapper = document.querySelector('.reveal-wrapper');
    const beforeLayer = document.querySelector('.layer-before');
    const handle = document.querySelector('.reveal-handle');
    let isDragging = false;

    if (revealWrapper) {
        function updateReveal(x) {
            const rect = revealWrapper.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            position = Math.max(0, Math.min(100, position));
            
            beforeLayer.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
            handle.style.left = `${position}%`;
        }

        revealWrapper.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (isDragging) updateReveal(e.clientX);
        });
        
        revealWrapper.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (isDragging) updateReveal(e.touches[0].clientX);
        });

        // Set initial position
        updateReveal(revealWrapper.getBoundingClientRect().left + revealWrapper.offsetWidth / 2);
    }
});
