using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models2
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
        public int MaBinhLuan { get; set; }
        [Column("ma_khach_hang")]
        public int MaKhachHang { get; set; }
        [Column("ma_san_pham")]
        public int MaSanPham { get; set; }
        [Column("noi_dung")]
        [StringLength(255)]
        public string NoiDung { get; set; } = null!;
        [Column("trang_thai")]
        public bool TrangThai { get; set; }

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
