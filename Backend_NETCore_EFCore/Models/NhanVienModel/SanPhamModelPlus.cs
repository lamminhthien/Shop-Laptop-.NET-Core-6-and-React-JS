using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace ShopLaptop_EFCore.Models.NhanVienModel
{
    [Table("SanPham")]
    [Index("TenSanPham", Name = "UQ__SanPham__BA66C031EDFC9119", IsUnique = true)]
    public class SanPhamModelPlus
    {
        public SanPhamModelPlus(string tenSanPham, int maLoaiSp, int maHangSx, int trangThaiSp, long gia, string? cpu, string? cardDoHoa, string? doPhanGiai, int? oCung, string? heDieuHanh, double? manHinh, string? kichThuoc, double? trongLuong, string moTaThem, int? ram, double chietKhau)
        {
            TenSanPham = tenSanPham;
            MaLoaiSp = maLoaiSp;
            MaHangSx = maHangSx;
            TrangThaiSp = trangThaiSp;
            Gia = gia;
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
            ChietKhau = chietKhau;
        }

        [Key]
        [Column("ma_san_pham")]
        public int MaSanPham { get; set; }
        [Column("ten_san_pham")]
        [StringLength(50)]
        public string TenSanPham { get; set; } = null!;
        [Column("ma_loai_sp")]
        public int MaLoaiSp { get; set; }
        [Column("ma_hang_sx")]
        public int MaHangSx { get; set; }
        [Column("trang_thai_sp")]
        public int TrangThaiSp { get; set; }
        [Column("gia")]
        public long Gia { get; set; }
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
        [StringLength(170)]
        public string? KichThuoc { get; set; }
        [Column("trong_luong")]
        // Ràng buộc phạm vi kich thươc laptop
        [Range(0.1,5)]
        public double? TrongLuong { get; set; }
        [Column("mo_ta_them", TypeName = "text")]
        public string MoTaThem { get; set; } = null!;
        [Column("ram")]
        public int? Ram { get; set; }

        [Column("chiet_khau")]
        // Ràng buộc phạm vi chiết khấu
        [Range(0.1,1)]
        public double ChietKhau { get; set; }
    }
}
