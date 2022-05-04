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
    public class AnhSanPhamsController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public AnhSanPhamsController(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: api/AnhSanPhams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnhSanPham>>> GetAnhSanPhams()
        {
            return await _context.AnhSanPhams.ToListAsync();
        }

        // GET: api/AnhSanPhams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnhSanPham>> GetAnhSanPham(string id)
        {
            var anhSanPham = await _context.AnhSanPhams.FindAsync(id);

            if (anhSanPham == null)
            {
                return NotFound();
            }

            return anhSanPham;
        }

        // PUT: api/AnhSanPhams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnhSanPham(string id, AnhSanPham anhSanPham)
        {
            if (id != anhSanPham.MaAnh)
            {
                return BadRequest();
            }

            _context.Entry(anhSanPham).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnhSanPhamExists(id))
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

        // POST: api/AnhSanPhams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AnhSanPham>> PostAnhSanPham(AnhSanPham anhSanPham)
        {
            _context.AnhSanPhams.Add(anhSanPham);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AnhSanPhamExists(anhSanPham.MaAnh))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAnhSanPham", new { id = anhSanPham.MaAnh }, anhSanPham);
        }

        // DELETE: api/AnhSanPhams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnhSanPham(string id)
        {
            var anhSanPham = await _context.AnhSanPhams.FindAsync(id);
            if (anhSanPham == null)
            {
                return NotFound();
            }

            _context.AnhSanPhams.Remove(anhSanPham);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnhSanPhamExists(string id)
        {
            return _context.AnhSanPhams.Any(e => e.MaAnh == id);
        }
    }
}
