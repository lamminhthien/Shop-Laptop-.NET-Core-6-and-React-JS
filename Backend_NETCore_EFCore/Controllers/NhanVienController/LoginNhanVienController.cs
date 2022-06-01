using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ShopLaptop_EFCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginNhanVienController : ControllerBase
    {
        // Đọc cấu hình từ appsetting.json
        private IConfiguration _config;
        // Database context
        private readonly shop_laptopContext _context;
        // Constructor
        public LoginNhanVienController(IConfiguration config, shop_laptopContext context)
        {
            _config = config;
            _context = context;
        }


        // Route đăng nhập và lấy jwt token
        [AllowAnonymous]
        [HttpPost]
        public IActionResult LoginNhanVien([FromBody] UserLogin userLogin)
        {
            // Lấy username và password từ request payload
            var username = userLogin.Username;
            var password = userLogin.Password;

            // Kiểm tra username và password có tồn tại trong database không?
            var currentUser = _context.NhanViens.FirstOrDefault(o => o.Username == username && o.Password == password);

            // Nếu tồn tại tài khoản, trả về JWT Token để React lưu vào LocalStorage
            if (currentUser != null)
            {
                var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, currentUser.Username),
                    new Claim(ClaimTypes.MobilePhone, currentUser.SoDienThoai),
                    new Claim(ClaimTypes.Name, currentUser.TenNhanVien),
                    new Claim(ClaimTypes.Role, "Nhân viên")
                 };

                var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Audience"],
                  claims,
                  expires: DateTime.Now.AddMinutes(30),
                  signingCredentials: credentials);
                // Mã hóa thành chuỗi token và trả về status 200 kèm token để React lưu vào LocalStorage
                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(tokenString);
            }
            else
            {
                return NotFound("Tài khoản nhân viên không hợp lệ");
            }
        }
        // Lấy thông tin tài khoản nhân viên từ JWT Token
        private string GetCurrentUserInfo()
        {
            // Đọc các Claims từ Header của Request
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            // Nếu tồn tại, lấy tên của nhân viên
            if (identity != null)
            {
                var userClaims = identity.Claims;
                return userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Name)?.Value;
            }
            return null;
        }
    }
}