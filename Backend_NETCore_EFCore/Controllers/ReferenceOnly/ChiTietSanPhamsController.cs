using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;

namespace ShopLaptop_EFCore.Controllers.ReferenceOnly
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietSanPhamsController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public ChiTietSanPhamsController(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: api/ChiTietSanPhams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChiTietSanPham>>> GetChiTietSanPhams()
        {
          if (_context.ChiTietSanPhams == null)
          {
              return NotFound();
          }
            return await _context.ChiTietSanPhams.ToListAsync();
        }

        // GET: api/ChiTietSanPhams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChiTietSanPham>> GetChiTietSanPham(int id)
        {
          if (_context.ChiTietSanPhams == null)
          {
              return NotFound();
          }
            var chiTietSanPham = await _context.ChiTietSanPhams.FindAsync(id);

            if (chiTietSanPham == null)
            {
                return NotFound();
            }

            return chiTietSanPham;
        }

        // PUT: api/ChiTietSanPhams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChiTietSanPham(int id, ChiTietSanPham chiTietSanPham)
        {
            if (id != chiTietSanPham.MaSanPham)
            {
                return BadRequest();
            }

            _context.Entry(chiTietSanPham).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChiTietSanPhamExists(id))
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

        // POST: api/ChiTietSanPhams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ChiTietSanPham>> PostChiTietSanPham(ChiTietSanPham chiTietSanPham)
        {
          if (_context.ChiTietSanPhams == null)
          {
              return Problem("Entity set 'shop_laptopContext.ChiTietSanPhams'  is null.");
          }
            _context.ChiTietSanPhams.Add(chiTietSanPham);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ChiTietSanPhamExists(chiTietSanPham.MaSanPham))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetChiTietSanPham", new { id = chiTietSanPham.MaSanPham }, chiTietSanPham);
        }

        // DELETE: api/ChiTietSanPhams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChiTietSanPham(int id)
        {
            if (_context.ChiTietSanPhams == null)
            {
                return NotFound();
            }
            var chiTietSanPham = await _context.ChiTietSanPhams.FindAsync(id);
            if (chiTietSanPham == null)
            {
                return NotFound();
            }

            _context.ChiTietSanPhams.Remove(chiTietSanPham);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChiTietSanPhamExists(int id)
        {
            return (_context.ChiTietSanPhams?.Any(e => e.MaSanPham == id)).GetValueOrDefault();
        }
    }
}
