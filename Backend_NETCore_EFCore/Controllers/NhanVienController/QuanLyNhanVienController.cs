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
  [Route("api/[controller]")]
  [Authorize(Roles = "Giám Đốc")]
  [ApiController]
  public class QuanLyNhanVienController : ControllerBase
  {
    private readonly shop_laptopContext _context;

    public QuanLyNhanVienController(shop_laptopContext context)
    {
      _context = context;
    }

    // Lấy danh sách toàn bộ nhân viên
    [HttpGet("ListNhanVien")]
    public async Task<ActionResult<IEnumerable<NhanVien>>> ListNhanVien()
    {
      var ketQua = await _context.NhanViens.Select(x => new
      {
        maNhanVien = x.MaNhanVien,
        tenNhanVien = x.TenNhanVien,
        userName = x.Username,
        soDienThoai = x.SoDienThoai

      }).ToListAsync();

      return Ok(ketQua);
    }


    // Sữa thông tin nhân viên
    [HttpPut("SuaThongTinNhanVien")]
    public async Task<IActionResult> SuaThongTinNhanVien(int id, NhanVien nhanVien)
    {
      if (id != nhanVien.MaNhanVien)
      {
        return BadRequest("Không tìm thấy nhân viên cần sữa");
      }

      _context.Entry(nhanVien).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!NhanVienExists(id))
        {
          return NotFound("Không tìm thấy nhân viên cần sữa");
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // Thêm nhân viên
    [HttpPost("ThemNhanVien")]
    public async Task<ActionResult<NhanVien>> ThemNhanVien(NhanVien nhanVien)
    {
      if (_context.NhanViens == null)
      {
        return Problem("Entity set 'shop_laptopContext.NhanViens'  is null.");
      }
      _context.NhanViens.Add(nhanVien);
      await _context.SaveChangesAsync();

      return Ok("Đã tạo nhân viên mới với tên");
    }


    // DELETE: api/QuanLyNhanVien/5
    [HttpDelete("XoaNhanVien")]
    public async Task<IActionResult> XoaNhanVien(int id)
    {
      if (_context.NhanViens == null)
      {
        return NotFound();
      }
      var nhanVien = await _context.NhanViens.FindAsync(id);
      if (nhanVien == null)
      {
        return NotFound();
      }

      _context.NhanViens.Remove(nhanVien);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool NhanVienExists(int id)
    {
      return (_context.NhanViens?.Any(e => e.MaNhanVien == id)).GetValueOrDefault();
    }
  }
}
