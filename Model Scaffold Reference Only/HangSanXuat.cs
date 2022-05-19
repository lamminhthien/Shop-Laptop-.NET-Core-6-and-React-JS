using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.ModelsReferencyOnly
{
    [Table("HangSanXuat")]
    [Index("TenHangSx", Name = "UQ__HangSanX__26EDDD50177D9D99", IsUnique = true)]
    [Index("TenHangSx", Name = "UQ__HangSanX__26EDDD5080E8DF10", IsUnique = true)]
    [Index("TenHangSx", Name = "UQ__HangSanX__26EDDD5092E6BD6F", IsUnique = true)]
    [Index("Logo", Name = "UQ__HangSanX__A3C7455040CFDF1D", IsUnique = true)]
    [Index("Logo", Name = "UQ__HangSanX__A3C745506F171985", IsUnique = true)]
    [Index("Logo", Name = "UQ__HangSanX__A3C74550AF1B14A7", IsUnique = true)]
    public partial class HangSanXuat
    {
        public HangSanXuat()
        {
            SanPhams = new HashSet<SanPham>();
        }

        [Key]
        [Column("ma_hang_sx")]
        public int MaHangSx { get; set; }
        [Column("ten_hang_sx")]
        [StringLength(51)]
        public string TenHangSx { get; set; } = null!;
        [Column("logo")]
        [StringLength(20)]
        public string Logo { get; set; } = null!;

        [InverseProperty("MaHangSxNavigation")]
        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}
