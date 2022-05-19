using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;

namespace ShopLaptop_EFCore.Controllers.NhanVien
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuanLyDanhMucSanPhamController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public QuanLyDanhMucSanPhamController(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: api/QuanLyDanhMucSanPham
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoaiSanPham>>> GetLoaiSanPhams()
        {
          if (_context.LoaiSanPhams == null)
          {
              return NotFound();
          }
            return await _context.LoaiSanPhams.ToListAsync();
        }

        // GET: api/QuanLyDanhMucSanPham/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoaiSanPham>> GetLoaiSanPham(int id)
        {
          if (_context.LoaiSanPhams == null)
          {
              return NotFound();
          }
            var loaiSanPham = await _context.LoaiSanPhams.FindAsync(id);

            if (loaiSanPham == null)
            {
                return NotFound();
            }

            return loaiSanPham;
        }

        // PUT: api/QuanLyDanhMucSanPham/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoaiSanPham(int id, LoaiSanPham loaiSanPham)
        {
            if (id != loaiSanPham.MaLoaiSp)
            {
                return BadRequest();
            }

            _context.Entry(loaiSanPham).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoaiSanPhamExists(id))
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

        // POST: api/QuanLyDanhMucSanPham
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LoaiSanPham>> PostLoaiSanPham(LoaiSanPham loaiSanPham)
        {
          if (_context.LoaiSanPhams == null)
          {
              return Problem("Entity set 'shop_laptopContext.LoaiSanPhams'  is null.");
          }
            _context.LoaiSanPhams.Add(loaiSanPham);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLoaiSanPham", new { id = loaiSanPham.MaLoaiSp }, loaiSanPham);
        }

        // DELETE: api/QuanLyDanhMucSanPham/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoaiSanPham(int id)
        {
            if (_context.LoaiSanPhams == null)
            {
                return NotFound();
            }
            var loaiSanPham = await _context.LoaiSanPhams.FindAsync(id);
            if (loaiSanPham == null)
            {
                return NotFound();
            }

            _context.LoaiSanPhams.Remove(loaiSanPham);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoaiSanPhamExists(int id)
        {
            return (_context.LoaiSanPhams?.Any(e => e.MaLoaiSp == id)).GetValueOrDefault();
        }
    }
}
