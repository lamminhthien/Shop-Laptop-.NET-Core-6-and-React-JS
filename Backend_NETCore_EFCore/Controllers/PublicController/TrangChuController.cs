using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Data;

namespace ShopLaptop_EFCore.Controllers.PublicController
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrangChuController : ControllerBase
    {
        private readonly shop_laptopContext _context;

        public TrangChuController(shop_laptopContext context)
        {
            _context = context;
        }

        // Lấy danh sách loại sản phẩm
        // Làm các list danh mục hiện lên ấy
        [HttpGet("ListLoaiSanPham")]
        public ActionResult<List<dynamic>>  ListLoaiSanPham()
        {
            var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/LoaiSanPham/" ;
            var listLoaiSanPham = _context.LoaiSanPhams.Select(
                   o => new
                   {
                       tenLoaiSanPham = o.TenLoaiSp,
                       anhLoaiSanPham = imageURL + o.AnhMinhHoa
                   }
                );

            return Ok(listLoaiSanPham);
        }

     
    }
}
