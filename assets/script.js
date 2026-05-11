/* REATIVA — interatividade */

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    nav.classList.remove('open');
  }));
}

// FAQ
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Testimonials
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.testi-dots button');
let currentTesti = 0;
let testiInterval;

function showTesti(idx) {
  testimonials.forEach((t, i) => t.classList.toggle('active', i === idx));
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  currentTesti = idx;
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showTesti(i);
    resetTestiInterval();
  });
});

function nextTesti() { showTesti((currentTesti + 1) % testimonials.length); }
function resetTestiInterval() {
  clearInterval(testiInterval);
  testiInterval = setInterval(nextTesti, 6500);
}
if (testimonials.length) resetTestiInterval();

// Form
const form = document.querySelector('.contact-form form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = document.querySelector('.form-feedback');
    feedback.classList.add('show');
    feedback.textContent = '✓ Obrigado! Recebemos a sua mensagem. Entraremos em contacto em breve.';
    form.reset();
    setTimeout(() => feedback.classList.remove('show'), 6000);
  });
}

// Newsletter
const newsForm = document.querySelector('.newsletter form');
if (newsForm) {
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsForm.querySelector('input');
    const btn = newsForm.querySelector('button');
    btn.textContent = '✓ Subscrito';
    input.value = '';
    setTimeout(() => btn.textContent = 'Subscrever', 3000);
  });
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
