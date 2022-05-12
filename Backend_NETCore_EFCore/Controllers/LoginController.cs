using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace ShopLaptop_EFCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous] //Cho phép mọi người truy cập
        [HttpPost]
        // Route để đăng nhập và tạo JWT lưu vào LocalStorage ở client
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            // Lần đầu đăng nhập, nó sẽ vào hàm Authenticate để kiểm tra username, password trong database
            var user = Authenticate(userLogin);
            // Nếu tài khoản hợp lệ, sẽ tiến hành tạo token
            if (user != null)
            {
                var token = Generate(user);
                return Ok(token);
            }
            // Tài khoản không hợp lệ báo lỗi
            return NotFound("username or password not correct");
        }

        //Hàm tạo JWT Token
        private string Generate(UserModel user)
        {
            Console.WriteLine(_config["Jwt:Issuer"]);
            Console.WriteLine(_config["JWT:Key"]);
            Console.WriteLine(_config["JWT:Audience"]);
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Email, user.EmailAddress),
                new Claim(ClaimTypes.GivenName, user.GivenName),
                new Claim(ClaimTypes.Surname, user.Surname),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(15),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        // Hàm check username, password của tài khoản
        private UserModel Authenticate(UserLogin userLogin)
        {
            var currentUser = UserConstants.Users.FirstOrDefault(o => o.Username.ToLower() == userLogin.Username.ToLower() && o.Password == userLogin.Password);

            if (currentUser != null)
            {
                return currentUser;
            }

            return null;
        }
    }
}
