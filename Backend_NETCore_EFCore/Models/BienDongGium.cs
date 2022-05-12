using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    [Keyless]
    public partial class BienDongGium
    {
        [Column("ma_san_pham")]
        public int MaSanPham { get; set; }
        [Column("gia_nhap")]
        public long GiaNhap { get; set; }
        [Column("lan_thay_doi_gia")]
        public int LanThayDoiGia { get; set; }
        [Column("thoi_gian", TypeName = "date")]
        public DateTime ThoiGian { get; set; }

        [ForeignKey("MaSanPham")]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
    }
}
