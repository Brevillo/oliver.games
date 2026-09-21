const project = document.currentScript.dataset.project;

console.log("this thing on?");

build();

async function build() {
    
    console.log(`running js for project page ${project}`);

    const data = await ((await fetch(`/Content/${project}/Data.json`)).json());
    
    const title = document.querySelector(".project-title");
    title.innerHTML = data.name;

}