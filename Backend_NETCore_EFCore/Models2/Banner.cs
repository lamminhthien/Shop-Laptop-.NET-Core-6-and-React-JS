﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models2
{
    [Table("Banner")]
    [Index("Link", Name = "UQ__Banner__A269238112A0D075", IsUnique = true)]
    public partial class Banner
    {
        [Key]
        [Column("ma_banner")]
        public int MaBanner { get; set; }
        [Column("file_anh")]
        [StringLength(50)]
        public string FileAnh { get; set; } = null!;
        [Column("link")]
        [StringLength(50)]
        public string Link { get; set; } = null!;
    }
}
