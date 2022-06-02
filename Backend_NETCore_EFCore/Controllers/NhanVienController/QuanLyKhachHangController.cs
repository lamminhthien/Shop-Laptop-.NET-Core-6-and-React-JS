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
    public class QuanLyKhachHangController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public QuanLyKhachHangController(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: api/QuanLyKhachHang
        [HttpGet("ListKhachHang/{page}")]
        public async Task<ActionResult<IEnumerable<KhachHang>>> GetKhachHangs(int page)
        {
            double rowPerPage = 5;
            // Kiểm tra số page, nếu null hoặc  = 0, gán là 1
            if (page == null || page == 0)
            {
                page = 1;
            }
            // Tính số trang cần phân chia dựa theo số lượng record của khách hàng
            double customerQuantity = _context.KhachHangs.Count();
            double numberOfPage = customerQuantity / rowPerPage;
            int numberOfPageInteger = (int)Math.Ceiling(numberOfPage);
            if (_context.KhachHangs == null)
            {
                return NotFound();
            }
            var ketQua = await _context.KhachHangs.Select(x => new
            {
                maKhachHang = x.MaKhachHang,
                tenKhachHang = x.HoTen,
                diaChi = x.DiaChi,
                soDienThoai = x.SoDienThoai,
                gioiTinh = (x.GioiTinh == true ? "Nữ" : "Nam"),
                email = x.Email,

            }
            ).Skip(5 * (page - 1)).Take(5).ToListAsync();
            return Ok(new
            {
                tongSoKhachHang = customerQuantity,
                soTrang = numberOfPageInteger,
                ketqua = ketQua
            }); ;
        }

        // GET: api/QuanLyKhachHang/5
        [HttpGet("{id}")]
        public async Task<ActionResult<KhachHang>> GetKhachHang(int id)
        {
            if (_context.KhachHangs == null)
            {
                return NotFound();
            }
            var khachHang = await _context.KhachHangs.FindAsync(id);

            if (khachHang == null)
            {
                return NotFound();
            }

            return khachHang;
        }

        // PUT: api/QuanLyKhachHang/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKhachHang(int id, KhachHang khachHang)
        {
            if (id != khachHang.MaKhachHang)
            {
                return BadRequest();
            }

            _context.Entry(khachHang).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KhachHangExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/QuanLyKhachHang
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<KhachHang>> PostKhachHang(KhachHang khachHang)
        {
            if (_context.KhachHangs == null)
            {
                return Problem("Entity set 'shop_laptopContext.KhachHangs'  is null.");
            }
            _context.KhachHangs.Add(khachHang);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKhachHang", new { id = khachHang.MaKhachHang }, khachHang);
        }

        // DELETE: api/QuanLyKhachHang/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKhachHang(int id)
        {
            if (_context.KhachHangs == null)
            {
                return NotFound();
            }
            var khachHang = await _context.KhachHangs.FindAsync(id);
            if (khachHang == null)
            {
                return NotFound();
            }

            _context.KhachHangs.Remove(khachHang);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KhachHangExists(int id)
        {
            return (_context.KhachHangs?.Any(e => e.MaKhachHang == id)).GetValueOrDefault();
        }
    }
}
