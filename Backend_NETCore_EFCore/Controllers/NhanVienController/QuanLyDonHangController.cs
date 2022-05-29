using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using ShopLaptop_EFCore.Models.NhanVienModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.IO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShopLaptop_EFCore.Controllers.NhanVienController
{
    [Route("api/[controller]")]
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
        public async Task<ActionResult<List<dynamic>>> CapNhatTrangThaiDon(int maHoaDon=-1, int maNhanVien=-1,int trangThaiDon=-2)
        {
            var hoaDon = (from a in _context.HoaDons
                          where a.MaHoaDon == maHoaDon
                          select a).FirstOrDefault();
            if (hoaDon == null) return BadRequest("Không tìm thấy hóa đơn ");
            var nhanVien = (from a in _context.NhanViens
                            where a.MaNhanVien == maNhanVien
                            select a).FirstOrDefault();
            if (nhanVien == null) return BadRequest("Không tìm thấy nhân viên ");
            if (trangThaiDon > 1 && trangThaiDon < -1) return BadRequest("Trạng thái đơn hàng cần cập nhật không hợp lệ");
            hoaDon.NgayChotDon = System.DateTime.Now;
            hoaDon.TinhTrangGiaoHang = trangThaiDon;
            _context.Entry(hoaDon).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();

            } catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
            return Ok("Đã cập nhật trạng thái đơn hàng thành công");

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
