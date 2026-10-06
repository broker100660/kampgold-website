(function () {
  'use strict';
  var root = document.documentElement;

  // Mobile menu
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    if (btn) { btn.setAttribute('aria-expanded', String(open)); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); }
  }
  if (btn && menu) {
    btn.addEventListener('click', function () { setMenu(!root.classList.contains('menu-open')); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  // Scroll reveal (IntersectionObserver only — no scroll listeners)
  var items = document.querySelectorAll('[data-reveal]');
  if (items.length) {
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      items.forEach(function (el) { io.observe(el); });
    }
  }

  // Catalogue: preview image follows the hovered / focused row
  var cat = document.querySelector('[data-cat]');
  if (cat) {
    var rows = Array.prototype.slice.call(cat.querySelectorAll('[data-row]'));
    var imgs = Array.prototype.slice.call(cat.querySelectorAll('[data-stage-img]'));
    var set = function (i) {
      rows.forEach(function (r, k) { r.toggleAttribute('data-active', k === i); });
      imgs.forEach(function (m, k) { m.toggleAttribute('data-active', k === i); });
    };
    rows.forEach(function (r, i) {
      r.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') set(i); });
      r.addEventListener('focusin', function () { set(i); });
    });
    set(0);
  }
})();
