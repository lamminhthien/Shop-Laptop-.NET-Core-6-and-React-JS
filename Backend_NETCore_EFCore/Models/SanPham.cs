using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    [Table("SanPham")]
    public partial class SanPham
    {
        public SanPham()
        {
            AnhSanPhams = new HashSet<AnhSanPham>();
            BinhLuanSanPhams = new HashSet<BinhLuanSanPham>();
            ChiTietHoaDons = new HashSet<ChiTietHoaDon>();
            GioHangs = new HashSet<GioHang>();
        }

        [Key]
        [Column("ma_san_pham")]
        [StringLength(5)]
        public string MaSanPham { get; set; } = null!;
        [Column("ten_san_pham")]
        [StringLength(50)]
        public string TenSanPham { get; set; } = null!;
        [Column("ma_loai_sp")]
        [StringLength(10)]
        public string MaLoaiSp { get; set; } = null!;
        [Column("ma_hang_sx")]
        [StringLength(10)]
        public string MaHangSx { get; set; } = null!;
        [Column("trang_thai_sp")]
        [StringLength(10)]
        public string TrangThaiSp { get; set; } = null!;
        [Column("gia")]
        public int Gia { get; set; }

        [ForeignKey("MaHangSx")]
        [InverseProperty("SanPhams")]
        public virtual HangSanXuat MaHangSxNavigation { get; set; } = null!;
        [ForeignKey("MaLoaiSp")]
        [InverseProperty("SanPhams")]
        public virtual LoaiSanPham MaLoaiSpNavigation { get; set; } = null!;
        [InverseProperty("MaSanPhamNavigation")]
        public virtual BienDongGium BienDongGium { get; set; } = null!;
        [InverseProperty("MaSanPhamNavigation")]
        public virtual ChiTietSanPham ChiTietSanPham { get; set; } = null!;
        [InverseProperty("MaSanPhamNavigation")]
        public virtual ICollection<AnhSanPham> AnhSanPhams { get; set; }
        [InverseProperty("MaSanPhamNavigation")]
        public virtual ICollection<BinhLuanSanPham> BinhLuanSanPhams { get; set; }
        [InverseProperty("MaSanPhamNavigation")]
        public virtual ICollection<ChiTietHoaDon> ChiTietHoaDons { get; set; }
        [InverseProperty("MaSanPhamNavigation")]
        public virtual ICollection<GioHang> GioHangs { get; set; }
    }
}
