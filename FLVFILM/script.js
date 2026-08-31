/* ============================================================
   FLV FILM — script.js
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* 1. HEADER scroll */
  const header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    revealOnScroll();
    highlightNav();
    toggleFloatBtn();
  });

  /* 2. HAMBURGER */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('mainNav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mainNav.classList.toggle('open');
      document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
    });
    mainNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mainNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* 3. SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = document.getElementById('header').offsetHeight;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerH, behavior: 'smooth' });
      }
    });
  });

  /* 4. ACTIVE NAV */
  function highlightNav() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-link');
    const scrollY  = window.scrollY + 100;
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        links.forEach(function (l) {
          l.classList.remove('active');
          if (l.getAttribute('href') === '#' + sec.id) l.classList.add('active');
        });
      }
    });
  }

  /* 5. REVEAL */
  function revealOnScroll() {
    const wh = window.innerHeight;
    document.querySelectorAll('.reveal').forEach(function (el) {
      if (el.getBoundingClientRect().top < wh - 70) el.classList.add('visible');
    });
  }
  // Adiciona .reveal nos elementos-alvo
  ['.sobre-wrap', '.srv-row', '.dif-card', '.cta-wrap', '.fotos-grid'].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });
  });
  revealOnScroll(); // roda no load

  /* 6. GALERIA SLIDER — seção Sobre */
  const slides   = document.querySelectorAll('#galeriaSlider .slide');
  const dots     = document.querySelectorAll('#galDots .dot');
  let current    = 0;
  let autoTimer  = null;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  }

  function startAuto() {
    autoTimer = setInterval(function () { goTo(current + 1); }, 4500);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  const galPrev = document.getElementById('galPrev');
  const galNext = document.getElementById('galNext');
  if (galPrev) galPrev.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
  if (galNext) galNext.addEventListener('click', function () { goTo(current + 1); resetAuto(); });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { goTo(i); resetAuto(); });
  });

  if (slides.length) startAuto();

  /* 7. BOTÃO FLUTUANTE */
  const wppFloat = document.getElementById('wppFloat');
  function toggleFloatBtn() {
    if (!wppFloat) return;
    if (window.scrollY > 300) wppFloat.classList.add('visible');
    else wppFloat.classList.remove('visible');
  }
  toggleFloatBtn();

  /* 8. FAQ ACCORDION */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* 9. ANO FOOTER */
  const anoEl = document.getElementById('anoFooter');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

});
