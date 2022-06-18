using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using ShopLaptop_EFCore.Models.NhanVienModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.IO;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShopLaptop_EFCore.Controllers.KhachHangController
{
  [Route("api/[controller]")]
  [ApiController]
  public class DonHangController : ControllerBase
  {
    private readonly shop_laptopContext _context;

    public DonHangController(shop_laptopContext context)
    {
      _context = context;
    }
    //Sữa số lượng sản phẩm trong giỏ hàng
    // Xóa sản phẩm khỏi giỏ hàng
    [HttpGet("ListDonHang")]
    public ActionResult<List<dynamic>> ListDonHang()
    {
      var identity = HttpContext.User.Identity as ClaimsIdentity;
      if (identity != null)
      {
        var userName = identity.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;
        var maKhachHang = (from a in _context.KhachHangs
                           where a.Username == userName
                           select a.MaKhachHang).FirstOrDefault();
        if (maKhachHang == 0) return BadRequest("Khách hàng chưa đăng nhập");
        var donHangCount =  (from a in _context.HoaDons where a.MaKhachHang == maKhachHang select a ).Count();
        var donHangIDList = (from a in _context.HoaDons where a.MaKhachHang == maKhachHang select a.MaHoaDon).ToList();
        return Ok(new {
            tongDonHang = donHangCount,
            list = donHangIDList
        });
        // return Ok($"Có {donHangCount} đơn hàng");
      }
      return BadRequest("Khách hàng chưa đăng nhập");
    }
  }
}
