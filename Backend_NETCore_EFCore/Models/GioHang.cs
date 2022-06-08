using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace ShopLaptop_EFCore.Models
{
  [Table("GioHang")]
  [Index("MaKhachHang", Name = "UQ__GioHang__C9817AF76C6936FA", IsUnique = true)]
  [Index("MaKhachHang", Name = "UQ__GioHang__C9817AF7CD6FD201", IsUnique = true)]
  public partial class GioHang
  {

    public GioHang(int maKhachHang, int maSanPham, int soLuong)
    {
      MaKhachHang = maKhachHang;
      MaSanPham = maSanPham;
      SoLuong = soLuong;
    }
    public GioHang(int maSanPham, int soLuong)
    {
      MaSanPham = maSanPham;
      SoLuong = soLuong;
    }
    [Key]
    [Column("ma_khach_hang")]
    public int MaKhachHang { get; set; }
    [Column("ma_san_pham")]
    public int MaSanPham { get; set; }
    [Column("so_luong")]
    public int SoLuong { get; set; }

    [ForeignKey("MaSanPham")]
    [InverseProperty("GioHangs")]
    [JsonIgnore]
    public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
  }
}
