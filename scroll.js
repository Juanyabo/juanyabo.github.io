const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav .center a");

window.addEventListener("scroll", handleScroll);
handleScroll();

function handleScroll() {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 280;
        const sectionHeight = section.clientHeight;
        if ((scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) || (window.innerHeight + scrollY >= document.body.offsetHeight)){
            current = section.getAttribute("id");
        }
    });

    if (scrollY === 0 && sections.length > 0) {
        current = sections[0].getAttribute("id");
    }

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener("click", e => {
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (link.classList.contains("active")) {
            e.preventDefault();
            return;
        }

        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        if (targetSection) {
            e.preventDefault();

            let offsetValue = -120;
            if (targetId === "contact") {
                offsetValue = -80;
            }

            const offsetTop = targetSection.offsetTop + offsetValue;

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    });
});