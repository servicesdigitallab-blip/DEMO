document.addEventListener("DOMContentLoaded", () => {
    // --- INITIAL SETUP ---
    gsap.registerPlugin(ScrollTrigger);

    // Page Load Fade
    gsap.to("body", { opacity: 1, duration: 0.8, ease: "power2.out" });

    // Initialize Lenis (Smooth Scroll)
    let lenis;
    if (typeof Lenis !== 'undefined') {
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

    // --- GLOBAL ANIMATIONS ---
    const easePremium = "cubic-bezier(0.22, 1, 0.36, 1)";

    // --- NEW PREMIUM NAVBAR SCROLL & MOBILE LOGIC ---
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

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Hero Section Animations
    ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        onEnter: () => {
            gsap.fromTo(".hero-title", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5, ease: "power4.out" });
            gsap.fromTo(".hero-buttons", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.3 });
        },
        onEnterBack: () => {
            gsap.fromTo(".hero-title", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5, ease: "power4.out" });
            gsap.fromTo(".hero-buttons", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.3 });
        },
        onLeave: () => {
            gsap.to(".hero-title", { x: -50, opacity: 0, duration: 0.5 });
            gsap.to(".hero-buttons", { y: 40, opacity: 0, duration: 0.5 });
        },
        onLeaveBack: () => {
            gsap.to(".hero-title", { x: -50, opacity: 0, duration: 0.5 });
            gsap.to(".hero-buttons", { y: 40, opacity: 0, duration: 0.5 });
        }
    });

    // Hero Scroll Scale
    gsap.to(".hero-section", {
        scale: 0.98,
        borderRadius: "20px",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Mouse Parallax for Hero
    document.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        gsap.to(".hero-img", {
            x: xPos * 30,
            y: yPos * 30,
            rotateY: xPos * 2,
            rotateX: -yPos * 2,
            duration: 1.2,
            ease: "power2.out"
        });
    });

    // Section 4: 3D Image Angle Change on Hover
    const whyCardsInit = document.querySelectorAll('.why-card');
    whyCardsInit.forEach(card => {
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
    // DIVERSE PREMIUM SCROLL ANIMATIONS (SCRUBBED)
    // ============================================================

    // --- SECTION 2: PROJECTS (Fade + Letter Spacing Expansion) ---
    const sec2Header = document.querySelector('.projects-section .section-header');
    if (sec2Header) {
        const title = sec2Header.querySelector('.title');
        
        gsap.set(title, { opacity: 0, letterSpacing: "-0.05em", filter: "blur(10px)" });
        gsap.to(title, {
            opacity: 1,
            letterSpacing: "0.02em",
            filter: "blur(0px)",
            scrollTrigger: {
                trigger: sec2Header,
                start: 'top 90%',
                end: 'top 50%',
                scrub: 1.5
            }
        });
    }

    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        gsap.set(projectCards, { y: 150, opacity: 0, rotateX: -15 });
        gsap.to(projectCards, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.projects-section',
                start: 'top 85%',
                end: 'top 20%',
                scrub: 1.2
            }
        });
    }

    // --- SECTION 3: BOOKING (Clip-Path Mask Reveal Heading + Detailed Form Animation) ---
    const sec3Header = document.querySelector('.booking-section .booking-content-col');
    if (sec3Header) {
        const title = sec3Header.querySelector('.title');
        gsap.set(title, { clipPath: "inset(100% 0% 0% 0%)", y: 50 });
        gsap.to(title, {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            scrollTrigger: {
                trigger: sec3Header,
                start: 'top 90%',
                end: 'top 60%',
                scrub: 1
            }
        });

        // Every single form element
        const bookingItems = document.querySelectorAll('.booking-section .booking-pre-title, .booking-section .booking-desc, .booking-form-card, .input-group, .input-label, .date-picker-wrap, .pill, .pill-time, .btn-solid, .feature-item');
        gsap.set(bookingItems, { y: 40, opacity: 0, scale: 0.95 });
        gsap.to(bookingItems, {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.03,
            scrollTrigger: {
                trigger: '.booking-section',
                start: 'top 85%',
                end: 'bottom 80%',
                scrub: 1.5
            }
        });
    }

    // --- SECTION 4: PROCESS REVEAL (Slide + Rotate Heading) ---
    const sec4Header = document.querySelector('.reveal-section .section-header');
    if (sec4Header) {
        const title = sec4Header.querySelector('.title');
        gsap.set(title, { x: -100, opacity: 0, rotate: -5 });
        gsap.to(title, {
            x: 0,
            opacity: 1,
            rotate: 0,
            scrollTrigger: {
                trigger: sec4Header,
                start: 'top 92%',
                end: 'top 65%',
                scrub: 1.2
            }
        });

        const revealContainer = document.querySelector('.reveal-container');
        gsap.set(revealContainer, { scale: 0.8, opacity: 0, rotateY: 10 });
        gsap.to(revealContainer, {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            scrollTrigger: {
                trigger: '.reveal-section',
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1
            }
        });
    }

    // --- SECTION 5: ABOUT/WHY (Blur Reveal Heading + 3D Card Entrance) ---
    const sec5Header = document.querySelector('.why-choose-section .section-header');
    if (sec5Header) {
        const title = sec5Header.querySelector('.title');
        gsap.set(title, { filter: "blur(20px)", opacity: 0, scale: 1.2 });
        gsap.to(title, {
            filter: "blur(0px)",
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: sec5Header,
                start: 'top 90%',
                end: 'top 60%',
                scrub: 1.5
            }
        });
    }

    const whyCards = document.querySelectorAll('.why-card');
    if (whyCards.length > 0) {
        gsap.set(whyCards, { y: 150, opacity: 0, scale: 0.8, rotateX: 25 });
        gsap.to(whyCards, {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            stagger: 0.4, // This creates the 0.1s interval feel when scrubbing
            scrollTrigger: {
                trigger: '.why-choose-section',
                start: 'top 85%',
                end: 'bottom 90%',
                scrub: 1.2
            }
        });
    }

    // --- STATS BANNER: Numbers counting with scroll progress ---
    const statsItems = document.querySelectorAll('.stat-item');
    statsItems.forEach(item => {
        const numEl = item.querySelector('.stat-num');
        const text = numEl.innerText;
        const target = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[0-9]/g, '');

        if (!isNaN(target)) {
            const obj = { val: 0 };
            gsap.set(item, { y: 60, opacity: 0 });
            
            // Item entrance
            gsap.to(item, {
                y: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 98%',
                    end: 'top 80%',
                    scrub: 1
                }
            });

            // Number counting scrubbed
            gsap.to(obj, {
                val: target,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 95%',
                    end: 'top 75%',
                    scrub: 1
                },
                onUpdate: () => {
                    numEl.innerText = Math.floor(obj.val) + suffix;
                }
            });
        }
    });

    // --- FINAL SECTION: CTA & FOOTER (Staggered Rise) ---
    const ctaItems = document.querySelectorAll('.cta-wrap > *, .cta-features > *, .cta-action-card > *, .footer-col, .footer-bottom');
    if (ctaItems.length > 0) {
        gsap.set(ctaItems, { y: 50, opacity: 0 });
        gsap.to(ctaItems, {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
                trigger: '.final-section',
                start: 'top 95%',
                end: 'bottom bottom',
                scrub: 1
            }
        });
    }



    // --- CAROUSEL SYSTEM ---
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    
    if (track) {
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
        
        updateCarousel(Math.floor(cards.length / 2));
    }


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

    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStepIndex < 3) {
                updateStepUI(currentStepIndex + 1);
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

    // Success Popup Helper
    const showSuccessPopup = () => {
        const overlay = document.createElement('div');
        overlay.className = 'thanks-popup-overlay show';
        overlay.innerHTML = `
            <div class="thanks-card">
                <i class="fas fa-check-circle"></i>
                <h2>Thanks!</h2>
                <p>apko hamri traf sa confrim email jald recive ho gi</p>
                <button class="btn-close-popup">Close</button>
            </div>
        `;
        document.body.appendChild(overlay);
        
        overlay.querySelector('.btn-close-popup').addEventListener('click', () => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
            // Reset form
            multiStepForm.reset();
            updateStepUI(1);
        });
    };

    if (multiStepForm) {
        multiStepForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showSuccessPopup();
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
});
