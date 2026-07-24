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

    // Close the drawer after navigating from the sidebar.
    document.querySelectorAll('.sidebar a').forEach(function (link) {
        link.addEventListener('click', closeAll);
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
    Cosmos.readingProgress();
});
