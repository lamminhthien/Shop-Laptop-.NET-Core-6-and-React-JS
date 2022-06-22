using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models2
{
    [Table("LuotTruyCap")]
    public partial class LuotTruyCap
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("view_count")]
        public long ViewCount { get; set; }
    }
}
