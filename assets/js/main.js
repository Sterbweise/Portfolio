(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const toTop = document.querySelector('.to-top');
  const yearEl = document.getElementById('year');
  const themeToggle = document.getElementById('theme-toggle');

  // Year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (dark/light with persistence)
  const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    if (themeToggle) themeToggle.textContent = theme === 'light' ? 'Dark' : 'Light';
  };

  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    // fall back to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  if (themeToggle){
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
      applyTheme(currentTheme);
    });
  }

  // Mobile nav toggle
  if (navToggle && nav){
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // Close on link click
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Back to top button visibility
  const onScroll = () => {
    if (!toTop) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    toTop.classList.toggle('show', y > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  if (toTop){
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Intersection-based reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const defers = document.querySelectorAll('.reveal.defer-on-scroll');

  if ('IntersectionObserver' in window && (reveals.length || defers.length)){
    // Default reveals (appear when section comes into view)
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });

    // Deferred reveals (e.g., hero H1 only after slight scroll)
    const ioDefer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){
          e.target.classList.add('in');
          ioDefer.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });

    reveals.forEach(el => { if (!el.classList.contains('defer-on-scroll')) io.observe(el); });
    defers.forEach(el => ioDefer.observe(el));
  } else {
    // Fallback
    reveals.forEach(el => el.classList.add('in'));
  }

  // Local time badge (Asia/Kuala_Lumpur, UTC+8) next to address
  const timeEl = document.getElementById('local-time');
  if (timeEl){
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'Asia/Kuala_Lumpur'
    });
    const updateTime = () => {
      timeEl.textContent = fmt.format(new Date()) + ' • UTC+8';
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Projects carousel
  const projCarousel = document.querySelector('.proj-carousel');
  if (projCarousel){
    const viewport = projCarousel.querySelector('.proj-viewport');
    const track = projCarousel.querySelector('.proj-track');
    const prevBtn = projCarousel.querySelector('.proj-arrow.prev');
    const nextBtn = projCarousel.querySelector('.proj-arrow.next');
    const slides = Array.from(track.children).filter(el => el.classList.contains('tile'));

    let index = 0;
    const getVisible = () => {
      const w = viewport.clientWidth;
      if (w <= 640) return 1;
      if (w <= 980) return 2;
      return 3;
    };
    const update = () => {
      const visible = getVisible();
      const gap = 16; // must match CSS gap
      const total = slides.length;
      // compute slide width based on CSS flex-basis percentages
      const slideWidth = (viewport.clientWidth - gap * (visible - 1)) / visible;
      const maxIndex = Math.max(0, total - visible);
      index = Math.min(Math.max(index, 0), maxIndex);
      const offset = -(index * (slideWidth + gap));
      track.style.transform = `translateX(${offset}px)`;
      // toggle arrows
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index === maxIndex;
    };

    if (prevBtn) prevBtn.addEventListener('click', () => { index -= 1; update(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { index += 1; update(); });

    // update on resize
    let rAF;
    const onResize = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(update);
    };
    window.addEventListener('resize', onResize);
    // initial
    update();
  }

  // Experience section: limit to 3 items with Show more / Show less
  const expSection = document.getElementById('experience');
  if (expSection){
    const cards = Array.from(expSection.querySelectorAll('article.card'));
    const maxVisible = 3;

    if (cards.length > maxVisible){
      // Hide beyond the first 3
      cards.slice(maxVisible).forEach(c => {
        c.classList.add('is-collapsed');
        c.setAttribute('aria-hidden', 'true');
      });

      // Create toggle button
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn ghost exp-toggle';
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Show more';

      // Wrapper for centering
      const wrap = document.createElement('div');
      wrap.className = 'exp-toggle-wrap';
      wrap.appendChild(btn);

      // Insert at end of experience section
      expSection.appendChild(wrap);

      let expanded = false;
      btn.addEventListener('click', () => {
        expanded = !expanded;
        btn.setAttribute('aria-expanded', String(expanded));
        btn.textContent = expanded ? 'Show less' : 'Show more';

        cards.slice(maxVisible).forEach(c => {
          if (expanded){
            c.classList.remove('is-collapsed');
            c.removeAttribute('aria-hidden');
            // Ensure reveal state is visible even if IntersectionObserver didn’t fire
            c.classList.add('in');
          } else {
            c.classList.add('is-collapsed');
            c.setAttribute('aria-hidden', 'true');
          }
        });

        // Keep header in view when collapsing
        if (!expanded){
          expSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }



/* Hero role typewriter */
(function(){
  const el = document.getElementById('role-typer');
  const cursor = document.getElementById('role-cursor');
  if (!el) return;

  const text = 'Software Engineer (.NET / ASP.NET)';
  let i = 0;
  const speed = 40; // ms per char

  const type = () => {
    if (i < text.length){
      el.textContent = text.slice(0, i + 1);
      i++;
      setTimeout(type, speed);
    } else {
      // keep cursor blinking; nothing else to do
    }
  };

  // If element is revealed later, small delay helps visual timing
  requestAnimationFrame(() => setTimeout(type, 200));
})();

/* Hero design quote animation (per-letter stagger) */
document.addEventListener('DOMContentLoaded', function(){
  const el = document.getElementById('quote-text');
  if (!el) return;
  const text = el.textContent;
  const frag = document.createDocumentFragment();
  el.textContent = '';
  // Wrap each character (keep spaces)
  for (let i = 0; i < text.length; i++){
    const span = document.createElement('span');
    span.className = 'qch';
    if (text[i] === ' ') {
      span.innerHTML = '&nbsp;'; // préserver l’espace visible
    } else {
      span.textContent = text[i];
    }
    span.style.animationDelay = `${i * 16}ms`;
    frag.appendChild(span);
  }
  el.appendChild(frag);
});

/* Education: inject minimal GPA badge next to location line */
document.addEventListener('DOMContentLoaded', function(){
  const edu = document.getElementById('education');
  if (!edu) return;
  const cards = edu.querySelectorAll('article.card');
  cards.forEach(card => {
    // Only inject GPA if attribute is explicitly provided
    const val = card.getAttribute('data-gpa');
    if (!val) return;
    // Find the location line inside meta-left
    const locLine = card.querySelector('.meta-left .meta-line');
    if (!locLine) return;
    // If badge exists, update its text with label and stop
    const existing = locLine.querySelector('.gpa-badge');
    if (existing){
      existing.textContent = `GPA: ${val}`;
      return;
    }
    // Build badge
    const badge = document.createElement('span');
    badge.className = 'gpa-badge';
    badge.textContent = `GPA: ${val}`;
    // Insert after location text
    locLine.appendChild(badge);
  });
});

/* Projects: open modal with details from tile */
document.addEventListener('DOMContentLoaded', function(){
  const modal = document.getElementById('proj-modal');
  if (!modal) return;
  const titleEl = modal.querySelector('#proj-modal-title');
  const textEl = modal.querySelector('.proj-modal-text');
  const tagsEl = modal.querySelector('.proj-modal-tags');
  const closeBtn = modal.querySelector('.proj-close');
  const backdrop = modal.querySelector('.proj-backdrop');

  const openModal = (tile)=>{
    const h3 = tile.querySelector('h3');
    const details = tile.querySelector('.proj-details');
    const shortP = tile.querySelector('.tile-body p');
    const tags = tile.querySelector('.kw-list');

    if (h3) titleEl.textContent = h3.textContent.trim();
    // Prefer detailed list, else fallback to short hook text
    textEl.innerHTML = details ? details.innerHTML : (shortP ? `<p class="muted">${shortP.innerHTML}</p>` : '');
    // Fill tags
    tagsEl.innerHTML = '';
    if (tags){
      tags.querySelectorAll('.kw-badge').forEach(b=>{
        const span = document.createElement('span');
        span.className = 'kw-badge';
        span.textContent = b.textContent.trim();
        tagsEl.appendChild(span);
      });
    }
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // animate dialog in
    const dialog = modal.querySelector('.proj-dialog');
    if (dialog) requestAnimationFrame(()=> dialog.classList.add('in'));
  };

  const closeModal = ()=>{
    const dialog = modal.querySelector('.proj-dialog');
    if (dialog) dialog.classList.remove('in');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.proj-track .tile').forEach(tile=>{
    tile.setAttribute('tabindex', '0');
    tile.style.cursor = 'pointer';
    tile.addEventListener('click', (e)=>{
      // avoid link clicks opening modal twice
      const isLink = e.target.closest('a');
      if (isLink) return;
      openModal(tile);
    });
    tile.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openModal(tile);
      }
    });
  });

  [closeBtn, backdrop].forEach(el=>{
    if (!el) return;
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeModal();
  });
});

/* Projects: inject OSS/Private badge and clamp skills to 2 lines with “[other]” indicator */
document.addEventListener('DOMContentLoaded', function(){
  const tiles = document.querySelectorAll('.proj-track .tile');
  tiles.forEach(tile => {
    const body = tile.querySelector('.tile-body');
    const title = body && body.querySelector('h3');

    // 1) Insert OSS/Private badge under title
    if (title){
      let badges = title.nextElementSibling;
      if (!badges || !badges.classList || !badges.classList.contains('proj-badges')){
        badges = document.createElement('div');
        badges.className = 'proj-badges';
        title.insertAdjacentElement('afterend', badges);
      } else {
        badges.innerHTML = '';
      }
      const isOss = tile.hasAttribute('data-oss');
      const badge = document.createElement('span');
      badge.className = 'proj-badge ' + (isOss ? 'badge-oss' : 'badge-private');
      badge.textContent = isOss ? 'Open Source' : 'Private';
      badges.appendChild(badge);
    }

    // 2) Clamp skills to 2 lines on tile (no “[other]” indicator)
    const tags = tile.querySelector('.kw-list');
    if (tags){
      tags.classList.add('clamp-2');
    }
  });
});

/* keep IIFE terminator */
})();