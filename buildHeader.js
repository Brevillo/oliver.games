build();

async function build() {
    const headerFetch = await fetch("header.html");
    const header = await headerFetch.text();

    document.getElementById("header").innerHTML = header;
}