using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ContosoPizza.Models
{
    [Table("HangSanXuat")]
    public partial class HangSanXuat
    {
        public HangSanXuat()
        {
            SanPhams = new HashSet<SanPham>();
        }

        [Key]
        [Column("ma_hang_sx")]
        [StringLength(10)]
        public string MaHangSx { get; set; } = null!;
        [Column("ten_hang_sx")]
        [StringLength(50)]
        public string TenHangSx { get; set; } = null!;
        [Column("logo")]
        [StringLength(10)]
        public string Logo { get; set; } = null!;

        [InverseProperty("MaHangSxNavigation")]
        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}
