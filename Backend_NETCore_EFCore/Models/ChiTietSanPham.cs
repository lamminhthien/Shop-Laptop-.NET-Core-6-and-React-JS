﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    [Table("ChiTietSanPham")]
    [Index("MaSanPham", Name = "UQ__ChiTietS__9D25990DDADFB156", IsUnique = true)]
    public partial class ChiTietSanPham
    {
        public ChiTietSanPham(int maSanPham, string? cpu, string? cardDoHoa, string? doPhanGiai, int? oCung, string? heDieuHanh, double? manHinh, string? kichThuoc, double? trongLuong, string moTaThem, int? ram, int soLuong)
        {
            MaSanPham = maSanPham;
            Cpu = cpu;
            CardDoHoa = cardDoHoa;
            DoPhanGiai = doPhanGiai;
            OCung = oCung;
            HeDieuHanh = heDieuHanh;
            ManHinh = manHinh;
            KichThuoc = kichThuoc;
            TrongLuong = trongLuong;
            MoTaThem = moTaThem;
            Ram = ram;
            SoLuong = soLuong;
        }

        [Key]
        [Column("ma_san_pham")]
        public int MaSanPham { get; set; }
        [Column("cpu")]
        [StringLength(40)]
        public string? Cpu { get; set; }
        [Column("card_do_hoa")]
        [StringLength(40)]
        public string? CardDoHoa { get; set; }
        [Column("do_phan_giai")]
        [StringLength(10)]
        public string? DoPhanGiai { get; set; }
        [Column("o_cung")]
        public int? OCung { get; set; }
        [Column("he_dieu_hanh")]
        [StringLength(20)]
        public string? HeDieuHanh { get; set; }
        [Column("man_hinh")]
        public double? ManHinh { get; set; }
        [Column("kich_thuoc")]
        [StringLength(255)]
        public string? KichThuoc { get; set; }
        [Column("trong_luong")]
        [Required]
        public double? TrongLuong { get; set; }
        [Column("mo_ta_them", TypeName = "text")]
        [Required]
        public string MoTaThem { get; set; } = null!;
        [Column("ram")]
        public int? Ram { get; set; }
        [Column("so_luong")]
        public int SoLuong { get; set; }

        [ForeignKey("MaSanPham")]
        [InverseProperty("ChiTietSanPham")]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
    }
}
