# HTML include with Ajax

Simple example of HTML include with Ajax.

## Installation

Use following Template to start:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Include HTML</title>
</head>

<body onload="includeHTML();">
    <a href="#" onclick="navigate(this)" data-file="./content.html" data-title="Content">Home</a>
    <div w3-include-html="content.html" id="replace">no-content-here</div>
    <script src="https://cdn.jsdelivr.net/gh/vergissberlin/includeHTML/js/navigate.js"></script>

</body>

</html>
```

or take the index.html from the repository.
