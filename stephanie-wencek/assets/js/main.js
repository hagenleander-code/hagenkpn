/* Stephanie Wencek – Postproduction · Interaktionen (ohne Abhängigkeiten) */
(function () {
  'use strict';

  /* Basis-URL der Bilder. Beim Relaunch die Bilder auf den neuen Server
     kopieren und hier '' eintragen (relative Pfade wie bisher: items/…, images/…). */
  var MEDIA_BASE = 'https://www.stephaniewencek.com/';

  var doc = document.documentElement;
  doc.classList.remove('no-js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- i18n */
  var EN = {
    'skip': 'Skip to content',
    'nav.work': 'Work', 'nav.services': 'Services', 'nav.about': 'About', 'nav.network': 'Network',
    'nav.contact': 'Enquire', 'nav.contactFull': 'Contact', 'menu': 'Menu',
    'hero.eyebrow': 'Postproduction · Retouching · Look development',
    'hero.lede': 'Postproduction for <em>beauty, fashion &amp; art photography.</em> Working across Europe since 2005 – based in Düsseldorf.',
    'hero.cta1': 'View work', 'hero.cta2': 'Start a project',
    'statement.label': 'Approach',
    'statement.quote': '“Understanding the visual language of a brand is just as important as channelling your own creativity towards what the client wants. A <em>unique visual signature</em> is the foundation of every successful campaign.”',
    'services.label': 'Services',
    'services.title': 'From the first look to the <em>last pixel.</em>',
    's1.t': 'Look development',
    's1.d': 'The visual signature of a campaign: colour, skin, light and mood – developed in dialogue with photographer, agency and brand.',
    's2.t': 'Concept & compositing',
    's2.d': 'Ideas that go beyond the shoot – from the initial image concept through composites to a coherent series for print and digital.',
    's3.t': 'High-end retouching',
    's3.d': 'Precise, crafted retouching for beauty, fashion and product – natural, detailed and tuned to the brand’s visual language.',
    'fields.intro': 'Fields of work – hover over an area for a preview.',
    'cat.projects': 'Books & exhibitions', 'cat.projectsShort': 'Books', 'cat.all': 'All',
    'work.label': 'Selected work', 'work.title': 'Portfolio', 'work.pdf': 'Full portfolio as PDF',
    'about.label': 'About',
    'about.title': 'One person. <em>One clear eye.</em>',
    'about.p1': 'Since 2005, Stephanie Wencek has brought her expertise as a freelance post producer to commercial and editorial clients all over Europe. In fashion and beauty in particular, she has earned an outstanding reputation.',
    'about.p2': 'Whether it is developing a distinctive look, conceptual ideas or meticulous technical retouching – it all comes together in a synthesis that directly benefits the image, and the client.',
    'stats.since': 'Since', 'stats.photographers': 'Photographers', 'stats.brands': 'Brands', 'stats.magazines': 'Magazines',
    'role.photographer': 'Photographer · New York', 'role.photographer2': 'Photographer · Switzerland',
    'network.label': 'Network', 'network.title': 'In good <em>company.</em>',
    'tab.clients': 'Clients', 'tab.photographers': 'Photographers', 'tab.magazines': 'Magazines', 'tab.agencies': 'Agencies',
    'contact.label': 'Contact', 'contact.title': 'Let’s talk about your <em>next image.</em>',
    'contact.studio': 'Studio', 'contact.country': 'Germany', 'contact.phone': 'Phone', 'contact.mobile': 'mobile', 'contact.elsewhere': 'Online',
    'brief.title': 'Quick brief', 'brief.name': 'Name', 'brief.type': 'Type of project', 'brief.msg': 'What is it about?',
    'brief.other': 'Book / exhibition / other', 'brief.send': 'Prepare e-mail',
    'brief.note': 'Opens your e-mail app with the details filled in. No data is sent through this website.',
    'footer.imprint': 'Legal notice', 'footer.privacy': 'Privacy', 'footer.top': 'Back to top ↑',
    'lb.prevProject': 'Previous project', 'lb.nextProject': 'Next project'
  };
  var CAT = {
    de: { advertising: 'Advertising', fashion: 'Fashion', beauty: 'Beauty', people: 'People', projects: 'Bücher & Ausstellungen' },
    en: { advertising: 'Advertising', fashion: 'Fashion', beauty: 'Beauty', people: 'People', projects: 'Books & exhibitions' }
  };
  var CREDIT = { de: { photo: 'Foto', agency: 'Agentur' }, en: { photo: 'Photo', agency: 'Agency' } };
  var lang = 'de';
  var DE = {};
  $$('[data-i18n],[data-i18n-html]').forEach(function (el) {
    var k = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
    if (!(k in DE)) DE[k] = el.hasAttribute('data-i18n-html') ? el.innerHTML : el.textContent;
  });
  function setLang(l) {
    lang = l;
    var dict = l === 'en' ? EN : DE;
    $$('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (dict[k] != null) el.textContent = dict[k]; });
    $$('[data-i18n-html]').forEach(function (el) { var k = el.getAttribute('data-i18n-html'); if (dict[k] != null) el.innerHTML = dict[k]; });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    doc.lang = l;
    try { localStorage.setItem('sw-lang', l); } catch (e) {}
    updateCounts();
    renderGrid(false);
    if (lb.open) renderLightboxMeta();
  }
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });

  /* -------------------------------------------------------------- Header */
  var header = $('.site-header');
  var lastY = window.scrollY;
  var menuBtn = $('.menu-toggle');
  var menu = $('#mobile-menu');
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    var hide = y > lastY && y > window.innerHeight * 0.9 && menuBtn.getAttribute('aria-expanded') !== 'true';
    header.classList.toggle('is-hidden', hide);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    document.body.classList.toggle('is-locked', open);
  }
  menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  // aktuellen Abschnitt in der Navigation markieren
  var navLinks = $$('.nav a');
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['arbeiten', 'leistungen', 'about', 'netzwerk', 'kontakt'].forEach(function (id) { var s = document.getElementById(id); if (s) secObs.observe(s); });
  }

  /* ---------------------------------------------------------------- Hero */
  var slides = $$('.hero-slide');
  var heroIdx = 0, heroTimer = null, HERO_MS = 6000;
  var heroCur = $('.hero-current'), heroBar = $('.hero-progress span');
  $('.hero-total').textContent = pad(slides.length);
  doc.style.setProperty('--dur', HERO_MS + 'ms');
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function showSlide(i) {
    heroIdx = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) {
      var on = n === heroIdx;
      s.classList.toggle('is-active', on);
      if (on && s.loading === 'lazy') s.loading = 'eager';
    });
    var nxt = slides[(heroIdx + 1) % slides.length];
    if (nxt.loading === 'lazy') nxt.loading = 'eager';
    heroCur.textContent = pad(heroIdx + 1);
    restartHero();
  }
  function restartHero() {
    clearTimeout(heroTimer);
    heroBar.classList.remove('is-running'); void heroBar.offsetWidth;
    if (reduceMotion || heroPaused) return;
    heroBar.classList.add('is-running');
    heroTimer = setTimeout(function () { showSlide(heroIdx + 1); }, HERO_MS);
  }
  var heroPaused = false;
  $$('[data-hero]').forEach(function (b) {
    b.addEventListener('click', function () { showSlide(heroIdx + (b.dataset.hero === 'next' ? 1 : -1)); });
  });
  var stage = $('.hero-stage');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { heroPaused = !e[0].isIntersecting; restartHero(); }, { threshold: 0.15 }).observe(stage);
  }
  document.addEventListener('visibilitychange', function () { heroPaused = document.hidden; restartHero(); });
  swipe(stage, function (dir) { showSlide(heroIdx + dir); });
  restartHero();

  /* ----------------------------------------------------- Projekte / Grid */
  var projects = (window.SW_PROJECTS || []).map(function (p, i) { p.id = i; return p; });
  var counts = { all: projects.length };
  projects.forEach(function (p) { counts[p.c] = (counts[p.c] || 0) + 1; });
  function updateCounts() {
    $$('[data-count]').forEach(function (el) {
      var n = counts[el.dataset.count] || 0;
      var word = lang === 'en' ? (n === 1 ? 'project' : 'projects') : (n === 1 ? 'Projekt' : 'Projekte');
      el.textContent = el.classList.contains('field-count') ? pad(n) + ' ' + word : n;
    });
  }
  updateCounts();

  // „Alle“ = Kategorien im Wechsel, damit die Mischung sofort sichtbar ist
  var order = (function () {
    var buckets = {}, keys = ['fashion', 'beauty', 'advertising', 'people', 'projects'], out = [];
    projects.forEach(function (p) { (buckets[p.c] = buckets[p.c] || []).push(p); });
    var more = true;
    while (more) {
      more = false;
      keys.forEach(function (k) { if (buckets[k] && buckets[k].length) { out.push(buckets[k].shift()); more = true; } });
    }
    return out;
  })();

  var grid = $('#grid');
  var filter = 'all';
  var visible = [];
  var cardObs = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); cardObs.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -5% 0px' }) : null;

  function thumbUrl(p) { return MEDIA_BASE + p.dir + (p.th || p.im[0]); }
  function imgUrl(p, i) { return MEDIA_BASE + p.dir + p.im[i]; }
  function creditText(p) {
    return p.cr.map(function (c) { return c[0] === 'note' ? c[1] : CREDIT[lang][c[0]] + ': ' + c[1]; }).join(' · ');
  }

  function renderGrid(animate) {
    visible = filter === 'all' ? order : projects.filter(function (p) { return p.c === filter; });
    var frag = document.createDocumentFragment();
    visible.forEach(function (p, idx) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'card';
      b.dataset.idx = idx;
      b.setAttribute('aria-label', p.t + ' – ' + p.im.length + (lang === 'en' ? ' images' : ' Bilder'));
      var credit = creditText(p);
      b.innerHTML =
        '<div class="card-media' + (p.th ? '' : ' card-media--cover') + '">' +
          '<img src="' + thumbUrl(p) + '" alt="" loading="lazy" decoding="async">' +
          '<span class="card-badge">' + p.im.length + ' ' + (lang === 'en' ? 'images' : 'Bilder') + '</span>' +
        '</div>' +
        '<div class="card-body"><span class="card-title"></span><span class="card-cat"></span></div>' +
        (credit ? '<p class="card-credit"></p>' : '');
      $('.card-title', b).textContent = p.t;
      $('.card-cat', b).textContent = CAT[lang][p.c];
      if (credit) $('.card-credit', b).textContent = credit;
      if (!animate || !cardObs || reduceMotion) b.classList.add('is-in');
      frag.appendChild(b);
    });
    grid.innerHTML = '';
    grid.appendChild(frag);
    if (animate && cardObs && !reduceMotion) $$('.card', grid).forEach(function (c, i) {
      c.style.transitionDelay = (i % 4) * 70 + 'ms';
      cardObs.observe(c);
    });
  }

  function setFilter(f, animate) {
    filter = f;
    $$('.filters button').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.filter === f)); });
    renderGrid(animate !== false);
  }
  $$('.filters button').forEach(function (b) { b.addEventListener('click', function () { setFilter(b.dataset.filter); }); });
  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (card) openLightbox(+card.dataset.idx, 0, card);
  });

  /* ------------------------------------------- Arbeitsfelder + Vorschau */
  var preview = $('.field-preview'), previewImg = $('img', preview);
  var px = 0, py = 0, tx = 0, ty = 0, raf = null;
  function loop() {
    px += (tx - px) * 0.18; py += (ty - py) * 0.18;
    preview.style.left = px + 'px'; preview.style.top = py + 'px';
    raf = Math.abs(tx - px) + Math.abs(ty - py) > 0.5 ? requestAnimationFrame(loop) : null;
  }
  $$('#field-list a').forEach(function (a) {
    var src = MEDIA_BASE + a.dataset.preview;
    new Image().src = src;
    a.addEventListener('mouseenter', function (e) {
      previewImg.src = src; tx = px = e.clientX; ty = py = e.clientY; loop();
      preview.classList.add('is-visible');
    });
    a.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(loop); });
    a.addEventListener('mouseleave', function () { preview.classList.remove('is-visible'); });
    a.addEventListener('click', function () { preview.classList.remove('is-visible'); setFilter(a.dataset.field); });
  });

  /* ------------------------------------------------------------ Lightbox */
  var lbEl = $('#lightbox');
  var lb = { open: false, p: 0, i: 0, opener: null };
  var lbImg = $('#lb-img'), lbStrip = $('#lb-strip');

  function openLightbox(pIdx, iIdx, opener) {
    lb.p = pIdx; lb.i = iIdx || 0; lb.opener = opener || null; lb.open = true;
    lbEl.hidden = false;
    document.body.classList.add('is-locked');
    requestAnimationFrame(function () { lbEl.classList.add('is-open'); });
    renderLightbox();
    $('[data-lb="close"]', lbEl).focus();
  }
  function closeLightbox() {
    lb.open = false;
    lbEl.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    setTimeout(function () { if (!lb.open) lbEl.hidden = true; }, reduceMotion ? 0 : 400);
    if (lb.opener) lb.opener.focus({ preventScroll: true });
  }
  function renderLightboxMeta() {
    var p = visible[lb.p];
    $('#lb-cat').textContent = CAT[lang][p.c];
    $('#lb-title').textContent = p.t;
    $('#lb-credit').textContent = creditText(p);
    $('#lb-count').textContent = pad(lb.i + 1) + ' / ' + pad(p.im.length);
  }
  function renderLightbox() {
    var p = visible[lb.p];
    renderLightboxMeta();
    lbImg.classList.add('is-loading');
    var src = imgUrl(p, lb.i);
    var pre = new Image();
    pre.onload = pre.onerror = function () {
      if (imgUrl(visible[lb.p], lb.i) !== src) return;
      lbImg.src = src;
      lbImg.alt = p.t + ' – ' + (lb.i + 1) + '/' + p.im.length;
      lbImg.classList.remove('is-loading');
    };
    pre.src = src;
    if (p.im[lb.i + 1]) new Image().src = imgUrl(p, lb.i + 1);
    lbStrip.innerHTML = '';
    if (p.im.length > 1) p.im.forEach(function (_, n) {
      var d = document.createElement('button');
      d.type = 'button';
      d.setAttribute('aria-label', (lang === 'en' ? 'Image ' : 'Bild ') + (n + 1));
      if (n === lb.i) d.setAttribute('aria-current', 'true');
      d.addEventListener('click', function () { lb.i = n; renderLightbox(); });
      lbStrip.appendChild(d);
    });
  }
  function lbStep(dir) {
    var p = visible[lb.p], n = lb.i + dir;
    if (n >= p.im.length) { lbProject(1); return; }
    if (n < 0) { lbProject(-1, true); return; }
    lb.i = n; renderLightbox();
  }
  function lbProject(dir, toLast) {
    lb.p = (lb.p + dir + visible.length) % visible.length;
    lb.i = toLast ? visible[lb.p].im.length - 1 : 0;
    lb.opener = grid.children[lb.p] || lb.opener;
    renderLightbox();
  }
  lbEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-lb]');
    if (!t) return;
    var a = t.dataset.lb;
    if (a === 'close') closeLightbox();
    else if (a === 'next') lbStep(1);
    else if (a === 'prev') lbStep(-1);
    else if (a === 'nextProject') lbProject(1);
    else if (a === 'prevProject') lbProject(-1);
  });
  document.addEventListener('keydown', function (e) {
    if (lb.open) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') lbStep(1);
      else if (e.key === 'ArrowLeft') lbStep(-1);
      else if (e.key === 'Tab') { // Fokus im Dialog halten
        var f = $$('button', lbEl).filter(function (b) { return b.offsetParent !== null; });
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    } else if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false);
  });
  swipe($('.lb-stage'), function (dir) { lbStep(dir); });

  /* -------------------------------------------------------------- Tabs */
  var tabs = $$('.tabs [role="tab"]');
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      var n = tabs[(i + d + tabs.length) % tabs.length];
      selectTab(n); n.focus();
    });
  });

  /* ------------------------------------------------------ Kontaktformular */
  $('#brief').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, ok = true;
    ['name', 'message'].forEach(function (n) {
      var el = f.elements[n], bad = !el.value.trim();
      el.closest('.field').classList.toggle('is-invalid', bad);
      if (bad && ok) { el.focus(); ok = false; }
    });
    if (!ok) return;
    var subject = (lang === 'en' ? 'Enquiry: ' : 'Anfrage: ') + f.elements.type.value + ' – ' + f.elements.name.value.trim();
    var body = f.elements.message.value.trim() + '\n\n— ' + f.elements.name.value.trim();
    window.location.href = 'mailto:contact@stephaniewencek.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });

  /* ------------------------------------------------------ Reveal / Zahlen */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        $$('[data-countup]', e.target).forEach(countUp);
        revObs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(function (el) { revObs.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }
  function countUp(el) {
    var target = +el.dataset.countup, t0 = null, D = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / D);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* -------------------------------------------------------------- Helfer */
  function swipe(el, cb) {
    var x0 = null, y0 = null;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) cb(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }

  $('#year').textContent = new Date().getFullYear();

  /* --------------------------------------------------------------- Start */
  var saved = null;
  try { saved = localStorage.getItem('sw-lang'); } catch (e) {}
  if (!saved && (navigator.language || '').slice(0, 2) !== 'de' && (navigator.language || '')) saved = 'en';
  if (saved === 'en') setLang('en'); else renderGrid(true);

  var ready = function () { doc.classList.add('is-ready'); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ready); else ready();
  setTimeout(ready, 1200);
})();
