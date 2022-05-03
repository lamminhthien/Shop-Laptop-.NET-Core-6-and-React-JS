using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ContosoPizza.Models
{
    [Table("ChiTietSanPham")]
    public partial class ChiTietSanPham
    {
        [Key]
        [Column("ma_san_pham")]
        [StringLength(5)]
        public string MaSanPham { get; set; } = null!;
        [Column("cpu")]
        [StringLength(10)]
        public string? Cpu { get; set; }
        [Column("card_do_hoa")]
        [StringLength(10)]
        public string? CardDoHoa { get; set; }
        [Column("pin")]
        public int? Pin { get; set; }
        [Column("o_cung")]
        public int? OCung { get; set; }
        [Column("he_dieu_hanh")]
        [StringLength(10)]
        public string? HeDieuHanh { get; set; }
        [Column("thiet_ke")]
        [StringLength(50)]
        public string? ThietKe { get; set; }
        [Column("kich_thuoc")]
        public int? KichThuoc { get; set; }
        [Column("trong_luong")]
        public int? TrongLuong { get; set; }
        [Column("mo_ta_them")]
        [StringLength(10)]
        public string? MoTaThem { get; set; }

        [ForeignKey("MaSanPham")]
        [InverseProperty("ChiTietSanPham")]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
    }
}
