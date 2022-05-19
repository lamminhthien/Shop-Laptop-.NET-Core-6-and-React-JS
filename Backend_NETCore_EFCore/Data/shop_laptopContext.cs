using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ShopLaptop_EFCore.Models;

namespace ShopLaptop_EFCore.Data
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
                entity.HasKey(e => e.MaAnh)
                    .HasName("PK__AnhSanPh__06C6A4630B7103A0");

                entity.Property(e => e.FileAnh).IsFixedLength();

                entity.HasOne(d => d.MaSanPhamNavigation)
                    .WithMany(p => p.AnhSanPhams)
                    .HasForeignKey(d => d.MaSanPham)
                    .HasConstraintName("FK_AnhSanPham_SanPham");
            });

            modelBuilder.Entity<BienDongGium>(entity =>
            {
                entity.HasOne(d => d.MaSanPhamNavigation)
                    .WithMany(p => p.BienDongGia)
                    .HasForeignKey(d => d.MaSanPham)
                    .HasConstraintName("FK_BienDongGia_SanPham");
            });

            modelBuilder.Entity<BinhLuanSanPham>(entity =>
            {
                entity.HasKey(e => e.MaBinhLuan)
                    .HasName("PK__BinhLuan__300DD2D85FA64E47");

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
                    .HasName("PK__ChiTietH__051D20008926D693");

                entity.HasOne(d => d.MaHoaDonNavigation)
                    .WithMany(p => p.ChiTietHoaDons)
                    .HasForeignKey(d => d.MaHoaDon)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChiTietHoaDon_HoaDon");

                entity.HasOne(d => d.MaSanPhamNavigation)
                    .WithMany(p => p.ChiTietHoaDons)
                    .HasForeignKey(d => d.MaSanPham)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChiTietHoaDon_SanPham");
            });

            modelBuilder.Entity<ChiTietSanPham>(entity =>
            {
                entity.Property(e => e.MaSanPham).ValueGeneratedNever();

                entity.Property(e => e.KichThuoc).IsFixedLength();

                entity.HasOne(d => d.MaSanPhamNavigation)
                    .WithOne(p => p.ChiTietSanPham)
                    .HasForeignKey<ChiTietSanPham>(d => d.MaSanPham)
                    .HasConstraintName("FK_ChiTietSanPham_SanPham");
            });

            modelBuilder.Entity<GioHang>(entity =>
            {
                entity.HasOne(d => d.MaSanPhamNavigation)
                    .WithMany(p => p.GioHangs)
                    .HasForeignKey(d => d.MaSanPham)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GioHang_SanPham");
            });

            modelBuilder.Entity<HangSanXuat>(entity =>
            {
                entity.HasKey(e => e.MaHangSx)
                    .HasName("PK__HangSanX__44ECD7A2B5969013");

                entity.Property(e => e.Logo).IsFixedLength();
            });

            modelBuilder.Entity<HoaDon>(entity =>
            {
                entity.HasKey(e => e.MaHoaDon)
                    .HasName("PK__HoaDon__DBE2D9E3C547A2C2");

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
                entity.HasKey(e => e.MaKhachHang)
                    .HasName("PK__KhachHan__C9817AF6341ED6CB");

                entity.Property(e => e.Email).IsFixedLength();

                entity.Property(e => e.Password).IsFixedLength();

                entity.Property(e => e.SoDienThoai).IsFixedLength();

                entity.Property(e => e.Username).IsFixedLength();
            });

            modelBuilder.Entity<LoaiSanPham>(entity =>
            {
                entity.HasKey(e => e.MaLoaiSp)
                    .HasName("PK__LoaiSanP__1E1E581AE2366A70");
            });

            modelBuilder.Entity<NhanVien>(entity =>
            {
                entity.HasKey(e => e.MaNhanVien)
                    .HasName("PK__NhanVien__6781B7B9CFD71863");

                entity.Property(e => e.Password).IsFixedLength();

                entity.Property(e => e.SoDienThoai).IsFixedLength();

                entity.Property(e => e.Username).IsFixedLength();
            });

            modelBuilder.Entity<PhanHoiBinhLuanSp>(entity =>
            {
                entity.HasKey(e => e.MaPhanHoi)
                    .HasName("PK__PhanHoiB__36D78DA93574E074");

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
                entity.HasKey(e => e.MaSanPham)
                    .HasName("PK__SanPham__9D25990C847C7047");

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
