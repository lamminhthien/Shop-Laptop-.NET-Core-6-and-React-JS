using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
  [Table("ChiTietHoaDon")]
  public partial class ChiTietHoaDon
  {
    public ChiTietHoaDon( int maHoaDon, int maSanPham, int soLuong, long donGia)
    {
      MaHoaDon = maHoaDon;
      MaSanPham = maSanPham;
      SoLuong = soLuong;
      DonGia = donGia;
    }

    [Key]
    [Column("ma_chi_tiet_hoa_don")]
    public int MaChiTietHoaDon { get; set; }
    [Column("ma_hoa_don")]
    public int MaHoaDon { get; set; }
    [Column("ma_san_pham")]
    public int MaSanPham { get; set; }
    [Column("so_luong")]
    public int SoLuong { get; set; }
    [Column("don_gia")]
    public long DonGia { get; set; }

    [ForeignKey("MaHoaDon")]
    [InverseProperty("ChiTietHoaDons")]
    public virtual HoaDon MaHoaDonNavigation { get; set; } = null!;
    [ForeignKey("MaSanPham")]
    [InverseProperty("ChiTietHoaDons")]
    public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
  }
}
