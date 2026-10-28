
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js";
document.head.appendChild(script);

const project = document.currentScript.dataset.project;

build();

async function build() {

    const head = await (await fetch('head.html')).text();
    document.getElementsByTagName("head")[0].append(head);
    
    const headerHtml = await (await fetch(`header.html`)).text();
    document.getElementById("header").innerHTML = headerHtml;

    linkStylesheet(`style.css`);
    linkStylesheet(`header.css`);

    if (project) {
        buildProjectPage(project);
    }

    buildLightbox();
}

function linkStylesheet(path) {
    
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = path;
    
    document.getElementsByTagName("head")[0].appendChild(link);
}

function addSteamEmbed(element, appId) {
    element.innerHTML = `
        <iframe 
            src="https://store.steampowered.com/widget/${appId}/"
            frameborder="0"
            width="100%"
            height="190px"
        ></iframe>
        `;
}

function mdToHtml(md) {
    return new showdown.Converter().makeHtml(md);
}

async function buildProjectPage(project) {

    linkStylesheet("projectPage.css");

    const data = await (await fetch(`Content/${project}/Data.json`)).json();
    
    // Banner
    if (data.bannerImage) {
        const header = document.getElementById("header-content");
        header.style.backgroundImage = `
        url(${data.bannerImage})`;
        // var(--header-image-cover),
    }

    // Trailer
    const trailer = document.getElementById("trailer");
    if (data.trailerYouTubeID) {
        trailer.setAttribute("src", `https://www.youtube.com/embed/${data.trailerYouTubeID}`);
    } else {
        trailer.style.display = "none";
    }

    // Description and Description Bullets
    const description = document.getElementById("description");
    if (data.projectDescription) {
        description.innerHTML = data.projectDescription;

        const descriptionBullets = document.getElementById("description-bullets");
        if (data.projectDecsriptionBullets) {
            for (const bullet of data.projectDecsriptionBullets) {
                const li = document.createElement("li");
                li.innerText = bullet;
                descriptionBullets.append(li);
            }
        } else {
            descriptionBullets.style.display = "none";
        }

    } else { 
        description.style.display = "none";
    }

    const steamEmbed = document.getElementById("steam-embed");
    if (data.steamAppId) {
        addSteamEmbed(steamEmbed, data.steamAppId);
    } else {
        steamEmbed.style.display = "none";
    }

    // Contributions
    const contributions = document.getElementById("contributions");
    if (data.contributions) {

        for (const contribution of data.contributions) {
        
            const li = document.createElement("div");
        
            li.setAttribute("class", "contribution-element");
            li.innerHTML = `
                <div class="skills-list">
                    ${contribution.skills.map(skill => `<a class="button" href="">${skill}</a>`).join("")}
                </div>
                <div class="contribution-cover non-selectable">${contribution.name}</div>
            `;

            contributions.append(li);
        }
    } else {
        contributions.style.display = "none";
    }
    
    // Screenshots
    if (data.screenshots) {

        const screenshots = document.getElementById("screenshots");

        for (const screenshot of data.screenshots) {
            
            const screenshotHolder = document.createElement("img");
            screenshotHolder.setAttribute("class", "lightboxable glow-hover");
            if (screenshot.description) {
                screenshotHolder.setAttribute("alt", screenshot.description);
            }
            screenshotHolder.setAttribute("src", screenshot.path);
            
            screenshots.appendChild(screenshotHolder);
        }
    }

    // About the Project
    if (data.aboutTheProjectArticle) {
        const aboutTheProjectContainer = document.getElementById("long-description");
        
        const aboutTheProjectMd = await (await fetch(data.aboutTheProjectArticle)).text();

        aboutTheProjectContainer.innerHTML = mdToHtml(aboutTheProjectMd);
    }

    // Info Nuggets
    if (data.infoNuggets) {
        const infoNuggetsContainer = document.getElementById("info-nuggets");

        for (const infoNug of data.infoNuggets)
        {
            const infoNugElement = document.createElement("div");
            infoNugElement.setAttribute("class", "info-nugget");

            infoNugElement.innerHTML = `
            <div class="info-nugget-label">${infoNug.label}</div>
            <div class="info-nugget-value">${infoNug.value}</div>
            `;

            infoNuggetsContainer.appendChild(infoNugElement);
        }
    }
}

async function buildLightbox() {

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