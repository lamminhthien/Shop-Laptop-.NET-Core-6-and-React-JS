using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;

namespace ShopLaptop_EFCore.Controllers.PublicController
{
  [Route("api/[controller]")]
  [ApiController]
  public class TrangChiTietSanPhamController : ControllerBase
  {
    private readonly shop_laptopContext _context;

    public TrangChiTietSanPhamController(shop_laptopContext context)
    {
      _context = context;
    }

    // GET: api/TrangChiTietSanPham
    [HttpGet("ChiTietSanPham")]
    public async Task<ActionResult<List<dynamic>>> GetChiTietSanPhams(int id)
    {
      if (_context.SanPhams == null)
      {
        return NotFound();
      }
      // Đường dẫn ảnh
      var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/SanPham/";
      // Lấy chi tiet san pham
      var chiTietSanPham = await (from a in _context.SanPhams
                                  join b in _context.LoaiSanPhams
                                  on a.MaLoaiSp equals b.MaLoaiSp
                                  join c in _context.HangSanXuats
                                  on a.MaHangSx equals c.MaHangSx
                                  join d in _context.ChiTietSanPhams
                                  on a.MaSanPham equals d.MaSanPham
                                  join e in _context.BienDongGia
                                  on a.MaSanPham equals e.MaSanPham
                                  where a.MaSanPham == id
                                  orderby e.LanThayDoiGia descending
                                  select new
                                  {
                                    maSanPham = a.MaSanPham,
                                    tenSanPham = a.TenSanPham,
                                    loaiSanPham = b.TenLoaiSp,
                                    hangSanXuat = c.TenHangSx,
                                    cpu = d.Cpu,
                                    cardDoHoa = d.CardDoHoa,
                                    doPhanGiai = d.DoPhanGiai,
                                    oCung = d.OCung,
                                    heDieuHanh = d.HeDieuHanh,
                                    kichThuoc = d.KichThuoc.Trim(),
                                    manHinh = d.ManHinh + "inch",
                                    trongLuong = d.TrongLuong,
                                    ram = d.Ram,
                                    moTaThem = d.MoTaThem,
                                    giaNiemYet = Math.Ceiling(e.GiaNhap * (1 + e.ChietKhau)),
                                  }
                      ).FirstOrDefaultAsync();
      // Lấy danh sách ảnh của sản phẩm tương ứng
      var listAnhSanPham = (from a in _context.SanPhams
                            join b in _context.AnhSanPhams
                            on a.MaSanPham equals b.MaSanPham
                            where a.MaSanPham == id
                            select imageURL + b.FileAnh.Trim());

      if (chiTietSanPham == null)
      {
        return NotFound();
      }
      // Trả về chi tiết sản phẩm và danh sách ảnh
      return Ok(new
      {
        chiTietSanPham = chiTietSanPham,
        danhSachAnh = listAnhSanPham

      });
    }

    [HttpGet("ListBinhLuanSanPham")]
    public async Task<ActionResult<List<dynamic>>> ListBinhLuanSanPham(int id){
        var ketqua = (from a in _context.SanPhams
                          join b in _context.BinhLuanSanPhams on
                          a.MaSanPham equals b.MaSanPham
                          join c in _context.KhachHangs
                          on b.MaKhachHang equals c.MaKhachHang
                          where a.MaSanPham == id
                          select new
                          {
                              maBinhLuan = b.MaBinhLuan,
                              tenKhachHang = c.HoTen,
                              noiDung = b.NoiDung,
                          }).ToList();
        return Ok(ketqua);
    }

    }
}
