using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    [Table("AnhSanPham")]
    [Index("FileAnh", Name = "UQ__AnhSanPh__3EF620E5FCFAEE26", IsUnique = true)]
    public partial class AnhSanPham
    {
        [Key]
        [Column("ma_anh")]
        public int MaAnh { get; set; }
        [Column("ma_san_pham")]
        public int MaSanPham { get; set; }
        [Column("file_anh")]
        [StringLength(20)]
        public string FileAnh { get; set; } = null!;

        [ForeignKey("MaSanPham")]
        [InverseProperty("AnhSanPhams")]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
    }
}
