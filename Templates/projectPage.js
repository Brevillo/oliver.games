const project = document.currentScript.dataset.project;

build();

async function build() {
    
    console.log(`running js for project page ${project}`);

    const data = await ((await fetch(`Data.json`)).json());
    
    const title = document.querySelector(".project-title");
    title.innerHTML = data.name;

}