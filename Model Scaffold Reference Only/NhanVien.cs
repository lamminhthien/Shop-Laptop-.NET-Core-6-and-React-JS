using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.ModelsReferencyOnly
{
    [Table("NhanVien")]
    [Index("TenNhanVien", "Username", "SoDienThoai", Name = "UQ__NhanVien__CC182619188FB46B", IsUnique = true)]
    [Index("TenNhanVien", "Username", "SoDienThoai", Name = "UQ__NhanVien__CC182619FFFBE165", IsUnique = true)]
    public partial class NhanVien
    {
        public NhanVien()
        {
            HoaDons = new HashSet<HoaDon>();
            PhanHoiBinhLuanSps = new HashSet<PhanHoiBinhLuanSp>();
        }

        [Key]
        [Column("ma_nhan_vien")]
        public int MaNhanVien { get; set; }
        [Column("ten_nhan_vien")]
        [StringLength(50)]
        public string TenNhanVien { get; set; } = null!;
        [Column("username")]
        [StringLength(20)]
        public string Username { get; set; } = null!;
        [Column("password")]
        [StringLength(20)]
        public string Password { get; set; } = null!;
        [Column("so_dien_thoai")]
        [StringLength(11)]
        public string SoDienThoai { get; set; } = null!;

        [InverseProperty("MaNhanVienNavigation")]
        public virtual ICollection<HoaDon> HoaDons { get; set; }
        [InverseProperty("MaNhanVienNavigation")]
        public virtual ICollection<PhanHoiBinhLuanSp> PhanHoiBinhLuanSps { get; set; }
    }
}
