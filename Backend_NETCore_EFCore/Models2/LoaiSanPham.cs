using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models2
{
    [Table("LoaiSanPham")]
    [Index("TenLoaiSp", "AnhMinhHoa", Name = "UQ__LoaiSanP__63C2C7EEB5142B17", IsUnique = true)]
    [Index("TenLoaiSp", Name = "UQ__LoaiSanP__FF5577F4647DAA5F", IsUnique = true)]
    public partial class LoaiSanPham
    {
        public LoaiSanPham()
        {
            SanPhams = new HashSet<SanPham>();
        }

        [Key]
        [Column("ma_loai_sp")]
        public int MaLoaiSp { get; set; }
        [Column("ten_loai_sp")]
        [StringLength(50)]
        public string TenLoaiSp { get; set; } = null!;
        [Column("anh_minh_hoa")]
        [StringLength(50)]
        public string AnhMinhHoa { get; set; } = null!;

        [InverseProperty("MaLoaiSpNavigation")]
        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}
