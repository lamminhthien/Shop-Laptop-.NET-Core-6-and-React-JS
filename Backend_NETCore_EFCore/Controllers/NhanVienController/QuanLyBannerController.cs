using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using Microsoft.AspNetCore.Authorization;

namespace ShopLaptop_EFCore.Controllers.NhanVienController
{
  [Route("api/[controller]")]
  [Authorize(Roles = "Nhân Viên")]
  [ApiController]
  public class QuanLyBannerController : ControllerBase
  {
    private readonly shop_laptopContext _context;
    public QuanLyBannerController(shop_laptopContext context)
    {
      _context = context;
    }
    // Thêm loại sản phẩm (kèm luôn thêm ảnh)
    [HttpPost("ThemBanner"), DisableRequestSizeLimit]
    public async Task<ActionResult<Banner>> ThemBanner()
    {
      try
      {
        var noiDung = Request.Form["noiDung"][0];
        var file = Request.Form.Files[0];
        var folderName = Path.Combine("Resources", "Images", "Banner");
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
        // Check xem request có rỗng file hay ko ?
        if (file.Length < 0) return BadRequest("Chưa upload bất cứ ảnh nào");
        if (!file.ContentType.Contains("image")) return BadRequest("Đây không phải file ảnh");
        var lastId = 0;
        try
        { lastId = _context.Banners.Max(x => x.MaBanner); }
        catch (Exception e)
        {
          lastId = 1;
        }
        var fileName = "Banner" + lastId + "." + file.ContentType.Split('/')[1];
        var fullPath = Path.Combine(pathToSave, fileName);
        await using (var stream = new FileStream(fullPath, FileMode.Create))
        {
          file.CopyTo(stream);
        }
        Banner banner = new Banner(fileName, noiDung);
        return Ok(new
        {
          banner = banner,
          lastId = lastId
        });
      }
      catch (Exception e)
      {
        return BadRequest("Thiếu ảnh hoặc nội dung  banner ");
      }
      return Ok("Yes");
    }
  }
}
