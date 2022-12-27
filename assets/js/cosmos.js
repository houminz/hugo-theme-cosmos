'use strict';

const Cosmos = {};

Cosmos.back2top = function() {
    const displayBack2Top = 200;
    var back2top = document.getElementById("back2top");
    window.onscroll = function () {
        if (document.body.scrollTop > displayBack2Top || document.documentElement.scrollTop > displayBack2Top) {
            back2top.style.visibility = "visible";
            back2top.style.opacity = "1";
        } else {
            back2top.style.visibility = "hidden";
            back2top.style.opacity = "0";
        }
    };

    back2top.onclick = function () {
        // cancel if already on top
        if (document.scrollingElement.scrollTop === 0) return;
        document.scrollingElement.scrollTop = 0;
    };
};

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

Cosmos.douban = function() {
    var movieShow = function (_this, ls_item, str) {
        var storage = localStorage.getItem(ls_item);
        var data = JSON.parse(storage);
        var db_star = Math.ceil(data.rating);
        var movie_str = `
            <div class='post-preview'>
                <div class='post-preview-meta'>
                    <div class='post-preview-middle'>
                        <div class='post-preview-title'>
                            <a target='_blank' style='box-shadow: none; font-weight: bolder;' href='` + str + `'>` + data.name + `</a>
                        </div>
                        <div class='rating'>
                            <div class='rating-star allstar` + db_star + `'></div>
                            <div class='rating-average'>` + data.rating + `</div>
                        </div>
                        <time class='post-preview-date'>导演：` + data.director + ` / 类型：` + data.genre + ` / ` + data.year + `</time>
                        <section style='max-height:75px;overflow:hidden;' class='post-preview-excerpt'>` + data.intro.replace(/\\s*/g, "") + `</section>
                    </div>
                </div>
                <img referrerpolicy='no-referrer' loading='lazy' class='post-preview-image' src=` + data.img + `>
            </div>`

        _this.innerHTML = movie_str;
    }
    var bookShow = function (_this, ls_item, str) {
        var storage = localStorage.getItem(ls_item);
        var data = JSON.parse(storage);
        var db_star = Math.ceil(data.rating.average);
        var book_str = `
            <div class='post-preview'>
                <div class='post-preview-meta'>
                    <div class='post-preview-middle'>
                        <div class='post-preview-title'>
                            <a target='_blank' style='box-shadow: none; font-weight: bolder;' href='` + str + `'>` + data.title + `</a>
                        </div>
                        <div class='rating'>
                            <div class='rating-star allstar` + db_star + `'></div>
                            <div class='rating-average'>` + data.rating.average + `</div>
                         </div>
                        <time class='post-preview-date'>作者：` + data.author + ` / 出版：`+ data.pubdate + ` / `+ data.publisher + `</time>
                        <section style='max-height:75px;overflow:hidden;' class='post-preview-excerpt'>` + data.summary.replace(/\s*/g, "") + `</section>
                    </div>
                </div>
                <img referrerpolicy='no-referrer' loading='lazy' class='post-preview-image' src=` + data.images.medium + `>
            </div>`

        _this.innerHTML = book_str;
    }

    const doubanItems = document.querySelectorAll('.douban_show');
    doubanItems.forEach(function(doubanItem) {
        var db_type = doubanItem.firstElementChild.getAttribute('db_type').toString();
        var db_id = doubanItem.firstElementChild.getAttribute('db_id').toString();
        var db_api = "https://douban.edui.fun/";
        var db_url = "https://" + db_type + ".douban.com/subject/" + db_id;
        if (db_type === 'movie') {
            var ls_item = 'movie' + db_id;
            var url = db_api + "movies/" + db_id;
            var localResult = localStorage.getItem(ls_item);

            if (localResult == null || localResult === 'undefined') {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState === XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
                        if (xmlhttp.status === 200) {
                            localStorage.setItem(ls_item, xmlhttp.responseText);
                            movieShow(doubanItem, ls_item, db_url)
                        } else if (xmlhttp.status === 400) {
                            alert('There was an error 400');
                        } else {
                            alert('something else other than 200 was returned');
                        }
                    }
                }
                xmlhttp.open("GET", url, true)
                xmlhttp.send()
            } else {
                movieShow(doubanItem, ls_item, db_url)
            }
        } else if (db_type === 'book') {
            var ls_item = 'book' + db_id;
            var url = db_api + "v2/book/id/" + db_id;
            var localResult = localStorage.getItem(ls_item);
            if (localResult == null || localResult === 'undefined') {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState === XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
                        if (xmlhttp.status === 200) {
                            localStorage.setItem(ls_item, xmlhttp.responseText);
                            bookShow(doubanItem, ls_item, db_url)
                        } else if (xmlhttp.status === 400) {
                            alert('There was an error 400');
                        } else {
                            alert('something else other than 200 was returned');
                        }
                    }
                }
                xmlhttp.open("GET", url, true)
                xmlhttp.send()
            } else {
                bookShow(doubanItem, ls_item, db_url)
            }
        }
    });
};