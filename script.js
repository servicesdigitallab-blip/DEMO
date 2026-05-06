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

    // Hero Section Animations - Only if elements exist
    if (document.querySelector('.hero-label')) {
        gsap.from(".hero-label", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        });
    }

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

    // Mouse Parallax for Hero - Desktop Only
    if (window.innerWidth > 1024) {
        document.addEventListener("mousemove", (e) => {
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

    // --- SECTION 2: PROJECT CARDS — stagger 0.1s each card, repeatable ---
    gsap.from(".project-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".projects-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // --- SECTION 3: BOOKING FORM — slide up & subtle scale ---
    gsap.from(".booking-form-card", {
        y: 100,
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".booking-section",
            start: "top 75%"
        }
    });

    // --- SECTION 4: WHY CHOOSE US — cards stagger reveal ---
    gsap.from(".why-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".why-cards-grid",
            start: "top 85%"
        }
    });

    // --- SECTION 5: FINAL CTA — image and content reveal ---
    gsap.from(".cta-image-col", {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".cta-wrap",
            start: "top 80%"
        }
    });

    gsap.from(".cta-content-col > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".cta-wrap",
            start: "top 80%"
        }
    });

    // --- FOOTER STAGGER ---
    gsap.from(".footer-col", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".footer-area",
            start: "top 90%"
        }
    });

    // --- REVEAL SECTION DRAGGABLE LOGIC ---
    const revealWrapper = document.querySelector('.reveal-wrapper');
    const handle = document.querySelector('.reveal-handle');
    const layerBefore = document.querySelector('.layer-before');
    let isDragging = false;

    function updateReveal(x) {
        const rect = revealWrapper.getBoundingClientRect();
        let position = ((x - rect.left) / rect.width) * 100;
        position = Math.max(0, Math.min(100, position));
        
        handle.style.left = `${position}%`;
        layerBefore.style.clipPath = `inset(0 0 0 ${position}%)`;
    }

    if (revealWrapper) {
        revealWrapper.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateReveal(e.clientX);
        });

        // Touch support
        revealWrapper.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateReveal(e.touches[0].clientX);
        });
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateReveal(e.touches[0].clientX);
        });
    }

    // --- BOOKING FORM MULTI-STEP LOGIC ---
    const form = document.getElementById('multi-step-form');
    const steps = document.querySelectorAll('.form-step');
    const dots = document.querySelectorAll('.dot');
    const stepText = document.getElementById('step-text');
    let currentStep = 1;

    function goToStep(step) {
        steps.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
        document.querySelector(`.dot[data-step="${step}"]`).classList.add('active');
        
        stepText.innerText = `Step ${step} of 3`;
        currentStep = step;
        
        // Scroll to form top if needed
        document.querySelector('.booking-form-card').scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }

    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', () => goToStep(currentStep + 1));
    });

    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', () => goToStep(currentStep - 1));
    });

    // Pill selection logic
    document.querySelectorAll('.pill, .pill-time').forEach(pill => {
        pill.addEventListener('click', function() {
            const siblings = this.parentElement.querySelectorAll('.pill, .pill-time');
            siblings.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Form Submission Success Popup
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Create popup element
            const popup = document.createElement('div');
            popup.className = 'thanks-popup-overlay show';
            popup.innerHTML = `
                <div class="thanks-card">
                    <i class="fas fa-check-circle"></i>
                    <h2>Booking Successful!</h2>
                    <p>Thank you for choosing DEMO. We have received your request and our design team will contact you shortly to confirm your appointment.</p>
                    <button class="btn-close-popup">Great, Thanks!</button>
                </div>
            `;
            document.body.appendChild(popup);
            
            // Close popup logic
            popup.querySelector('.btn-close-popup').addEventListener('click', () => {
                popup.classList.remove('show');
                setTimeout(() => popup.remove(), 600);
                form.reset();
                goToStep(1);
            });
        });
    }

    // Generate dynamic date pills
    const datePillsContainer = document.getElementById('dynamic-date-pills');
    if (datePillsContainer) {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            
            const pill = document.createElement('div');
            pill.className = `pill ${i === 1 ? 'active' : ''}`;
            pill.innerHTML = `
                <span>${days[date.getDay()]}</span>
                <strong>${date.getDate()}</strong>
            `;
            datePillsContainer.appendChild(pill);
            
            pill.addEventListener('click', function() {
                document.querySelectorAll('.date-pills .pill').forEach(p => p.classList.remove('active'));
                this.classList.add('active');
            });
        }
    }

    // Premium Testimonial Switcher
    const testimonialData = [
        { quote: "This changed everything for me.", author: "Sarah Chen", role: "DESIGNER AT FIGMA" },
        { quote: "Simply brilliant. Nothing else compares.", author: "Marcus Johnson", role: "ENGINEER AT VERCEL" },
        { quote: "The attention to detail is unmatched.", author: "Elena Rodriguez", role: "FOUNDER AT CRAFT" }
    ];

    const avatarBtns = document.querySelectorAll('.avatar-btn');
    const quoteDisplay = document.getElementById('testimonial-quote');
    const roleDisplay = document.getElementById('testimonial-role');

    avatarBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            avatarBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Animate text change
            gsap.to([quoteDisplay, roleDisplay], {
                opacity: 0,
                y: 10,
                duration: 0.3,
                onComplete: () => {
                    quoteDisplay.innerText = `"${testimonialData[index].quote}"`;
                    roleDisplay.innerText = testimonialData[index].role;
                    gsap.to([quoteDisplay, roleDisplay], {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "back.out(1.7)"
                    });
                }
            });
        });
    });

    // Spotlight effect for the booking card
    const card = document.querySelector('.booking-form-card');
    if (card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    }

});
