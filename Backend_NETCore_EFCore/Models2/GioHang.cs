using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models2
{
    [Table("GioHang")]
    [Index("MaKhachHang", "MaSanPham", Name = "UQ__GioHang__10532367C2F79BCB", IsUnique = true)]
    public partial class GioHang
    {
        [Key]
        [Column("id_gio_hang")]
        public int IdGioHang { get; set; }
        [Column("ma_khach_hang")]
        public int MaKhachHang { get; set; }
        [Column("ma_san_pham")]
        public int MaSanPham { get; set; }
        [Column("so_luong")]
        public int SoLuong { get; set; }

        [ForeignKey("MaSanPham")]
        [InverseProperty("GioHangs")]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
    }
}
