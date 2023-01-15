'use strict';

const Cosmos = {};

Cosmos._refactorToc = function(toc) {
    // when headings do not start with `h1`
    const oldTocList = toc.children[0];
    let newTocList = oldTocList;
    let temp;
    while (newTocList.children.length === 1 && (temp = newTocList.children[0].children[0]).tagName === 'UL') {
        newTocList = temp;
    }

    if (newTocList !== oldTocList) toc.replaceChild(newTocList, oldTocList);
};

Cosmos._linkToc = function() {
    const links = document.querySelectorAll('#TableOfContents a:first-child');
    for (let i = 0; i < links.length; i++) links[i].className += ' toc-link';

    for (let num = 1; num <= 6; num++) {
        const headers = document.querySelectorAll('.post-content>h' + num);
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            header.innerHTML = `<a href="#${header.id}" class="headerlink anchor"><i class="iconfont icon-link"></i></a>${header.innerHTML}`;
        }
    }
};

Cosmos._initToc = function() {
    const SPACING = 20;
    const toc = document.querySelector('.post-toc');
    const footer = document.querySelector('.post-footer');

    if (toc !== null) {
        const minScrollTop = toc.offsetTop - SPACING;
        const maxScrollTop = footer.offsetTop - toc.offsetHeight - SPACING;

        const tocState = {
            start: {
                'position': 'absolute',
                'top': minScrollTop,
            },
            process: {
                'position': 'fixed',
                'top': SPACING,
            },
            end: {
                'position': 'absolute',
                'top': maxScrollTop,
            },
        };

        window.onscroll = function() {
            const scrollTop = document.body.scrollTop;

            if (scrollTop < minScrollTop) {
                toc.css(tocState.start);
            } else if (scrollTop > maxScrollTop) {
                toc.css(tocState.end);
            } else {
                toc.css(tocState.process);
            }
        };
    }

    const HEADERFIX = 30;
    const tocLink = document.querySelectorAll('.toc-link');
    const headerlink = document.querySelectorAll('.headerlink');
    const tocLinkList = document.querySelectorAll('.post-toc-content li');

    var headerlinkTop = new Array();
    headerlink.forEach(element => headerlinkTop.push(element.offsetTop));

    const headerLinksOffsetForSearch = headerlinkTop.map(x => x - HEADERFIX);
    const searchActiveTocIndex = function(array, target) {
        for (let i = 0; i < array.length - 1; i++) {
            if (target > array[i] && target <= array[i + 1]) return i;
        }
        if (target > array[array.length - 1]) return array.length - 1;
        return -1;
    };

    window.onscroll = function() {
        const scrollTop = document.body.scrollTop;
        const activeTocIndex = searchActiveTocIndex(headerLinksOffsetForSearch, scrollTop);

        tocLink.forEach(element => element.classList.remove('active'));
        tocLinkList.forEach(element => element.classList.remove('has-active'));

        if (activeTocIndex !== -1 && tocLink[activeTocIndex] != null) {
            tocLink[activeTocIndex].classList.add('active');
            let ancestor = tocLink[activeTocIndex].parentNode;
            while (ancestor.tagName !== 'NAV') {
                ancestor.classList.add('has-active');
                ancestor = ancestor.parentNode.parentNode;
            }
        }
    };
};

Cosmos.toc = function() {
    const tocContainer = document.getElementById('post-toc');
    if (tocContainer !== null) {
        const toc = document.getElementById('TableOfContents');
        if (toc === null) {
            // toc = true, but there are no headings
            tocContainer.parentNode.removeChild(tocContainer);
        } else {
            this._refactorToc(toc);
            this._linkToc();
            this._initToc();
        }
    }
};


Cosmos.tabs = function () {
    var navTabs = document.querySelectorAll('#nav-tab>li');
    for (var i = 0; i < navTabs.length; i++) {
        navTabs[i].addEventListener("click", function(){
            //  divs - removing .active class
            var tabs = document.querySelectorAll('.tab-content>.tab-pane');
            for (var k = 0; k < tabs.length; k++) {
                tabs[k].className = "tab-pane";
            }
            // removing .active from menu items
            for (var j = 0; j < navTabs.length; j++) {
                navTabs[j].className = "";
            }

            // setting .active in clicked item
            this.className = "active";
            // getting target id
            var linkTab = this.getElementsByTagName("A")[0].id;

            // showing the selected tab div
            var tab = document.querySelectorAll('.tab-content>#'+linkTab)[0];
            tab.className = "tab-pane active";
        });
    };
}