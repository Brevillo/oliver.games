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
            string articleTitle = article.Value<string>("title");
            string articleMarkdown = File.ReadAllText($"../{article.Value<string>("path")}");

            string articleHtml = Markdown.ToHtml(articleMarkdown);

            string directory = $"../{name}/";

            Directory.CreateDirectory(directory);
            File.WriteAllText($"{directory}{articleTitle}.html", articleHtml);
        }
        
        // File.WriteAllText();
    }

    private void GenerateProjectPage()
    {
        string pageHtml = File.ReadAllText($"../Templates/projectPage.html")
            .Replace("data-project=\"\"", $"data-project=\"{name}\"");

        File.WriteAllText($"../{name}.html", pageHtml);
    }

    public override string ToString() => $"{name}\n{json}";
}