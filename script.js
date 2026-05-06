import { gsap } from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Reveal body
    gsap.to('body', { opacity: 1, duration: 1, ease: 'power2.out' });

    // --- NAVIGATION LOGIC ---
    const navWrapper = document.querySelector('.navbar-wrapper');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMobile = document.querySelector('.close-mobile-menu');

    // Scroll handling for sticky nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navWrapper.classList.add('scrolled');
        } else {
            navWrapper.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', () => {
            mobileOverlay.classList.add('active');
            gsap.from('.mobile-menu-links a', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power3.out'
            });
        });

        closeMobile.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
        });

        // Close on link click
        document.querySelectorAll('.mobile-menu-links a').forEach(link => {
            link.addEventListener('click', () => mobileOverlay.classList.remove('active'));
        });
    }

    // --- GSAP ANIMATIONS ---

    // --- SECTION 1: HERO — Background movement & text stagger ---
    gsap.to('.hero-bg-full', {
        scale: 1.1,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    const heroTl = gsap.timeline();
    heroTl.from('.hero-content h1, .hero-content p, .hero-btns-group', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
    });

    // --- SECTION 2: PROJECTS — Better transitions and scroll reveal ---
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
    const prevBtn = document.querySelector('.nav-arrow:first-child');
    const nextBtn = document.querySelector('.nav-arrow:last-child');
    
    if (track && cards.length > 0) {
        let activeIndex = 1; // Start with the second card active
        
        const updateCarousel = () => {
            const cardWidth = 320; // Matches .project-card.side
            const activeWidth = 800; // Matches .project-card.active
            const gap = 40;
            
            // Calculate translation to center the active card
            // Each card to the left of active is cardWidth + gap
            const translation = -(activeIndex * (cardWidth + gap));
            track.style.transform = `translateX(${translation}px)`;
            
            cards.forEach((card, index) => {
                card.classList.remove('active', 'side');
                if (index === activeIndex) {
                    card.classList.add('active');
                } else {
                    card.classList.add('side');
                }
            });
        };

        // Click on side cards to move
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                activeIndex = index;
                updateCarousel();
            });
        });

        // Navigation arrows
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                activeIndex = Math.max(0, activeIndex - 1);
                updateCarousel();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                activeIndex = Math.min(cards.length - 1, activeIndex + 1);
                updateCarousel();
            });
        }

        // Initialize
        updateCarousel();
    }

    // --- BOOKING FORM DATE GENERATOR ---
    const datePillsContainer = document.getElementById('dynamic-date-pills');
    if (datePillsContainer) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const today = new Date();
        for (let i = 0; i < 5; i++) {
            const d = new Date();
            d.setDate(today.getDate() + i);
            
            const pill = document.createElement('div');
            pill.className = `pill ${i === 2 ? 'active' : ''}`;
            pill.innerHTML = `
                <span>${days[d.getDay()]}</span>
                <strong>${d.getDate()}</strong>
            `;
            
            pill.addEventListener('click', () => {
                document.querySelectorAll('.date-pills .pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
            
            datePillsContainer.appendChild(pill);
        }
    }

    // Time pill active state
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

    if (multiStepForm) {
        multiStepForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Hide form steps and header
            multiStepForm.style.display = 'none';
            document.querySelector('.form-header').style.display = 'none';
            
            // Show success container inside the card
            const successContainer = document.getElementById('booking-success');
            if (successContainer) {
                successContainer.style.display = 'flex';
                
                // Add a small GSAP reveal
                gsap.from(successContainer.querySelectorAll('.success-content > *'), {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                });
            }
        });
    }

    // Smooth reveal for all sections on entry
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 30,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Custom mouse follow for booking card
    const bookingCard = document.querySelector('.booking-form-card');
    if (bookingCard) {
        bookingCard.addEventListener('mousemove', (e) => {
            const rect = bookingCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            bookingCard.style.setProperty('--x', `${x}px`);
            bookingCard.style.setProperty('--y', `${y}px`);
        });
    }
});
