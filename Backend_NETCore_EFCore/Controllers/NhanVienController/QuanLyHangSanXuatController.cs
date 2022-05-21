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
    public class QuanLyHangSanXuatController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public QuanLyHangSanXuatController(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: api/QuanLyHangSanXuat
        [HttpGet("HangSanXuat")]
        public async Task<ActionResult<IEnumerable<HangSanXuat>>> GetHangSanXuats(int page, string? orderByProperty, string? searchBy, bool? allRecord)
        {
            // Nếu muốn lấy toàn bộ danh sách hãng cho trang thêm sữa sản phẩm
            if (allRecord == true)
            {
                return Ok(await _context.HangSanXuats.ToListAsync());
            }
            // Số dòng mỗi trang
            double rowPerPage = 5;

            if (page == null || page == 0)
            {
                page = 1;
            }
            // Tính số trang cần phân chia dựa theo số lượng record của hãng sản phẩm
            double brandQuantity = _context.HangSanXuats.Count();
            double numberOfPage = brandQuantity / rowPerPage;
            int numberOfPageInteger = (int)Math.Ceiling(numberOfPage);

            if (_context.HangSanXuats == null)
            {
                return NotFound();
            }
            //test1 = test1.OrderByDescending(o => o.TenHangSx);
            //test1.Skip(5*(page-1)).Take(5);

            return Ok(new
            {
                tongSoHangSanXuat = brandQuantity,
                tongSoTrang = numberOfPageInteger,
                ketQua = await _context.HangSanXuats.Skip(5 * (page - 1)).Take(5).ToListAsync(),
            });
        }

        // GET: api/QuanLyHangSanXuat/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HangSanXuat>> GetHangSanXuat(int id)
        {
            if (_context.HangSanXuats == null)
            {
                return NotFound();
            }
            var hangSanXuat = await _context.HangSanXuats.FindAsync(id);

            if (hangSanXuat == null)
            {
                return NotFound();
            }

            return hangSanXuat;
        }

        // PUT: api/QuanLyHangSanXuat/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHangSanXuat(int id, HangSanXuat hangSanXuat)
        {
            if (id != hangSanXuat.MaHangSx)
            {
                return BadRequest();
            }

            _context.Entry(hangSanXuat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HangSanXuatExists(id))
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

        // POST: api/QuanLyHangSanXuat
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HangSanXuat>> PostHangSanXuat(HangSanXuat hangSanXuat)
        {
            if (_context.HangSanXuats == null)
            {
                return Problem("Entity set 'shop_laptopContext.HangSanXuats'  is null.");
            }
            _context.HangSanXuats.Add(hangSanXuat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHangSanXuat", new { id = hangSanXuat.MaHangSx }, hangSanXuat);
        }

        // DELETE: api/QuanLyHangSanXuat/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHangSanXuat(int id)
        {
            if (_context.HangSanXuats == null)
            {
                return NotFound();
            }
            var hangSanXuat = await _context.HangSanXuats.FindAsync(id);
            if (hangSanXuat == null)
            {
                return NotFound();
            }

            _context.HangSanXuats.Remove(hangSanXuat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HangSanXuatExists(int id)
        {
            return (_context.HangSanXuats?.Any(e => e.MaHangSx == id)).GetValueOrDefault();
        }
    }
}
