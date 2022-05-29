using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;

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

        [HttpGet("TaoHoaDon")]
        public async Task<ActionResult<List<dynamic>>> TaoHoaDon(int maKhachHang, int maNhanVien) {
            // Lấy giỏ hàng của khách hàng
            var gh = (from a in _context.GioHangs
                      where a.MaKhachHang == maKhachHang
                      select a);
            var ngayChotDon = System.DateTime.Now;
            var tinhTrangGiaoHang = -1; // Đang chờ duyệt đơn
            // Với mỗi món hàng trong đơn, ta sẽ lần lượt lấy mã sản phẩm và số lượng để tính tổng tiền
            long tongTien = 0;
            foreach (var item in gh)
            {
                tongTien = tongTien + tinhTienMoiSanPham(item.MaSanPham, item.SoLuong);
            }
            // Tạo hóa đơn chung trước
            var hoaDon = _context.Add(new HoaDon(maKhachHang, ngayChotDon, tinhTrangGiaoHang, tongTien, maNhanVien));
            
            return Ok("1234");
        }

    private long tinhTienMoiSanPham(int idSanPham,int quantity)
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
