build();

async function build() {
    
    const templateFetch = await fetch("Templates/projectGridEntryTemplate.html");
    const template = await templateFetch.text();
    
    const projectsFetch = await fetch("Content/Projects.json");
    const projects = await projectsFetch.json();
    
    const projectData = await Promise.all(
        projects.projects.map(async project => [
            project,
            await fetch(`Content/${project}/Data.json`).then(response => response.json()),
        ])
    );
    
    for (let project of projectData) {
        await displayProject(project, template);
    }
}

async function displayProject(project, template) {
    
    const [path, data] = project;

    const cardContainer = document.createElement("div");
    cardContainer.innerHTML = template;

    const logo = cardContainer.querySelector(".logo");
    logo.setAttribute("src", `Content/${path}/Logo.png`);

    // console.log(logo);
    // console.log(logo instanceof HTMLElement);
    // console.log(logo.style);
    
    if (data.landingPageLogoOffset) {
        console.log("booyah");
        logo.style.setProperty("--logo-top-offset", `${data.landingPageLogoOffset}px`);
    }

    cardContainer.querySelector(".background").setAttribute("src", `Content/${path}/Thumbnail1.4.png`);
    
    const rolesContainer = cardContainer.querySelector(".roles");

    for (const role of data.roles) {
        
        const roleButton = document.createElement("a");
        roleButton.classList.add("button");
        roleButton.textContent = role.title;
        roleButton.href = "";
        
        rolesContainer.appendChild(roleButton);
    }

    cardContainer.querySelector(".fun-facts").textContent = data.funFacts;

    const statsGrid = cardContainer.querySelector(".stats")
    const statNames = statsGrid.querySelector(".names");
    const statValues = statsGrid.querySelector(".values");

    for (let stat of data.stats) {
        
        const name = document.createElement("div");
        name.innerHTML = stat.name;
        statNames.appendChild(name);
        
        const value = document.createElement("div");
        value.innerHTML = stat.value;
        statValues.appendChild(value);
    }
    
    // addSteamEmbed("#game-embed", project.steamAppId, null);
    // addSteamEmbed("#demo-embed", project.steamDemoAppId, project.demoDescription);

     function addSteamEmbed(htmlId, appId, description) {
        if (appId) {
            cardContainer.querySelector(htmlId).innerHTML = `
            <iframe 
                src="https://store.steampowered.com/widget/${appId}/"
                frameborder="0"
                width="100%"
                height="200px"
            ></iframe>
            `;
        }
     }

    document.querySelector("#project-grid").appendChild(cardContainer);
}
