document.addEventListener('DOMContentLoaded', () => {

  // footer year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- theme toggle (persisted) ----
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(savedTheme === 'dark' || (!savedTheme && prefersDark)){
    root.setAttribute('data-theme', 'dark');
  }
  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if(isDark){
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // ---- mobile nav toggle + scrim ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navScrim = document.getElementById('navScrim');

  function closeNav(){
    navLinks && navLinks.classList.remove('open');
    navScrim && navScrim.classList.remove('open');
    navToggle && navToggle.setAttribute('aria-expanded', 'false');
  }
  function openNav(){
    navLinks && navLinks.classList.add('open');
    navScrim && navScrim.classList.add('open');
    navToggle && navToggle.setAttribute('aria-expanded', 'true');
  }

  if(navToggle && navLinks){
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  }
  if(navScrim){
    navScrim.addEventListener('click', closeNav);
  }
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeNav();
  });

  // ---- scroll progress bar ----
  const progress = document.getElementById('scrollProgress');
  function updateProgress(){
    if(!progress) return;
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (scrolled / max) * 100 : 0;
    progress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // active nav link based on current page
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === current || (current === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });

  // typewriter roles (home page only)
  const target = document.getElementById('typeTarget');
  if(target){
    const roles = ["Aspiring AI Engineer", "AI & Data Science Student", "Web Developer", "Problem Solver"];
    const cursor = target.querySelector('.type-cursor');
    let ri = 0, ci = 0, deleting = false;

    function typeLoop(){
      const word = roles[ri];
      if(!deleting){
        ci++;
        if(ci > word.length){ deleting = true; setTimeout(typeLoop, 1300); return; }
      } else {
        ci--;
        if(ci < 0){ deleting = false; ri = (ri + 1) % roles.length; ci = 0; }
      }
      target.textContent = word.slice(0, ci);
      if(cursor) target.appendChild(cursor);
      setTimeout(typeLoop, deleting ? 35 : 65);
    }
    setTimeout(typeLoop, 900);
  }

  // reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if(revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  // skill bars fill on view
  const skillFills = document.querySelectorAll('.skill-fill');
  if(skillFills.length){
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.style.width = e.target.dataset.fill + '%';
          io2.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    skillFills.forEach(el => io2.observe(el));
  }

  // contact form (client-side only — no backend wired up)
  const form = document.getElementById('contactForm');
  if(form){
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if(!name || !email || !message){
        status.textContent = 'Please fill in every field before sending.';
        status.style.color = '#e2603f';
        return;
      }

      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:benjaminefranklin0408@gmail.com?subject=${subject}&body=${body}`;

      status.textContent = 'Opening your email app to send this message…';
      status.style.color = '#1f9d8a';
      form.reset();
    });
  }

  // back to top button
  const backTop = document.getElementById('backTop');
  if(backTop){
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
