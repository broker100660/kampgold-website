// Mobile nav
var menuBtn = document.getElementById('menuBtn');
var navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { navLinks.classList.remove('open'); });
  });
}

// Scroll reveal — purely cosmetic; underlying text is already in the DOM
// on load, so this never hides content from crawlers, only from the
// visual fade-in animation for human visitors.
var revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { io.observe(el); });
}

// Ambient background embers (page-wide, low density)
var field = document.getElementById('emberField');
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (field && !reduceMotion) {
  for (var i = 0; i < 18; i++) {
    var d = document.createElement('div');
    d.className = 'ember-dot';
    d.style.left = (Math.random() * 100) + '%';
    d.style.animationDuration = (9 + Math.random() * 8) + 's';
    d.style.animationDelay = (Math.random() * 10) + 's';
    var size = 3 + Math.random() * 4;
    d.style.width = size + 'px'; d.style.height = size + 'px';
    field.appendChild(d);
  }
  var hv = document.getElementById('hvEmbers');
  if (hv) {
    for (var j = 0; j < 10; j++) {
      var e = document.createElement('div');
      e.className = 'ember-dot';
      e.style.left = (Math.random() * 100) + '%';
      e.style.animationDuration = (5 + Math.random() * 5) + 's';
      e.style.animationDelay = (Math.random() * 6) + 's';
      var s2 = 2 + Math.random() * 3;
      e.style.width = s2 + 'px'; e.style.height = s2 + 'px';
      hv.appendChild(e);
    }
  }
}
