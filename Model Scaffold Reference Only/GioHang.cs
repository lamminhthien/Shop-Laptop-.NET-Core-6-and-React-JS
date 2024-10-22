﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.ModelsReferencyOnly
{
    [Table("GioHang")]
    [Index("MaKhachHang", Name = "UQ__GioHang__C9817AF76C6936FA", IsUnique = true)]
    [Index("MaKhachHang", Name = "UQ__GioHang__C9817AF7CD6FD201", IsUnique = true)]
    public partial class GioHang
    {
        [Key]
        [Column("ma_khach_hang")]
        public int MaKhachHang { get; set; }
        [Column("ma_san_pham")]
        public int MaSanPham { get; set; }
        [Column("so_luong")]
        public int SoLuong { get; set; }

        [ForeignKey("MaSanPham")]
        [InverseProperty("GioHangs")]
        public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
    }
}
