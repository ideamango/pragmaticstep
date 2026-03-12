(function () {
    function currentPage() {
        var path = window.location.pathname || "";
        var file = path.split("/").pop();
        return file || "index.html";
    }

    function buildHeader(activeFile) {
        var links = [
            { href: "index.html", label: "Home" },
            { href: "routes.html", label: "Three Routes" },
            { href: "playbook.html", label: "The Playbook" },
            { href: "program.html", label: "The Program" },
            { href: "about.html", label: "About Us" }
        ];

        var navLinks = links.map(function (link) {
            var active = link.href === activeFile ? ' class="active"' : "";
            return '<a href="' + link.href + '"' + active + '>' + link.label + '</a>';
        }).join("");

        return '' +
            '<nav id="mainNav">' +
            '<a href="index.html" class="nav-logo"><img src="logo.png" alt="Pragmatic Step logo">Pragmatic<span>Step</span></a>' +
            '<div class="nav-links">' + navLinks + '</div>' +
            '<a href="index.html#discovery" class="nav-cta">Book Discovery Call</a>' +
            '</nav>';
    }

    function buildFooter() {
        return '' +
            '<footer>' +
            '<div class="foot-brand">' +
            '<img class="foot-logo" src="logo.png" alt="Pragmatic Step">' +
            '<div>' +
            '<div class="foot-name">PRAGMATIC<span>STEP</span></div>' +
            '<div class="foot-tag">Specification Growth Partner &middot; Building Material Brands &middot; India</div>' +
            '</div>' +
            '</div>' +
            '<div class="foot-legal">&copy; 2026 Pragmatic Step</div>' +
            '</footer>';
    }

    function injectLayout() {
        var page = currentPage();
        var headerHost = document.getElementById("site-header");
        var footerHost = document.getElementById("site-footer");

        if (headerHost) {
            headerHost.outerHTML = buildHeader(page);
        }

        if (footerHost) {
            footerHost.outerHTML = buildFooter();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectLayout);
    } else {
        injectLayout();
    }
})();
