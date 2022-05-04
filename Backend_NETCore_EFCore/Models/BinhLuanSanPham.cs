using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    [Table("BinhLuanSanPham")]
    public partial class BinhLuanSanPham
    {
        public BinhLuanSanPham()
        {
            PhanHoiBinhLuanSps = new HashSet<PhanHoiBinhLuanSp>();
        }

        [Key]
        [Column("ma_binh_luan")]
        [StringLength(5)]
        public string MaBinhLuan { get; set; } = null!;
        [Column("ma_khach_hang")]
        [StringLength(5)]
        public string MaKhachHang { get; set; } = null!;
        [Column("ma_san_pham")]
        [StringLength(5)]
        public string MaSanPham { get; set; } = null!;
        [Column("noi_dung")]
        [StringLength(50)]
        public string NoiDung { get; set; } = null!;

        [ForeignKey("MaKhachHang")]
        [InverseProperty("BinhLuanSanPhams")]
        public virtual KhachHang MaKhachHangNavigation { get; set; } = null!;
        [ForeignKey("MaSanPham")]
        [InverseProperty("BinhLuanSanPhams")]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
        [InverseProperty("MaBinhLuanNavigation")]
        public virtual ICollection<PhanHoiBinhLuanSp> PhanHoiBinhLuanSps { get; set; }
    }
}
