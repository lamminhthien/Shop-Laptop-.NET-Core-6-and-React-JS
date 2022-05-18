using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace ShopLaptop_EFCore.Models
{
    [Table("SanPham")]
    [Index("TenSanPham", Name = "UQ__SanPham__BA66C031EDFC9119", IsUnique = true)]
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
        public int MaSanPham { get; set; }
        [Column("ten_san_pham")]
        [StringLength(50)]
        public string TenSanPham { get; set; } = null!;
        [Column("ma_loai_sp")]
        public int MaLoaiSp { get; set; }
        [Column("ma_hang_sx")]
        public int MaHangSx { get; set; }
        [Column("trang_thai_sp")]
        public int TrangThaiSp { get; set; }
        [Column("gia")]
        public long Gia { get; set; }

        [ForeignKey("MaHangSx")]
        [InverseProperty("SanPhams")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual HangSanXuat MaHangSxNavigation { get; set; } = null!;
        [ForeignKey("MaLoaiSp")]
        [InverseProperty("SanPhams")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual LoaiSanPham MaLoaiSpNavigation { get; set; } = null!;
        [InverseProperty("MaSanPhamNavigation")]
        //[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual BienDongGium BienDongGium { get; set; } = null!;
        [InverseProperty("MaSanPhamNavigation")]
        //[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ChiTietSanPham ChiTietSanPham { get; set; } = null!;
        [InverseProperty("MaSanPhamNavigation")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<AnhSanPham> AnhSanPhams { get; set; }
        [InverseProperty("MaSanPhamNavigation")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<BinhLuanSanPham> BinhLuanSanPhams { get; set; }
        [InverseProperty("MaSanPhamNavigation")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<ChiTietHoaDon> ChiTietHoaDons { get; set; }
        [InverseProperty("MaSanPhamNavigation")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual ICollection<GioHang> GioHangs { get; set; }
    }
}
