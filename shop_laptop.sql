-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 14, 2022 lúc 03:20 AM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `shop_laptop`
--
CREATE DATABASE IF NOT EXISTS `shop_laptop` DEFAULT CHARACTER SET utf8 COLLATE utf8_vietnamese_ci;
USE `shop_laptop`;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `anh_san_pham`
--

CREATE TABLE `anh_san_pham` (
  `ma_anh` int(11) NOT NULL,
  `ma_san_pham` int(11) NOT NULL,
  `anh` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `binh_luan_san_pham`
--

CREATE TABLE `binh_luan_san_pham` (
  `ma_binh_luan` int(11) NOT NULL,
  `ma_khach_hang` int(11) NOT NULL,
  `ma_san_pham` int(11) NOT NULL,
  `noi_dung` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_dat_hang`
--

CREATE TABLE `chi_tiet_dat_hang` (
  `ma_dat_hang` int(11) NOT NULL,
  `ma_san_pham` int(11) NOT NULL,
  `so_luong` int(11) NOT NULL,
  `ngay_nhan_hang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuc_vu`
--

CREATE TABLE `chuc_vu` (
  `ma_chuc_vu` int(11) NOT NULL,
  `ten_chuc_vu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dat_hang`
--

CREATE TABLE `dat_hang` (
  `ma_dat_hang` int(11) NOT NULL,
  `ma_khach_hang` int(11) NOT NULL,
  `ngay_dat` int(11) NOT NULL,
  `tong_tien` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gio_hang`
--

CREATE TABLE `gio_hang` (
  `ma_khach_hang` int(11) NOT NULL,
  `ma_san_pham` int(11) NOT NULL,
  `so_luong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hang_san_xuat`
--

CREATE TABLE `hang_san_xuat` (
  `ma_hang_sx` int(11) NOT NULL,
  `ten_hang_sx` int(11) NOT NULL,
  `logo_hang_sx` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khach_hang`
--

CREATE TABLE `khach_hang` (
  `ma_khach_hang` int(11) NOT NULL,
  `ho_ten` int(11) NOT NULL,
  `dia_chi` int(11) NOT NULL,
  `id_tai_khoan` int(11) NOT NULL,
  `so_dien_thoai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loai_san_pham`
--

CREATE TABLE `loai_san_pham` (
  `ma_loai_sp` int(11) NOT NULL,
  `ten_loai_sp` int(11) NOT NULL,
  `anh_minh_hoa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhan_vien`
--

CREATE TABLE `nhan_vien` (
  `ma_nhan_vien` int(11) NOT NULL,
  `ten_nhan_vien` int(11) NOT NULL,
  `ma_chuc_vu` int(11) NOT NULL,
  `id_tai_khoan` int(11) NOT NULL,
  `dia_chi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phan_hoi_binh_luan_sp`
--

CREATE TABLE `phan_hoi_binh_luan_sp` (
  `ma_phan_hoi` int(11) NOT NULL,
  `ma_binh_luan` int(11) NOT NULL,
  `ma_nhan_vien` int(11) NOT NULL,
  `noi_dung` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phan_quyen`
--

CREATE TABLE `phan_quyen` (
  `ma_quyen` int(11) NOT NULL,
  `ten_quyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `san_pham`
--

CREATE TABLE `san_pham` (
  `cpu` int(11) NOT NULL,
  `gpu` int(11) NOT NULL,
  `ram` int(11) NOT NULL,
  `man_hinh` int(11) NOT NULL,
  `bo_nho_luu_tru` int(11) NOT NULL,
  `gia` int(11) NOT NULL,
  `mo_ta_khac` int(11) NOT NULL,
  `ma_san_pham` int(11) NOT NULL,
  `ma_loai_sp` int(11) NOT NULL,
  `ma_hang_sx` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `san_pham_yeu_thich`
--

CREATE TABLE `san_pham_yeu_thich` (
  `ma_khach_hang` int(11) NOT NULL,
  `ma_san_pham` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `id_tai_khoan` int(11) NOT NULL,
  `username` int(11) NOT NULL,
  `password` int(11) NOT NULL,
  `email` int(11) NOT NULL,
  `ngay_tao` int(11) NOT NULL,
  `so_dien_thoai` int(11) NOT NULL,
  `ngay_sinh` int(11) NOT NULL,
  `gioi_tinh` int(11) NOT NULL,
  `so_lan_canh_cao` int(11) NOT NULL,
  `trang_thai` int(11) NOT NULL,
  `ma_quyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `anh_san_pham`
--
ALTER TABLE `anh_san_pham`
  ADD PRIMARY KEY (`ma_anh`),
  ADD KEY `ma_san_pham` (`ma_san_pham`);

--
-- Chỉ mục cho bảng `binh_luan_san_pham`
--
ALTER TABLE `binh_luan_san_pham`
  ADD PRIMARY KEY (`ma_binh_luan`),
  ADD KEY `ma_san_pham` (`ma_san_pham`),
  ADD KEY `ma_khach_hang` (`ma_khach_hang`);

--
-- Chỉ mục cho bảng `chi_tiet_dat_hang`
--
ALTER TABLE `chi_tiet_dat_hang`
  ADD PRIMARY KEY (`ma_dat_hang`),
  ADD KEY `ma_san_pham` (`ma_san_pham`);

--
-- Chỉ mục cho bảng `chuc_vu`
--
ALTER TABLE `chuc_vu`
  ADD PRIMARY KEY (`ma_chuc_vu`);

--
-- Chỉ mục cho bảng `dat_hang`
--
ALTER TABLE `dat_hang`
  ADD PRIMARY KEY (`ma_dat_hang`),
  ADD KEY `ma_khach_hang` (`ma_khach_hang`);

--
-- Chỉ mục cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD PRIMARY KEY (`ma_khach_hang`),
  ADD KEY `ma_san_pham` (`ma_san_pham`);

--
-- Chỉ mục cho bảng `hang_san_xuat`
--
ALTER TABLE `hang_san_xuat`
  ADD PRIMARY KEY (`ma_hang_sx`);

--
-- Chỉ mục cho bảng `khach_hang`
--
ALTER TABLE `khach_hang`
  ADD PRIMARY KEY (`ma_khach_hang`),
  ADD KEY `id_tai_khoan` (`id_tai_khoan`);

--
-- Chỉ mục cho bảng `loai_san_pham`
--
ALTER TABLE `loai_san_pham`
  ADD PRIMARY KEY (`ma_loai_sp`);

--
-- Chỉ mục cho bảng `nhan_vien`
--
ALTER TABLE `nhan_vien`
  ADD PRIMARY KEY (`ma_nhan_vien`,`id_tai_khoan`),
  ADD KEY `ma_chuc_vu` (`ma_chuc_vu`),
  ADD KEY `id_tai_khoan` (`id_tai_khoan`);

--
-- Chỉ mục cho bảng `phan_hoi_binh_luan_sp`
--
ALTER TABLE `phan_hoi_binh_luan_sp`
  ADD PRIMARY KEY (`ma_phan_hoi`),
  ADD KEY `ma_binh_luan` (`ma_binh_luan`),
  ADD KEY `ma_nhan_vien` (`ma_nhan_vien`);

--
-- Chỉ mục cho bảng `phan_quyen`
--
ALTER TABLE `phan_quyen`
  ADD PRIMARY KEY (`ma_quyen`);

--
-- Chỉ mục cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`ma_san_pham`),
  ADD KEY `ma_loai_sp` (`ma_loai_sp`),
  ADD KEY `ma_hang_sx` (`ma_hang_sx`);

--
-- Chỉ mục cho bảng `san_pham_yeu_thich`
--
ALTER TABLE `san_pham_yeu_thich`
  ADD KEY `ma_san_pham` (`ma_san_pham`),
  ADD KEY `ma_khach_hang` (`ma_khach_hang`);

--
-- Chỉ mục cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`id_tai_khoan`),
  ADD KEY `ma_quyen` (`ma_quyen`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `anh_san_pham`
--
ALTER TABLE `anh_san_pham`
  ADD CONSTRAINT `anh_san_pham_ibfk_1` FOREIGN KEY (`ma_san_pham`) REFERENCES `san_pham` (`ma_san_pham`);

--
-- Các ràng buộc cho bảng `binh_luan_san_pham`
--
ALTER TABLE `binh_luan_san_pham`
  ADD CONSTRAINT `binh_luan_san_pham_ibfk_1` FOREIGN KEY (`ma_san_pham`) REFERENCES `san_pham` (`ma_san_pham`),
  ADD CONSTRAINT `binh_luan_san_pham_ibfk_2` FOREIGN KEY (`ma_khach_hang`) REFERENCES `khach_hang` (`ma_khach_hang`);

--
-- Các ràng buộc cho bảng `chi_tiet_dat_hang`
--
ALTER TABLE `chi_tiet_dat_hang`
  ADD CONSTRAINT `chi_tiet_dat_hang_ibfk_1` FOREIGN KEY (`ma_san_pham`) REFERENCES `san_pham` (`ma_san_pham`);

--
-- Các ràng buộc cho bảng `dat_hang`
--
ALTER TABLE `dat_hang`
  ADD CONSTRAINT `dat_hang_ibfk_1` FOREIGN KEY (`ma_khach_hang`) REFERENCES `khach_hang` (`ma_khach_hang`);

--
-- Các ràng buộc cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD CONSTRAINT `gio_hang_ibfk_1` FOREIGN KEY (`ma_san_pham`) REFERENCES `san_pham` (`ma_san_pham`),
  ADD CONSTRAINT `gio_hang_ibfk_2` FOREIGN KEY (`ma_khach_hang`) REFERENCES `khach_hang` (`ma_khach_hang`);

--
-- Các ràng buộc cho bảng `khach_hang`
--
ALTER TABLE `khach_hang`
  ADD CONSTRAINT `khach_hang_ibfk_1` FOREIGN KEY (`id_tai_khoan`) REFERENCES `tai_khoan` (`id_tai_khoan`);

--
-- Các ràng buộc cho bảng `nhan_vien`
--
ALTER TABLE `nhan_vien`
  ADD CONSTRAINT `nhan_vien_ibfk_1` FOREIGN KEY (`ma_chuc_vu`) REFERENCES `chuc_vu` (`ma_chuc_vu`),
  ADD CONSTRAINT `nhan_vien_ibfk_2` FOREIGN KEY (`id_tai_khoan`) REFERENCES `tai_khoan` (`id_tai_khoan`);

--
-- Các ràng buộc cho bảng `phan_hoi_binh_luan_sp`
--
ALTER TABLE `phan_hoi_binh_luan_sp`
  ADD CONSTRAINT `phan_hoi_binh_luan_sp_ibfk_1` FOREIGN KEY (`ma_binh_luan`) REFERENCES `binh_luan_san_pham` (`ma_binh_luan`),
  ADD CONSTRAINT `phan_hoi_binh_luan_sp_ibfk_2` FOREIGN KEY (`ma_binh_luan`) REFERENCES `binh_luan_san_pham` (`ma_binh_luan`),
  ADD CONSTRAINT `phan_hoi_binh_luan_sp_ibfk_3` FOREIGN KEY (`ma_nhan_vien`) REFERENCES `nhan_vien` (`ma_nhan_vien`);

--
-- Các ràng buộc cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD CONSTRAINT `san_pham_ibfk_1` FOREIGN KEY (`ma_loai_sp`) REFERENCES `loai_san_pham` (`ma_loai_sp`),
  ADD CONSTRAINT `san_pham_ibfk_2` FOREIGN KEY (`ma_hang_sx`) REFERENCES `hang_san_xuat` (`ma_hang_sx`);

--
-- Các ràng buộc cho bảng `san_pham_yeu_thich`
--
ALTER TABLE `san_pham_yeu_thich`
  ADD CONSTRAINT `san_pham_yeu_thich_ibfk_1` FOREIGN KEY (`ma_san_pham`) REFERENCES `san_pham` (`ma_san_pham`),
  ADD CONSTRAINT `san_pham_yeu_thich_ibfk_2` FOREIGN KEY (`ma_khach_hang`) REFERENCES `khach_hang` (`ma_khach_hang`);

--
-- Các ràng buộc cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD CONSTRAINT `tai_khoan_ibfk_1` FOREIGN KEY (`ma_quyen`) REFERENCES `phan_quyen` (`ma_quyen`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
