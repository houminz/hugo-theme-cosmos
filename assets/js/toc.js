var refactorToc = function(toc) {
    // when headings do not start with `h1`
    const oldTocList = toc.children[0];
    let newTocList = oldTocList;
    let temp;

    while (newTocList.children.length === 1 && (temp = newTocList.children[0].children[0]).tagName === 'UL') {
        newTocList = temp;
    }

    if (newTocList !== oldTocList) toc.replaceChild(newTocList, oldTocList);
};

var linkToc = function() {
    const links = document.querySelectorAll('#TableOfContents a');
    for (let i = 0; i < links.length; i++) links[i].className += ' toc-link';

    for (let num = 1; num <= 6; num++) {
        const headers = document.querySelectorAll('.post-content>h' + num);
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            header.innerHTML = `<a href="#${header.id}" class="headerlink anchor">${header.innerHTML}</a>`;
        }
    }
};

var initToc = function() {
    const HEADERFIX = 30;
    const tocLink = document.querySelectorAll('.toc-link');
    const headerlink = document.querySelectorAll('.headerlink');
    const tocLinkList = document.querySelectorAll('.post-toc-content li');

    var headerlinkTop = [];
    headerlink.forEach(element => headerlinkTop.push(element.offsetTop));

    const headerLinksOffsetForSearch = headerlinkTop.map(x => x - HEADERFIX);
    const searchActiveTocIndex = function(array, target) {
        for (let i = 0; i < array.length - 1; i++) {
            if (target > array[i] && target <= array[i + 1]) return i;
        }
        if (target > array[array.length - 1]) return array.length - 1;
        return -1;
    };

    window.addEventListener("scroll", function() {
        const scrollTop = document.documentElement.scrollTop;
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
    });
};

document.addEventListener("DOMContentLoaded", function(event) {
    const tocContainer = document.getElementById('post-toc');
    if (tocContainer !== null) {
        const toc = document.getElementById('TableOfContents');
        if (toc.childElementCount === 0) {
            // toc = true, but there are no headings
            tocContainer.parentNode.removeChild(tocContainer);
        } else {
            refactorToc(toc);
            linkToc();
            initToc();
        }
    }
});