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

namespace ShopLaptop_EFCore.Controllers.NhanVienController
{
    [Route("api/[controller]")]
[Authorize(Roles ="Nhân Viên")]
    [ApiController]
    public class QuanLyBinhLuanSanPhamController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public QuanLyBinhLuanSanPhamController(shop_laptopContext context)
        {
            _context = context;
        }

        [HttpGet("ListBinhLuanSanPham")]
        public async Task<ActionResult<List<dynamic>>> ListBinhLuanSanPham(int page=1)
        {

            double rowPerPage = 5; 
            if (page == null || page == 0)
            {
                page = 1;
            }
            // Tính số trang cần phân chia dựa theo số lượng record của bình luận sản phẩm
            double commentQuantity = _context.BinhLuanSanPhams.Count();
            double numberOfPage = commentQuantity / rowPerPage;
            int numberOfPageInteger = (int)Math.Ceiling(numberOfPage);

            // Nêu không có bình luận sản phẩm nào
            if (_context.BinhLuanSanPhams == null)
            {
                return NotFound();
            } 
            var ketqua = (from a in _context.SanPhams
                          join b in _context.BinhLuanSanPhams on
                          a.MaSanPham equals b.MaSanPham
                          join c in _context.KhachHangs
                          on b.MaKhachHang equals c.MaKhachHang
                          select new
                          {
                              tenSanPham = a.TenSanPham,
                              tenKhachHang = c.HoTen,
                              noiDung = b.NoiDung,
                              trangThai =  (b.TrangThai == true ?  "Đã duyệt" :  "Chưa duyệt"),

                          }).Skip(5 * (page - 1)).Take(5);
            return Ok(new
            {
                tongSoBinhLuan = commentQuantity,
                soTrang = numberOfPageInteger,
                ketqua
            });
        }

        // Cái này có thể kiếm Machine Learning làm thay (nếu được !!)
        [HttpPost("DuyetBinhLuanSanPham")]
        public async Task<ActionResult<List<dynamic>>> DuyetBinhLuanSanPham(int id = 1)
        {
            var currentBinhLuan = (from a in _context.BinhLuanSanPhams
                                   where a.MaBinhLuan == id
                                   select a
                                   ).FirstOrDefault();
            // Nếu tồn tại bình luận, đổi trạng thái true <--> false
            if (currentBinhLuan != null)
            {
                currentBinhLuan.TrangThai = !currentBinhLuan.TrangThai;
                _context.Entry(currentBinhLuan).State = EntityState.Modified;
                try
                {
                    _context.SaveChanges();
                    return Ok("Đã cập nhật trạng thái bình luận sản phẩm");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException.ToString());
                }
            }
            return NotFound("Không tìm thấy bình luận này");
        }

        [HttpPost("PhanHoiBinhLuanSP")]
        public async Task<ActionResult<List<dynamic>>> PhanHoiBinhLuanSP(int maBinhLuan = -1,int maNhanVien = -1,String noiDung="")
        {
            if (maNhanVien == -1)
            {
                return BadRequest("Không có nhân viên phản hồi");
            }
            if (noiDung.Length < 50 || noiDung.Length > 255)
            {
                return BadRequest("Nội dung phải nằm trong khoảng từ 50 đến 255 kí tự");
            }
            try
            {
                _context.Add(new PhanHoiBinhLuanSp(maBinhLuan,maNhanVien,noiDung));
                _context.SaveChanges();
                return Ok("Đã phản hồi cho bình luận " + maBinhLuan + "thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
        }







    }
}
