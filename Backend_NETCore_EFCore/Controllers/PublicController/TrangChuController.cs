using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
                       maLoaiSanPham = o.MaLoaiSp,
                       tenLoaiSanPham = o.TenLoaiSp,
                       anhLoaiSanPham = imageURL + o.AnhMinhHoa,
                   }
                );

            return Ok(listLoaiSanPham);
        }


        // Lấy danh sách hãng sản xuất
        // Làm các list hãng sản xuất ngang hiện lên ấy
        [HttpGet("ListHangSanXuat")]
        public ActionResult<List<dynamic>> ListHangSanXuat()
        {
            var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/HangSanXuat/";
            var listHangSanXuat = _context.HangSanXuats.Select(
                   o => new
                   {
                       maHangSanxuat = o.MaHangSx,
                       tenHangSanXuat = o.TenHangSx,
                       logo = imageURL + o.Logo.Trim()
                   }
                );

            return Ok(listHangSanXuat);
        }




        // Lọc danh sách sản phẩm theo yêu cầu
        [HttpGet("SanPhamByCategory")]
        /* 1 Thẻ sản phẩm gồm có
         * 1 ảnh, tên sản phẩm, giá niêm yết
         */
        public ActionResult<List<dynamic>> SanPhamByCategory(int id)
        {
            var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/SanPham/";
            var listSanPham = from a in _context.SanPhams
                              join b in _context.ChiTietSanPhams
                              on a.MaSanPham equals b.MaSanPham
                              where a.MaLoaiSp == id
                              select new
                              {
                                  tenSanPham = a.TenSanPham,
                                  giaNiemYet = (from d in _context.BienDongGia
                                                where d.MaSanPham == a.MaSanPham
                                                orderby d.LanThayDoiGia descending
                                                select d.GiaNhap * (1 + d.ChietKhau)).Last(),
                                  anhSanPham = (from e in _context.AnhSanPhams
                                                where e.MaSanPham == a.MaSanPham
                                                select imageURL + e.FileAnh.Trim()
                                                ).First()
                              };
            return Ok(listSanPham);

        }     
    }
}
