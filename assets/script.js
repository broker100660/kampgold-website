(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Mobile nav -------------------------------------------------
  var header = document.querySelector('header');
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');

  function setNav(open) {
    navLinks.classList.toggle('open', open);
    if (header) header.classList.toggle('nav-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.textContent = open ? '\u2715' : '\u2630';
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      setNav(!navLinks.classList.contains('open'));
    });

    // Close after choosing a link
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });

    // Close with Escape (and return focus to the button)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setNav(false);
        menuBtn.focus();
      }
    });

    // Close when tapping outside the drawer (the dimmed overlay)
    document.addEventListener('click', function (e) {
      if (!navLinks.classList.contains('open')) return;
      if (navLinks.contains(e.target) || menuBtn.contains(e.target)) return;
      setNav(false);
    });

    // Reset if the window grows past the mobile breakpoint
    var desktop = window.matchMedia('(min-width: 981px)');
    var onBreakpoint = function (e) { if (e.matches) setNav(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
    else if (desktop.addListener) desktop.addListener(onBreakpoint);
  }

  // ---- Scroll reveal ----------------------------------------------
  // Purely cosmetic. The text is in the HTML from the start, and the CSS
  // only hides .reveal when the <html> element has the "js" class.
  // Visitors who prefer reduced motion, or browsers without
  // IntersectionObserver, simply see everything straight away.
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  // ---- Ambient background embers (page-wide, low density) ----------
  var field = document.getElementById('emberField');
  if (field && !reduceMotion) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 12; i++) {
      var d = document.createElement('div');
      var size = 3 + Math.random() * 4;
      d.className = 'ember-dot';
      d.style.left = (Math.random() * 100) + '%';
      d.style.animationDuration = (9 + Math.random() * 8) + 's';
      d.style.animationDelay = (Math.random() * 10) + 's';
      d.style.width = size + 'px';
      d.style.height = size + 'px';
      frag.appendChild(d);
    }
    field.appendChild(frag);
  }
})();
