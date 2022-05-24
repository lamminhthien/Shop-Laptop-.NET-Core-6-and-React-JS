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
    public class QuanLyHangSanXuatController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public QuanLyHangSanXuatController(shop_laptopContext context)
        {
            _context = context;
        }

        // Lấy danh sách hãng sản xuất
        [HttpGet("ListHangSanXuat")]
        public async Task<ActionResult<IEnumerable<HangSanXuat>>> GetHangSanXuats(int page, string? orderByProperty, string? searchBy, bool? allRecord)
        {
            // Nếu muốn lấy toàn bộ danh sách hãng cho trang thêm sữa sản phẩm
            if (allRecord == true)
            {
                return Ok(await _context.HangSanXuats.ToListAsync());
            }
            // Số dòng mỗi trang
            double rowPerPage = 5;

            if (page == null || page == 0)
            {
                page = 1;
            }
            // Tính số trang cần phân chia dựa theo số lượng record của hãng sản phẩm
            double brandQuantity = _context.HangSanXuats.Count();
            double numberOfPage = brandQuantity / rowPerPage;
            int numberOfPageInteger = (int)Math.Ceiling(numberOfPage);

            if (_context.HangSanXuats == null)
            {
                return NotFound();
            }
            //test1 = test1.OrderByDescending(o => o.TenHangSx);
            //test1.Skip(5*(page-1)).Take(5);

            return Ok(new
            {
                tongSoHangSanXuat = brandQuantity,
                tongSoTrang = numberOfPageInteger,
                ketQua = await _context.HangSanXuats.Skip(5 * (page - 1)).Take(5).ToListAsync(),
            });
        }

        // PUT: api/QuanLyHangSanXuat/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHangSanXuat(int id, HangSanXuat hangSanXuat)
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


        // Thêm hãng sản xuất
        [HttpPost("ThemHangSanXuat"), DisableRequestSizeLimit]
        public async Task<ActionResult<HangSanXuat>> ThemHangSanXuat()
        {
            // Lấy tên sản phẩm bằng form data
            var tenHangSX = Request.Form["tenHangSX"][0];
            if (tenHangSX == null) return BadRequest("Bạn chưa nhập tên ảnh");
            if (HangSanXuatDuplicateName(tenHangSX))
            {
                return BadRequest("Tên hãng sản xuất bị trùng");
            }

            // Lấy ảnh từ form ra
            var file = Request.Form.Files[0];

            // Check xem request có rỗng file hay ko ?
            if (file.Length < 0) return BadRequest("Chưa upload bất cứ ảnh nào");

            // Validate file ảnh
            if (!file.ContentType.Contains("image")) return BadRequest("This file is not image");

            // Tạo đường dẫn  đến thư mục lưu ảnh sản phẩm
            var folderName = Path.Combine("Resources", "Images", "HangSanXuat");

            // Tạo đường dẫn của hệ thống để lưu file
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            // Làm tên file ảnh
            var tenFileAnh = tenHangSX + "." + file.ContentType.Split('/')[1];

            // Tạo đường dẫn đầy đủ kèm với tên file ảnh và định dạng file ảnh để copy file vào server
            var fullPath = Path.Combine(pathToSave, tenFileAnh);

            // Tạo đối tượng hãng sản xuất
            var hangSanXuat = new HangSanXuat(tenHangSX, tenFileAnh);

            // Copy ảnh từ formdata front end vào fullPath với chế độ Create của filemode
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            _context.HangSanXuats.Add(hangSanXuat);
            await _context.SaveChangesAsync();
            return Ok("Đã tạo hãng sản xuất:" + tenHangSX);
        }

        //Sửa tên hãng sản xuất
        [HttpPut("SuaTenHangSanXuat/{id}")]
        public async Task<IActionResult> SuaTenHangSanXuat(int id)
        {
            // Lấy tên hãng sản xuất mới
            var tenHangSXMoi = Request.Form["tenHangSX"][0];
            Console.WriteLine(id);
            // Kiểm tra xem id sản phẩm có tồn tại hay ko 
            var hangSanXuatExist = await _context.HangSanXuats
                .Where(o => o.MaHangSx == id).FirstOrDefaultAsync();
            // Nếu tồn tại hãng sản xuất này
            if (hangSanXuatExist != null)
            {
                // Chỉ cập nhật tên sản phẩm
                hangSanXuatExist.TenHangSx = tenHangSXMoi;
                _context.Entry(hangSanXuatExist).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok("Đã thay đổi tên hãng sản xuất:" + hangSanXuatExist.TenHangSx);
                }
                catch (DbUpdateException dbExcept)
                {
                    if (dbExcept.InnerException.Message.Contains("Violation of UNIQUE KEY constraint"))
                        return BadRequest("Tên hãng sản xuất bị trùng");
                }
            }
            return BadRequest("Không tìm thấy hãng sản xuất này");
        }


        // Check trùng id
        private bool HangSanXuatExists(int id)
        {
            return (_context.HangSanXuats?.Any(e => e.MaHangSx == id)).GetValueOrDefault();
        }

        //Check trùng tên
        private bool HangSanXuatDuplicateName(string tenHangSX)
        {
            return (_context.HangSanXuats?.Any(e => e.TenHangSx == tenHangSX)).GetValueOrDefault();
        }
    }
}
