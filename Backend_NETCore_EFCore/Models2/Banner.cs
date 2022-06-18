using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models2
{
    [Table("Banner")]
    public partial class Banner
    {
        [Key]
        [Column("ma_banner")]
        public int MaBanner { get; set; }
        [Column("file_anh")]
        [StringLength(50)]
        public string FileAnh { get; set; } = null!;
        [Column("noi_dung")]
        [StringLength(255)]
        public string NoiDung { get; set; } = null!;
    }
}
