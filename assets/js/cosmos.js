'use strict';

const Cosmos = {};

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

document.addEventListener("DOMContentLoaded", function(event) {
    Cosmos.tabs();
});