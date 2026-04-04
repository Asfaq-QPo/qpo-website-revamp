/* ============================================================
   QPo Cabs — Scroll Reveal & Header Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Reveal ──────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  /* ── Header scroll effect ───────────────────────────────── */
  const header = document.querySelector('.qpo-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }


  /* ── Mobile menu toggle ─────────────────────────────────── */
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.querySelector('.qpo-header .nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      // Toggle icon
      menuBtn.classList.toggle('fa-bars');
      menuBtn.classList.toggle('fa-times');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuBtn.classList.add('fa-bars');
        menuBtn.classList.remove('fa-times');
      }
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.add('fa-bars');
        menuBtn.classList.remove('fa-times');
      });
    });
  }


  /* ── Mobile accordion toggle ────────────────────────────── */
  const accordionTitles = document.querySelectorAll('.qpo-mobile-accordion-title, .qpo-accordion-title');

  accordionTitles.forEach(title => {
    title.addEventListener('click', () => {
      const item = title.closest('.qpo-mobile-accordion-item, .qpo-accordion-item');
      const desc = item.querySelector('.qpo-mobile-accordion-desc, .qpo-accordion-body');
      const arrow = title.querySelector('.arrow, img');

      // Check if currently open
      const isOpen = desc.style.display === 'block' || item.classList.contains('active');

      // Close all
      document.querySelectorAll('.qpo-mobile-accordion-item, .qpo-accordion-item').forEach(el => {
        const d = el.querySelector('.qpo-mobile-accordion-desc, .qpo-accordion-body');
        if (d) d.style.display = 'none';
        el.classList.remove('active');
      });

      // If was closed, open it
      if (!isOpen && desc) {
        desc.style.display = 'block';
        item.classList.add('active');
      }
    });
  });


  /* ── Touch/drag support for scroll tracks ────────────── */
  document.querySelectorAll('.qpo-media-scroll-track, .qpo-logo-scroll-track').forEach(track => {
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;

    const getTranslateX = () => {
      const style = window.getComputedStyle(track);
      const matrix = new DOMMatrix(style.transform);
      return matrix.m41;
    };

    const onStart = (x) => {
      isDragging = true;
      startX = x;
      currentTranslate = getTranslateX();
      track.classList.add('dragging');
    };

    const onMove = (x) => {
      if (!isDragging) return;
      const diff = x - startX;
      track.style.transform = `translateX(${currentTranslate + diff}px)`;
    };

    const onEnd = () => {
      isDragging = false;
      track.classList.remove('dragging');
      track.style.transform = '';
    };

    track.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchend', onEnd);

    track.addEventListener('mousedown', (e) => { e.preventDefault(); onStart(e.clientX); });
    document.addEventListener('mousemove', (e) => onMove(e.clientX));
    document.addEventListener('mouseup', onEnd);
  });


  /* ── Contact Us: URL update & active highlight ─────────── */
  const contactLink = document.querySelector('[data-contact-link]');
  const footer = document.getElementById('footer');
  const allNavLinks = document.querySelectorAll('.qpo-header .nav-links a');

  if (contactLink && footer) {
    // On click: scroll to footer, update URL to /contact-us, highlight link
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      footer.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', '/contact-us');
      allNavLinks.forEach(a => a.classList.remove('active'));
      contactLink.classList.add('active');
    });

    // On scroll: highlight Contact Us when footer is in view
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          allNavLinks.forEach(a => a.classList.remove('active'));
          contactLink.classList.add('active');
          history.replaceState(null, '', '/contact-us');
        } else {
          contactLink.classList.remove('active');
          // Restore the original page's active link
          const currentPath = window.location.pathname.replace('/contact-us', '');
          allNavLinks.forEach(a => {
            const href = a.getAttribute('href');
            if (href && href !== '#footer' && (currentPath === href || currentPath + 'index.html' === href)) {
              a.classList.add('active');
            }
          });
          history.replaceState(null, '', currentPath || '/');
        }
      });
    }, { threshold: 0.3 });

    footerObserver.observe(footer);

    // Handle /contact-us on page load (e.g. direct navigation)
    if (window.location.pathname === '/contact-us') {
      setTimeout(() => {
        footer.scrollIntoView({ behavior: 'smooth' });
        allNavLinks.forEach(a => a.classList.remove('active'));
        contactLink.classList.add('active');
      }, 300);
    }
  }

});
