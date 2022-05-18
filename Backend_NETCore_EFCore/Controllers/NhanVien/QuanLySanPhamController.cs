using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShopLaptop_EFCore.Controllers.NhanVien
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuanLySanPhamController : ControllerBase
    {
        private readonly shop_laptopContext _context;
        public QuanLySanPhamController(shop_laptopContext context)
        {
            _context = context;
        }
        // GET: api/<QuanLySanPhamController>
        
        [HttpGet("ListSanPham")]
        [Authorize(Roles = "Nhân viên")]
        public async Task<ActionResult<IEnumerable<SanPham>>> GetSanPhams()
        {
            if (_context.SanPhams == null)
            {
                return NotFound();
            }
            return await _context.SanPhams.ToListAsync();
        }

        // GET api/<QuanLySanPhamController>/5
        [HttpGet("DetailSanPham/{id}")]
        public async Task<ActionResult<SanPham>> GetSanPham(int id)
        {
            if (_context.SanPhams == null)
            {
                return NotFound();
            }
            var sanPham = await _context.SanPhams.Include(s => s.MaHangSxNavigation)
                .Include(s => s.MaLoaiSpNavigation)
                .FirstOrDefaultAsync(m => m.MaSanPham == id);

            if (sanPham == null)
            {
                return NotFound();
            }

            return sanPham;
        }

        // POST api/<QuanLySanPhamController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<QuanLySanPhamController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<QuanLySanPhamController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
