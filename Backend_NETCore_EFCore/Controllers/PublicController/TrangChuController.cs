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
        public ActionResult<List<dynamic>> ListLoaiSanPham()
        {
            var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/LoaiSanPham/";
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
                                                orderby d.LanThayDoiGia ascending
                                                select d.GiaNhap * (1 + d.ChietKhau)).Last(),
                                  anhSanPham = (from e in _context.AnhSanPhams
                                                where e.MaSanPham == a.MaSanPham
                                                select imageURL + e.FileAnh.Trim()
                                                ).First()
                              };
            return Ok(listSanPham);
        }

        // Lọc danh sách sản phẩm theo yêu cầu
        [HttpGet("SanPhamByBrand")]
        public ActionResult<List<dynamic>> SanPhamByBrand(int id)
        {
            var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/SanPham/";
            var listSanPham = from a in _context.SanPhams
                              join b in _context.ChiTietSanPhams
                              on a.MaSanPham equals b.MaSanPham
                              where a.MaHangSx == id
                              select new
                              {
                                  tenSanPham = a.TenSanPham,
                                  giaNiemYet = (from d in _context.BienDongGia
                                                where d.MaSanPham == a.MaSanPham
                                                orderby d.LanThayDoiGia ascending
                                                select d.GiaNhap * (1 + d.ChietKhau)).Last(),
                                  anhSanPham = (from e in _context.AnhSanPhams
                                                where e.MaSanPham == a.MaSanPham
                                                select imageURL + e.FileAnh.Trim()
                                                ).First()
                              };
            return Ok(listSanPham);
        }

        // Hiển thị sản phẩm  mặc định trên trang chủ
        [HttpGet("listSanPhamDefault")]
        public ActionResult<List<dynamic>> ListSanPhamDefault(int page)
        {
            double rowPerPage = 5;
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
            }
            var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/SanPham/";
            var listSanPham = (from a in _context.SanPhams
                              join b in _context.ChiTietSanPhams
                              on a.MaSanPham equals b.MaSanPham
                              select new
                              {
                                  tenSanPham = a.TenSanPham,
                                  giaNiemYet = (from d in _context.BienDongGia
                                                where d.MaSanPham == a.MaSanPham
                                                orderby d.LanThayDoiGia ascending
                                                select d.GiaNhap * (1 + d.ChietKhau)).Last(),
                                  anhSanPham = (from e in _context.AnhSanPhams
                                                where e.MaSanPham == a.MaSanPham
                                                select imageURL + e.FileAnh.Trim()
                                                ).First()
                              }).Skip(5 * (page - 1)).Take(5);
            return Ok(new
            {
                tongSoSanPham = productQuantity,
                soTrang = numberOfPageInteger,
                ketQua = listSanPham
            });
        }

        // Tìm kiếm sản phẩm theo từ khóa
        [HttpGet("timKiemTheoTuKhoa")]
        public ActionResult<List<dynamic>> timKiemTheoTuKhoa(int page,String searchKey)
        {
            double rowPerPage = 5;
            if (page == null || page == 0)
            {
                page = 1;
            }
            if (searchKey == null)
            {
                searchKey = "";
            }
            // Tính số trang cần phân chia dựa theo số lượng record của sản phẩm
            double productQuantity = _context.SanPhams.Count();
            double numberOfPage = productQuantity / rowPerPage;
            int numberOfPageInteger = (int)Math.Ceiling(numberOfPage);
            // Nêu không có sản phẩm nào
            if (_context.SanPhams == null)
            {
                return NotFound();
            }
            var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/SanPham/";
            var listSanPham = (from a in _context.SanPhams
                               join b in _context.ChiTietSanPhams
                               on a.MaSanPham equals b.MaSanPham
                               where a.TenSanPham.Contains(searchKey)
                               select new
                               {
                                   tenSanPham = a.TenSanPham,
                                   giaNiemYet = (from d in _context.BienDongGia
                                                 where d.MaSanPham == a.MaSanPham
                                                 orderby d.LanThayDoiGia ascending
                                                 select d.GiaNhap * (1 + d.ChietKhau)).Last(),
                                   anhSanPham = (from e in _context.AnhSanPhams
                                                 where e.MaSanPham == a.MaSanPham
                                                 select imageURL + e.FileAnh.Trim()
                                                 ).First()
                               }).Skip(5 * (page - 1)).Take(5);
            return Ok(new
            {
                tongSoSanPham = productQuantity,
                soTrang = numberOfPageInteger,
                ketqua = listSanPham
            });
        }

        // Tìm kiếm sản phẩm theo nhiều tiêu chí
        // Vừa hãng sản xuất, vừa loại sản phẩm, vừa phạm vi giá
        [HttpGet("timKiemTheoNhieuTieuChi")]
        public ActionResult<List<dynamic>> timKiemTheoNhieuTieuChi(int page=1,
            int maLoaiSanPham=-9999, int maHangSanXuat=-9999,double minPrice=0, double maxPrice=999999999)
        {
            double rowPerPage = 5;
            // Tính số trang cần phân chia dựa theo số lượng record của sản phẩm
            double productQuantity = _context.SanPhams.Count();
            double numberOfPage = productQuantity / rowPerPage;
            int numberOfPageInteger = (int)Math.Ceiling(numberOfPage);
            // Nêu không có sản phẩm nào
            if (_context.SanPhams == null)
            {
                return NotFound();
            }
            var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/SanPham/";
            var listSanPham = (from a in _context.SanPhams
                               join b in _context.ChiTietSanPhams
                               on a.MaSanPham equals b.MaSanPham
                               where (maLoaiSanPham != -9999 ? a.MaLoaiSp == maLoaiSanPham : 1==1)
                               && (maHangSanXuat != -9999 ? a.MaHangSx == maHangSanXuat : 1==1 )
                               select new
                               {
                                   tenSanPham = a.TenSanPham,
                                   giaNiemYet = (from d in _context.BienDongGia
                                                 where (d.MaSanPham == a.MaSanPham)
                                                 && (minPrice >=0 ? d.GiaNhap >= minPrice : 1==1)
                                                 && (maxPrice<=999999999 ? d.GiaNhap <= maxPrice : 1==1)
                                                 orderby d.LanThayDoiGia ascending
                                                 select d.GiaNhap * (1 + d.ChietKhau)).Last(),
                                   anhSanPham = (from e in _context.AnhSanPhams
                                                 where e.MaSanPham == a.MaSanPham
                                                 select imageURL + e.FileAnh.Trim()
                                                 ).First()
                               }).Skip(5 * (page - 1)).Take(5);
            return Ok(new
            {
                tongSoSanPham = productQuantity,
                soTrang = numberOfPageInteger,
                ketqua = listSanPham
            });
        }
    }


}
