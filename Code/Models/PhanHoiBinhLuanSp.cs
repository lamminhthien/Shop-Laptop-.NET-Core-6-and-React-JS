using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ContosoPizza.Models
{
    [Table("PhanHoiBinhLuanSP")]
    public partial class PhanHoiBinhLuanSp
    {
        [Key]
        [Column("ma_phan_hoi")]
        [StringLength(10)]
        public string MaPhanHoi { get; set; } = null!;
        [Column("ma_binh_luan")]
        [StringLength(5)]
        public string MaBinhLuan { get; set; } = null!;
        [Column("ma_nhan_vien")]
        [StringLength(10)]
        public string MaNhanVien { get; set; } = null!;
        [Column("noi_dung")]
        [StringLength(255)]
        public string NoiDung { get; set; } = null!;

        [ForeignKey("MaBinhLuan")]
        [InverseProperty("PhanHoiBinhLuanSps")]
        public virtual BinhLuanSanPham MaBinhLuanNavigation { get; set; } = null!;
        [ForeignKey("MaNhanVien")]
        [InverseProperty("PhanHoiBinhLuanSps")]
        public virtual NhanVien MaNhanVienNavigation { get; set; } = null!;
    }
}
