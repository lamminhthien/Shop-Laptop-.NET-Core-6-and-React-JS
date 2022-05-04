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
        [Key]
        [Column("ma_chi_tiet_hoa_don")]
        [StringLength(10)]
        public string MaChiTietHoaDon { get; set; } = null!;
        [Column("ma_hoa_don")]
        [StringLength(10)]
        public string MaHoaDon { get; set; } = null!;
        [Column("ma_san_pham")]
        [StringLength(5)]
        public string MaSanPham { get; set; } = null!;
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
