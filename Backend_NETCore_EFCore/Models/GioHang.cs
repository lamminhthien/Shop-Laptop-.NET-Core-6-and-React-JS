using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    [Table("GioHang")]
    public partial class GioHang
    {
        [Key]
        [Column("ma_khach_hang")]
        [StringLength(10)]
        public string MaKhachHang { get; set; } = null!;
        [Column("ma_san_pham")]
        [StringLength(5)]
        public string MaSanPham { get; set; } = null!;
        [Column("so_luong")]
        public int SoLuong { get; set; }

        [ForeignKey("MaSanPham")]
        [InverseProperty("GioHangs")]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
    }
}
