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

// Intersection Observer for scroll animations
//
// Three things keep this from ever leaving a section blank:
//   1. threshold 0 - any sliver of the element counts, rather than 15 % of its area,
//      which a tall element entering from the bottom can be slow to reach.
//   2. a failsafe timer - anything still hidden after a few seconds is revealed
//      regardless, so a missed callback costs an animation, not the content.
//   3. reveal on hash navigation - jumping straight to #skills or #contact shows
//      that section immediately instead of waiting for a scroll that never comes.
const animatedElements = document.querySelectorAll('.animate-on-scroll');

function reveal(el) {
    el.classList.add('visible');
}

function revealAll() {
    animatedElements.forEach(reveal);
}

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                reveal(entry.target);
                obs.unobserve(entry.target);   // animate once, then stop watching
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

    // Jumping to an anchor does not always produce a scroll the observer sees.
    window.addEventListener('hashchange', () => {
        const target = document.querySelector(window.location.hash || '#none');
        if (target) target.querySelectorAll('.animate-on-scroll').forEach(reveal);
    });

    // Failsafe. Losing the animation is a much smaller problem than losing the page.
    setTimeout(revealAll, 2500);
} else {
    revealAll();
}
