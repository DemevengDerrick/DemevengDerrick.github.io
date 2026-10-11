/**
 * Derrick Demeveng — Portfolio
 * Renders content from js/data.js and wires up interactions & motion.
 * Motion (GSAP, Lenis, custom cursor) only runs when the libraries loaded and the
 * visitor has not asked for reduced motion; otherwise the page stays static and fully usable.
 */
(function () {
    'use strict';

    const D = window.PORTFOLIO;
    const root = document.documentElement;
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
    const MOTION = hasGSAP && !reducedMotion;
    root.classList.add(MOTION ? 'motion' : 'no-motion');

    const roleKeys = Object.keys(D.roles);
    const byId = Object.fromEntries(D.projects.map((p) => [p.id, p]));
    let lenis = null;

    /* ======================================================================
       Rendering
       ====================================================================== */

    // Display titles are uppercased by CSS; acronyms with meaningful case (EmONC) opt out.
    const KEEP_CASE = /\b(EmONC)\b/g;
    function titleHTML(t) {
        return esc(t).replace(KEEP_CASE, '<span class="keep-case">$1</span>');
    }

    function roleChips(keys) {
        return keys.map((k) => `<li class="role-${k}">${esc(D.roles[k].label)}</li>`).join('');
    }

    function initials(p) {
        return p.roles.map((r) => D.roles[r].label.split(' ').map((w) => w[0]).join('')).join('/');
    }

    function coverHTML(p) {
        const idx = String(D.projects.indexOf(p) + 1).padStart(2, '0');
        return `<div class="cover role-${p.roles[0]}">
            <div class="cover-grid"></div>
            <div class="cover-top"><span>No. ${idx}</span><span>${esc(p.year || '')}</span></div>
            <div class="cover-title">${titleHTML(p.title)}</div>
            <div class="cover-stack">${p.tools.slice(0, 3).map(esc).join(' · ')}</div>
            <span class="cover-glyph" aria-hidden="true">${esc(initials(p))}</span>
        </div>`;
    }

    function mediaHTML(p, eager) {
        return p.image
            ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`
            : coverHTML(p);
    }

    function renderMarquee() {
        const track = $('.marquee-track');
        const group = () => `<div class="marquee-group">${D.tools.map((t) =>
            `<span class="marquee-item">${esc(t)}</span><span class="marquee-sep"></span>`).join('')}</div>`;
        track.innerHTML = group() + group();
    }

    function renderDisciplines() {
        const counts = Object.fromEntries(roleKeys.map((k) => [k, D.projects.filter((p) => p.roles.includes(k)).length]));
        // Spatial first: it is the headline title on the CV.
        const order = ['spatial', 'engineer', 'analyst'];
        $('#disciplineList').innerHTML = order.map((k, i) => {
            const r = D.roles[k];
            return `<a href="#all-work" class="discipline role-${k}" data-role="${k}" data-cursor="Filter">
                <span class="discipline-num">(0${i + 1})</span>
                <h3 class="discipline-title">${esc(r.label)}</h3>
                <div class="discipline-body">
                    <p>${esc(r.summary)}</p>
                    <ul class="chips">${r.tools.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
                </div>
                <span class="discipline-cta"><span class="count-badge">${counts[k]}</span> projects <span class="discipline-arrow">→</span></span>
            </a>`;
        }).join('');
    }

    function renderFeatured() {
        $('#featuredList').innerHTML = D.featured.map((id, i) => {
            const p = byId[id];
            return `<li class="feat role-${p.roles[0]}" data-id="${id}" tabindex="0" role="button" aria-label="Open ${esc(p.title)}" data-cursor="Open">
                <span class="feat-num">${String(i + 1).padStart(2, '0')}</span>
                <span class="feat-title">${titleHTML(p.title)}</span>
                <ul class="feat-roles chips">${roleChips(p.roles)}</ul>
                <span class="feat-year">${esc(p.year)}</span>
                ${p.image ? `<div class="feat-thumb">${mediaHTML(p)}</div>` : ''}
            </li>`;
        }).join('');
    }

    function renderFilters() {
        const rc = (k) => D.projects.filter((p) => p.roles.includes(k)).length;
        $('#roleFilters').innerHTML =
            `<button class="filter-btn is-active" data-role="all" aria-pressed="true">All<sup>${D.projects.length}</sup></button>` +
            roleKeys.map((k) => `<button class="filter-btn role-${k}" data-role="${k}" aria-pressed="false">${esc(D.roles[k].label)}<sup>${rc(k)}</sup></button>`).join('');
        $('#topicFilters').innerHTML =
            `<button class="filter-btn is-active" data-topic="all" aria-pressed="true">All topics</button>` +
            Object.entries(D.topics).map(([k, v]) => `<button class="filter-btn" data-topic="${k}" aria-pressed="false">${esc(v)}</button>`).join('');
    }

    // Interleave two image cards with one typographic cover so the grid reads as a rhythm, not two blocks.
    function gridOrder() {
        const img = D.projects.filter((p) => p.image);
        const txt = D.projects.filter((p) => !p.image);
        const out = [];
        while (img.length || txt.length) {
            out.push(...img.splice(0, 2));
            if (txt.length) out.push(txt.shift());
        }
        return out;
    }

    function renderGrid() {
        $('#projectGrid').innerHTML = gridOrder().map((p) => `
            <article class="card role-${p.roles[0]}" data-id="${p.id}" data-roles="${p.roles.join(' ')}" data-topic="${p.topic}" data-cursor="View" tabindex="0" role="button" aria-label="Open ${esc(p.title)}">
                <div class="card-media">${mediaHTML(p)}</div>
                <div class="card-meta"><span>${esc(D.topics[p.topic])}</span><span>${esc(p.year)}</span></div>
                <h3 class="card-title">${esc(p.title)}</h3>
                <p class="card-summary">${esc(p.summary)}</p>
                <ul class="card-roles chips">${roleChips(p.roles)}</ul>
            </article>`).join('');
    }

    function renderTimeline() {
        $('#timeline').innerHTML = D.experience.map((j, i) => `
            <article class="job${i === 0 ? ' is-open' : ''}">
                <button class="job-head" aria-expanded="${i === 0}" aria-controls="job-${i}">
                    <span class="job-period">${esc(j.period)}</span>
                    <span class="job-logo"><img src="${esc(j.logo)}" alt="" loading="lazy"></span>
                    <span class="job-title">${esc(j.role)}<span class="job-org">${esc(j.org)}</span></span>
                    <ul class="job-roles chips">${j.roles.map((k) => `<li class="role-${k}">${esc(D.roles[k].short)}</li>`).join('')}</ul>
                    <span class="job-toggle" aria-hidden="true">+</span>
                </button>
                <div class="job-body" id="job-${i}">
                    <div class="job-body-inner">
                        <div class="job-content"><div>
                            ${j.place ? `<p class="job-place">${esc(j.place)}</p>` : ''}
                            <p class="job-summary">${esc(j.summary)}</p>
                            <ul class="job-list">${j.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
                        </div></div>
                    </div>
                </div>
            </article>`).join('');
    }

    function renderResearch() {
        $('#pubList').innerHTML = D.publications.map((p) => `
            <li class="pub reveal"><a href="${esc(p.url)}" target="_blank" rel="noopener">
                <span class="pub-title">${esc(p.title)}</span>
                ${p.sub ? `<span class="pub-sub">${esc(p.sub)}</span>` : ''}
                <span class="pub-meta">${esc(p.venue)} · ${esc(p.year)}</span>
                <span class="pub-arrow" aria-hidden="true">↗</span>
            </a></li>`).join('');
        $('#eduList').innerHTML = D.education.map((e) => `
            <li class="edu reveal">
                <span class="edu-degree">${esc(e.degree)}</span>
                <span class="edu-year">${esc(e.year)}</span>
                ${e.note ? `<span class="edu-note">${esc(e.note)}</span>` : ''}
                <span class="edu-school">${esc(e.school)}</span>
            </li>`).join('');
        $('#certList').innerHTML = D.certifications.map((c) => `<li>${esc(c)}</li>`).join('');
        $('#awardList').innerHTML = D.awards.map((a) => `<li>${esc(a)}</li>`).join('');
    }

    function renderArchive() {
        $('#archiveList').innerHTML = D.archive.map((a, i) => a.image
            ? `<li class="archive-item reveal"><button data-archive="${i}" data-cursor="Zoom">
                    <span class="archive-title">${esc(a.title)}</span><span class="archive-kind">${esc(a.kind)}</span><span class="archive-icon">＋</span>
               </button></li>`
            : `<li class="archive-item reveal"><a href="${esc(a.url)}" target="_blank" rel="noopener" data-cursor="Open">
                    <span class="archive-title">${esc(a.title)}</span><span class="archive-kind">${esc(a.kind)}</span><span class="archive-icon">↗</span>
               </a></li>`).join('');
        $('#countryNames').textContent = Object.values(D.countries).map((c) => c[0]).sort().join(' · ');
    }

    /* ======================================================================
       Interactions
       ====================================================================== */

    function scrollToTarget(target) {
        const el = typeof target === 'string' ? $(target) : target;
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
        else el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }

    function initNav() {
        const nav = $('.nav');
        const toggle = $('.nav-toggle');
        const menu = $('#menu');

        $$('.nav-links a').forEach((a) => { a.innerHTML = `<span>${a.textContent}</span>`; });

        const setMenu = (open) => {
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            menu.classList.toggle('is-open', open);
            menu.setAttribute('aria-hidden', String(!open));
            if (open) nav.classList.remove('is-hidden');
            if (lenis) open ? lenis.stop() : lenis.start();
        };
        toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));

        // Smooth anchor scrolling for all in-page links.
        document.addEventListener('click', (e) => {
            const a = e.target.closest('a[href^="#"]');
            if (!a || a.classList.contains('discipline')) return;
            const id = a.getAttribute('href');
            if (id.length < 2 || !$(id)) return;
            e.preventDefault();
            setMenu(false);
            scrollToTarget(id);
        });

        // Hide nav on scroll down, show on scroll up.
        let lastY = window.scrollY;
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            nav.classList.toggle('is-hidden', y > lastY && y > 300 && !menu.classList.contains('is-open'));
            lastY = y;
        }, { passive: true });

        // Active section indicator.
        const links = $$('.nav-links a');
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (!en.isIntersecting) return;
                links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        ['work', 'disciplines', 'experience', 'research', 'contact'].forEach((id) => { const s = $('#' + id); if (s) io.observe(s); });
    }

    function initRoleRotator() {
        const words = $$('.role-word');
        if (words.length < 2 || reducedMotion) return;
        let i = 0;
        setInterval(() => {
            const cur = words[i];
            i = (i + 1) % words.length;
            const next = words[i];
            cur.classList.remove('is-active');
            cur.classList.add('is-leaving');
            next.classList.remove('is-leaving');
            next.classList.add('is-active');
            setTimeout(() => cur.classList.remove('is-leaving'), 850);
        }, 2600);
    }

    /* ---------- Filters ---------- */
    const filter = { role: 'all', topic: 'all' };

    function applyFilter(animate = true) {
        const cards = $$('#projectGrid .card');
        const shown = [];
        cards.forEach((c) => {
            const ok = (filter.role === 'all' || c.dataset.roles.split(' ').includes(filter.role)) &&
                (filter.topic === 'all' || c.dataset.topic === filter.topic);
            c.hidden = !ok;
            if (ok) shown.push(c);
        });
        $$('#roleFilters .filter-btn').forEach((b) => { const on = b.dataset.role === filter.role; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on); });
        $$('#topicFilters .filter-btn').forEach((b) => { const on = b.dataset.topic === filter.topic; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on); });

        const parts = [];
        if (filter.role !== 'all') parts.push(D.roles[filter.role].label);
        if (filter.topic !== 'all') parts.push(D.topics[filter.topic]);
        $('#filterStatus').textContent = `Showing ${shown.length} project${shown.length === 1 ? '' : 's'}${parts.length ? ' · ' + parts.join(' · ') : ''}`;

        if (MOTION && animate) {
            gsap.fromTo(shown, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out', overwrite: true });
            ScrollTrigger.refresh();
        }
    }

    function initFilters() {
        $('#roleFilters').addEventListener('click', (e) => {
            const b = e.target.closest('.filter-btn'); if (!b) return;
            filter.role = b.dataset.role; applyFilter();
        });
        $('#topicFilters').addEventListener('click', (e) => {
            const b = e.target.closest('.filter-btn'); if (!b) return;
            filter.topic = b.dataset.topic; applyFilter();
        });
        $('#disciplineList').addEventListener('click', (e) => {
            const d = e.target.closest('.discipline'); if (!d) return;
            e.preventDefault();
            filter.role = d.dataset.role; filter.topic = 'all';
            applyFilter(false);
            scrollToTarget('#all-work');
            if (MOTION) setTimeout(() => applyFilter(true), 500);
        });
        applyFilter(false);
    }

    /* ---------- Modal & lightbox ---------- */
    let lastFocus = null;

    function openDialog(dlg) {
        lastFocus = document.activeElement;
        dlg.hidden = false;
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
        const panel = $('.modal-panel', dlg);
        if (panel) panel.scrollTop = 0;
        if (MOTION) {
            gsap.fromTo($('.modal-backdrop', dlg) || dlg, { opacity: 0 }, { opacity: 1, duration: 0.4 });
            if (panel) gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.7, ease: 'expo.out' });
        }
        $('.modal-close', dlg).focus();
    }

    function closeDialog(dlg) {
        const done = () => {
            dlg.hidden = true;
            document.body.style.overflow = '';
            if (lenis) lenis.start();
            const media = $('#modalMedia');
            if (dlg.id === 'projectModal' && media) { media.innerHTML = ''; $('#modalMore').innerHTML = ''; } // stop any video
            if (lastFocus) lastFocus.focus();
        };
        const panel = $('.modal-panel', dlg);
        if (MOTION && panel) gsap.to(panel, { xPercent: 100, duration: 0.45, ease: 'power3.in', onComplete: done });
        else done();
    }

    function openProject(id) {
        const p = byId[id]; if (!p) return;
        const media = $('#modalMedia');
        if (p.video) {
            media.innerHTML = `<iframe src="${esc(p.video)}" title="${esc(p.title)} — video" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
        } else if (p.gallery) {
            media.innerHTML = `<img src="${esc(p.gallery[0])}" alt="${esc(p.title)}">`;
        } else {
            media.innerHTML = mediaHTML(p, true);
        }
        // Remaining gallery images go below the text so the description stays near the top.
        $('#modalMore').innerHTML = (p.gallery || []).slice(1)
            .map((src, i) => `<img src="${esc(src)}" alt="${esc(p.title)} — figure ${i + 2}" loading="lazy">`).join('');
        $('#modalKicker').textContent = [p.roles.map((r) => D.roles[r].label).join(' / '), D.topics[p.topic], p.year].join(' — ');
        $('#modalTitle').innerHTML = titleHTML(p.title);
        $('#modalDesc').textContent = p.description;
        $('#modalTools').innerHTML = p.tools.map((t) => `<li>${esc(t)}</li>`).join('');
        $('#modalLinks').innerHTML = (p.links || []).map((l) =>
            `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener"><span>${esc(l.label)} ↗</span></a>`).join('');
        openDialog($('#projectModal'));
    }

    function initDialogs() {
        const modal = $('#projectModal');
        const lightbox = $('#lightbox');

        document.addEventListener('click', (e) => {
            const card = e.target.closest('.card, .feat');
            if (card) { openProject(card.dataset.id); return; }
            const arch = e.target.closest('[data-archive]');
            if (arch) {
                const a = D.archive[+arch.dataset.archive];
                $('img', lightbox).src = a.image;
                $('img', lightbox).alt = a.title;
                $('figcaption', lightbox).textContent = `${a.title} — ${a.kind}`;
                openDialog(lightbox);
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            const item = e.target.closest && e.target.closest('.card, .feat');
            if (item && item === e.target) { e.preventDefault(); openProject(item.dataset.id); }
        });

        [modal, lightbox].forEach((dlg) => {
            dlg.addEventListener('click', (e) => {
                if (e.target.closest('[data-close]') || e.target === dlg) closeDialog(dlg);
            });
        });
        document.addEventListener('keydown', (e) => {
            const open = [modal, lightbox].find((d) => !d.hidden);
            if (!open) return;
            if (e.key === 'Escape') { closeDialog(open); return; }
            if (e.key === 'Tab') { // keep focus inside the dialog
                const f = $$('a[href], button, iframe', open).filter((x) => x.offsetParent !== null);
                if (!f.length) return;
                const first = f[0], last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
    }

    /* ---------- Experience accordion ---------- */
    function initTimeline() {
        $('#timeline').addEventListener('click', (e) => {
            const head = e.target.closest('.job-head'); if (!head) return;
            const job = head.parentElement;
            const open = !job.classList.contains('is-open');
            job.classList.toggle('is-open', open);
            head.setAttribute('aria-expanded', String(open));
            if (hasGSAP) setTimeout(() => ScrollTrigger.refresh(), 650);
        });
    }

    /* ---------- Countries map (lazy) ---------- */
    function initCountriesMap() {
        const el = $('#countriesMap');
        if (!el || typeof L === 'undefined') return;
        const io = new IntersectionObserver((entries, obs) => {
            if (!entries[0].isIntersecting) return;
            obs.disconnect();
            const map = L.map(el, { scrollWheelZoom: false, worldCopyJump: false, zoomSnap: 0.25, minZoom: 1, maxZoom: 6, attributionControl: true })
                .setView([15, 5], window.innerWidth < 700 ? 0.75 : 1.75);
            map.attributionControl.setPrefix(false).addAttribution('Boundaries: <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a>');

            // No basemap tiles: the world itself is drawn from Natural Earth, visited countries in white.
            fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_110m_admin_0_countries.geojson')
                .then((r) => r.json())
                .then((geo) => {
                    const base = { color: '#39424c', weight: 0.6, fillColor: '#1a2129', fillOpacity: 1 };
                    const hit = { color: '#11161c', weight: 0.6, fillColor: '#4cc9a6', fillOpacity: 0.85 };
                    L.geoJSON(geo, {
                        style: (f) => (D.countries[f.properties.ADM0_A3] ? hit : base),
                        onEachFeature: (f, layer) => {
                            const c = D.countries[f.properties.ADM0_A3];
                            if (!c) return;
                            layer.bindTooltip(c[0], { className: 'country-tip', sticky: true });
                            layer.on('mouseover', () => layer.setStyle({ fillOpacity: 0.6 }));
                            layer.on('mouseout', () => layer.setStyle({ fillOpacity: 0.85 }));
                        }
                    }).addTo(map);
                })
                .catch(() => { /* markers still show the footprint */ });

            const icon = L.divIcon({ className: 'country-marker', html: '<div class="marker-dot"></div>', iconSize: [10, 10], iconAnchor: [5, 5] });
            const markers = Object.values(D.countries).map(([name, ll]) =>
                L.marker(ll, { icon, keyboard: false }).bindTooltip(name, { className: 'country-tip' }).addTo(map));
        }, { rootMargin: '300px' });
        io.observe(el);
    }

    /* ---------- Hero contour canvas ---------- */
    function initContours() {
        const canvas = $('.hero-canvas');
        if (!canvas || !canvas.getContext) return;
        const ctx = canvas.getContext('2d');
        const CELL = 16;
        const LEVELS = [-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2, 1.6];
        // Role accents (spatial teal, engineer blue, analyst orange) as RGB for the contour strokes.
        const HUES = ['76,201,166', '124,184,240', '242,166,90'];
        let w, h, cols, rows, field, t = 0, visible = true, raf = 0, last = 0;
        const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.clientWidth; h = canvas.clientHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cols = Math.ceil(w / CELL) + 1; rows = Math.ceil(h / CELL) + 1;
            field = new Float32Array(cols * rows);
        }

        // Smooth pseudo-terrain from layered sinusoids + a "hill" that follows the pointer.
        function height(x, y) {
            const nx = x / w * 6, ny = y / h * 4;
            let v = Math.sin(nx * 1.1 + t * 0.6) * Math.cos(ny * 1.3 - t * 0.4)
                + 0.6 * Math.sin(nx * 2.3 - ny * 1.7 + t * 0.3)
                + 0.35 * Math.cos(nx * 3.7 + ny * 2.9 - t * 0.5);
            const dx = x - mouse.x, dy = y - mouse.y;
            v += 1.6 * Math.exp(-(dx * dx + dy * dy) / 26000);
            return v;
        }

        function draw() {
            for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) field[j * cols + i] = height(i * CELL, j * CELL);
            ctx.clearRect(0, 0, w, h);
            LEVELS.forEach((lv, li) => {
                ctx.beginPath();
                ctx.strokeStyle = li === 4 ? `rgba(${HUES[0]},0.75)` : `rgba(${HUES[li % 3]},0.26)`;
                ctx.lineWidth = li === 4 ? 1.4 : 0.8;
                for (let j = 0; j < rows - 1; j++) {
                    for (let i = 0; i < cols - 1; i++) {
                        const a = field[j * cols + i], b = field[j * cols + i + 1];
                        const c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
                        const idx = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (c > lv ? 2 : 0) | (d > lv ? 1 : 0);
                        if (idx === 0 || idx === 15) continue;
                        const x = i * CELL, y = j * CELL;
                        const lerp = (p, q) => (lv - p) / (q - p);
                        const top = [x + CELL * lerp(a, b), y];
                        const right = [x + CELL, y + CELL * lerp(b, c)];
                        const bottom = [x + CELL * lerp(d, c), y + CELL];
                        const left = [x, y + CELL * lerp(a, d)];
                        const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
                        switch (idx) {
                            case 1: case 14: seg(left, bottom); break;
                            case 2: case 13: seg(bottom, right); break;
                            case 3: case 12: seg(left, right); break;
                            case 4: case 11: seg(top, right); break;
                            case 5: seg(left, top); seg(bottom, right); break;
                            case 6: case 9: seg(top, bottom); break;
                            case 7: case 8: seg(left, top); break;
                            case 10: seg(left, bottom); seg(top, right); break;
                        }
                    }
                }
                ctx.stroke();
            });
        }

        function loop(now) {
            raf = requestAnimationFrame(loop);
            if (!visible || now - last < 33) return; // ~30fps is plenty for drifting contours
            last = now;
            t += 0.012;
            mouse.x += (mouse.tx - mouse.x) * 0.08;
            mouse.y += (mouse.ty - mouse.y) * 0.08;
            draw();
        }

        resize();
        window.addEventListener('resize', () => { resize(); draw(); });
        if (reducedMotion) { draw(); return; }

        const hero = $('.hero');
        hero.addEventListener('pointermove', (e) => {
            const r = canvas.getBoundingClientRect();
            mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top;
            if (mouse.x < -1000) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
        });
        hero.addEventListener('pointerleave', () => { mouse.tx = -9999; mouse.ty = -9999; });
        new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(hero);
        document.addEventListener('visibilitychange', () => { visible = !document.hidden; });
        raf = requestAnimationFrame(loop);
    }

    /* ======================================================================
       Motion (GSAP + Lenis)
       ====================================================================== */

    function splitText() {
        // Lines: split on <br> and wrap each in a mask.
        $$('.split-lines').forEach((el) => {
            const lines = el.innerHTML.split(/<br\s*\/?>/i);
            el.innerHTML = lines.map((l) => `<span class="line"><span class="line-inner">${l.trim()}</span></span>`).join('');
        });
        // Words: wrap each word in a mask.
        $$('.split-words').forEach((el) => {
            el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="word"><span class="word-inner">${esc(w)}</span></span>`).join(' ');
        });
    }

    function initLenis() {
        if (typeof window.Lenis === 'undefined') return;
        lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }

    function initPreloader(onDone) {
        const pre = $('.preloader');
        const count = $('.preloader-count');
        const obj = { v: 0 };
        const seen = (() => { try { return sessionStorage.getItem('dd-seen') === '1'; } catch (e) { return false; } })();
        const tl = gsap.timeline({ onComplete: () => { pre.remove(); onDone(); } });
        if (seen) {
            tl.to(pre, { opacity: 0, duration: 0.3 });
        } else {
            tl.to(obj, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: () => { count.textContent = Math.round(obj.v); } })
                .to(pre, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '+=0.1');
        }
        try { sessionStorage.setItem('dd-seen', '1'); } catch (e) { /* storage blocked: preloader shows every visit */ }
    }

    function heroIntro() {
        const tl = gsap.timeline();
        tl.to('.hero .line-inner', { yPercent: 0, y: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' })
            .fromTo('.hero-eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.9')
            .fromTo('.hero-meta', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.8');
    }

    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Generic reveals
        ScrollTrigger.batch('.reveal', {
            start: 'top 88%',
            onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out', overwrite: true })
        });

        // Masked line headings (outside the hero)
        $$('.split-lines').forEach((h) => {
            gsap.from($$('.line-inner', h), {
                yPercent: 105, duration: 1.1, stagger: 0.08, ease: 'expo.out',
                scrollTrigger: { trigger: h, start: 'top 85%' }
            });
        });
        $$('.split-words').forEach((p) => {
            gsap.from($$('.word-inner', p), {
                yPercent: 110, duration: 0.9, stagger: 0.02, ease: 'power3.out',
                scrollTrigger: { trigger: p, start: 'top 85%' }
            });
        });

        // Clip-reveal portrait with inner parallax
        $$('.reveal-clip').forEach((fig) => {
            gsap.to(fig, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: fig, start: 'top 80%' } });
            const img = $('img', fig);
            if (img) gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: fig, scrub: true } });
        });

        // Hero parallax out
        gsap.to('.hero-inner', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

        // Stagger-in rows & cards
        const staggerIn = (sel, trigger) => gsap.from(sel, {
            y: 50, opacity: 0, duration: 0.9, stagger: 0.07, ease: 'power3.out',
            scrollTrigger: { trigger, start: 'top 82%' }
        });
        staggerIn('.discipline', '#disciplineList');
        staggerIn('.feat', '#featuredList');
        staggerIn('.job', '#timeline');
        ScrollTrigger.batch('#projectGrid .card', {
            start: 'top 92%',
            onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out' })
        });

        // Counters
        $$('.count').forEach((c) => {
            const to = +c.dataset.to;
            const o = { v: 0 };
            gsap.to(o, {
                v: to, duration: 2, ease: 'power2.out',
                scrollTrigger: { trigger: c, start: 'top 90%' },
                onUpdate: () => { c.textContent = Math.round(o.v); }
            });
        });

        // Big contact headline
        gsap.from('.contact-big .line-inner', {
            yPercent: 105, duration: 1.2, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: '.contact-big', start: 'top 85%' }
        });
    }

    function initMarquee() {
        const track = $('.marquee-track');
        const half = () => track.scrollWidth / 2;
        let x = 0, speed = 1, dir = -1;
        if (lenis) {
            lenis.on('scroll', (e) => {
                speed = 1 + Math.min(Math.abs(e.velocity) * 0.25, 8);
                if (e.direction) dir = e.direction > 0 ? -1 : 1;
            });
        }
        gsap.ticker.add(() => {
            x += dir * speed * 0.8;
            const w = half();
            if (x <= -w) x += w;
            if (x > 0) x -= w;
            track.style.transform = `translate3d(${x}px,0,0)`;
            speed += (1 - speed) * 0.05;
        });
    }

    function initCursor() {
        if (!finePointer) return;
        const cursor = $('.cursor');
        const label = $('.cursor-label');
        const preview = $('.hover-preview');
        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3' });
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3' });
        const pxTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
        const pyTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });

        window.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); pxTo(e.clientX); pyTo(e.clientY); });

        document.addEventListener('pointerover', (e) => {
            const t = e.target.closest('[data-cursor], a, button');
            cursor.classList.toggle('is-hover', !!t && !t.dataset.cursor);
            cursor.classList.toggle('is-label', !!(t && t.dataset.cursor));
            label.textContent = t && t.dataset.cursor ? t.dataset.cursor : '';
        });

        // Featured list: image (or typographic cover) follows the cursor.
        $$('.feat').forEach((row) => {
            row.addEventListener('pointerenter', () => {
                const p = byId[row.dataset.id];
                preview.innerHTML = mediaHTML(p, true);
                preview.classList.add('is-visible');
            });
            row.addEventListener('pointerleave', () => preview.classList.remove('is-visible'));
        });
    }

    function initMagnetic() {
        if (!finePointer) return;
        $$('.magnetic').forEach((el) => {
            const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                xTo((e.clientX - r.left - r.width / 2) * 0.3);
                yTo((e.clientY - r.top - r.height / 2) * 0.4);
            });
            el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
        });
    }

    /* ======================================================================
       Boot
       ====================================================================== */
    function boot() {
        renderMarquee();
        renderDisciplines();
        renderFeatured();
        renderFilters();
        renderGrid();
        renderTimeline();
        renderResearch();
        renderArchive();
        const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

        initNav();
        initFilters();
        initDialogs();
        initTimeline();
        initRoleRotator();
        initCountriesMap();
        initContours();

        if (!MOTION) return;

        splitText();
        initLenis();
        initScrollAnimations();
        initMarquee();
        initCursor();
        initMagnetic();
        initPreloader(heroIntro);
        window.addEventListener('load', () => ScrollTrigger.refresh());
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
