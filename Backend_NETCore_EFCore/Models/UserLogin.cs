namespace ShopLaptop_EFCore.Models
{
    using System.Text.Json.Serialization;
    public class UserLogin
    {
            public string Username { get; set; }
            public string Password { get; set; }
     
            [JsonIgnore(Condition =JsonIgnoreCondition.WhenWritingNull)]
            public string Tada { get; set; }
    }
}
