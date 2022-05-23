using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using System.Net.Http.Headers;

namespace ShopLaptop_EFCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadAnhController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public UploadAnhController(shop_laptopContext context)
        {
            _context = context;
        }

        [HttpPost("ThemAnhSanPham"), DisableRequestSizeLimit]
        public IActionResult ThemAnhSanPham()
        {
            // Giả định mã sản phẩm là 1
            var id_request = Request.Form["id"][0];
            // Khởi tạo biến id
            int id = 0;
            // Kiểm tra kiểu dữ liệu của id
            try
            {
                id = Int32.Parse(id_request);
            }
            catch (Exception)
            {
                return BadRequest("ID sản phẩm không phải kiểu số");
            }

            // Kiểm tra xem sản phẩm này có tồn tại hay ko?
                var maSanPham = (from a in _context.SanPhams
                                 where a.MaSanPham == id
                                 select a.MaSanPham).FirstOrDefault();
            if (maSanPham == 0) return NotFound("Không tìm thấy sản phẩm để upload ảnh");

            try
            {
                // Tạo file name
                var fileName = "SP";
                // Lấy ảnh từ form ra
                var file = Request.Form.Files[0];
                // Tạo đường dẫn  đến thư mục lưu ảnh sản phẩm
                var folderName = Path.Combine("Resources", "Images", "SanPham");
                // Tạo đường dẫn của hệ thống để lưu file
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                // Check xem request có rỗng file hay ko ?
                if (file.Length < 0) return BadRequest("Chưa upload bất cứ ảnh nào");

                // Validate file ảnh
                if (!file.ContentType.Contains("image")) return BadRequest("This file is not image");
                // Check xem sản phẩm id=1 này đã có ảnh hay chưa
                var anhSanPham = (from a in _context.SanPhams
                                  join b in _context.AnhSanPhams
                                  on a.MaSanPham equals b.MaSanPham
                                  where a.MaSanPham == id
                                  orderby b.FileAnh descending
                                  select b).FirstOrDefault();
                // Nếu chưa có ảnh sản phẩm này
                if (anhSanPham == null)
                {
                    // Tên sản phẩm bằng mã sản phẩm + "1"
                    fileName = fileName + maSanPham.ToString();
                }
                else // Đã có sẵn từ 1 ảnh trở lên 
                {
                    // Đếm số lượng ảnh đang có
                    var countAnhSanPham = (from a in _context.SanPhams
                                           join b in _context.AnhSanPhams
                                           on a.MaSanPham equals b.MaSanPham
                                           where a.MaSanPham == id
                                           orderby b.FileAnh descending
                                           select b.FileAnh).Count();
                    // Nếu vượt quá 4 ảnh
                    if (countAnhSanPham > 4)
                    {
                        return BadRequest("Sản phẩm này đã có 4 ảnh, bạn không thể up thêm ảnh, mà chỉ có thể sữa 1 trong 4 ảnh");
                    }
                    else
                    {
                        // Tên sản phẩm bằng mã sản phẩm + (số lượng ảnh + 1)
                        fileName = fileName + (countAnhSanPham + 1).ToString();
                    }
                }
                // Tạo đường dẫn đầy đủ kèm với tên file và định dạng file ảnh để copy file vào server
                var fullPath = Path.Combine(pathToSave, fileName + "." + file.ContentType.Split('/')[1]);

                // Copy ảnh từ formdata front end vào fullPath với chế độ Create của filemode
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                // Băt đầu lưu tên ảnh vào database
                AnhSanPham anhSanPhamDB = new AnhSanPham(id, fileName + "." + file.ContentType.Split('/')[1]);
                // Đặt lệnh chờ thêm ảnh
                _context.Add(anhSanPhamDB);
                // Lưu mọi thay đổi vào database
                _context.SaveChanges();

                return Ok("Đã tạo ảnh mới với tên " + fileName);
            } // Trường hợp này là formData rỗng rồi
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Test Truy  vấn linq
        [HttpGet]
        public IActionResult TestSelect()
        {
            // Giả định mã sản phẩm là 1
            int id = 1;
            var anhSanPham = (from a in _context.SanPhams
                              join b in _context.AnhSanPhams
                              on a.MaSanPham equals b.MaSanPham
                              where a.MaSanPham == id
                              orderby b.FileAnh descending
                              select b).FirstOrDefault();
            if (anhSanPham == null) return BadRequest("Ảnh sản phẩm không thấy");
            return Ok("Tìm thấy sản phẩm");
        }
        // Test lưu tên file ảnh vào db
        [HttpPost("TestLuuAnhVaoDb")]
        public IActionResult TestLuuAnhVaoDatabase()
        {
            int id = 12;
            var idSanPham = 1;
            var maSanPham = (from a in _context.SanPhams
                             where a.MaSanPham == id
                             select a.MaSanPham).FirstOrDefault();
            AnhSanPham anhSanPham = new AnhSanPham(id, "SP" + (idSanPham + 1).ToString() + ".png");
            _context.Add(anhSanPham);
            _context.SaveChanges();
            return Ok("Test Luu Anh  vao DB complete");
        }

        [HttpPost("JsonBodyCustom")]
        public IActionResult JsonBodyCustom()
        {
            var name = Request.Query["name"];
            return Ok("Name=" + name);
        }

    }
}
