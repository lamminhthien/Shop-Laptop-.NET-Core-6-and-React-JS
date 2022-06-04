using Microsoft.AspNetCore.Mvc;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using ShopLaptop_EFCore.Models.NhanVienModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.IO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShopLaptop_EFCore.Controllers.KhachHangController
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        // Database context, giúp tương tác truy vấn đến database
        private readonly shop_laptopContext _context;
        public KhachHangController(shop_laptopContext context)
        {
            _context = context;
        }

        [HttpPost("DangKyKhachHang")]
        public ActionResult<List<dynamic>> DangKyKhachHang(KhachHang kh)
        {
            try
            {
                _context.Add(kh);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                var errMsg = ex.InnerException.ToString();
                if(errMsg.Contains("so_dien_thoai"))  
                { 
                    return BadRequest("Số điện thoại bị trùng");
                }
                if (errMsg.Contains("username"))
                {

                    return BadRequest("Username bị trùng");
                }
                if (errMsg.Contains("email"))
                {
                    return BadRequest("Email bị trùng");
                }
                if (errMsg.Contains("ho_ten"))
                {
                    return BadRequest("Họ và tên bị trùng");
                }
            }
            return Ok("Đăng ký tài khoản khách hàng thành công");
        }

        [HttpPost("BinhLuanSanPham")]
        public ActionResult<List<dynamic>> BinhLuanSanPham(BinhLuanSanPham binhLuan)
        {
            try
            {
                _context.Add(binhLuan);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.ToString());
            }
            return Ok("Hi");
        }
    }
}
