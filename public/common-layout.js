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

        var mobileLinks = links.map(function (link) {
            var active = link.href === activeFile ? ' class="active"' : "";
            return '<a href="' + link.href + '"' + active + '>' + link.label + '</a>';
        }).join("");

        return '' +
            '<nav id="mainNav">' +
            '<a href="index.html" class="nav-logo"><img src="assets/logo.png" alt="Pragmatic Step logo">Pragmatic<span>Step</span></a>' +
            '<div class="nav-links">' + navLinks + '</div>' +
            '<a href="index.html#discovery" class="nav-cta">Book Discovery Call</a>' +
            '<button class="nav-hamburger" aria-label="Open menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
            '</button>' +
            '</nav>' +
            '<div class="nav-mobile-menu" aria-hidden="true">' +
            mobileLinks +
            '<a href="index.html#discovery" class="nav-mobile-cta">Book Discovery Call</a>' +
            '</div>';
    }

    function buildFooter() {
        return '' +
            '<footer>' +
            '<div class="foot-brand"><div class="brand-name" >' +
            '<img class="foot-logo" src="assets/logo.png" alt="Pragmatic Step">' +

            '<div class="foot-name">PRAGMATIC<span>STEP</span></div></div>' +
            '<div class="foot-tag">Specification-Led Project Growth Partner &middot; Building Material Brands &middot; India</div>' +
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

        bindHamburger();
    }

    function bindHamburger() {
        var btn = document.querySelector('.nav-hamburger');
        var menu = document.querySelector('.nav-mobile-menu');
        if (!btn || !menu) return;

        btn.addEventListener('click', function () {
            var open = menu.classList.toggle('open');
            btn.classList.toggle('open', open);
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            menu.setAttribute('aria-hidden', open ? 'false' : 'true');
            document.body.style.overflow = open ? 'hidden' : '';
        });

        var links = menu.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function () {
                menu.classList.remove('open');
                btn.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                menu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectLayout);
    } else {
        injectLayout();
    }
})();
