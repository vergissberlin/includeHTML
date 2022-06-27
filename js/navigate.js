function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
};

let lastClickedElement = null;
const navigate = (element) => {
    // Replace content from id=replace with content from Ajax request with url
    let file = element.getAttribute('data-file'),
        title = element.getAttribute('data-title')
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                document.getElementById("replace").innerHTML = this.responseText;
                history.pushState(null, title, file)
                document.title = title;
                element.classList.add('active');
                lastClickedElement && lastClickedElement.classList.remove('active');
                lastClickedElement = element;
            }
            if (this.status == 404) {
                document.getElementById("replace").innerHTML = "Page not found.";
            }
        }
    };
    xhttp.open("GET", file, true);
    xhttp.send();
}

document.createElement('include');
