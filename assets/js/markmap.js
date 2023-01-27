document.addEventListener("DOMContentLoaded", function(event) {
    const markmaps = document.querySelectorAll(".language-markmap");
    markmaps.forEach( function (markmap) {
        var updateElement = document.createElement("div");
        updateElement.className = "markmap";
        updateElement.innerHTML = markmap.innerHTML;
        markmap.parentElement.replaceWith(updateElement);
    })
})