(function () {
  // GPA/Mention badge next to location line
  function renderEducationGpa(lang) {
    const cards = document.querySelectorAll('#education article.card');
    cards.forEach(card => {
      const val = (lang === 'fr')
        ? (card.getAttribute('data-gpa-fr') || card.getAttribute('data-gpa'))
        : (card.getAttribute('data-gpa-en') || card.getAttribute('data-gpa'));
      const metaLeft = card.querySelector('.meta-left');
      if (!metaLeft) return;
      // Target the location line (first .meta-line containing the location)
      const locLine = metaLeft.querySelector('.meta-line');
      if (!locLine) return;

      // Find existing badge
      let badge = locLine.querySelector('.gpa-badge');
      if (!val) {
        // Remove badge if no value provided
        if (badge) badge.remove();
        return;
      }
      const label = (lang === 'fr') ? 'Mention' : 'GPA';
      const text = `${label}: ${val}`;

      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'gpa-badge';
        badge.textContent = text;
        // Append inside location line to keep rectangular badge styling
        locLine.appendChild(badge);
      } else {
        badge.textContent = text;
      }
    });
  }

  // CV download link switcher based on language
  function updateCvLinks(lang) {
    const links = document.querySelectorAll('.btn-download[href]');
    const href = lang === 'fr'
      ? '/cv/CV_FR_Killian_Chandeze_Sofware_Engineer.pdf'
      : '/cv/CV_EN_Killian_Chandeze_Sofware_Engineer.pdf';
    links.forEach(a => {
      a.setAttribute('href', href);
      a.setAttribute('download', href.split('/').pop());
    });
  }

  // Initial setup once DOM and i18n are ready
  document.addEventListener('DOMContentLoaded', () => {
    // Try to infer current language from html lang or i18n state changes later
    const initialLang = document.documentElement.lang && document.documentElement.lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    renderEducationGpa(initialLang);
    updateCvLinks(initialLang);
  });

  // React to language changes from i18n system
  document.addEventListener('i18n:change', (e) => {
    const lang = (e && e.detail && e.detail.lang) ? e.detail.lang : 'en';
    renderEducationGpa(lang);
    updateCvLinks(lang);
  });

  // Variables globales pour les éléments DOM
  let navToggle, nav, toTop, yearEl, themeToggle;

  // Fonction pour initialiser les éléments DOM après chargement des composants
  function initializeDOMElements() {
    navToggle = document.querySelector('.nav-toggle');
    nav = document.getElementById('site-nav');
    toTop = document.querySelector('.to-top');
    yearEl = document.getElementById('year');
    themeToggle = document.getElementById('theme-toggle');
  }

  // i18n-aware labels for theme toggle (EN/FR)
  const getUiLang = () => {
    const attr = document.documentElement.getAttribute('lang');
    const ls = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
    const v = (attr || ls || 'en').toString().slice(0, 2).toLowerCase();
    return v === 'fr' ? 'fr' : 'en';
  };
  const getThemeLabel = (theme) => {
    const lang = getUiLang();
    // Button shows the target mode (same behavior as before)
    const toDark = lang === 'fr' ? 'Sombre' : 'Dark';
    const toLight = lang === 'fr' ? 'Clair' : 'Light';
    return theme === 'light' ? toDark : toLight;
  };

  // Theme toggle functions (exportées pour réinitialisation)
  const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    if (themeToggle) themeToggle.textContent = getThemeLabel(theme);
  };

  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    // Default to dark theme
    return 'dark';
  };

  let currentTheme = getInitialTheme();

  // Fonction d'initialisation du theme toggle (exportée)
  window.initializeThemeToggle = function () {
    initializeDOMElements(); // S'assurer que les éléments sont récupérés

    // Year
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Appliquer le thème initial
    applyTheme(currentTheme);

    if (themeToggle) {
      // Supprimer les anciens listeners pour éviter les doublons
      themeToggle.replaceWith(themeToggle.cloneNode(true));
      themeToggle = document.getElementById('theme-toggle');

      themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
      });

      // Update label when language switches (via i18n)
      document.addEventListener('i18n:change', () => {
        if (themeToggle) themeToggle.textContent = getThemeLabel(currentTheme);
      });
    }
  };

  // Fonction d'initialisation du nav toggle (exportée)
  window.initializeNavToggle = function () {
    initializeDOMElements(); // S'assurer que les éléments sont récupérés

    // Récupérer les éléments avec les bons sélecteurs
    navToggle = document.querySelector('.nav-toggle');
    nav = document.getElementById('site-nav');

    if (navToggle && nav) {
      // Supprimer les anciens listeners pour éviter les doublons
      const newNavToggle = navToggle.cloneNode(true);
      navToggle.parentNode.replaceChild(newNavToggle, navToggle);
      navToggle = newNavToggle;

      navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isActive = nav.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', String(isActive));
      });

      // Close on link click
      nav.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('click', () => {
          nav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
          nav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
          nav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  };

  // Fonction d'initialisation du bouton back to top (exportée)
  window.initializeBackToTop = function () {
    initializeDOMElements(); // S'assurer que les éléments sont récupérés

    if (toTop) {
      // Remove any existing listeners to avoid duplicates
      const newToTop = toTop.cloneNode(true);
      toTop.parentNode.replaceChild(newToTop, toTop);
      toTop = newToTop; // Update reference

      // Back to top button visibility
      const onScroll = () => {
        if (!toTop) return;
        const y = window.scrollY || document.documentElement.scrollTop;
        toTop.classList.toggle('show', y > 400);
      };

      // Add event listeners
      window.addEventListener('scroll', onScroll, { passive: true });
      toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

      // Initial check
      onScroll();
    }
  };

  // Vertical Navigation Menu
  const resumeNavLinks = document.querySelectorAll('.resume-nav-link');

  if (resumeNavLinks.length > 0) {
    // Map navigation links to their corresponding sections
    const sections = Array.from(resumeNavLinks).map(link => {
      const href = link.getAttribute('href');
      return href ? document.querySelector(href) : null;
    }).filter(Boolean);

    /**
     * Updates the active navigation link based on scroll position
     */
    const updateActiveNavigation = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      let activeSection = '';

      // Special case: if at the very top (first 100px), activate no section
      if (scrollY < 100) {
        activeSection = '';
      }
      // Normal case: find section based on scroll position
      else {
        const scrollPosition = scrollY + (windowHeight / 3); // Use 1/3 of viewport height as offset

        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            activeSection = section.id;
            break;
          }
        }

        // If no section was found (at bottom of page), select the last one
        if (!activeSection && scrollY + windowHeight >= documentHeight - 100) {
          activeSection = sections[sections.length - 1]?.id || '';
        }
      }

      // Update active state for navigation links
      resumeNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isActive = href === `#${activeSection}`;

        link.classList.toggle('active', isActive);
      });
    };

    /**
     * Handles smooth scrolling to target section
     */
    const handleNavigationClick = (event) => {
      event.preventDefault();

      const targetId = event.currentTarget.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    // Attach event listeners
    resumeNavLinks.forEach(link => {
      link.addEventListener('click', handleNavigationClick);
    });

    // Initialize and listen for scroll events
    window.addEventListener('scroll', updateActiveNavigation, { passive: true });
    updateActiveNavigation(); // Set initial state
  }

  // Intersection-based reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const defers = document.querySelectorAll('.reveal.defer-on-scroll');

  if ('IntersectionObserver' in window && (reveals.length || defers.length)) {
    // Default reveals (appear when section comes into view)
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });

    // Deferred reveals (e.g., hero H1 only after slight scroll)
    const ioDefer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
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
  if (timeEl) {
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

  // Projects carousel - DISABLED (using dedicated script)
  // const projCarousel = document.querySelector('.proj-carousel');
  if (false && projCarousel) {
    const viewport = projCarousel.querySelector('.proj-viewport');
    const track = projCarousel.querySelector('.proj-track');
    const prevBtn = projCarousel.querySelector('.proj-arrow.prev');
    const nextBtn = projCarousel.querySelector('.proj-arrow.next');
    const slides = Array.from(track.children).filter(el => el.classList.contains('tile'));

    let index = 0;
    const isMobile = () => window.innerWidth <= 768;

    const getVisible = () => {
      const w = window.innerWidth;
      if (w <= 768) return 1;
      if (w <= 900) return 1;
      if (w <= 1200) return 2;
      return 3;
    };

    const update = () => {
      // Mobile behavior - use native scroll
      if (isMobile()) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        track.style.transform = 'none';
        return;
      }

      // Desktop behavior - use carousel with arrows
      if (prevBtn) {
        prevBtn.style.display = 'block';
        prevBtn.style.visibility = 'visible';
      }
      if (nextBtn) {
        nextBtn.style.display = 'block';
        nextBtn.style.visibility = 'visible';
      }

      const visible = getVisible();
      const gap = 16;
      const total = slides.length;
      const maxIndex = Math.max(0, total - visible);

      // Ensure index is within bounds
      index = Math.min(Math.max(index, 0), maxIndex);

      // Calculate offset based on tile width
      const tileWidth = viewport.clientWidth / visible;
      const offset = -(index * (tileWidth + gap));

      track.style.transform = `translateX(${offset}px)`;

      // Update arrow states
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index >= maxIndex;
    };

    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (!isMobile() && index > 0) {
        index -= 1;
        update();
      }
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (!isMobile()) {
        const visible = getVisible();
        const maxIndex = Math.max(0, slides.length - visible);
        if (index < maxIndex) {
          index += 1;
          update();
        }
      }
    });

    // Update on resize
    let rAF;
    const onResize = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        // Reset index on resize to prevent issues
        const visible = getVisible();
        const maxIndex = Math.max(0, slides.length - visible);
        index = Math.min(index, maxIndex);
        update();
      });
    };
    window.addEventListener('resize', onResize);

    // Initial update
    update();
  }

  // Experience section: limit to 3 items with Show more / Show less
  const expSection = document.getElementById('experience');
  if (expSection) {
    const cards = Array.from(expSection.querySelectorAll('article.card'));
    const maxVisible = 3;

    if (cards.length > maxVisible) {
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
      const getI18n = (k, d) => (window.i18nGet ? window.i18nGet(k, d) : d);
      btn.textContent = getI18n('show_more', 'Show more');

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
        btn.textContent = expanded ? getI18n('show_less', 'Show less') : getI18n('show_more', 'Show more');

        cards.slice(maxVisible).forEach(c => {
          if (expanded) {
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
        if (!expanded) {
          expSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      // Update button label on language change
      document.addEventListener('i18n:change', () => {
        btn.textContent = expanded ? getI18n('show_less', 'Show less') : getI18n('show_more', 'Show more');
      });
    }
  }



  /* Hero role typewriter */
  (function () {
    const el = document.getElementById('role-typer');
    const cursor = document.getElementById('role-cursor');
    if (!el) return;

    const text = 'Software Engineer C#/.NET';
    let i = 0;
    const speed = 40; // ms per char

    const type = () => {
      if (i < text.length) {
        el.textContent = text.slice(0, i + 1);
        i++;
        setTimeout(type, speed);
      } else {
        // keep cursor blinking; nothing else to do
      }
    };

    // If element is revealed later, small delay helps visual timing
    requestAnimationFrame(() => setTimeout(type, 200));
    // Écouter l'événement de chargement des composants pour réinitialiser
    document.addEventListener('componentsLoaded', () => {
      // Réinitialiser toutes les fonctionnalités
      if (window.initializeThemeToggle) window.initializeThemeToggle();
      if (window.initializeNavToggle) window.initializeNavToggle();
      if (window.initializeLangSelector) window.initializeLangSelector();
    });

    // Initialisation initiale (au cas où les composants seraient déjà chargés)
    document.addEventListener('DOMContentLoaded', () => {
      // Attendre un peu pour laisser les composants se charger
      setTimeout(() => {
        if (document.getElementById('theme-toggle')) {
          if (window.initializeThemeToggle) window.initializeThemeToggle();
          if (window.initializeNavToggle) window.initializeNavToggle();
          if (window.initializeLangSelector) window.initializeLangSelector();
        }
      }, 100);
    });

  })();

  /* Hero design quote animation (per-letter stagger) */
  document.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('quote-text');
    if (!el) return;
    const text = el.textContent;
    const frag = document.createDocumentFragment();
    el.textContent = '';
    // Wrap each character (keep spaces)
    for (let i = 0; i < text.length; i++) {
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

  /* Education: dynamic GPA/Mention line based on language */
  document.addEventListener('DOMContentLoaded', function () {
    const lang = (document.documentElement.getAttribute('lang') || 'en').slice(0, 2).toLowerCase() === 'fr' ? 'fr' : 'en';
    renderEducationGpa(lang);
  });

  /* Projects: open modal with details from tile */
  window.initProjectModal = function () {
    const modal = document.getElementById('proj-modal');
    if (!modal) return;
    const titleEl = modal.querySelector('#proj-modal-title');
    const textEl = modal.querySelector('.proj-modal-text');
    const tagsEl = modal.querySelector('.proj-modal-tags');
    const closeBtn = modal.querySelector('.proj-close');
    const backdrop = modal.querySelector('.proj-backdrop');

    const openModal = (tile) => {
      const h3 = tile.querySelector('h3');
      const details = tile.querySelector('.proj-details');
      const shortP = tile.querySelector('.tile-body p, p');
      const tags = tile.querySelector('.kw-list');
      const detailKeys = tile.getAttribute('data-detail-keys');

      if (h3) titleEl.textContent = h3.textContent.trim();

      // Get detailed description - check for i18n keys first
      if (detailKeys) {
        const keys = detailKeys.split(',');
        const items = keys.map(key => {
          const trimmedKey = key.trim();
          // Get text from i18n using window.i18nGet
          let text = trimmedKey;
          if (window.i18nGet && typeof window.i18nGet === 'function') {
            text = window.i18nGet(trimmedKey, trimmedKey);
          }
          // Replace \n with <br> to respect newlines
          if (text && typeof text === 'string') {
            text = text.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');
          }
          return `<li>${text}</li>`;
        }).join('');
        textEl.innerHTML = `<ul>${items}</ul>`;
      } else if (details) {
        // Prefer detailed list
        textEl.innerHTML = details.innerHTML;
      } else if (shortP) {
        // Fallback to short hook text
        textEl.innerHTML = `<p class="muted">${shortP.innerHTML}</p>`;
      } else {
        textEl.innerHTML = '<p>No details available</p>';
      }

      // Fill tags - support both .kw-badge and .project-tag
      tagsEl.innerHTML = '';
      const tagElements = tile.querySelectorAll('.kw-badge, .project-tag');
      if (tagElements.length > 0) {
        tagElements.forEach(b => {
          const span = document.createElement('span');
          span.className = 'kw-badge';
          span.textContent = b.textContent.trim();
          tagsEl.appendChild(span);
        });
      } else if (tags) {
        tags.querySelectorAll('.kw-badge').forEach(b => {
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
      if (dialog) requestAnimationFrame(() => dialog.classList.add('in'));
    };

    const closeModal = () => {
      const dialog = modal.querySelector('.proj-dialog');
      if (dialog) dialog.classList.remove('in');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.proj-track .tile, .project-card').forEach(tile => {
      tile.setAttribute('tabindex', '0');
      tile.style.cursor = 'pointer';
      tile.addEventListener('click', (e) => {
        // avoid link clicks opening modal twice
        const isLink = e.target.closest('a');
        if (isLink) return;
        openModal(tile);
      });
      tile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(tile);
        }
      });
    });

    // Setup close handlers only once
    if (!modal.hasAttribute('data-modal-initialized')) {
      [closeBtn, backdrop].forEach(el => {
        if (!el) return;
        el.addEventListener('click', closeModal);
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });
      modal.setAttribute('data-modal-initialized', 'true');
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.initProjectModal();
  });

  /* Projects: inject OSS/Private badge and clamp skills to 2 lines with “[other]” indicator */
  document.addEventListener('DOMContentLoaded', function () {
    const tiles = document.querySelectorAll('.proj-track .tile');
    tiles.forEach(tile => {
      const body = tile.querySelector('.tile-body');
      const title = body && body.querySelector('h3');

      // 1) Insert OSS/Private badge under title
      if (title) {
        let badges = title.nextElementSibling;
        if (!badges || !badges.classList || !badges.classList.contains('proj-badges')) {
          badges = document.createElement('div');
          badges.className = 'proj-badges';
          title.insertAdjacentElement('afterend', badges);
        } else {
          badges.innerHTML = '';
        }
        const isPublic = tile.hasAttribute('data-oss');
        const badge = document.createElement('span');
        badge.className = 'proj-badge ' + (isPublic ? 'badge-oss' : 'badge-private');
        badge.textContent = isPublic ? 'Public' : 'Private';
        badges.appendChild(badge);
      }

      // 2) Clamp skills to 2 lines on tile (no “[other]” indicator)
      const tags = tile.querySelector('.kw-list');
      if (tags) {
        tags.classList.add('clamp-2');
      }
    });
  });

  /* Header glass links: pressed animation (minimal) */
  (function () {
    const links = document.querySelectorAll('.glass-link');
    links.forEach(a => {
      const set = (on) => on ? a.classList.add('pressed') : a.classList.remove('pressed');
      a.addEventListener('mousedown', () => set(true));
      a.addEventListener('mouseup', () => set(false));
      a.addEventListener('mouseleave', () => set(false));
      a.addEventListener('touchstart', () => set(true), { passive: true });
      a.addEventListener('touchend', () => set(false));
    });
    // Écouter l'événement de chargement des composants pour réinitialiser
    document.addEventListener('componentsLoaded', () => {
      // Réinitialiser toutes les fonctionnalités
      if (window.initializeThemeToggle) window.initializeThemeToggle();
      if (window.initializeNavToggle) window.initializeNavToggle();
      if (window.initializeLangSelector) window.initializeLangSelector();
    });

    // Initialisation initiale (au cas où les composants seraient déjà chargés)
    document.addEventListener('DOMContentLoaded', () => {
      // Attendre un peu pour laisser les composants se charger
      setTimeout(() => {
        if (document.getElementById('theme-toggle')) {
          if (window.initializeThemeToggle) window.initializeThemeToggle();
          if (window.initializeNavToggle) window.initializeNavToggle();
          if (window.initializeLangSelector) window.initializeLangSelector();
        }
      }, 100);
    });

  })();

  /* Header language custom menu wiring */
  window.initializeLangSelector = function () {
    initializeDOMElements(); // S'assurer que les éléments sont récupérés

    const native = document.getElementById('lang-select');
    const menu = document.getElementById('lang-menu');

    // Desktop: use native select only
    if (window.innerWidth > 768) {
      if (native) {
        console.log('Desktop: Using native select');
        return; // Native select works automatically with i18n
      }
      return;
    }

    // Mobile: use custom menu
    if (!menu) return;
    console.log('Mobile: Using custom menu');
    return initializeLangSelectorWithElements(native, menu);
  };

  function initializeLangSelectorWithElements(native, menu) {

    const trigger = menu.querySelector('.lang-trigger');
    const list = menu.querySelector('.lang-list');
    const items = menu.querySelectorAll('.lang-list .value');

    // Map langue -> drapeau + code
    const LANG_MAP = {
      en: { flag: '🇬🇧', code: 'EN' },
      fr: { flag: '🇫🇷', code: 'FR' }
    };

    const setActive = () => {
      // Active state in list
      items.forEach(b => b.classList.toggle('active', b.dataset.lang === native.value));

      // Mettre à jour le trigger avec drapeau + code
      const labelEl = trigger.querySelector('.label');
      let flagEl = trigger.querySelector('.flag');
      if (!flagEl) {
        flagEl = document.createElement('span');
        flagEl.className = 'flag';
        // insérer la flag avant le label
        if (labelEl) {
          labelEl.insertAdjacentElement('beforebegin', flagEl);
        } else {
          trigger.insertAdjacentElement('afterbegin', flagEl);
        }
      }
      const info = LANG_MAP[native.value] || { flag: '🏳️', code: native.value?.toUpperCase() || '' };
      flagEl.textContent = info.flag;
      if (labelEl) labelEl.textContent = info.code;
      trigger.classList.add('has-flag');
      trigger.setAttribute('aria-label', info.code);
    };

    const open = (v) => {
      list.hidden = !v;
      trigger.setAttribute('aria-expanded', String(v));
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      open(list.hidden);
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) open(false);
    });
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') open(false);
    });

    items.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.dataset.lang;
        if (!lang) return;
        native.value = lang;
        native.dispatchEvent(new Event('change', { bubbles: true }));
        open(false);
      });
    });

    // Initial label (EN/FR + flag)
    setActive();
    document.addEventListener('i18n:change', setActive);
  }

  /* Header social icons — subtle JS highlight following cursor */
  (function () {
    const links = document.querySelectorAll('.social-links .glass-link');
    links.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty('--mx', x + '%');
        el.style.setProperty('--my', y + '%');
      }, { passive: true });
      el.addEventListener('mouseleave', () => {
        el.style.removeProperty('--mx');
        el.style.removeProperty('--my');
      });
    });
  })();

  // Écouter l'événement de chargement des composants pour réinitialiser
  document.addEventListener('componentsLoaded', () => {
    // Réinitialiser toutes les fonctionnalités
    if (window.initializeThemeToggle) window.initializeThemeToggle();
    if (window.initializeNavToggle) window.initializeNavToggle();
    if (window.initializeLangSelector) window.initializeLangSelector();
  });

  // Initialisation initiale (au cas où les composants seraient déjà chargés)
  document.addEventListener('DOMContentLoaded', () => {
    // Attendre un peu pour laisser les composants se charger
    setTimeout(() => {
      if (document.getElementById('theme-toggle')) {
        if (window.initializeThemeToggle) window.initializeThemeToggle();
        if (window.initializeNavToggle) window.initializeNavToggle();
        if (window.initializeLangSelector) window.initializeLangSelector();
      }
    }, 100);
  });

})();

/* keep IIFE terminator */
// Écouter l'événement de chargement des composants pour réinitialiser
document.addEventListener('componentsLoaded', () => {
  // Réinitialiser toutes les fonctionnalités
  if (window.initializeThemeToggle) window.initializeThemeToggle();
  if (window.initializeNavToggle) window.initializeNavToggle();
  if (window.initializeLangSelector) window.initializeLangSelector();
});

// Initialisation initiale (au cas où les composants seraient déjà chargés)
document.addEventListener('DOMContentLoaded', () => {
  // Attendre un peu pour laisser les composants se charger
  setTimeout(() => {
    if (document.getElementById('theme-toggle')) {
      if (window.initializeThemeToggle) window.initializeThemeToggle();
      if (window.initializeNavToggle) window.initializeNavToggle();
      if (window.initializeLangSelector) window.initializeLangSelector();
    }
  }, 100);
});
