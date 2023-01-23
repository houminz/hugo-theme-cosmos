{{- if .Site.Params.douban -}}
document.addEventListener("DOMContentLoaded", function(event) {
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

    const doubanItems = document.querySelectorAll('.douban-show');
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
});
{{- end -}}