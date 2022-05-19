using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.ModelsReferencyOnly
{
    public partial class BienDongGium
    {
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
        public double ChietKhau { get; set; }

        [ForeignKey("MaSanPham")]
        [InverseProperty("BienDongGia")]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
    }
}
