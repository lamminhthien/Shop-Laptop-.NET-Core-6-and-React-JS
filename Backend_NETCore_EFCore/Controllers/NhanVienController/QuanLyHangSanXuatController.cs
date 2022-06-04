using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;
using Microsoft.AspNetCore.Authorization;
namespace ShopLaptop_EFCore.Controllers.NhanVienController
{
  [Authorize(Roles = "Nhân Viên")]
  [ApiController]
  [Route("api/[controller]")]
  public class QuanLyHangSanXuatController : ControllerBase
  {
    private readonly shop_laptopContext _context;
    public QuanLyHangSanXuatController(shop_laptopContext context)
    {
      _context = context;
    }
    [HttpGet("ListHangSanXuat")]
    public async Task<ActionResult<IEnumerable<HangSanXuat>>> GetHangSanXuats(int page = 1, string? orderByProperty = "", string? searchBy = "", bool? allRecord = false)
    {
      double rowPerPage = 5;

      if (page < 0)
      {
        page = 1;
      }
      double brandQuantity = _context.HangSanXuats.Count();
      double numberOfPage = brandQuantity / rowPerPage;
      int numberOfPageInteger = (int)Math.Ceiling(numberOfPage);
      return Ok(new
      {
        tongSoHangSanXuat = brandQuantity,
        tongSoTrang = numberOfPageInteger,
        ketQua = await _context.HangSanXuats.Skip(5 * (page - 1)).Take(5).ToListAsync(),
      });
    }
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

    [HttpPost("ThemHangSanXuat"), DisableRequestSizeLimit]
    public async Task<ActionResult<HangSanXuat>> ThemHangSanXuat()
    {
      var tenHangSX = Request.Form["tenHangSX"][0];
      if (tenHangSX == null) return BadRequest("Bạn chưa nhập tên ảnh");
      if (HangSanXuatDuplicateName(tenHangSX))
      {
        return BadRequest("Tên hãng sản xuất bị trùng");
      }
      var file = Request.Form.Files[0];
      if (file.Length < 0) return BadRequest("Chưa upload bất cứ ảnh nào");
      if (!file.ContentType.Contains("image")) return BadRequest("This file is not image");
      var folderName = Path.Combine("Resources", "Images", "HangSanXuat");
      var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
      var tenFileAnh = tenHangSX + "." + file.ContentType.Split('/')[1];
      var fullPath = Path.Combine(pathToSave, tenFileAnh);
      var hangSanXuat = new HangSanXuat(tenHangSX, tenFileAnh);
      using (var stream = new FileStream(fullPath, FileMode.Create))
      {
        file.CopyTo(stream);
      }
      _context.HangSanXuats.Add(hangSanXuat);
      await _context.SaveChangesAsync();
      return Ok("Đã tạo hãng sản xuất:" + tenHangSX);
    }
    [HttpPut("SuaTenHangSanXuat/{id}")]
    public async Task<IActionResult> SuaTenHangSanXuat(int id)
    {
      var tenHangSXMoi = Request.Form["tenHangSX"][0];
      Console.WriteLine(id);
      var hangSanXuatExist = await _context.HangSanXuats
          .Where(o => o.MaHangSx == id).FirstOrDefaultAsync();
      // Nếu tồn tại hãng sản xuất này
      if (hangSanXuatExist != null)
      {
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
    [HttpPut("SuaAnhHangSanXuat/{id}"), DisableRequestSizeLimit]
    public async Task<IActionResult> SuaAnhHangSanXuat(int id)
    {
      var fileAnh = Request.Form.Files[0];
      if (fileAnh.Length < 0) return BadRequest("Chưa upload bất cứ ảnh nào");
      if (!fileAnh.ContentType.Contains("image")) return BadRequest("Đây không phải file ảnh");
      Console.WriteLine(id);
      var hangSanXuatExist = await _context.HangSanXuats
          .Where(o => o.MaHangSx == id).FirstOrDefaultAsync();
      if (hangSanXuatExist != null)
      {
        var tenFileAnhCu = hangSanXuatExist.Logo;
        var ResourcesDir = Path.Combine(Directory.GetCurrentDirectory(), "Resources", "Images", "HangSanXuat");
        var fullPathAnhCu = Path.Combine(ResourcesDir, tenFileAnhCu);
        FileInfo file = new FileInfo(fullPathAnhCu);
        // Tiến hành xóa ảnh và đổi ảnh
        if (file.Exists)
        {
          file.Delete();
          var tenFileAnhMoi = Path.Combine(ResourcesDir, hangSanXuatExist.TenHangSx + "." + fileAnh.ContentType.Split("/")[1]);
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
    [HttpGet("GetSingleHangSanXuat")]
    public async Task<ActionResult<LoaiSanPham>> GetSingleHangSanXuat(int id = -1)
    {
      var imageURL = Request.Scheme + "://" + Request.Host.Value + "/" + "Resources/Images/HangSanXuat/";
      var hangSX = (from a in _context.HangSanXuats
                    where a.MaHangSx == id
                    select new
                    {
                      maHangSx = a.MaHangSx,
                      tenHangSx = a.TenHangSx,
                      anhMinhHoa = imageURL + a.Logo
                    }); ;
      if (hangSX == null) return BadRequest("Không tìm thấy hãng sản xuất này");
      return Ok(hangSX);
    }
    private bool HangSanXuatExists(int id)
    {
      return (_context.HangSanXuats?.Any(e => e.MaHangSx == id)).GetValueOrDefault();
    }
    private bool HangSanXuatDuplicateName(string tenHangSX)
    {
      return (_context.HangSanXuats?.Any(e => e.TenHangSx == tenHangSX)).GetValueOrDefault();
    }
  }
}
