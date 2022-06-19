using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ShopLaptop_EFCore.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class LoginNhanVienController : ControllerBase
  {
    private IConfiguration _config;
    private readonly shop_laptopContext _context;
    public LoginNhanVienController(IConfiguration config, shop_laptopContext context)
    {
      _config = config;
      _context = context;
    }
    [AllowAnonymous]
    [HttpPost]
    public IActionResult LoginNhanVien([FromForm] UserLogin userLogin)
    {
      var username = userLogin.Username;
      var password = userLogin.Password;
      var currentUser = _context.NhanViens.FirstOrDefault(o => o.Username == username && o.Password == password);
      if (currentUser != null)
      {
        var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
                    new Claim(ClaimTypes.NameIdentifier, currentUser.Username),
                    new Claim(ClaimTypes.MobilePhone, currentUser.SoDienThoai),
                    new Claim(ClaimTypes.Name, currentUser.TenNhanVien),
                    new Claim(ClaimTypes.Role, username == "root" ? "Giám Đốc" : "Nhân Viên")
                 };
        var token = new JwtSecurityToken(_config["Jwt:Issuer"],
          _config["Jwt:Audience"],
          claims,
          expires: DateTime.Now.AddMinutes(480),
          signingCredentials: credentials);
        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
        return Ok(tokenString);
      }
      else
      {
        return NotFound("Tài khoản nhân viên không hợp lệ");
      }
    }
    [Authorize(Roles = "Nhân Viên,Giám Đốc")]
    [HttpGet("validateToken")]
    public ActionResult<List<dynamic>> validateToken()
    {
      return Ok("You are login");
    }

    private string GetCurrentUserInfo()
    {
      var identity = HttpContext.User.Identity as ClaimsIdentity;
      if (identity != null)
      {
        var userClaims = identity.Claims;
        return userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Name)?.Value;
      }
      return null;
    }
  }
}
