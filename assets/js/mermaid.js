{{- if .Site.Params.mermaid.enable -}}
document.addEventListener("DOMContentLoaded", function(event) {
    const mermaids = document.querySelectorAll(".language-mermaid");
    mermaids.forEach( function (mermaid) {
        var updateElement = document.createElement("div");
        updateElement.className = "mermaid";
        updateElement.innerHTML = mermaid.innerHTML;
        mermaid.parentElement.replaceWith(updateElement);
    });
})
{{- end -}}