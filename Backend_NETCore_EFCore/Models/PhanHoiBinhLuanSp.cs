using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    [Table("PhanHoiBinhLuanSP")]
    public partial class PhanHoiBinhLuanSp
    {
        public PhanHoiBinhLuanSp(int maBinhLuan, int maNhanVien, string noiDung)
        {
            MaBinhLuan = maBinhLuan;
            MaNhanVien = maNhanVien;
            NoiDung = noiDung;
        }

        [Key]
        [Column("ma_phan_hoi")]
        public int MaPhanHoi { get; set; }
        [Column("ma_binh_luan")]
        public int MaBinhLuan { get; set; }
        [Column("ma_nhan_vien")]
        public int MaNhanVien { get; set; }
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
