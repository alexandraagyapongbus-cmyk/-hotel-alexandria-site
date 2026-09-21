// Hotel Alexandria — shared site behavior (no build step, no framework)

document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('site-header');
  if (header && header.classList.contains('nav-scrolls')) {
    var onScroll = function () {
      if (window.scrollY > 60) {
        header.classList.remove('transparent-nav');
      } else {
        header.classList.add('transparent-nav');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Close open <details> mega-menu when clicking outside it
  document.addEventListener('click', function (e) {
    document.querySelectorAll('details.hotels-menu[open]').forEach(function (d) {
      if (!d.contains(e.target)) { d.removeAttribute('open'); }
    });
  });
});

function toggleMobileNav() {
  var nav = document.getElementById('mobile-nav');
  if (nav) { nav.classList.toggle('open'); }
}

function toggleDrawer() {
  var panel = document.getElementById('booking-drawer');
  if (panel) { panel.classList.toggle('open'); }
}

function selectHotspot(id) {
  var panels = document.querySelectorAll('.hotspot-panel');
  for (var i = 0; i < panels.length; i++) { panels[i].style.display = 'none'; }
  var placeholder = document.getElementById('hotspot-placeholder');
  if (placeholder) { placeholder.style.display = 'none'; }
  var target = document.getElementById('hotspot-' + id);
  if (target) { target.style.display = 'block'; }
}

function updateJourneySlider(val) {
  var futureImg = document.getElementById('future-img');
  var divider = document.getElementById('journey-divider');
  if (futureImg) { futureImg.style.clipPath = 'inset(0 ' + (100 - val) + '% 0 0)'; }
  if (divider) { divider.style.left = val + '%'; }
}

/* ===== Cinematic reveals =====
   .reveal elements fade/rise into place the first time they enter the
   viewport (IntersectionObserver, fires once per element). Respects
   prefers-reduced-motion by skipping the animated state entirely and
   showing final content immediately.
   .hero-mask heroes get a one-time "opening" animation on page load
   (defined in CSS as @keyframes) — the image starts letterboxed and
   slightly oversized, and unmasks to full frame within view, so the
   complete hero is always visible without needing to scroll. */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }
})();
