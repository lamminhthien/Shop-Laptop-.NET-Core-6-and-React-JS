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
        var link = Request.Form["link"][0];
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
        Banner banner = new Banner(fileName, link);
        try
        {
          _context.Add(banner);
          _context.SaveChanges();
        }
        catch
        {
          return BadRequest("File ảnh hoặc nội dung bị trùng lắp ");
        }
        return Ok(new
        {
          banner = banner,
          lastId = lastId
        });
      }
      catch (Exception e)
      {
        return BadRequest("Thiếu ảnh hoặc đường link trong banner ");
      }
    }

    //Danh sách banner
    [HttpGet("ListBanner")]
    public ActionResult<Banner> ListBanner()
    {
        var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/Banner/";
        var listBanner = (from a in _context.Banners
        select new {
            link = a.Link,
            anh = imageURL + a.FileAnh.Trim()
        });
      return Ok(listBanner);
    }
  }
}
