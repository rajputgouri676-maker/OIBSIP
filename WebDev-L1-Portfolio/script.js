
document.addEventListener("DOMContentLoaded", () => {
  
    const footerText = document.querySelector(".footer p");

    if (footerText) {
        footerText.textContent =
            `© ${new Date().getFullYear()} Gouri Rajput. All rights reserved.`;
    }

   
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                event.preventDefault();
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    const sections = document.querySelectorAll(
        ".hero-content, .section, .project-card, .contact-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        sections.forEach((section) => {
            section.classList.add("reveal");
            observer.observe(section);
        });
    }
});
