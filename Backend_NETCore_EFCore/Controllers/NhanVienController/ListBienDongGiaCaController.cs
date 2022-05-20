using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;

namespace ShopLaptop_EFCore.Controllers.NhanVienController
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListBienDongGiaCaController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public ListBienDongGiaCaController(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: api/ListBienDongGiaCa
        [HttpGet("ListBienDongGia/{page}")]
        public async Task<ActionResult<IEnumerable<BienDongGium>>> GetBienDongGia(int page)
        {
            double rowPerPage = 5;
            // Kiểm tra số page, nếu null hoặc  = 0, gán là 1
            if (page == null || page == 0)
            {
                page = 1;
            }
            // Tính số trang cần phân chia dựa theo số lượng record của khách hàng
            double historyPriceQuantity = _context.BienDongGia.Count();
            double numberOfPage = historyPriceQuantity / rowPerPage;
            int numberOfPageInteger = (int)Math.Ceiling(numberOfPage);

            if (_context.BienDongGia == null)
            {
                return NotFound();
            }
            var ketqua = (from a in _context.SanPhams
                          join b in _context.BienDongGia on
                          a.MaSanPham equals b.MaSanPham
                          select new
                          {
                              tenSanPham = a.TenSanPham,
                              giaNhap = b.GiaNhap,
                              lanThayDoiGia = b.LanThayDoiGia,
                              chietKhau = b.ChietKhau,
                              thoiGian = b.ThoiGian

                          }).Skip((page - 1) * 5).Take(5).ToListAsync();
            return Ok(new
            {
                tongSoLichSuGia = historyPriceQuantity,
                tongSoTrang = numberOfPageInteger,
                ketqua = ketqua
            });
        }

        // GET: api/ListBienDongGiaCa/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BienDongGium>> GetBienDongGium(int id)
        {
            if (_context.BienDongGia == null)
            {
                return NotFound();
            }
            var bienDongGium = await _context.BienDongGia.FindAsync(id);

            if (bienDongGium == null)
            {
                return NotFound();
            }

            return bienDongGium;
        }

        // PUT: api/ListBienDongGiaCa/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBienDongGium(int id, BienDongGium bienDongGium)
        {
            if (id != bienDongGium.MaBienDong)
            {
                return BadRequest();
            }

            _context.Entry(bienDongGium).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BienDongGiumExists(id))
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

        // POST: api/ListBienDongGiaCa
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BienDongGium>> PostBienDongGium(BienDongGium bienDongGium)
        {
            if (_context.BienDongGia == null)
            {
                return Problem("Entity set 'shop_laptopContext.BienDongGia'  is null.");
            }
            _context.BienDongGia.Add(bienDongGium);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBienDongGium", new { id = bienDongGium.MaBienDong }, bienDongGium);
        }

        // DELETE: api/ListBienDongGiaCa/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBienDongGium(int id)
        {
            if (_context.BienDongGia == null)
            {
                return NotFound();
            }
            var bienDongGium = await _context.BienDongGia.FindAsync(id);
            if (bienDongGium == null)
            {
                return NotFound();
            }

            _context.BienDongGia.Remove(bienDongGium);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BienDongGiumExists(int id)
        {
            return (_context.BienDongGia?.Any(e => e.MaBienDong == id)).GetValueOrDefault();
        }
    }
}
