using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace ShopLaptop_EFCore.Models
{
    public partial class BienDongGium
    {
        public BienDongGium(int maSanPham, long giaNhap, int lanThayDoiGia, DateTime thoiGian)
        {
            MaSanPham = maSanPham;
            GiaNhap = giaNhap;
            LanThayDoiGia = lanThayDoiGia;
            ThoiGian = thoiGian;
        }

        [Key]
        [Column("ma_san_pham")]
        public int MaSanPham { get; set; }
        [Column("gia_nhap")]
        public long GiaNhap { get; set; }
        [Column("lan_thay_doi_gia")]
        public int LanThayDoiGia { get; set; }
        [Column("thoi_gian", TypeName = "date")]
        public DateTime ThoiGian { get; set; }

        [ForeignKey("MaSanPham")]
        [InverseProperty("BienDongGium")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
    }
}
