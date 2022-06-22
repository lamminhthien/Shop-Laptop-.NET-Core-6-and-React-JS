using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using Microsoft.AspNetCore.Authorization;
using ShopLaptop_EFCore.Models.NhanVienModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.IO;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShopLaptop_EFCore.Controllers.NhanVienController
{
  [Route("api/[controller]")]
  [Authorize(Roles = "Nhân Viên,Giám Đốc")]
  [ApiController]
  public class QuanLyDonHangController : ControllerBase
  {
    private readonly shop_laptopContext _context;

    public QuanLyDonHangController(shop_laptopContext context)
    {
      _context = context;
    }

    [HttpGet("TaoHoaDon")]
    public async Task<ActionResult<List<dynamic>>> TaoHoaDon(int maKhachHang, int maNhanVien)
    {
      // Lấy giỏ hàng của khách hàng
      var gh = (from a in _context.GioHangs
                where a.MaKhachHang == maKhachHang
                select a);
      var tinhTrangGiaoHang = -1; // Đang chờ duyệt đơn
                                  // Với mỗi món hàng trong đơn, ta sẽ lần lượt lấy mã sản phẩm và số lượng để tính tổng tiền
      long tongTien = 0;
      foreach (var item in gh)
      {
        tongTien = tongTien + tinhTienMoiSanPham(item.MaSanPham, item.SoLuong);
      }
      // Tạo hóa đơn chung trước
      var hoaDon = new HoaDon(maKhachHang, tinhTrangGiaoHang, tongTien, maNhanVien);
      // Tạo record hóa đơn mới vào database
      _context.Add(hoaDon);
      try
      {
        _context.SaveChanges();
      }
      catch (Exception ex)
      {
        return BadRequest(ex.InnerException.ToString());
      }
      // Lấy mã hóa đơn (autoincrement) vừa được tạo ra
      var maHoaDon = hoaDon.MaHoaDon;

      // Tạo chi tiết hóa đơn cho từng sản phẩm
      foreach (var item in gh)
      {
        var giaTienSanPham = (from a in _context.SanPhams
                              join b in _context.BienDongGia
                              on a.MaSanPham equals b.MaSanPham
                              where a.MaSanPham == item.MaSanPham
                              orderby b.LanThayDoiGia descending
                              select b.GiaNhap * (1 + b.ChietKhau)).FirstOrDefault();
        _context.Add(new ChiTietHoaDon(maHoaDon, item.MaSanPham, item.SoLuong, (long)giaTienSanPham));
        try { _context.SaveChanges(); }
        catch (Exception ex)
        {
          return BadRequest(ex.InnerException.ToString());
        }
      }


      return Ok("1234");
    }

    [HttpPost("CapNhatTrangThaiDon")]
    public async Task<ActionResult<List<dynamic>>> CapNhatTrangThaiDon(int maHoaDon = -1, int trangThaiDon = -2)
    {
      var identity = HttpContext.User.Identity as ClaimsIdentity;
      var userNameNhanVien = identity.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;
      var maNhanVien = (from a in _context.NhanViens
                        where a.Username == userNameNhanVien
                        select a.MaNhanVien
      ).FirstOrDefault();
      var hoaDon = (from a in _context.HoaDons
                    where a.MaHoaDon == maHoaDon
                    select a).FirstOrDefault();
      if (hoaDon == null) return BadRequest("Không tìm thấy hóa đơn ");
      if (maNhanVien == 0) return BadRequest("Không tìm thấy nhân viên ");
      if (trangThaiDon > 2 && trangThaiDon < -1) return BadRequest("Trạng thái đơn hàng cần cập nhật không hợp lệ");
      // Nếu  có 1 sản phẩm không đủ số lượng (tức là dưới 4,3,2,1) để đặt cho khách thì báo lỗi ngay 
      // Check từng món trong hóa đơn đó
      var listChiTietHoaDon = (from cthds in _context.ChiTietHoaDons where cthds.MaHoaDon == maHoaDon select cthds).ToList();
      foreach (var cthd in listChiTietHoaDon)
      {
        var kiemTraSpTrongKho = (from ctsp in _context.ChiTietSanPhams
                                 join sp in _context.SanPhams on ctsp.MaSanPham equals sp.MaSanPham
                                 where ctsp.MaSanPham == cthd.MaSanPham
                                 select new
                                 {
                                   soLuong = ctsp.SoLuong,
                                   tenSp = sp.TenSanPham
                                 }).FirstOrDefault();
        // So sánh với số lượng  trong chi tiết hóa đơn đó
        if (cthd.SoLuong > kiemTraSpTrongKho?.soLuong)
        {
          return BadRequest("Sản phẩm " + kiemTraSpTrongKho.tenSp + " Không đủ số lượng để tiến hành đặt hàng");
        }
      }
      hoaDon.NgayChotDon = System.DateTime.Now;
      hoaDon.TinhTrangGiaoHang = trangThaiDon;
      _context.Entry(hoaDon).State = EntityState.Modified;
      try
      {
        _context.SaveChanges();
      }
      catch (Exception ex)
      {
        return BadRequest("Có lỗi không xác định khi cập nhật trạng thái của đơn hàng");
      }
      // Cập nhật lại số lượng sản phẩm trong kho nếu đơn hàng này giao hoàn thành
      if (trangThaiDon == 2)
      {
        foreach (var cthd in listChiTietHoaDon)
        {
          var spCanCapNhatSoLuong = (from a in _context.ChiTietSanPhams
                                     where a.MaSanPham == cthd.MaSanPham
                                     select a).FirstOrDefault();
          // Tiến hành cập nhật lại số lượng từng sản phẩm trong kho
          spCanCapNhatSoLuong.SoLuong = spCanCapNhatSoLuong.SoLuong - cthd.SoLuong;
          _context.Entry(spCanCapNhatSoLuong).State = EntityState.Modified;
          try
          {
            _context.SaveChanges();
          }
          catch (Exception ex)
          {
            return BadRequest("Không thể cập nhật lại số lượng sản phẩm trong kho sau khi giao hàng thành công");
          }
        }
      }
      return Ok("Đã cập nhật trạng thái đơn hàng thành công");
    }

    [HttpGet("ListDonHang")]
    public ActionResult<List<dynamic>> ListDonHang(int status = 0)
    {
      var ListDonHang = (from a in _context.HoaDons
                         where a.TinhTrangGiaoHang == status
                         select new
                         {
                           maHoaDon = a.MaHoaDon,
                           hoTen = (from a2 in _context.HoaDons join b2 in _context.KhachHangs on a2.MaKhachHang equals b2.MaKhachHang select b2.HoTen).First(),
                           tinhTrang = (a.TinhTrangGiaoHang == 0 ? "Đang chờ duyệt" :
             (a.TinhTrangGiaoHang == 1 ? "Đang vận chuyển" : a.TinhTrangGiaoHang == 2 ? "Đã giao hàng thành công" : "Bị hủy")),
                           thoiGian = a.NgayChotDon,
                           soLuongSanPham = (from aa in _context.ChiTietHoaDons where aa.MaHoaDon == a.MaHoaDon select a).Count(),
                           tongTien = a.TongTien
                         }).ToList();
      if (ListDonHang == null) return BadRequest("Chưa có đơn hàng nào");
      return Ok(ListDonHang);
    }

    [HttpGet("ChiTietDonHang/{maHoaDon}")]
    public ActionResult<List<dynamic>> ChiTietDonHang(int maHoaDon)
    {
      var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/SanPham/";
      var chiTietHoaDon = (from a in _context.ChiTietHoaDons
                           join b in _context.HoaDons
                           on a.MaHoaDon equals b.MaHoaDon
                           join c in _context.SanPhams
                           on a.MaSanPham equals c.MaSanPham
                           where a.MaHoaDon == maHoaDon
                           select new
                           {
                             maSanPham = a.MaSanPham,
                             tenSanPham = c.TenSanPham,
                             soLuong = a.SoLuong,
                             donGia = (from d in _context.BienDongGia
                                       where d.MaSanPham == a.MaSanPham
                                       orderby d.LanThayDoiGia ascending
                                       select d.GiaNhap * (1 + d.ChietKhau)).Last(),
                             anhSanPham = (from e in _context.AnhSanPhams
                                           where e.MaSanPham == a.MaSanPham
                                           select imageURL + e.FileAnh.Trim()).First(),
                             conHangTrongKho = (from sp in _context.SanPhams
                                                join
                               ctsp in _context.ChiTietSanPhams on sp.MaSanPham equals ctsp.MaSanPham
                                                where sp.MaSanPham == a.MaSanPham
                                                select new
                                                {
                                                  khaNangDatHang = (a.SoLuong > ctsp.SoLuong ? "Không đủ số lượng để giao" : "")
                                                }).FirstOrDefault()
                           }).ToList();
      var trangThaiDon = (from a in _context.HoaDons
                          where a.MaHoaDon == maHoaDon
                          select new
                          {
                            trangThai = (a.TinhTrangGiaoHang == -1 ? "Bị hủy" : a.TinhTrangGiaoHang == 0 ? "Đang chờ duyệt" : "Giao hàng thành công")
                          }).FirstOrDefault();

      if (chiTietHoaDon.Count() == 0) return BadRequest("Đơn hàng này không tồn tại");
      return Ok(new
      {
        trangThaiDon = trangThaiDon,
        chiTietHoaDon = chiTietHoaDon
      });
    }

    private long tinhTienMoiSanPham(int idSanPham, int quantity)
    {
      // tìm giá tiền gần nhất của sản phẩm
      var giaTienSanPham = (from a in _context.SanPhams
                            join b in _context.BienDongGia
                            on a.MaSanPham equals b.MaSanPham
                            where a.MaSanPham == idSanPham
                            orderby b.LanThayDoiGia descending
                            select b.GiaNhap * (1 + b.ChietKhau)).FirstOrDefault();
      return (long)(giaTienSanPham * quantity);
    }

  }
}
