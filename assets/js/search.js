'use strict';

// ---------------------------------------------------------------------------
// Client-side search powered by Fuse.js.
// Index is loaded lazily on first interaction to keep the initial payload small.
// ---------------------------------------------------------------------------
(function () {
function init() {
    const input = document.getElementById('search-input');
    const results = document.getElementById('searchResults');
    const container = document.getElementById('fastSearch');
    if (!input || !results || !container) return;

    const RESULT_LIMIT = 8;
    const SNIPPET_LEN = 90;

    let fuse = null;
    let loading = false;
    let pendingQuery = null;

    function escapeHTML(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Highlight the query terms inside an (already HTML-escaped) string.
    function highlight(text, terms) {
        let out = escapeHTML(text);
        terms.forEach(function (term) {
            if (term.length < 2) return;
            const re = new RegExp('(' + escapeRegExp(escapeHTML(term)) + ')', 'gi');
            out = out.replace(re, '<mark>$1</mark>');
        });
        return out;
    }

    function buildSnippet(contents, terms) {
        if (!contents) return '';
        let idx = -1;
        for (let i = 0; i < terms.length; i++) {
            idx = contents.toLowerCase().indexOf(terms[i].toLowerCase());
            if (idx !== -1) break;
        }
        let start = idx > 20 ? idx - 20 : 0;
        let snippet = contents.substr(start, SNIPPET_LEN);
        if (start > 0) snippet = '…' + snippet;
        if (start + SNIPPET_LEN < contents.length) snippet += '…';
        return snippet;
    }

    function render(items, terms) {
        if (!items.length) {
            results.innerHTML = '<li class="search-empty">No results</li>';
            return;
        }
        const seen = {};
        let html = '';
        for (let i = 0; i < items.length && Object.keys(seen).length < RESULT_LIMIT; i++) {
            const item = items[i].item;
            if (seen[item.permalink]) continue;
            seen[item.permalink] = true;
            const title = highlight(item.title || '(untitled)', terms);
            const snippet = highlight(buildSnippet(item.contents, terms), terms);
            html += '<li><a href="' + item.permalink + '" tabindex="0">'
                + '<span class="title">' + title + '</span>'
                + (snippet ? '<span class="search-snippet">' + snippet + '</span>' : '')
                + '</a></li>';
        }
        results.innerHTML = html;
    }

    function runQuery(term) {
        const q = term.trim();
        if (!q) { results.innerHTML = ''; return; }
        if (!fuse) {
            pendingQuery = q;
            results.innerHTML = '<li class="search-empty">Loading…</li>';
            loadIndex();
            return;
        }
        const terms = q.split(/\s+/).filter(Boolean);
        render(fuse.search(q), terms);
    }

    function loadIndex() {
        if (loading || fuse) return;
        loading = true;
        fetch('/index.json')
            .then(function (r) { return r.json(); })
            .then(function (data) {
                const options = {
                    shouldSort: true,
                    ignoreLocation: true,
                    threshold: 0.35,
                    minMatchCharLength: 2,
                    keys: [
                        { name: 'title', weight: 0.6 },
                        { name: 'tags', weight: 0.2 },
                        { name: 'contents', weight: 0.2 }
                    ]
                };
                fuse = new Fuse(data, options);
                loading = false;
                if (pendingQuery !== null) {
                    const q = pendingQuery;
                    pendingQuery = null;
                    runQuery(q);
                }
            })
            .catch(function () {
                loading = false;
                results.innerHTML = '<li class="search-empty">Search unavailable</li>';
            });
    }

    // Debounce input to avoid searching on every keystroke.
    let debounceTimer = null;
    input.addEventListener('input', function () {
        const value = this.value;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () { runQuery(value); }, 120);
    });

    // Preload the index as soon as the user focuses the box.
    input.addEventListener('focus', loadIndex);

    // Keyboard navigation across input + result links.
    container.addEventListener('keydown', function (e) {
        const links = Array.prototype.slice.call(results.querySelectorAll('a'));

        if (e.key === 'Escape') {
            input.value = '';
            results.innerHTML = '';
            input.blur();
            return;
        }

        if (!links.length) return;
        const active = document.activeElement;
        const currentIndex = links.indexOf(active);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = currentIndex < 0 ? 0 : Math.min(currentIndex + 1, links.length - 1);
            links[next].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentIndex <= 0) {
                input.focus();
            } else {
                links[currentIndex - 1].focus();
            }
        } else if (e.key === 'Enter' && currentIndex >= 0) {
            links[currentIndex].click();
        }
    });
}

// The bundle is loaded in <head> without defer, so the search DOM may not
// exist yet. Defer init until the document is ready (matches cosmos.js/toc.js).
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
})();
