using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
  [Table("HoaDon")]
  public partial class HoaDon
  {
    public HoaDon()
    {
      ChiTietHoaDons = new HashSet<ChiTietHoaDon>();
    }

    public HoaDon(int maKhachHang, int tinhTrangGiaoHang, long tongTien, int maNhanVien)
    {
      MaKhachHang = maKhachHang;
      TinhTrangGiaoHang = tinhTrangGiaoHang;
      TongTien = tongTien;
      MaNhanVien = maNhanVien;
    }

    public HoaDon(int maKhachHang, DateTime ngayChotDon, int tinhTrangGiaoHang, long tongTien, int maNhanVien)
    {
      MaKhachHang = maKhachHang;
      NgayChotDon = ngayChotDon;
      TinhTrangGiaoHang = tinhTrangGiaoHang;
      TongTien = tongTien;
      MaNhanVien = maNhanVien;
    }

    [Key]
    [Column("ma_hoa_don")]
    public int MaHoaDon { get; set; }
    [Column("ma_khach_hang")]
    public int MaKhachHang { get; set; }
    [Column("ngay_chot_don", TypeName = "datetime")]
    public DateTime NgayChotDon { get; set; }
    [Column("tinh_trang_giao_hang")]
    public int TinhTrangGiaoHang { get; set; }
    [Column("tong_tien")]
    public long TongTien { get; set; }
    [Column("ma_nhan_vien")]
    public int MaNhanVien { get; set; }

    [ForeignKey("MaKhachHang")]
    [InverseProperty("HoaDons")]
    public virtual KhachHang MaKhachHangNavigation { get; set; } = null!;
    [ForeignKey("MaNhanVien")]
    [InverseProperty("HoaDons")]
    public virtual NhanVien MaNhanVienNavigation { get; set; } = null!;
    [InverseProperty("MaHoaDonNavigation")]
    public virtual ICollection<ChiTietHoaDon> ChiTietHoaDons { get; set; }
  }
}
