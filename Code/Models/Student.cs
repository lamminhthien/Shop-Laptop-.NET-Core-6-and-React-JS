using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    [Table("Student")]
    public partial class Student
    {

        [Key]
        [Column("StudentID")]
        [StringLength(10)]
        public string StudentId { get; set; } = null!;
        [StringLength(10)]
        public string? StudentName { get; set; }
        [StringLength(10)]
        public string? ClassCode { get; set; }


        [ForeignKey("ClassCode")]
        [InverseProperty("Students")]
        [JsonIgnore(Condition =JsonIgnoreCondition.WhenWritingNull)]
        public virtual Class? ClassCodeNavigation { get; set; }
    }
}
