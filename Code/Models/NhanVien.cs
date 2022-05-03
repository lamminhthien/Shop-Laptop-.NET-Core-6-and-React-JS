using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ContosoPizza.Models
{
    [Table("NhanVien")]
    public partial class NhanVien
    {
        public NhanVien()
        {
            HoaDons = new HashSet<HoaDon>();
            PhanHoiBinhLuanSps = new HashSet<PhanHoiBinhLuanSp>();
        }

        [Key]
        [Column("ma_nhan_vien")]
        [StringLength(10)]
        public string MaNhanVien { get; set; } = null!;
        [Column("ten_nhan_vien")]
        [StringLength(50)]
        public string TenNhanVien { get; set; } = null!;
        [Column("username")]
        [StringLength(10)]
        public string Username { get; set; } = null!;
        [Column("password")]
        [StringLength(10)]
        public string Password { get; set; } = null!;
        [Column("so_dien_thoai")]
        [StringLength(10)]
        public string SoDienThoai { get; set; } = null!;

        [InverseProperty("MaNhanVienNavigation")]
        public virtual ICollection<HoaDon> HoaDons { get; set; }
        [InverseProperty("MaNhanVienNavigation")]
        public virtual ICollection<PhanHoiBinhLuanSp> PhanHoiBinhLuanSps { get; set; }
    }
}
