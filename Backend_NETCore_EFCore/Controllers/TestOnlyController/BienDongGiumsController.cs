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
    public class BienDongGiumsController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public BienDongGiumsController(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: api/BienDongGiums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BienDongGium>>> GetBienDongGia()
        {
          if (_context.BienDongGia == null)
          {
              return NotFound();
          }
            return await _context.BienDongGia.ToListAsync();
        }

        // GET: api/BienDongGiums/5
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

        // PUT: api/BienDongGiums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBienDongGium(int id, BienDongGium bienDongGium)
        {
            if (id != bienDongGium.MaSanPham)
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

        // POST: api/BienDongGiums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BienDongGium>> PostBienDongGium(BienDongGium bienDongGium)
        {
          if (_context.BienDongGia == null)
          {
              return Problem("Entity set 'shop_laptopContext.BienDongGia'  is null.");
          }
            _context.BienDongGia.Add(bienDongGium);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BienDongGiumExists(bienDongGium.MaSanPham))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBienDongGium", new { id = bienDongGium.MaSanPham }, bienDongGium);
        }

        // DELETE: api/BienDongGiums/5
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
            return (_context.BienDongGia?.Any(e => e.MaSanPham == id)).GetValueOrDefault();
        }
    }
}
