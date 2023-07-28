export function init() {
    document.addEventListener("DOMContentLoaded", function () {
        fetch("nav.html")
            .then(function (response) {
                return response.text();
            })
            .then(function (navContent) {
                // Insert the fetched content into the navPlaceholder element
                document.getElementById("nav-placeholder").outerHTML = navContent;
            })
            .catch(function (error) {
                console.log("Error loading navigation: ", error);
            });
    });
}
