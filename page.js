
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js";
document.head.appendChild(script);

const project = document.currentScript.dataset.project;
const article = document.currentScript.dataset.article;

build();

async function build() {

    const head = await (await fetch('head.html')).text();
    document.getElementsByTagName("head")[0].append(head);
    
    const headerHtml = await (await fetch(`header.html`)).text();
    document.getElementById("header").innerHTML = headerHtml;

    linkStylesheet(`style.css`);
    linkStylesheet(`header.css`);

    const projectData = project ? await (await fetch(`Content/${project}/Data.json`)).json() : null;

    if (projectData && !article) {
        buildProjectPage(project, projectData);
    }

    if (article) {
        console.log("yes article is real");
        buildArticlePage(project, projectData, article);
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

async function buildProjectPage(project, projectData) {

    linkStylesheet("projectPage.css");
    
    // Banner
    if (projectData.bannerImage) {
        const header = document.getElementById("header-content");
        header.style.backgroundImage = `
        url(${projectData.bannerImage})`;
        // var(--header-image-cover),
    }

    // Trailer
    const trailer = document.getElementById("trailer");
    if (projectData.trailerYouTubeID) {
        trailer.setAttribute("src", `https://www.youtube.com/embed/${projectData.trailerYouTubeID}`);
    } else {
        trailer.style.display = "none";
    }

    // Description and Description Bullets
    const description = document.getElementById("description");
    if (projectData.projectDescription) {
        description.innerHTML = projectData.projectDescription;

        const descriptionBullets = document.getElementById("description-bullets");
        if (projectData.projectDecsriptionBullets) {
            for (const bullet of projectData.projectDecsriptionBullets) {
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

    // Steam embed
    const steamEmbed = document.getElementById("steam-embed");
    if (projectData.steamAppId) {
        addSteamEmbed(steamEmbed, projectData.steamAppId);
    } else {
        steamEmbed.style.display = "none";
    }

    // Contributions
    const contributions = document.getElementById("contributions");
    if (projectData.contributions) {

        for (const contribution of projectData.contributions) {
        
            const li = document.createElement("div");
        
            li.setAttribute("class", "contribution-element");
            li.innerHTML = `
                <div class="contribution-background">${contribution.name}</div>
                <div class="skills-list">
                    ${contribution.skills.map(skill => `<a class="button" href="">${skill}</a>`).join("")}
                </div>
            `;

            contributions.append(li);
        }
    } else {
        contributions.style.display = "none";
    }
    
    // Screenshots
    if (projectData.screenshots) {

        const screenshots = document.getElementById("screenshots");

        for (const screenshot of projectData.screenshots) {
            
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
    if (projectData.aboutTheProjectArticle) {
        const aboutTheProjectContainer = document.getElementById("long-description");
        
        const aboutTheProjectMd = await (await fetch(projectData.aboutTheProjectArticle)).text();

        aboutTheProjectContainer.innerHTML = mdToHtml(aboutTheProjectMd);
    }

    // Info Nuggets
    if (projectData.infoNuggets) {
        const infoNuggetsContainer = document.getElementById("info-nuggets");

        for (const infoNug of projectData.infoNuggets)
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

    // Article List
    if (projectData.articles) {

        console.log("building article list");
        const articleList = document.getElementById("article-list");

        for (const article of projectData.articles) {
            const button = document.createElement("a");
            
            button.setAttribute("class", "button");
            button.setAttribute("href", `${project}-${article.title}.html`);
            button.innerHTML = article.title;

            articleList.append(button);
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

async function buildArticlePage(project, projectData, article) {

    const articleContent = document.getElementById("article-content");
    
    const md = await (await fetch(article)).text();

    articleContent.innerHTML = mdToHtml(md);

    for (const button of document.getElementsByClassName("return-to-project")) {
        button.setAttribute("href", `${project}.html`);
        button.innerHTML = `Return to ${projectData.name}`;
    }
}