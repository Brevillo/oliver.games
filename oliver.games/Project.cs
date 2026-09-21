using Newtonsoft.Json.Linq;

internal class Project(string name)
{
    private readonly JObject json = JObject.Parse(File.ReadAllText($"../Content/{name}/Data.json"));

    public void GenerateHtml()
    {
        string pageHtml = File.ReadAllText($"../Templates/projectPage.html")
            .Replace("data-project=\"\"", $"data-project=\"{name}\"");
        
        File.WriteAllText($"../Content/{name}/index.html", pageHtml);
        
        Console.WriteLine($"- Generated html for {name}");
    }

    public override string ToString() => $"{name}\n{json}";
}