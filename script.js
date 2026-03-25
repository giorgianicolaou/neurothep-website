// ===========================
// neuroTHEP — script.js
// ===========================

// ---- Navbar scroll behavior ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ---- Scroll fade-in animations ----
const fadeElements = document.querySelectorAll(
  '.summary-card, .step, .activity, .team-member, .exit-path, ' +
  '.roadmap-phase, .clin-adv, .milestone, .advisor-group, ' +
  '.stat-card, .data-stat, .tbi-stat'
);

fadeElements.forEach(el => {
  el.classList.add('fade-in');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within the same parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-in'));
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ---- Section labels fade-in ----
const sectionLabels = document.querySelectorAll('.section-label, h2, .section-intro');
sectionLabels.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ---- Fund bar animation ----
const fundFills = document.querySelectorAll('.fund-fill');

const fundObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'width 1s ease 0.2s, opacity 0.5s ease';
      entry.target.style.opacity = '1';
      fundObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

fundFills.forEach(el => {
  const targetWidth = el.style.width || el.className.includes('f45') ? null : null;
  el.style.opacity = '0.4';
  fundObserver.observe(el);
});

// ---- Smooth active nav link highlighting ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--accent)';
        }
      });
    }
  });
}, {
  threshold: 0.4,
});

sections.forEach(s => sectionObserver.observe(s));

// ---- Stat counter animation ----
function animateCounter(el) {
  const text = el.textContent.trim();
  const match = text.match(/^([^0-9]*)(\d+(?:\.\d+)?)([^0-9]*)$/);
  if (!match) return;

  const [, prefix, numStr, suffix] = match;
  const target = parseFloat(numStr);
  const isFloat = numStr.includes('.');
  const duration = 1400;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num, .d-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));