﻿
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ShopLaptop_EFCore.Data;
using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
// Thêm CORS để React JS sử dụng được API
builder.Services.AddCors(c =>
{
  c.AddPolicy("AllowOrigin", options => options.WithOrigins("https://localhost:3000").AllowAnyMethod()
   .AllowAnyHeader().AllowCredentials().WithExposedHeaders("expire", " www-authenticate"));
});

// Thêm chức năng xử lý json 
builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
builder.Services.AddEndpointsApiExplorer();
// Thêm SwaggerUI (công cụ theo dõi và test API nền web), và thêm phương thức xác thực route bằng JWT (Json Web Token) trên Swagger UI
builder.Services.AddSwaggerGen(c =>
{
  // Thêm định nghĩa phương thức xác thực JWT
  c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
  {
    In = ParameterLocation.Header,
    Description = "Please Insert Token",
    Name = "Authorization",
    Type = SecuritySchemeType.Http,
    BearerFormat = "JWT",
    Scheme = "bearer"
  });
  c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[]{}
        }
    });
});
// Thêm chức năng upload file
builder.Services.Configure<FormOptions>(o =>
{
  // Giới hạn dung lượng ảnh
  o.ValueLengthLimit = int.MaxValue;
  o.MultipartBoundaryLengthLimit = int.MaxValue;
  o.MemoryBufferThreshold = int.MaxValue;
});

// Thêm Database Context và cấu hình đọc chuỗi kết nối SQL Server trong appsettings.json
builder.Services.AddDbContext<shop_laptopContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MvcShopLaptopContext")));
// Thêm khả năng hỗ trợ Views để test trong razor page (nếu cần thiết)
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddMvc(option => option.EnableEndpointRouting = false);

// Thêm chức năng xác thực bằng JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
      options.TokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
      };
      options.Events = new JwtBearerEvents()
      {
        OnChallenge = context =>
        {
          context.HandleResponse();
          context.Response.StatusCode = StatusCodes.Status401Unauthorized;
          context.Response.ContentType = "application/json";

          // Ensure we always have an error and error description
          if (string.IsNullOrEmpty(context.Error))
            context.Error = "invalid_token";
          if (string.IsNullOrEmpty(context.ErrorDescription))
            context.ErrorDescription = "This request requires a valid JWT access token to be provided";

          // Add some extra context for expired tokens.
          if (context.AuthenticateFailure != null && context.AuthenticateFailure.GetType() == typeof(SecurityTokenExpiredException))
          {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            context.Error = "token_expired";
            var authenticationException = context.AuthenticateFailure as SecurityTokenException;
            context.Response.Headers.Add("x-token-expired", authenticationException.Data.ToString());
            context.ErrorDescription = $"The token expired on {authenticationException.Data.ToString()}";
          }
          return context.Response.WriteAsync(JsonSerializer.Serialize(new {
              error = context.Error,
              error_description = context.ErrorDescription
          }));
        }
      };
    });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

// Serve static files in the future
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
  FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
  RequestPath = new PathString("/Resources")
});

app.UseHttpsRedirection();

app.MapControllers();


app.UseRouting();

// Use CORS for axios in front end
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());


app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=SanPhams1}/{action=Index}/{id?}");

app.UseEndpoints(endpoints =>
{
  endpoints.MapControllers();
  endpoints.MapRazorPages();
});

app.Run();
