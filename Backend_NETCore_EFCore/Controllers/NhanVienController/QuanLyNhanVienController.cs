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
    public class QuanLyNhanVienController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public QuanLyNhanVienController(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: api/QuanLyNhanVien
        [HttpGet("ListNhanVien")]
        public async Task<ActionResult<IEnumerable<NhanVien>>> GetNhanViens()
        {
          if (_context.NhanViens == null)
          {
              return NotFound();
          }
          var ketQua = await _context.NhanViens.Select(x => new
          {
              maNhanVien = x.MaNhanVien,
              tenNhanVien = x.TenNhanVien,
              userName = x.Username,
              soDienThoai = x.SoDienThoai

          }).ToListAsync();

           return Ok(ketQua);
        }

        // GET: api/QuanLyNhanVien/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NhanVien>> GetNhanVien(int id)
        {
          if (_context.NhanViens == null)
          {
              return NotFound();
          }
            var nhanVien = await _context.NhanViens.FindAsync(id);

            if (nhanVien == null)
            {
                return NotFound();
            }

            return nhanVien;
        }

        // PUT: api/QuanLyNhanVien/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNhanVien(int id, NhanVien nhanVien)
        {
            if (id != nhanVien.MaNhanVien)
            {
                return BadRequest();
            }

            _context.Entry(nhanVien).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhanVienExists(id))
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

        // POST: api/QuanLyNhanVien
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NhanVien>> PostNhanVien(NhanVien nhanVien)
        {
          if (_context.NhanViens == null)
          {
              return Problem("Entity set 'shop_laptopContext.NhanViens'  is null.");
          }
            _context.NhanViens.Add(nhanVien);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNhanVien", new { id = nhanVien.MaNhanVien }, nhanVien);
        }

        // DELETE: api/QuanLyNhanVien/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNhanVien(int id)
        {
            if (_context.NhanViens == null)
            {
                return NotFound();
            }
            var nhanVien = await _context.NhanViens.FindAsync(id);
            if (nhanVien == null)
            {
                return NotFound();
            }

            _context.NhanViens.Remove(nhanVien);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NhanVienExists(int id)
        {
            return (_context.NhanViens?.Any(e => e.MaNhanVien == id)).GetValueOrDefault();
        }
    }
}
