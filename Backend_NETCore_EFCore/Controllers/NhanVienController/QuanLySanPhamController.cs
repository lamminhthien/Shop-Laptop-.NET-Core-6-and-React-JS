using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using ShopLaptop_EFCore.Models.NhanVienModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShopLaptop_EFCore.Controllers.NhanVienController
{
    // Tên route /api/{tên controller}
    [Route("api/[controller]")]
    // Chỉ định đây là API sử dụng các phương thức của HTTP
    [ApiController]
    // ControllerBase (Mô hình MVC không cần đến View )
    public class QuanLySanPhamController : ControllerBase
    {
        // Database context, giúp tương tác truy vấn đến database
        private readonly shop_laptopContext _context;
        public QuanLySanPhamController(shop_laptopContext context)
        {
            _context = context;
        }
        // GET: api/<QuanLySanPhamController>
        // Authorize: Xác thực danh tính, sai danh tính hoặc hết hạn tài khoản React sẽ đẩy component Login cho Client
        [HttpGet("ListSanPham/{page}")]
        //[Authorize(Roles = "Nhân viên")]
        public async Task<ActionResult<List<dynamic>>> DanhSachSanPham(int page)
        {
            // Bây giờ cần phân trang, how ?
            // Giả sử mỗi trang co 5 record
            double rowPerPage = 5; // Cho Take(5) nhé.
            // Giả sử trang 2 là skip = rowPerPage * page tức là 
            // skip = 5*2
            // Cần tinh tổng số trang có thể phân (để tránh người dùng nhập số trang bự quá)
            
            // Kiểm tra số page, nếu null hoặc  = 0, gán là 1
            if (page == null || page == 0)
            {
                page = 1;
            }
            // Tính số trang cần phân chia dựa theo số lượng record của sản phẩm
            double productQuantity = _context.SanPhams.Count();
            double numberOfPage = productQuantity / rowPerPage;
            int numberOfPageInteger = (int)Math.Ceiling(numberOfPage);
        
            // Nêu không có sản phẩm nào
            if (_context.SanPhams == null)
            {
                return NotFound();
            } // Trả về danh sách sản phẩm
              //return await _context.SanPhams.ToListAsync();
              // Ghi chú đây là trả về kiểu dữ liệu vô danh
              // Vì vậy cần có ToListAsync() thay vì ToList()
            var ketqua = (from a in _context.SanPhams
                         join b in _context.LoaiSanPhams on
                         a.MaLoaiSp equals b.MaLoaiSp
                         join c in _context.HangSanXuats on
                         a.MaHangSx equals c.MaHangSx
                         join d in _context.BienDongGia on
                         a.MaSanPham equals d.MaSanPham
                         select new
                         {
                             maSanPham = a.MaSanPham,
                             tenSanPham = a.TenSanPham,
                             loaiSanPham = b.TenLoaiSp,
                             hangSanXuat = c.TenHangSx,
                             tinhTrang = a.TrangThaiSp,
                             giaNiemYet = Math.Ceiling(d.GiaNhap * (1 + d.ChietKhau))
                         }).Skip(5*(page-1)).Take(5);
            return  Ok(new {
                tongSoSanPham=productQuantity,
                soTrang=numberOfPageInteger,
                ketqua});
        }
        // GET api/<QuanLySanPhamController>/5
        [HttpGet("DetailSanPham/{id}")]
        public async Task<ActionResult<SanPham>> SanPhamByID(int id)
        {
            if (_context.SanPhams == null)
            {
                return NotFound();
            }
            // Lấy danh sách sản phẩm, nhưng bao gồm Loại sản phẩm và hãng sản xuất thông qua  Virtual Icollection
            var sanPham = await _context.SanPhams.Include(s => s.MaHangSxNavigation)
                .Include(s => s.MaLoaiSpNavigation)
                .FirstOrDefaultAsync(m => m.MaSanPham == id);

            if (sanPham == null)
            {
                return NotFound();
            }
            // Trả về sản phẩm
            return sanPham;
        }

        // POST api/<QuanLySanPhamController>
        [HttpPost("ThemSanPham")]
        public async Task<ActionResult<SanPham>> ThemSanPham(SanPhamModelPlus sanPhamModelPlus)
        {
            // Kiểm tra tất cả các trường dữ liệu của SanPham, kể cả Icollection ảo
            if (_context.SanPhams == null)
            {
                return Problem("Entity set 'shop_laptopContext.SanPhams'  is null.");
            }
            //Tạo đối tượng con cho sản phẩm
            SanPham sanPham = new SanPham(sanPhamModelPlus.TenSanPham, sanPhamModelPlus.MaLoaiSp,
                sanPhamModelPlus.MaHangSx, sanPhamModelPlus.TrangThaiSp);

            // Lưu sản phẩm
            _context.SanPhams.Add(sanPham);
            // Thử lưu vào database và bắt lỗi nào (Ví dụ lỗi trùng tên sản phẩm bởi ràng buộc UNIQUE bên SQL)
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException dbExcept)
            {
                // Băt theo message lỗi
                // Check thử Message 
                if (dbExcept.InnerException.Message.Contains("Violation of UNIQUE KEY constraint"))
                    return BadRequest("Tên sản phẩm bị trùng");
                // Cho dừng chương trình chỗ này !!!
            }


            // Lấy mã sản phẩm của sản phẩm vừa tạo 
            int ma_san_pham = sanPham.MaSanPham;

            // Tạo đối tượng con cho biến động giá
            BienDongGium bienDongGia = new BienDongGium(ma_san_pham, sanPhamModelPlus.Gia, 1, DateTime.Now,sanPhamModelPlus.ChietKhau);

            // Taọ đối ượng con cho chiTietSanPham
            ChiTietSanPham chiTietSanPham = new ChiTietSanPham(ma_san_pham, sanPhamModelPlus.Cpu, sanPhamModelPlus.CardDoHoa, sanPhamModelPlus.DoPhanGiai, sanPhamModelPlus.OCung,
                sanPhamModelPlus.HeDieuHanh, sanPhamModelPlus.ManHinh, sanPhamModelPlus.KichThuoc, sanPhamModelPlus.TrongLuong,
                sanPhamModelPlus.MoTaThem, sanPhamModelPlus.Ram);


            // Lưu Chi tiêt sản phẩm với id sản phẩm trên
            _context.ChiTietSanPhams.Add(chiTietSanPham);
            // Lưu biến động giá với id sản phẩm trên
            _context.BienDongGia.Add(bienDongGia);
            // Lưu ChiTietSanPham và BienDongGia vào database
            await _context.SaveChangesAsync();
            return Ok("Đã tạo sản phẩm và chi tiết sản phẩm thành công: mã sản phẩm mới là" + ma_san_pham);
        }

        // Check trùng lắp tên sản phẩm trong table sản phẩm
        private bool SanPhamExists(string tenSanPham)
        {
            return (_context.SanPhams?.Any(e => e.TenSanPham == tenSanPham)).GetValueOrDefault();
        }


        // Hàm cập nhật sản phẩm và chi tiết sản phẩm (theo id sản phẩm)
        // PUT api/<QuanLySanPhamController>/5
        [HttpPut("CapNhatSanPham/{id}")]
        public async Task<IActionResult> EditSanPham(int id, SanPhamModelPlus sanPhamModel)
        {
            Console.WriteLine(id);
            // Kiểm tra xem id sản phẩm có tồn tại hay ko 
            var sanPhamExist = await _context.SanPhams.Include(s => s.MaHangSxNavigation)
                 .Include(s => s.MaLoaiSpNavigation)
                 .FirstOrDefaultAsync(m => m.MaSanPham == id);
            if (sanPhamExist != null)
            {
                // Cập nhật lại thông tin cho sản phẩm đã tồn tại
                sanPhamExist.TenSanPham = sanPhamModel.TenSanPham;
                sanPhamExist.MaLoaiSp = sanPhamModel.MaLoaiSp;
                sanPhamExist.MaHangSx = sanPhamModel.MaHangSx;
                sanPhamExist.TrangThaiSp = sanPhamModel.TrangThaiSp;
                
                // Cập nhật lại giá sản phẩm bằng cách tạo thêm record cho biến động giá
                // Tìm số lần thay đổi giá của sản phẩm đang xét
                // Săp xếp kết quả giảm dần theo lần thay đổi giá
                var soLanThayDoiGia = _context.BienDongGia.Where(o => o.MaSanPham == id)
                    .OrderByDescending(o => o.LanThayDoiGia)
                    .Select(o => o.LanThayDoiGia).First();
                Console.WriteLine("Số lần thay đổi giá hiện tại " + soLanThayDoiGia);
                // Tăng số lần thay đổi giá lên 1 đơn vị
                BienDongGium bienDongGium = new BienDongGium(id, sanPhamModel.Gia, soLanThayDoiGia + 1, DateTime.Now,sanPhamModel.ChietKhau);

                // Tạo đối tượng con cho chi tiết sản phẩm
                ChiTietSanPham chiTietSanPham = new ChiTietSanPham(id, sanPhamModel.Cpu, sanPhamModel.CardDoHoa, sanPhamModel.DoPhanGiai, sanPhamModel.OCung,
               sanPhamModel.HeDieuHanh, sanPhamModel.ManHinh, sanPhamModel.KichThuoc, sanPhamModel.TrongLuong,
               sanPhamModel.MoTaThem, sanPhamModel.Ram);

                // Cập nhật sản phẩm
                _context.Entry(sanPhamExist).State = EntityState.Modified;
                // Cập nhật chi tiết sản phẩm
                _context.Entry(chiTietSanPham).State = EntityState.Modified;
                 // Thêm record mới cho biến động giá
                 _context.Entry(bienDongGium).State = EntityState.Modified;

                // Thử update vào database và bắt lỗi tiêp
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException error)
                {
                    return BadRequest("Có lỗi! " + error.InnerException.Message.ToString());
                }
                return Ok("Tìm thấy sản phẩm có id = " + id);
            }
            return BadRequest("Không tìm thấy sản phẩm");
        }

        // Xóa sản phẩm, sẽ xóa cả chi tiết sản  phẩm, duyệt vòng lặp tất cả các biến động giá có cùng mã sản phẩm và xóa chúng đi
        // DELETE api/<QuanLy   anPhamController>/5
        [HttpDelete("XoaSanPham/{id}")]
        public async Task<IActionResult> XoaSanPham(int id)
        {
            Console.WriteLine(id);
            // Kiểm tra xem id sản phẩm có tồn tại hay ko dựa theo id
            var sanPham = await _context.SanPhams.FindAsync(id);
            // Tìm thấy, tiến hành xóa... thôi:
            if (sanPham != null)
            {
                // Xóa ảnh (dùng cascade rồi)

                // Xóa  record  trong table sản phẩm
                _context.SanPhams.Remove(sanPham);

                // Tìm 1 chi tiết sản phẩm cần xóa theo id 
                var chiTietSanPham = await _context.ChiTietSanPhams.FindAsync(id);
                    //Nếu tìm thấy, đặt lệnh sẵn sàng xóa (chưa xóa trong database liền)
                if (chiTietSanPham != null)
                {
                    _context.ChiTietSanPhams.Remove(chiTietSanPham);
                }
                // Tìm nhiều biến động giá của cùnng 1 sản phẩm
                var bienDongGia = await _context.BienDongGia.Where(o => o.MaSanPham == id).ToListAsync();
                // Nếu tìm thấy, đặt lệnh sẵn sàng xóa (chưa xóa trong database liền)
                if (bienDongGia  != null)
                {
                    // Duyệt từng record có cùng id sản phẩm'
                    foreach (var item in bienDongGia)
                    {
                        // ĐẶt lệnh chờ xóa cho từng cái
                         _context.BienDongGia.Remove(item);
                    }
                }   
                // Má quên lệnh lưu save change vô db
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok("Xóa sản phẩm thành công");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException.Message);
                }
            }
            return BadRequest("Không tìm thấy sản phẩm này");

        }
    }
}

