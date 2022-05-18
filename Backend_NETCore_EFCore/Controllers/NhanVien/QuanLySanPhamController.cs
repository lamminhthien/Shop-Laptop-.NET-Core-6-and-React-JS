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
        public async Task<ActionResult<IEnumerable<SanPham>>> DanhSachSanPham()
        {
            if (_context.SanPhams == null)
            {
                return NotFound();
            }
            return await _context.SanPhams.ToListAsync();
        }

        // GET api/<QuanLySanPhamController>/5
        [HttpGet("DetailSanPham/{id}")]
        public async Task<ActionResult<SanPham>> SanPhamByID(int id)
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
        public async Task<ActionResult<SanPham>> ThemSanPham(SanPham sanPham)
        {
            // Kiểm tra tất cả các trường dữ liệu của SanPham, kể cả Icollection ảo
            if (_context.SanPhams == null)
            {
                return Problem("Entity set 'shop_laptopContext.SanPhams'  is null.");
            }
            // Tạo đối tượng con cho biến động giá
            BienDongGium bienDongGia = new BienDongGium(sanPham.MaSanPham, sanPham.Gia, 1, DateTime.Now);
   
            // Taọ đối ượng con cho chiTietSanPham
            ChiTietSanPham chiTietSanPham = new ChiTietSanPham(sanPham.MaSanPham,
                sanPham.ChiTietSanPham.Cpu, sanPham.ChiTietSanPham.CardDoHoa, sanPham.ChiTietSanPham.DoPhanGiai, sanPham.ChiTietSanPham.OCung,
                sanPham.ChiTietSanPham.HeDieuHanh, sanPham.ChiTietSanPham.ManHinh, sanPham.ChiTietSanPham.KichThuoc, sanPham.ChiTietSanPham.TrongLuong,
                sanPham.ChiTietSanPham.MoTaThem, sanPham.ChiTietSanPham.Ram);

            // Lưu sản phẩm
            _context.SanPhams.Add(sanPham);
            // Lưu Chi tiêt sản phẩm
            _context.ChiTietSanPhams.Add(chiTietSanPham);
            // Lưu biến động giá
            _context.BienDongGia.Add(bienDongGia);

            await _context.SaveChangesAsync();
   


            return Ok("Đã tạo sản phẩm và chi tiết sản phẩm thành công");
        }

        // Check trùng lắp id sản phẩm trong chi tiết sản phẩm
        private bool ChiTietSanPhamExists(int id)
        {
            return (_context.ChiTietSanPhams?.Any(e => e.MaSanPham == id)).GetValueOrDefault();
        }
        // Check trùng lăp id sản phẩm trong table sản phẩm
        private bool SanPhamExists(int id)
        {
            return (_context.SanPhams?.Any(e => e.MaSanPham == id)).GetValueOrDefault();
        }

        private bool BienDongGiumExists(int id)
        {
            return (_context.BienDongGia?.Any(e => e.MaSanPham == id)).GetValueOrDefault();
        }
        //// PUT api/<QuanLySanPhamController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<QuanLySanPhamController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
    }
 }

