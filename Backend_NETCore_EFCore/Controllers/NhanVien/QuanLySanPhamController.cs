using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using ShopLaptop_EFCore.Models.NhanVienModel;
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
        public async Task<ActionResult<SanPham>> ThemSanPham(SanPhamModelPlus sanPhamModelPlus)
        {
            // Kiểm tra tất cả các trường dữ liệu của SanPham, kể cả Icollection ảo
            if (_context.SanPhams == null)
            {
                return Problem("Entity set 'shop_laptopContext.SanPhams'  is null.");
            }
            //Tạo đối tượng con cho sản phẩm
            SanPham sanPham = new SanPham(sanPhamModelPlus.TenSanPham, sanPhamModelPlus.MaLoaiSp,
                sanPhamModelPlus.MaHangSx, sanPhamModelPlus.TrangThaiSp, sanPhamModelPlus.Gia);
             
            // Lưu sản phẩm
            _context.SanPhams.Add(sanPham);
            await _context.SaveChangesAsync();

            // Lấy mã sản phẩm của sản phẩm vừa tạo ra
            int ma_san_pham = sanPham.MaSanPham;

            // Tạo đối tượng con cho biến động giá
            BienDongGium bienDongGia = new BienDongGium(ma_san_pham,sanPhamModelPlus.Gia, 1, DateTime.Now);
   
            // Taọ đối ượng con cho chiTietSanPham
            ChiTietSanPham chiTietSanPham = new ChiTietSanPham(ma_san_pham,sanPhamModelPlus.Cpu, sanPhamModelPlus.CardDoHoa, sanPhamModelPlus.DoPhanGiai, sanPhamModelPlus.OCung,
                sanPhamModelPlus.HeDieuHanh, sanPhamModelPlus.ManHinh, sanPhamModelPlus.KichThuoc, sanPhamModelPlus.TrongLuong,
                sanPhamModelPlus.MoTaThem, sanPhamModelPlus.Ram);

         
            // Lưu Chi tiêt sản phẩm với id sản phẩm trên
            _context.ChiTietSanPhams.Add(chiTietSanPham);
            // Lưu biến động giá với id sản phẩm trên
            _context.BienDongGia.Add(bienDongGia);
            // Lưu ChiTietSanPham và BienDongGia vào database
            await _context.SaveChangesAsync();

            return Ok("Đã tạo sản phẩm và chi tiết sản phẩm thành công");
        }

        // Check trùng lăp tên sản phẩm trong table sản phẩm
        private bool SanPhamExists(string tenSanPham)
        {
            return (_context.SanPhams?.Any(e => e.TenSanPham == tenSanPham)).GetValueOrDefault();
        }
 

        // Hàm cập nhật sản phẩm và chi tiết sản phẩm (theo id sản phẩm)
        // PUT api/<QuanLySanPhamController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditSanPham(int id, SanPhamModelPlus sanPhamModel)
        {
            Console.WriteLine(id);
            // Kiểm tra xem id sản phẩm có tồn tại hay ko 
            var sanPhamExist = await _context.SanPhams.Include(s => s.MaHangSxNavigation)
                 .Include(s => s.MaLoaiSpNavigation)
                 .FirstOrDefaultAsync(m => m.MaSanPham == id);
            if (sanPhamExist != null)
            {
                // Cập nhật lại sản phẩm đã tồn tại
                sanPhamExist.TenSanPham = sanPhamModel.TenSanPham;
                sanPhamExist.MaLoaiSp = sanPhamModel.MaLoaiSp;
                sanPhamExist.MaHangSx = sanPhamModel.MaHangSx;
                sanPhamExist.TrangThaiSp = sanPhamModel.TrangThaiSp;
                sanPhamExist.Gia = sanPhamModel.Gia;


                // Tạo đối tượng con cho chi tiết sản phẩm
               // ChiTietSanPham chiTietSanPham = new ChiTietSanPham(id, sanPhamModel.Cpu, sanPhamModel.CardDoHoa, sanPhamModel.DoPhanGiai, sanPhamModel.OCung,
               //sanPhamModel.HeDieuHanh, sanPhamModel.ManHinh, sanPhamModel.KichThuoc, sanPhamModel.TrongLuong,
               //sanPhamModel.MoTaThem, sanPhamModel.Ram);

                // Cập nhật sản phẩm
                _context.Entry(sanPhamExist).State = EntityState.Modified;
                //// Cập nhật chi tiết sản phẩm
                //_context.Entry(chiTietSanPham).State = EntityState.Modified;

                // Thử update vào database và bắt lỗi tiêp
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch(DbUpdateConcurrencyException)
                {
                    return BadRequest("Có lỗi!");
                }
                

                return Ok("Tìm thấy sản phẩm có id = " + id);

            }
            return Ok("Không tìm thấy sản phẩm");
        }

        //// DELETE api/<QuanLySanPhamController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
    }
}

