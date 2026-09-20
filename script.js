// Navigation scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });
}

// Close mobile menu when a link is clicked
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });
});

// Scroll reveal animation
//
// The hidden state is applied BY THIS FILE, not by the HTML or the stylesheet.
// That ordering matters: if this script is missing, blocked, or fails to parse,
// the "js" class is never added, the CSS never hides anything, and the page
// renders in full. A broken animation can no longer cost you the content.
try {
    document.documentElement.classList.add('js');

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const reveal = el => el.classList.add('visible');
    const revealAll = () => animatedElements.forEach(reveal);

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    reveal(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0 });

        animatedElements.forEach(el => observer.observe(el));

        // Anything already on screen at load, in case the first callback is missed.
        requestAnimationFrame(() => {
            animatedElements.forEach(el => {
                const r = el.getBoundingClientRect();
                if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
            });
        });

        // An anchor jump does not always produce a scroll the observer notices.
        window.addEventListener('hashchange', () => {
            try {
                const target = document.querySelector(window.location.hash);
                if (target) target.querySelectorAll('.animate-on-scroll').forEach(reveal);
            } catch (e) { revealAll(); }
        });

        // Failsafe: anything still hidden after 2.5 s is shown regardless.
        setTimeout(revealAll, 2500);
    } else {
        revealAll();
    }
} catch (e) {
    // Any failure at all: un-hide everything and let the page render plainly.
    document.documentElement.classList.remove('js');
}
