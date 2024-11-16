// Load Header
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('header').outerHTML = data;
    });

// Load Footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('footer').outerHTML = data;
    });
