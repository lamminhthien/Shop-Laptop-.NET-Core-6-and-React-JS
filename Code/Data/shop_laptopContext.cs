using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ContosoPizza.Models;

namespace ContosoPizza.Data
{
    public partial class shop_laptopContext : DbContext
    {
        public shop_laptopContext()
        {
        }

        public shop_laptopContext(DbContextOptions<shop_laptopContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AnhSanPham> AnhSanPhams { get; set; } = null!;
        public virtual DbSet<BienDongGium> BienDongGia { get; set; } = null!;
        public virtual DbSet<BinhLuanSanPham> BinhLuanSanPhams { get; set; } = null!;
        public virtual DbSet<ChiTietHoaDon> ChiTietHoaDons { get; set; } = null!;
        public virtual DbSet<ChiTietSanPham> ChiTietSanPhams { get; set; } = null!;
        public virtual DbSet<GioHang> GioHangs { get; set; } = null!;
        public virtual DbSet<HangSanXuat> HangSanXuats { get; set; } = null!;
        public virtual DbSet<HoaDon> HoaDons { get; set; } = null!;
        public virtual DbSet<KhachHang> KhachHangs { get; set; } = null!;
        public virtual DbSet<LoaiSanPham> LoaiSanPhams { get; set; } = null!;
        public virtual DbSet<NhanVien> NhanViens { get; set; } = null!;
        public virtual DbSet<PhanHoiBinhLuanSp> PhanHoiBinhLuanSps { get; set; } = null!;
        public virtual DbSet<SanPham> SanPhams { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=shop_laptop;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AnhSanPham>(entity =>
            {
                entity.Property(e => e.MaAnh).IsFixedLength();

                entity.Property(e => e.FileAnh).IsFixedLength();

                entity.Property(e => e.MaSanPham).IsFixedLength();

                entity.HasOne(d => d.MaSanPhamNavigation)
                    .WithMany(p => p.AnhSanPhams)
                    .HasForeignKey(d => d.MaSanPham)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AnhSanPham_SanPham");
            });

            modelBuilder.Entity<BienDongGium>(entity =>
            {
                entity.Property(e => e.MaSanPham).IsFixedLength();

                entity.HasOne(d => d.MaSanPhamNavigation)
                    .WithOne(p => p.BienDongGium)
                    .HasForeignKey<BienDongGium>(d => d.MaSanPham)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BienDongGia_SanPham");
            });

            modelBuilder.Entity<BinhLuanSanPham>(entity =>
            {
                entity.Property(e => e.MaBinhLuan).IsFixedLength();

                entity.Property(e => e.MaKhachHang).IsFixedLength();

                entity.Property(e => e.MaSanPham).IsFixedLength();

                entity.HasOne(d => d.MaKhachHangNavigation)
                    .WithMany(p => p.BinhLuanSanPhams)
                    .HasForeignKey(d => d.MaKhachHang)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BinhLuanSanPham_KhachHang");

                entity.HasOne(d => d.MaSanPhamNavigation)
                    .WithMany(p => p.BinhLuanSanPhams)
                    .HasForeignKey(d => d.MaSanPham)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BinhLuanSanPham_SanPham");
            });

            modelBuilder.Entity<ChiTietHoaDon>(entity =>
            {
                entity.HasKey(e => e.MaChiTietHoaDon)
                    .HasName("PK_dbo.ChiTietHoaDon");

                entity.Property(e => e.MaChiTietHoaDon).IsFixedLength();

                entity.Property(e => e.MaHoaDon).IsFixedLength();

                entity.Property(e => e.MaSanPham).IsFixedLength();

                entity.HasOne(d => d.MaHoaDonNavigation)
                    .WithMany(p => p.ChiTietHoaDons)
                    .HasForeignKey(d => d.MaHoaDon)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo.ChiTietHoaDon_HoaDon");

                entity.HasOne(d => d.MaSanPhamNavigation)
                    .WithMany(p => p.ChiTietHoaDons)
                    .HasForeignKey(d => d.MaSanPham)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_dbo.ChiTietHoaDon_SanPham");
            });

            modelBuilder.Entity<ChiTietSanPham>(entity =>
            {
                entity.Property(e => e.MaSanPham).IsFixedLength();

                entity.Property(e => e.CardDoHoa).IsFixedLength();

                entity.Property(e => e.Cpu).IsFixedLength();

                entity.Property(e => e.HeDieuHanh).IsFixedLength();

                entity.Property(e => e.MoTaThem).IsFixedLength();

                entity.HasOne(d => d.MaSanPhamNavigation)
                    .WithOne(p => p.ChiTietSanPham)
                    .HasForeignKey<ChiTietSanPham>(d => d.MaSanPham)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChiTietSanPham_SanPham");
            });

            modelBuilder.Entity<GioHang>(entity =>
            {
                entity.Property(e => e.MaKhachHang).IsFixedLength();

                entity.Property(e => e.MaSanPham).IsFixedLength();

                entity.HasOne(d => d.MaSanPhamNavigation)
                    .WithMany(p => p.GioHangs)
                    .HasForeignKey(d => d.MaSanPham)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GioHang_SanPham");
            });

            modelBuilder.Entity<HangSanXuat>(entity =>
            {
                entity.Property(e => e.MaHangSx).IsFixedLength();

                entity.Property(e => e.Logo).IsFixedLength();
            });

            modelBuilder.Entity<HoaDon>(entity =>
            {
                entity.Property(e => e.MaHoaDon).IsFixedLength();

                entity.Property(e => e.MaKhachHang).IsFixedLength();

                entity.Property(e => e.MaNhanVien).IsFixedLength();

                entity.HasOne(d => d.MaKhachHangNavigation)
                    .WithMany(p => p.HoaDons)
                    .HasForeignKey(d => d.MaKhachHang)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HoaDon_KhachHang");

                entity.HasOne(d => d.MaNhanVienNavigation)
                    .WithMany(p => p.HoaDons)
                    .HasForeignKey(d => d.MaNhanVien)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HoaDon_NhanVien");
            });

            modelBuilder.Entity<KhachHang>(entity =>
            {
                entity.Property(e => e.MaKhachHang).IsFixedLength();

                entity.Property(e => e.Email).IsFixedLength();

                entity.Property(e => e.Password).IsFixedLength();

                entity.Property(e => e.SoDienThoai).IsFixedLength();

                entity.Property(e => e.Username).IsFixedLength();
            });

            modelBuilder.Entity<LoaiSanPham>(entity =>
            {
                entity.Property(e => e.MaLoaiSp).IsFixedLength();

                entity.Property(e => e.AnhMinhHoa).IsFixedLength();
            });

            modelBuilder.Entity<NhanVien>(entity =>
            {
                entity.Property(e => e.MaNhanVien).IsFixedLength();

                entity.Property(e => e.Password).IsFixedLength();

                entity.Property(e => e.SoDienThoai).IsFixedLength();

                entity.Property(e => e.Username).IsFixedLength();
            });

            modelBuilder.Entity<PhanHoiBinhLuanSp>(entity =>
            {
                entity.Property(e => e.MaPhanHoi).IsFixedLength();

                entity.Property(e => e.MaBinhLuan).IsFixedLength();

                entity.Property(e => e.MaNhanVien).IsFixedLength();

                entity.HasOne(d => d.MaBinhLuanNavigation)
                    .WithMany(p => p.PhanHoiBinhLuanSps)
                    .HasForeignKey(d => d.MaBinhLuan)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PhanHoiBinhLuanSP_BinhLuanSanPham");

                entity.HasOne(d => d.MaNhanVienNavigation)
                    .WithMany(p => p.PhanHoiBinhLuanSps)
                    .HasForeignKey(d => d.MaNhanVien)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PhanHoiBinhLuanSP_NhanVien");
            });

            modelBuilder.Entity<SanPham>(entity =>
            {
                entity.Property(e => e.MaSanPham).IsFixedLength();

                entity.Property(e => e.MaHangSx).IsFixedLength();

                entity.Property(e => e.MaLoaiSp).IsFixedLength();

                entity.Property(e => e.TrangThaiSp).IsFixedLength();

                entity.HasOne(d => d.MaHangSxNavigation)
                    .WithMany(p => p.SanPhams)
                    .HasForeignKey(d => d.MaHangSx)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SanPham_HangSanXuat");

                entity.HasOne(d => d.MaLoaiSpNavigation)
                    .WithMany(p => p.SanPhams)
                    .HasForeignKey(d => d.MaLoaiSp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SanPham_LoaiSanPham");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
