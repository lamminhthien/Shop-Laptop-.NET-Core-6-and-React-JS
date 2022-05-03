using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ContosoPizza.Models
{
    [Table("LoaiSanPham")]
    public partial class LoaiSanPham
    {
        public LoaiSanPham()
        {
            SanPhams = new HashSet<SanPham>();
        }

        [Key]
        [Column("ma_loai_sp")]
        [StringLength(10)]
        public string MaLoaiSp { get; set; } = null!;
        [Column("ten_loai_sp")]
        [StringLength(50)]
        public string TenLoaiSp { get; set; } = null!;
        [Column("anh_minh_hoa")]
        [StringLength(10)]
        public string AnhMinhHoa { get; set; } = null!;

        [InverseProperty("MaLoaiSpNavigation")]
        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}
