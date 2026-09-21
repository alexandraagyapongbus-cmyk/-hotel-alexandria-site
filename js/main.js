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

/* ===== Scroll-linked cinematic reveals =====
   1) .reveal elements fade/rise into place the first time they enter the
      viewport (IntersectionObserver, fires once per element).
   2) .hero-mask heroes get a true scroll-position-driven "opening" effect —
      the image starts letterboxed and slightly oversized, and unmasks to
      full frame as the user scrolls the hero out of view.
   Both respect prefers-reduced-motion by skipping the animated states
   entirely and showing final content immediately. */
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

  var maskHero = document.querySelector('.hero-mask');
  if (maskHero && !reduceMotion) {
    var img = maskHero.querySelector('.hero-bg');
    var content = maskHero.querySelector('.hero-content');
    var heroHeight = maskHero.offsetHeight || window.innerHeight;
    var ticking = false;

    var update = function () {
      var progress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
      var band = 36 * (1 - progress); /* percent hidden top+bottom at scroll top */
      if (img) {
        img.style.clipPath = 'inset(' + band + '% 0 ' + band + '% 0)';
        img.style.transform = 'scale(' + (1.14 - 0.14 * progress) + ')';
      }
      if (content) {
        content.style.opacity = String(Math.min(1, progress * 2.4));
        content.style.transform = 'translateY(' + (22 * (1 - progress)) + 'px)';
      }
      ticking = false;
    };

    update();
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', function () {
      heroHeight = maskHero.offsetHeight || window.innerHeight;
      update();
    });
  } else if (maskHero) {
    /* reduced motion: show the hero fully formed, no mask */
    var imgRM = maskHero.querySelector('.hero-bg');
    if (imgRM) { imgRM.style.clipPath = 'none'; imgRM.style.transform = 'none'; }
  }
})();
