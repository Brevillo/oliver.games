using Newtonsoft.Json.Linq;

var projectsJson = JObject.Parse(File.ReadAllText("../Content/Projects.json"));

var projects = (projectsJson.GetValue("projects")?
        .ToObject<string[]>() ?? throw new InvalidOperationException("Projects json doesn't contain a projects list!"))
    .Select(value => new Project(value))
    .ToList();

projects.ForEach(project => project.GenerateHtml());

Console.WriteLine("File generation complete.");