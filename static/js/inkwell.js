/* ============================================================
   INKWELL THEME — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Reading Progress Bar ──────────────────────────────────
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    function updateProgress() {
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
      ) - window.innerHeight;
      const scrolled = window.scrollY;
      const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(100, pct) + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ── Sidebar Toggle (mobile) ───────────────────────────────
  const sidebar = document.querySelector('.inkwell-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const toggleBtns = document.querySelectorAll('.topbar-sidebar-toggle');

  function openSidebar() {
    sidebar && sidebar.classList.add('open');
    overlay && overlay.classList.add('open');
    overlay && (overlay.style.display = 'block');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar && sidebar.classList.remove('open');
    overlay && overlay.classList.remove('open');
    setTimeout(() => { if (overlay) overlay.style.display = ''; }, 300);
    document.body.style.overflow = '';
  }

  toggleBtns.forEach(btn => btn.addEventListener('click', () => {
    sidebar && sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  }));
  overlay && overlay.addEventListener('click', closeSidebar);

  // ── Sidebar Volume Accordion ──────────────────────────────
  document.querySelectorAll('.sidebar-volume-title').forEach(btn => {
    btn.addEventListener('click', () => {
      const chapters = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      btn.classList.toggle('open');
      if (chapters) chapters.classList.toggle('open');
    });
  });

  // Auto-open the volume containing the active chapter
  const activeChapter = document.querySelector('.sidebar-chapter-link.active');
  if (activeChapter) {
    const chapterList = activeChapter.closest('.sidebar-chapters');
    if (chapterList) {
      chapterList.classList.add('open');
      const titleBtn = chapterList.previousElementSibling;
      if (titleBtn) titleBtn.classList.add('open', 'active');
    }
  }

  // ── Lightbox ──────────────────────────────────────────────
  const lightbox = document.getElementById('inkwell-lightbox');
  const lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
  const lightboxClose = lightbox && lightbox.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 300);
  }

  document.querySelectorAll('.inkwell-figure img, .character-gallery-item img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });
  lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // ── Spoilers ──────────────────────────────────────────────
  document.querySelectorAll('.inkwell-spoiler').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.add('revealed');
      el.title = '';
    });
    el.title = 'Click to reveal spoiler';
  });

  // ── Glossary Filters ──────────────────────────────────────
  const glossaryFilters = document.querySelectorAll('.glossary-filter-btn');
  if (glossaryFilters.length) {
    glossaryFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        glossaryFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.glossary-entry').forEach(entry => {
          if (filter === 'all' || entry.dataset.volume === filter || entry.dataset.tags?.includes(filter)) {
            entry.style.display = '';
          } else {
            entry.style.display = 'none';
          }
        });
        // Hide empty alpha groups
        document.querySelectorAll('.glossary-alpha-group').forEach(group => {
          const visible = group.querySelectorAll('.glossary-entry:not([style*="display: none"])').length;
          group.style.display = visible ? '' : 'none';
        });
      });
    });
  }

  // ── Smooth scroll to anchor ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Copy heading anchor links ──────────────────────────────
  document.querySelectorAll('.chapter-body h2[id], .chapter-body h3[id]').forEach(heading => {
    const anchor = document.createElement('a');
    anchor.href = '#' + heading.id;
    anchor.className = 'heading-anchor';
    anchor.setAttribute('aria-label', 'Link to this section');
    anchor.innerHTML = ' <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
    anchor.style.cssText = 'opacity:0;color:var(--ink-text-faint);transition:opacity 0.15s;vertical-align:middle;';
    heading.appendChild(anchor);
    heading.addEventListener('mouseenter', () => anchor.style.opacity = '1');
    heading.addEventListener('mouseleave', () => anchor.style.opacity = '0');
  });

  // ── Active nav highlight ──────────────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.topbar-nav a').forEach(link => {
    if (link.getAttribute('href') && currentPath.startsWith(link.getAttribute('href')) && link.getAttribute('href') !== '/') {
      link.classList.add('active');
    }
  });

});
