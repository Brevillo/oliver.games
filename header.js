build();

async function build() {
    
    const headerHtml = await (await fetch("/header.html")).text();
    document.getElementById("header").innerHTML = headerHtml;

    linkStylesheet("/style.css");
    linkStylesheet("/header.css");

}

function linkStylesheet(path) {
    
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = path;
    
    document.getElementsByTagName("head")[0].appendChild(link);
}