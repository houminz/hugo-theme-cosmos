var fuse; // holds our search engine
var fuseIndex;
var searchVisible = false;
var firstRun = true; // allow us to delay loading json data unless search activated
var list = document.getElementById('searchResults'); // targets the <ul>
//var first = list.firstChild; // first child of search list
//var last = list.lastChild; // last child of search list
var maininput = document.getElementById('search-input'); // input box for search
var resultsAvailable = false; // Did we get any search results?

// ==========================================
// The main keyboard event listener running the show
//

document.addEventListener('keydown', function(event) {
    // CMD-/ to show / hide Search
    if (event.altKey && event.which === 191) {
        // Load json search index if first time invoking search
        // Means we don't load json unless searches are going to happen; keep user payload small unless needed
        doSearch(event)
    }

    // Allow ESC to close search box
    if (event.code === "Escape") {
        if (searchVisible) {
            document.getElementById("fastSearch").style.visibility = "hidden";
            document.activeElement.blur();
            searchVisible = false;
        }
    }

    if (event.code === "ArrowDown") {
        if (searchVisible && resultsAvailable) {
            event.preventDefault(); // stop window from scrolling
            if ( document.activeElement == maininput) { first.focus(); } // if the currently focused element is the main input --> focus the first <li>
            else if ( document.activeElement == last ) { last.focus(); } // if we're at the bottom, stay there
            else { document.activeElement.parentElement.nextSibling.firstElementChild.focus(); } // otherwise select the next search result
        }
    }

    if (event.code === "ArrowDown") {
        if (searchVisible && resultsAvailable) {
            event.preventDefault(); // stop window from scrolling
            if ( document.activeElement == maininput) { maininput.focus(); } // If we're in the input box, do nothing
            else if ( document.activeElement == first) { maininput.focus(); } // If we're at the first item, go to input box
            else { document.activeElement.parentElement.previousSibling.firstElementChild.focus(); } // Otherwise, select the search result above the current active one
        }
    }
});


// ==========================================
// execute search as each character is typed
//

document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keyup", function() {
        executeSearch(this.value);
    })

    searchInput.addEventListener("keydown", function(event) {
        doSearch(event);
    })
})

function doSearch(e) {
    e.stopPropagation();
    if (firstRun) {
        loadSearch() // loads our json data and builds fuse.js search index
        firstRun = false // let's never do this again
    }
}

// ==========================================
// fetch some json without jquery
//
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}


// ==========================================
// load our search index, only executed once
// on first call of search box (CMD-/)
//
function loadSearch() {
    fetchJSONFile('/index.json', function(data){
        var options = { // fuse.js options; check fuse.js website for details
            shouldSort: true,
            location: 0,
            distance: 100,
            threshold: 0.4,
            minMatchCharLength: 2,
            keys: [
                'permalink',
                'title',
                'tags',
                'contents'
            ]
        };
        // Create the Fuse index
        fuseIndex = Fuse.createIndex(options.keys, data)
        fuse = new Fuse(data, options, fuseIndex); // build the index from the json file
    });
}


// ==========================================
// using the index we loaded on CMD-/, run
// a search query (for "term") every time a letter is typed
// in the search box
//
function executeSearch(term) {
    let results = fuse.search(term); // the actual query being run using fuse.js
    let searchitems = ''; // our results bucket

    if (results.length === 0) { // no results based on what was typed into the input box
        resultsAvailable = false;
        searchitems = '';
    } else { // build our html
        let permalinks = [];
        let numLimit = 5;
        for (let item in results) { // only show first 5 results
            if (item > numLimit) {
                break;
            }
            if (permalinks.includes(results[item].item.permalink)) {
                continue;
            }
            //   console.log('item: %d, title: %s', item, results[item].item.title)
            searchitems = searchitems + '<li><a href="' + results[item].item.permalink + '" tabindex="0">' + '<span class="title">' + results[item].item.title + '</span></a></li>';
            permalinks.push(results[item].item.permalink);
        }
        resultsAvailable = true;
    }

    document.getElementById("searchResults").innerHTML = searchitems;
    if (results.length > 0) {
    //    first = list.firstChild.firstElementChild; // first result container — used for checking against keyboard up/down location
    //    last = list.lastChild.firstElementChild; // last result container — used for checking against keyboard up/down location
    }
}