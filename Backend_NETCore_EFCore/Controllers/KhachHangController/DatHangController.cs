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
  public class DatHangController : ControllerBase
  {
    private readonly shop_laptopContext _context;

    public DatHangController(shop_laptopContext context)
    {
      _context = context;
    }
    //Sữa số lượng sản phẩm trong giỏ hàng
    // Xóa sản phẩm khỏi giỏ hàng
    [HttpPost("TaoHoaDon")]
    public ActionResult<List<dynamic>> TaoHoaDon()
    {
      var identity = HttpContext.User.Identity as ClaimsIdentity;
      if (identity != null)
      {
        var userName = identity.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;
        var maKhachHang = (from a in _context.KhachHangs
                           where a.Username == userName
                           select a.MaKhachHang
        ).FirstOrDefault();
        if (maKhachHang==0) return BadRequest("Khách hàng chưa đăng nhập");
        var itemGioHangs = (from a in _context.GioHangs
        join b in _context.SanPhams on
        a.MaSanPham equals b.MaSanPham
          where a.MaKhachHang == maKhachHang
          select new {
            maSanPham = a.MaSanPham,
            tenSanPham = b.TenSanPham,
            soLuong = a.SoLuong
          }
        ).ToList();
        double tongTien = 0;
        foreach (var item in itemGioHangs)
        {
          var giaNiemYet = (from d in _context.BienDongGia
                                         where d.MaSanPham == item.maSanPham
                                         orderby d.LanThayDoiGia ascending
                                         select d.GiaNhap * (1 + d.ChietKhau)).Last();
          tongTien = tongTien + (item.soLuong*giaNiemYet);
        }
        var nhanVienList = (from a in _context.NhanViens select a.MaNhanVien).ToList();
        Random rand = new Random();
        int nhanVienRandom = rand.Next(0,nhanVienList.Count);
        // Tạo hóa đơn
        HoaDon hoaDon = new HoaDon(maKhachHang,DateTime.Now,0,Convert.ToInt64(tongTien),nhanVienList[nhanVienRandom]);
        try {
          _context.Add(hoaDon);
          _context.SaveChanges();
          var maHoaDon = hoaDon.MaHoaDon;
          foreach (var item in itemGioHangs)
          {
            var giaNiemYet = (from d in _context.BienDongGia
                                         where d.MaSanPham == item.maSanPham
                                         orderby d.LanThayDoiGia ascending
                                         select d.GiaNhap * (1 + d.ChietKhau)).Last();
            ChiTietHoaDon cthd = new ChiTietHoaDon(maHoaDon,item.maSanPham,item.soLuong,item.soLuong*Convert.ToInt64(giaNiemYet));
            try {
              _context.Add(cthd);
              _context.SaveChanges();
            } catch (Exception e) {
              return BadRequest("Có lỗi khi tạo chi tiết hóa đơn");
            }
            // Xóa item trong giỏ hàng
            try {
              var itemGioHangToRemove = (from a in _context.GioHangs where (a.MaKhachHang == maKhachHang) where(a.MaSanPham == item.maSanPham) select a).First();
              _context.GioHangs.Remove(itemGioHangToRemove);
              _context.SaveChanges();
            }
            catch (Exception e) {
              return BadRequest(e.Message.ToString());
            }
          }
          return Ok("Tạo hóa đơn và chi tiết hóa đơn thành công, mã hóa đơn cha là " + hoaDon.MaHoaDon);
        }catch (Exception e) {
          return BadRequest(e.Message);
        }
        // return Ok(new {
        //   tongTien = tongTien,
        //   nhanVienRandom = nhanVienList[nhanVienRandom],
        //   countTest = nhanVienList.Count()
        // });
      }
      return NotFound("Khách hàng chưa đăng nhập");
    }
  }
}
