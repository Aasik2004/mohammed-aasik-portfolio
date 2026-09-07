/* =========================================================
   MOHAMMED AASIK — PORTFOLIO WEBSITE
   Main JavaScript
   ========================================================= */


/* =========================================================
   1. DOM ELEMENTS
   ========================================================= */

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.querySelector(".navbar");


/* =========================================================
   2. MOBILE NAVIGATION
   ========================================================= */

if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");

        navToggle.setAttribute("aria-expanded", isOpen);

        const icon = navToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }
    });


    /* Close mobile menu when a link is clicked */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            navToggle.setAttribute("aria-expanded", "false");

            const icon = navToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

    });


    /* Close mobile menu when clicking outside */

    document.addEventListener("click", event => {

        const clickedInsideNav =
            navMenu.contains(event.target) ||
            navToggle.contains(event.target);

        if (!clickedInsideNav) {

            navMenu.classList.remove("active");

            navToggle.setAttribute("aria-expanded", "false");

            const icon = navToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });
}


/* =========================================================
   3. NAVBAR SCROLL EFFECT
   ========================================================= */

function handleNavbarScroll() {

    if (!navbar) return;

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleNavbarScroll);

handleNavbarScroll();


/* =========================================================
   4. SMOOTH SCROLLING
   ========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        const href = link.getAttribute("href");

        /*
         * Only handle internal section links.
         * Ignore external URLs.
         */

        if (!href || !href.startsWith("#") || href === "#") {
            return;
        }

        const target = document.querySelector(href);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

});


/* =========================================================
   5. ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNav() {

    let currentSection = "";

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);

window.addEventListener("load", updateActiveNav);


/* =========================================================
   6. REVEAL ON SCROLL
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    /*
     * Fallback for older browsers
     */

    revealElements.forEach(element => {
        element.classList.add("is-visible");
    });

}


/* =========================================================
   7. CONTACT FORM VALIDATION
   ========================================================= */

const contactForm = document.querySelector(".contact-form");


if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();


        const nameInput = contactForm.querySelector(
            'input[name="name"]'
        );

        const emailInput = contactForm.querySelector(
            'input[name="email"]'
        );

        const subjectInput = contactForm.querySelector(
            'input[name="subject"]'
        );

        const messageInput = contactForm.querySelector(
            'textarea[name="message"]'
        );


        /*
         * Basic safety check
         */

        if (
            !nameInput ||
            !emailInput ||
            !subjectInput ||
            !messageInput
        ) {
            return;
        }


        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();


        /* Validation */

        if (name.length < 2) {

            showFormMessage(
                "Please enter your name.",
                "error"
            );

            nameInput.focus();

            return;
        }


        /*
         * Correct email validation
         */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            showFormMessage(
                "Please enter a valid email address.",
                "error"
            );

            emailInput.focus();

            return;
        }


        if (subject.length < 2) {

            showFormMessage(
                "Please enter a subject.",
                "error"
            );

            subjectInput.focus();

            return;
        }


        if (message.length < 10) {

            showFormMessage(
                "Please enter a message of at least 10 characters.",
                "error"
            );

            messageInput.focus();

            return;
        }


        /*
         * Create email message
         */

        const recipient = "mohammedaasik1380@gmail.com";

        const mailSubject = encodeURIComponent(subject);

        const mailBody = encodeURIComponent(
            `Hello Mohammed,\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );


        /*
         * Open user's default email application
         */

        window.location.href =
            `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;


        /*
         * Optional confirmation
         */

        showFormMessage(
            "Your email application should open now. Thank you!",
            "success"
        );

    });

}


/* =========================================================
   8. FORM MESSAGE
   ========================================================= */

function showFormMessage(message, type) {

    let messageElement =
        document.querySelector(".form-message");


    /*
     * Create the message element if it doesn't exist.
     */

    if (!messageElement) {

        messageElement =
            document.createElement("div");

        messageElement.className =
            "form-message";

        messageElement.style.marginTop = "15px";
        messageElement.style.padding = "12px 14px";
        messageElement.style.borderRadius = "9px";
        messageElement.style.fontSize = "0.8rem";

        contactForm.appendChild(messageElement);
    }


    messageElement.textContent = message;


    if (type === "success") {

        messageElement.style.background =
            "rgba(34, 211, 238, 0.08)";

        messageElement.style.border =
            "1px solid rgba(34, 211, 238, 0.2)";

        messageElement.style.color =
            "#22D3EE";

    } else {

        messageElement.style.background =
            "rgba(239, 68, 68, 0.08)";

        messageElement.style.border =
            "1px solid rgba(239, 68, 68, 0.2)";

        messageElement.style.color =
            "#FCA5A5";
    }


    /*
     * Automatically hide after a few seconds.
     */

    clearTimeout(messageElement.hideTimer);

    messageElement.hideTimer = setTimeout(() => {

        messageElement.style.opacity = "0";

        setTimeout(() => {

            if (messageElement) {
                messageElement.remove();
            }

        }, 300);

    }, 5000);

}


/* =========================================================
   9. EXTERNAL LINKS
   ========================================================= */

const externalLinks =
    document.querySelectorAll(
        'a[href^="http://"], a[href^="https://"]'
    );


externalLinks.forEach(link => {

    /*
     * Open external websites safely in a new tab.
     */

    if (!link.hasAttribute("target")) {
        link.setAttribute("target", "_blank");
    }

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );

});


/* =========================================================
   10. CURRENT YEAR IN FOOTER
   ========================================================= */

const yearElements =
    document.querySelectorAll(".current-year");


yearElements.forEach(element => {

    element.textContent =
        new Date().getFullYear();

});


/* =========================================================
   11. PROFILE IMAGE FALLBACK
   ========================================================= */

const profileImages =
    document.querySelectorAll(
        'img[src*="profile.jpg"]'
    );


profileImages.forEach(image => {

    image.addEventListener("error", () => {

        /*
         * If profile.jpg is missing, prevent broken-image
         * appearance.
         */

        image.style.opacity = "0.35";

        image.alt =
            "Mohammed Aasik profile photo";
    });

});


/* =========================================================
   12. PREVENT EMPTY LINK JUMP
   ========================================================= */

const allLinks =
    document.querySelectorAll("a");


allLinks.forEach(link => {

    link.addEventListener("click", event => {

        const href = link.getAttribute("href");

        if (href === "#") {

            event.preventDefault();

        }

    });

});


/* =========================================================
   13. PAGE LOADED
   ========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});
