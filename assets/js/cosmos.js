'use strict';

const Cosmos = {};

Cosmos.back2Top = function() {
    const displayBack2Top = 200;
    const back2Top = document.getElementById("top-link");
    window.onscroll = function () {
        if (document.body.scrollTop > displayBack2Top || document.documentElement.scrollTop > displayBack2Top) {
            back2Top.style.visibility = "visible";
            back2Top.style.opacity = "1";
        } else {
            back2Top.style.visibility = "hidden";
            back2Top.style.opacity = "0";
        }
    }
};

Cosmos.toc = function() {

};