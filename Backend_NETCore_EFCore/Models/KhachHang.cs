using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    [Table("KhachHang")]
    public partial class KhachHang
    {
        public KhachHang()
        {
            BinhLuanSanPhams = new HashSet<BinhLuanSanPham>();
            HoaDons = new HashSet<HoaDon>();
        }

        [Key]
        [Column("ma_khach_hang")]
        [StringLength(5)]
        public string MaKhachHang { get; set; } = null!;
        [Column("ho_ten")]
        [StringLength(50)]
        public string HoTen { get; set; } = null!;
        [Column("dia_chi")]
        [StringLength(50)]
        public string DiaChi { get; set; } = null!;
        [Column("so_dien_thoai")]
        [StringLength(10)]
        public string SoDienThoai { get; set; } = null!;
        [Column("gioi_tinh")]
        public bool GioiTinh { get; set; }
        [Column("username")]
        [StringLength(10)]
        public string Username { get; set; } = null!;
        [Column("password")]
        [StringLength(10)]
        public string Password { get; set; } = null!;
        [Column("email")]
        [StringLength(20)]
        public string Email { get; set; } = null!;

        [InverseProperty("MaKhachHangNavigation")]
        public virtual ICollection<BinhLuanSanPham> BinhLuanSanPhams { get; set; }
        [InverseProperty("MaKhachHangNavigation")]
        public virtual ICollection<HoaDon> HoaDons { get; set; }
    }
}
