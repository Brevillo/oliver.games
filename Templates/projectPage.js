const project = document.currentScript.dataset.project;

build();

async function build() {

    linkStylesheet("projectPage.css");

    const data = await ((await fetch(`Content/${project}/Data.json`)).json());
    
    const trailer = document.getElementById("trailer");
    if (data.trailerYouTubeID) {
        trailer.setAttribute("src", `https://www.youtube.com/embed/${data.trailerYouTubeID}`);
    } else {
        trailer.style.display = "none";
    }

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

    const contributions = document.getElementById("contributions");
    if (data.contributions) {
        for (const contribution of data.contributions) {
            const li = document.createElement("div");
            li.setAttribute("class", "contribution-element");
            li.innerHTML = `
                <span>${contribution.name}</span>
                <div class="skills-list">
                    ${contribution.skills.map(skill => `<a class="button" href="">${skill}</a>`).join("")}
                </div>
            `;
            contributions.append(li);
        }
    } else {
        contributions.style.display = "none";
    }

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