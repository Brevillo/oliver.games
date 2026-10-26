console.log("running lightbox");

build();

async function build() {

    const lightboxHtml = await (await fetch('lightbox.html')).text();

    const lightboxSystem = document.createElement("div");
    lightboxSystem.innerHTML = lightboxHtml;

    document.getElementsByTagName("body")[0].append(lightboxSystem);

    linkStylesheet('lightbox.css');

    const lightboxContainer = document.getElementById("lightbox");
    const display = document.getElementById("lightbox-display"); 
    const caption = document.getElementById("lightbox-caption");

    lightboxContainer.addEventListener("click", () => lightboxContainer.close());

    document.querySelectorAll(".lightboxable").forEach((img) => {

        img.setAttribute("tabindex", 0);

        img.addEventListener("click", () => {
            display.setAttribute("src", img.getAttribute("src"));
            caption.textContent = img.alt;
            caption.style.display = img.hasAttribute("alt") ? "" : "none";
            lightboxContainer.showModal();
        });
    });
}