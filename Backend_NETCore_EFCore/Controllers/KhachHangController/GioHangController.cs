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
  public class GioHangController : ControllerBase
  {
    private readonly shop_laptopContext _context;

    public GioHangController(shop_laptopContext context)
    {
      _context = context;
    }
    //Sữa số lượng sản phẩm trong giỏ hàng
    // Xóa sản phẩm khỏi giỏ hàng
    [HttpPost("ThemGioHang")]
    public ActionResult<List<dynamic>> ThemGioHang()
    {
      int maSanPham = Int16.Parse(Request.Form["maSanPham"][0]);
      int soLuong = Int16.Parse(Request.Form["soLuong"][0]);
      // return Ok(new {
      //   maSanPham = maSanPham,
      //   soLuong = soLuong
      // });
      var identity = HttpContext.User.Identity as ClaimsIdentity;
      if (identity != null)
      {
        var userName = identity.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;
        var maKhachHang = (from a in _context.KhachHangs
                           where a.Username == userName
                           select a.MaKhachHang
        ).FirstOrDefault();
        // Nếu chưa có mã sản phẩm hoặc không tìm thấy sản phẩm
        var sanPham = (from a in _context.SanPhams
                       where a.MaSanPham == maSanPham
                       select a).FirstOrDefault();
        if (sanPham == null)
          return BadRequest("Sản phẩm này không tồn tại");
        // Cần check xem khách hàng này có tồn tại hay không?
        var khachHang = (from a in _context.KhachHangs
                         where a.MaKhachHang == maKhachHang
                         select a).FirstOrDefault();
        if (khachHang == null) return BadRequest("Khách hàng chưa đăng nhập");
        if (soLuong <= 0)
          return BadRequest("Số lượng sản phẩm không phù hợp");
        if (soLuong > 4)
          return BadRequest("Bạn chỉ được phép đặt tối đa với số lượng là 4");
        var sanPhamExistedOnCart = (from a in _context.GioHangs
                                    where (a.MaKhachHang == maKhachHang) &&
                                    (a.MaSanPham == maSanPham)
                                    select a).FirstOrDefault();
        if (sanPhamExistedOnCart != null)
        {
          var sanPhamOnCart = new GioHang(maKhachHang, maSanPham, soLuong);
          try
          {
            _context.Entry(sanPhamOnCart).State = EntityState.Modified;
            _context.SaveChanges();
          }
          catch (Exception ex)
          {
            return BadRequest(ex.ToString());
          }
        }
        try
        {
          _context.Add(new GioHang(maKhachHang, maSanPham, soLuong));
          _context.SaveChanges();
        }
        catch (Exception ex)
        {
          return BadRequest(ex.InnerException.ToString());
        }
        return Ok("Hi");
      }
      return NotFound("Khách hàng chưa đăng nhập");
    }

    //Xem Giỏ hàng
    [HttpPost("XemGioHang")]
    public ActionResult<List<dynamic>> XemGioHang()
    {
      var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/SanPham/";
      var identity = HttpContext.User.Identity as ClaimsIdentity;
      if (identity != null)
      {
        var userName = identity.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;
        var maKhachHang = (from a in _context.KhachHangs
                           where a.Username == userName
                           select a.MaKhachHang
        ).FirstOrDefault();
        var itemCart = (from a in _context.GioHangs
                        join b in _context.SanPhams
                        on a.MaSanPham equals b.MaSanPham
                        where a.MaKhachHang == maKhachHang
                        select new
                        {
                          maSanPham = a.MaSanPham,
                          tenSanPham = b.TenSanPham,
                          soLuong = a.SoLuong,
                          donGia = (from d in _context.BienDongGia
                                    where d.MaSanPham == a.MaSanPham
                                    orderby d.LanThayDoiGia ascending
                                    select d.GiaNhap * (1 + d.ChietKhau)).Last(),
                          anhSanPham = (from e in _context.AnhSanPhams
                                        where e.MaSanPham == a.MaSanPham
                                        select imageURL + e.FileAnh.Trim()).First()
                        });
        return Ok(itemCart);
      }
      else return NotFound("Khách Hàn chưa đăng nhập");
    }

    // Xóa vật phẩm trong giỏ hàng
    [HttpDelete("XoaGioHang/{id}")]
    public ActionResult<List<dynamic>> XoaGioHang(int id)
    {
      try
      {
        var currentSanPham = (from a in _context.SanPhams where a.MaSanPham == id select a).First();
        if (currentSanPham == null) return NotFound("Không tìm thấy sản phẩm này");
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        var userName = identity.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;
        if (userName != null)
        {
          var maKhachHang = (from a in _context.KhachHangs
                             where a.Username == userName
                             select a.MaKhachHang).FirstOrDefault();
          var sanPhamToDelete = (from a in _context.GioHangs
                                 where (a.MaSanPham == id)
                                 where (a.MaKhachHang == maKhachHang)
                                 select a
          ).First();
          if (sanPhamToDelete != null)
          {
            _context.GioHangs.Remove(sanPhamToDelete);
            try
            {
              _context.SaveChanges();
            }
            catch (Exception ex)
            {
              return BadRequest(ex.ToString());
            }
            return Ok("Xóa sản phẩm khỏi giỏ hàng thành công");
          }
          else return BadRequest("Xóa sản phẩm khỏi giỏ hàng thất bại");
        }
        else return NotFound("Khách Hàng chưa đăng nhập");
      }
      catch { return BadRequest("ID sản phẩm không hợp lệ hoặc không đúng form ?id=##"); }
    }

    [HttpPost("CapNhatGioHang")]
    public ActionResult<List<dynamic>> CapNhatGioHang()
    {
      try
      {
        var soLuong = Int16.Parse(Request.Form["soLuong"][0]);
        var maSanPham = Int16.Parse(Request.Form["maSanPham"][0]);
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
          var userName = identity.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;
          var maKhachHang = (from a in _context.KhachHangs
                             where a.Username == userName
                             select a.MaKhachHang
          ).FirstOrDefault();
          if (maKhachHang == 0) return BadRequest("Lỗi không xác định");
          // Check sản phẩm trong giỏ hàng đó phải của khách hàng đang đăng nhập hay ko
          var itemGioHangCheck = (from a in _context.GioHangs where (a.MaKhachHang == maKhachHang) && (a.MaSanPham == maSanPham) select a).FirstOrDefault();
          if (itemGioHangCheck == null) return BadRequest("Quý khách không có sản phẩm này trong giỏ hàng");
          // Lúc này cho cập nhật số lượng sản phẩm được nè
          else
          {
            GioHang gh = new GioHang(maKhachHang, maSanPham, soLuong);
          }
          return Ok(itemGioHangCheck == null);
        }
        else
          return BadRequest("Khách Hàng chưa đăng nhập");
      } catch {
        return BadRequest("Dữ liệu đầu vào không hợp lệ");
      }
    }
  }
}
