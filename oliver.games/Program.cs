using System.Diagnostics;
using Newtonsoft.Json.Linq;
using Markdig;

var projectsJson = JObject.Parse(File.ReadAllText("../Content/Projects.json"));

var projects = (projectsJson.GetValue("projects")?
        .ToObject<string[]>() ?? throw new InvalidOperationException("Projects json doesn't contain a projects list!"))
    .Select(value => new Project(value))
    .ToList();

projects.ForEach(project => project.GenerateHtml());

Console.WriteLine("File generation complete.");

internal class Project(string name)
{
    private readonly JObject json = JObject.Parse(File.ReadAllText($"../Content/{name}/Data.json"));

    public void GenerateHtml()
    {
        GenerateProjectPage();

        GenerateArticlePages();
        
        Console.WriteLine($"- Generated html for {name}");
    }

    private void GenerateArticlePages()
    {
        if (!json.TryGetValue("articles", out var articles)) return;

        foreach (var article in articles)
        {
            string articlePage = article.Value<string>("page");
            string markdownPath = article.Value<string>("path");

            string pageHtml = File.ReadAllText($"../Templates/articlePage.html");

            pageHtml = SetData(pageHtml, "data-article", markdownPath);
            pageHtml = SetData(pageHtml, "data-project", name);

            File.WriteAllText($"../{name}-{articlePage}.html", pageHtml);
        }
    }

    private void GenerateProjectPage()
    {
        string pageHtml = File.ReadAllText($"../Templates/projectPage.html");

        pageHtml = SetData(pageHtml, "data-project", name);

        File.WriteAllText($"../{name}.html", pageHtml);
    }

    public override string ToString() => $"{name}\n{json}";

    private string SetData(string html, string dataName, string content)
    {
        return html.Replace($"{dataName}=\"\"", $"{dataName}=\"{content}\"");
    }
}