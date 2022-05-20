using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    public partial class BienDongGium
    {
        public BienDongGium(int maSanPham, long giaNhap, int lanThayDoiGia, DateTime thoiGian, double chietKhau)
        {
            MaSanPham = maSanPham;
            GiaNhap = giaNhap;
            LanThayDoiGia = lanThayDoiGia;
            ThoiGian = thoiGian;
            ChietKhau = chietKhau;
        }

        [Key]
        [Column("ma_bien_dong")]
        public int MaBienDong { get; set; }
        [Column("ma_san_pham")]
        public int MaSanPham { get; set; }
        [Column("gia_nhap")]
        public long GiaNhap { get; set; }
        [Column("lan_thay_doi_gia")]
        public int LanThayDoiGia { get; set; }
        [Column("thoi_gian", TypeName = "date")]
        public DateTime ThoiGian { get; set; }
        [Column("chiet_khau")]
        // Ràng buộc phạm vi chiết khấu
        [Range(0.01, 1)]
        public double ChietKhau { get; set; }

        [ForeignKey("MaSanPham")]
        [InverseProperty("BienDongGia")]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
    }
}
