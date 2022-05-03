using ContosoPizza.Services;
using ContosoPizza.Data;
using Microsoft.EntityFrameworkCore;
using System.Configuration;





// Additional using declarations

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSqlite<PizzaContext>("Data Source=ContosoPizza.db");
//builder.Services.AddDbContext<shop_laptopContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("MvcShopLaptopContext")));
builder.Services.AddCors();



// Add the PizzaContext

// Add the PromotionsContext

builder.Services.AddScoped<PizzaService>();


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Add the CreateDbIfNotExists method call
app.CreateDbIfNotExists();

app.Run();
