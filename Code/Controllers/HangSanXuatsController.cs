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
    public class HangSanXuatsController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public HangSanXuatsController(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: api/HangSanXuats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HangSanXuat>>> GetHangSanXuats()
        {
            return await _context.HangSanXuats.ToListAsync();
        }

        // GET: api/HangSanXuats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HangSanXuat>> GetHangSanXuat(string id)
        {
            var hangSanXuat = await _context.HangSanXuats.FindAsync(id);

            if (hangSanXuat == null)
            {
                return NotFound();
            }

            return hangSanXuat;
        }

        // PUT: api/HangSanXuats/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHangSanXuat(string id, HangSanXuat hangSanXuat)
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

        // POST: api/HangSanXuats
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HangSanXuat>> PostHangSanXuat(HangSanXuat hangSanXuat)
        {
            _context.HangSanXuats.Add(hangSanXuat);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (HangSanXuatExists(hangSanXuat.MaHangSx))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetHangSanXuat", new { id = hangSanXuat.MaHangSx }, hangSanXuat);
        }

        // DELETE: api/HangSanXuats/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHangSanXuat(string id)
        {
            var hangSanXuat = await _context.HangSanXuats.FindAsync(id);
            if (hangSanXuat == null)
            {
                return NotFound();
            }

            _context.HangSanXuats.Remove(hangSanXuat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HangSanXuatExists(string id)
        {
            return _context.HangSanXuats.Any(e => e.MaHangSx == id);
        }
    }
}
