using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShopLaptop_EFCore.Models
{
    [Table("HoaDon")]
    public partial class HoaDon
    {
        public HoaDon()
        {
            ChiTietHoaDons = new HashSet<ChiTietHoaDon>();
        }

        [Key]
        [Column("ma_hoa_don")]
        [StringLength(10)]
        public string MaHoaDon { get; set; } = null!;
        [Column("ma_khach_hang")]
        [StringLength(5)]
        public string MaKhachHang { get; set; } = null!;
        [Column("ngay_chot_don", TypeName = "date")]
        public DateTime NgayChotDon { get; set; }
        [Column("tinh_trang_giao_hang")]
        public int TinhTrangGiaoHang { get; set; }
        [Column("tong_tien")]
        public long TongTien { get; set; }
        [Column("ma_nhan_vien")]
        [StringLength(10)]
        public string MaNhanVien { get; set; } = null!;

        [ForeignKey("MaKhachHang")]
        [InverseProperty("HoaDons")]
        public virtual KhachHang MaKhachHangNavigation { get; set; } = null!;
        [ForeignKey("MaNhanVien")]
        [InverseProperty("HoaDons")]
        public virtual NhanVien MaNhanVienNavigation { get; set; } = null!;
        [InverseProperty("MaHoaDonNavigation")]
        public virtual ICollection<ChiTietHoaDon> ChiTietHoaDons { get; set; }
    }
}
