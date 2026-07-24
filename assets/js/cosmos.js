'use strict';

const Cosmos = {};

// ---------------------------------------------------------------------------
// Tabs shortcode
// ---------------------------------------------------------------------------
Cosmos.tabs = function () {
    const navTabs = document.querySelectorAll('#nav-tab>li');
    navTabs.forEach(function (navTab) {
        navTab.addEventListener('click', function () {
            document.querySelectorAll('.tab-content>.tab-pane').forEach(function (t) {
                t.className = 'tab-pane';
            });
            navTabs.forEach(function (t) { t.className = ''; });
            this.className = 'active';
            const linkTab = this.getElementsByTagName('A')[0].id;
            const tab = document.querySelector('.tab-content>#' + linkTab);
            if (tab) tab.className = 'tab-pane active';
        });
    });
};

// ---------------------------------------------------------------------------
// Wrap wide tables so they can scroll horizontally
// ---------------------------------------------------------------------------
Cosmos.responsiveTable = function () {
    const tables = document.querySelectorAll('.post-content table:not(.lntable)');
    tables.forEach(function (table) {
        const parentOfParent = table.parentElement.parentElement;
        if (parentOfParent.className.includes('highlight')) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        table.parentElement.replaceChild(wrapper, table);
        wrapper.appendChild(table);
    });
};

// ---------------------------------------------------------------------------
// Dark / light theme toggle
// ---------------------------------------------------------------------------
Cosmos.theme = function () {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });

    // Follow the OS only when the user hasn't picked a theme explicitly.
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', function (e) {
        try {
            if (localStorage.getItem('theme')) return;
        } catch (err) { /* ignore */ }
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    });
};

// ---------------------------------------------------------------------------
// Mobile navigation: scrim, click-outside close, scroll lock, ESC
// ---------------------------------------------------------------------------
Cosmos.navControls = function () {
    const sidebarControl = document.getElementById('sidebar-control');
    const menuControl = document.getElementById('menu-header-control');
    const controls = [sidebarControl, menuControl].filter(Boolean);
    if (!controls.length) return;

    const scrim = document.createElement('div');
    scrim.className = 'nav-scrim';
    document.body.appendChild(scrim);

    const anyOpen = function () { return controls.some(function (c) { return c.checked; }); };

    const sync = function () {
        const open = anyOpen();
        scrim.classList.toggle('is-visible', open);
        document.body.classList.toggle('no-scroll', open);
    };

    const closeAll = function () {
        controls.forEach(function (c) { c.checked = false; });
        sync();
    };

    controls.forEach(function (c) { c.addEventListener('change', sync); });
    scrim.addEventListener('click', closeAll);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && anyOpen()) closeAll();
    });

    // Close the drawer after navigating from the sidebar or the TOC.
    document.querySelectorAll('.sidebar a, .post-toc a').forEach(function (link) {
        link.addEventListener('click', closeAll);
    });
};

// ---------------------------------------------------------------------------
// Sidenotes: clone each footnote body next to its in-text reference so it can
// float into the right margin (Tufte / Thinking-Machines-blog style).
// ---------------------------------------------------------------------------
Cosmos.sidenotes = function () {
    const content = document.querySelector('.post-content');
    if (!content) return;
    // Opt-in: only render margin notes when enabled via config/front matter.
    if (content.getAttribute('data-sidenote') !== 'true') return;
    const list = content.querySelector('.footnotes ol');
    if (!list) return;

    if (!content.classList.contains('has-sidenotes')) {
        // Build one margin note per unique footnote (first reference wins), so a
        // footnote cited several times is not duplicated.
        const seen = {};
        const refs = content.querySelectorAll('sup[id^="fnref"] a.footnote-ref');
        refs.forEach(function (ref) {
            const targetId = (ref.getAttribute('href') || '').replace(/^#/, '');
            if (!targetId || seen[targetId]) return;
            const li = document.getElementById(targetId);
            if (!li) return;
            seen[targetId] = true;

            // Collect the note body, dropping the back-reference arrow.
            const clone = li.cloneNode(true);
            clone.querySelectorAll('.footnote-backref').forEach(function (b) { b.remove(); });
            const paras = clone.querySelectorAll('p');
            const body = paras.length ? Array.prototype.map.call(paras, function (p) {
                return p.innerHTML.trim();
            }).join('<br>') : clone.innerHTML.trim();

            const note = document.createElement('aside');
            note.className = 'sidenote';
            note.setAttribute('role', 'note');
            // Remember which in-text marker this note aligns to.
            note.dataset.fnref = ref.parentNode.id;
            note.innerHTML = '<span class="sidenote-num">' + ref.textContent.trim() + '</span>' + body;
            // Absolutely positioned, so DOM location is irrelevant to layout.
            content.appendChild(note);
        });
        content.classList.add('has-sidenotes');

        // Keep the notes aligned as the layout changes (images/KaTeX load,
        // window resize, theme switch, ...).
        let raf = null;
        const relayout = function () {
            if (raf) return;
            raf = window.requestAnimationFrame(function () {
                raf = null;
                Cosmos.layoutSidenotes(content);
            });
        };
        window.addEventListener('resize', relayout);
        window.addEventListener('load', relayout);
        if (window.ResizeObserver) {
            new ResizeObserver(relayout).observe(content);
        }
    }

    Cosmos.layoutSidenotes(content);
};

// Position each sidenote in the right gutter, vertically aligned with its
// in-text reference, pushing later notes down to avoid overlap. No-op on narrow
// screens where the notes are hidden and the bottom footnote list is used.
Cosmos.layoutSidenotes = function (content) {
    const notes = content.querySelectorAll('.sidenote');
    if (!notes.length) return;

    // Notes are display:none below the sidenote breakpoint; skip in that case.
    if (window.getComputedStyle(notes[0]).display === 'none') return;

    const contentTop = content.getBoundingClientRect().top;
    const gap = 22;
    let floor = 0; // lowest available y (bottom of the previous note + gap)

    notes.forEach(function (note) {
        const ref = document.getElementById(note.dataset.fnref);
        if (!ref) return;
        const natural = ref.getBoundingClientRect().top - contentTop;
        // A note is "stacked" when it can't sit next to its own reference
        // because the previous note already occupies that space. Those get a
        // divider so a run of adjacent citations doesn't read as one block.
        const stacked = natural < floor;
        const top = stacked ? floor : natural;
        note.style.top = top + 'px';
        note.classList.toggle('is-stacked', stacked);
        floor = top + note.offsetHeight + gap;
    });
};

// ---------------------------------------------------------------------------
// Reading progress bar (article pages only)
// ---------------------------------------------------------------------------
Cosmos.readingProgress = function () {
    if (!document.querySelector('.post-content')) return;

    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    document.body.appendChild(bar);

    let ticking = false;
    const update = function () {
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
        bar.style.width = pct + '%';
        ticking = false;
    };

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
    update();
};

document.addEventListener('DOMContentLoaded', function () {
    Cosmos.tabs();
    Cosmos.responsiveTable();
    Cosmos.theme();
    Cosmos.navControls();
    Cosmos.sidenotes();
    Cosmos.readingProgress();
});
