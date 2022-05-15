# System.Text.Json
![image](https://user-images.githubusercontent.com/99172799/168466945-cff5be07-c001-4485-a9ca-eccf7be699cc.png)
```c#
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IgnoreValueDefaultOnSerialize
{
    public class Forecast
    {
        public DateTime Date { get; set; }
        public int TemperatureC { get; set; }
        public string? Summary { get; set; }
    };

    public class Program
    {
        public static void Main()
        {
            Forecast forecast = new()
            {
                Date = DateTime.Now,
                Summary = null,
                TemperatureC = default
            };

            JsonSerializerOptions options = new()
            {
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
            };

            string forecastJson =
                JsonSerializer.Serialize<Forecast>(forecast, options);

            Console.WriteLine(forecastJson);
        }
    }
}

// Produces output like the following example:
//
//{ "Date":"2020-10-21T15:40:06.8920138-07:00"}
```
