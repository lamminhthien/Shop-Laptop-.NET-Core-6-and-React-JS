#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;

namespace ShopLaptop_EFCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BienDongGiasController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public BienDongGiasController(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: api/BienDongGias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoaiSanPham>>> GetLoaiSanPhams()
        {
            return await _context.LoaiSanPhams.ToListAsync();
        }

        // GET: api/BienDongGias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoaiSanPham>> GetLoaiSanPham(string id)
        {
            var loaiSanPham = await _context.LoaiSanPhams.FindAsync(id);

            if (loaiSanPham == null)
            {
                return NotFound();
            }

            return loaiSanPham;
        }

        // PUT: api/BienDongGias/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoaiSanPham(string id, LoaiSanPham loaiSanPham)
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

        // POST: api/BienDongGias
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LoaiSanPham>> PostLoaiSanPham(LoaiSanPham loaiSanPham)
        {
            _context.LoaiSanPhams.Add(loaiSanPham);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LoaiSanPhamExists(loaiSanPham.MaLoaiSp))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLoaiSanPham", new { id = loaiSanPham.MaLoaiSp }, loaiSanPham);
        }

        // DELETE: api/BienDongGias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoaiSanPham(string id)
        {
            var loaiSanPham = await _context.LoaiSanPhams.FindAsync(id);
            if (loaiSanPham == null)
            {
                return NotFound();
            }

            _context.LoaiSanPhams.Remove(loaiSanPham);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoaiSanPhamExists(string id)
        {
            return _context.LoaiSanPhams.Any(e => e.MaLoaiSp == id);
        }
    }
}
