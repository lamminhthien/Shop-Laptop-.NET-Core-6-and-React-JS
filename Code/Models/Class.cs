using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    [Table("Class")]
    public partial class Class
    {
        public Class()
        {
            Students = new HashSet<Student>();
        }

        [Key]
        [Column("class_code")]
        [StringLength(10)]
        public string ClassCode { get; set; } = null!;
        [Column("class_name")]
        [StringLength(10)]
        public string? ClassName { get; set; }

        [InverseProperty("ClassCodeNavigation")]
        public virtual ICollection<Student> Students { get; set; }
    }
}
