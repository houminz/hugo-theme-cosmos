document.addEventListener("DOMContentLoaded", function(event) {
    const displayBack2Top = 100;
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
});