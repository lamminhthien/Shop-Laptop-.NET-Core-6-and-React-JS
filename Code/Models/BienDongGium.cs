using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ContosoPizza.Models
{
    public partial class BienDongGium
    {
        [Key]
        [Column("ma_san_pham")]
        [StringLength(5)]
        public string MaSanPham { get; set; } = null!;
        [Column("gia_nhap")]
        public long GiaNhap { get; set; }
        [Column("lan_thay_doi_gia")]
        public int LanThayDoiGia { get; set; }
        [Column("thoi_gian", TypeName = "date")]
        public DateTime ThoiGian { get; set; }

        [ForeignKey("MaSanPham")]
        [InverseProperty("BienDongGium")]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
    }
}
