-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 14, 2022 lúc 02:19 AM
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
  `ma_danh_gia` int(11) NOT NULL,
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
  `ma_danh_gia` int(11) NOT NULL,
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
  `mo_ta_khac` int(11) NOT NULL
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
  `id` int(11) NOT NULL,
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
