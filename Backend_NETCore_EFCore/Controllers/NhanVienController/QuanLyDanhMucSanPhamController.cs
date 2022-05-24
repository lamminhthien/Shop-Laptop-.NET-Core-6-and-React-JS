using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;

namespace ShopLaptop_EFCore.Controllers.NhanVienController
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
        [HttpGet("ListDanhMucSanPham")]
        public async Task<ActionResult<IEnumerable<LoaiSanPham>>> GetLoaiSanPhams(int page,bool? allRecord)
        {
            // Test Các câu lệnh linq lồng nhau bằng AsQueryable
            var testNestedLinq = _context.LoaiSanPhams.AsQueryable();
            testNestedLinq.OrderByDescending(o => o.SanPhams);
            testNestedLinq.Take(5);

            // Khi lấy toàn bộ loại sản phẩm cho trang thêm, sữa sản phẩm
            if (allRecord == true)
            {
                return Ok(await _context.LoaiSanPhams.ToListAsync());
            }

            double rowPerPage = 5;

            if (page == null || page == 0)
            {
                page = 1;
            }
            // Tính số trang cần phân chia dựa theo số lượng record của loại sản phẩm
            double categoryQuantity = _context.LoaiSanPhams.Count();
            double numberOfPage = categoryQuantity / rowPerPage;
            int numberOfPageInteger = (int)Math.Ceiling(numberOfPage);

            if (_context.LoaiSanPhams == null)
            {
                return NotFound();
            }
            return Ok(new
            {
                tongSoDanhMuc = categoryQuantity,
                soTrang = numberOfPageInteger,
                ketQua = await _context.LoaiSanPhams.Skip(5 * (page - 1)).Take(5).ToListAsync()
            });
        }


        //Sửa tên loại sản phẩm
        [HttpPut("SuaTenLoaiSanPham/{id}")]
        public async Task<IActionResult> SuaTenLoaiSanPham(int id)
        {
            // Lấy tên loại sản phẩm mới
            var tenLoaiSPMoi = Request.Form["tenLoaiSP"][0];
            Console.WriteLine(id);
            // Kiểm tra xem id sản phẩm có tồn tại hay ko 
            var loaiSanPhamExist = await _context.LoaiSanPhams
                .Where(o => o.MaLoaiSp == id).FirstOrDefaultAsync();
            // Nếu tồn tại loại sản phẩm này
            if (loaiSanPhamExist != null)
            {
                // Chỉ cập nhật tên sản phẩm
                loaiSanPhamExist.TenLoaiSp = tenLoaiSPMoi;
                _context.Entry(loaiSanPhamExist).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok("Đã thay đổi tên sản phẩm:" + loaiSanPhamExist.TenLoaiSp);
                }
                catch (DbUpdateException dbExcept)
                {
                    if (dbExcept.InnerException.Message.Contains("Violation of UNIQUE KEY constraint"))
                        return BadRequest("Tên loại sản phẩm bị trùng");
                }
            }
            return BadRequest("Không tìm thấy loại sản phẩm này");
        }



        //Sửa ảnh cho loại sản phẩm
        [HttpPut("SuaAnhLoaiSanPham/{id}"),DisableRequestSizeLimit]
        public async Task<IActionResult> SuaAnhLoaiSanPham(int id)
        {

            // Bắt đầu lấy ảnh
            var fileAnh = Request.Form.Files[0];
            // Check số lưọng ảnh
            if (fileAnh.Length < 0) return BadRequest("Chưa upload bất cứ ảnh nào");

            // Validate file ảnh
            if (!fileAnh.ContentType.Contains("image")) return BadRequest("Đây không phải file ảnh");

            Console.WriteLine(id);
            // Kiểm tra xem id loại sản phẩm có tồn tại hay ko 
            var loaiSanPhamExist = await _context.LoaiSanPhams
                .Where(o => o.MaLoaiSp == id).FirstOrDefaultAsync();
            // Nếu tồn tại loại sản phẩm này
            if (loaiSanPhamExist != null)
            {
                // Chỉ cập nhật ảnh loại sản phẩm này
                // Lấy tên file ảnh cũ và đường dẫn file trong server
                var tenFileAnhCu = loaiSanPhamExist.AnhMinhHoa;
                var ResourcesDir = Path.Combine(Directory.GetCurrentDirectory(),"Resources","Images","LoaiSanPham");
                var fullPathAnhCu = Path.Combine(ResourcesDir, tenFileAnhCu);
                FileInfo file = new FileInfo(fullPathAnhCu);
                // Tiến hành xóa ảnh và đổi ảnh
                if (file.Exists) 
                {
                    file.Delete();
                    var tenFileAnhMoi = Path.Combine(ResourcesDir, loaiSanPhamExist.AnhMinhHoa);
                    using (var stream = new FileStream(tenFileAnhMoi, FileMode.Create))
                    {
                        fileAnh.CopyTo(stream);
                    }
                    return Ok("Đã đổi ảnh thành công");
                }
                else
                {
                    return BadRequest("Xóa ảnh thất bại");
                }
            }
            return BadRequest("Không tìm thấy loại sản phẩm này");
        }




        // Thêm loại sản phẩm (kèm luôn thêm ảnh)
        [HttpPost("ThemLoaiSanPham"),DisableRequestSizeLimit]
        public async Task<ActionResult<LoaiSanPham>> ThemLoaiSanPham()
        {
            // Lấy tên sản phẩm bằng form data
            var tenLoaiSp = Request.Form["tenLoaiSp"][0];
            if (tenLoaiSp == null) return BadRequest("Bạn chưa nhập tên ảnh");
            if (LoaiSanPhamDuplicateName(tenLoaiSp))
            {
                return BadRequest("Tên loại sản phẩm bị trùng");
            }

            // Lấy ảnh từ form ra
            var file = Request.Form.Files[0];

            // Check xem request có rỗng file hay ko ?
            if (file.Length < 0) return BadRequest("Chưa upload bất cứ ảnh nào");

            // Validate file ảnh
            if (!file.ContentType.Contains("image")) return BadRequest("Đây không phải file ảnh");

            // Tạo đường dẫn  đến thư mục lưu ảnh sản phẩm
            var folderName = Path.Combine("Resources", "Images", "LoaiSanPham");

            // Tạo đường dẫn của hệ thống để lưu file
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            // Làm tên file ảnh
            var tenFileAnh = tenLoaiSp + "." + file.ContentType.Split('/')[1];

            // Thay thế khoảng trắng bằng dấu "-"
            tenFileAnh = tenFileAnh.Replace(" ", "-");

            // Tạo đường dẫn đầy đủ kèm với tên file ảnh và định dạng file ảnh để copy file vào server
            var fullPath = Path.Combine(pathToSave, tenFileAnh);

            // Tạo đối tượng loại sản phẩm
            var loaiSanPham = new LoaiSanPham(tenLoaiSp, tenFileAnh);

            // Copy ảnh từ formdata front end vào fullPath với chế độ Create của filemode
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            _context.LoaiSanPhams.Add(loaiSanPham);
            await _context.SaveChangesAsync();
            return Ok("Đã tạo loại sản phẩm:"+tenLoaiSp);
        }




        // Check loại sản phẩm trùng id ?
        private bool LoailoaiSanPhamExists(int id)
        {
            return (_context.LoaiSanPhams?.Any(e => e.MaLoaiSp == id)).GetValueOrDefault();
        }


        // Check loại sản phẩm trùng tên !
        private bool LoaiSanPhamDuplicateName(string tenLoaiSP)
        {
            return (_context.LoaiSanPhams?.Any(e => e.TenLoaiSp == tenLoaiSP)).GetValueOrDefault();
        }
    }
}
