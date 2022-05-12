/****** Script for SelectTopNRows command from SSMS  ******/
SELECT sp.ma_san_pham, lsp.ten_loai_sp, hsx.ten_hang_sx from SanPham sp join LoaiSanPham lsp on sp.ma_loai_sp = lsp.ma_loai_sp 
join HangSanXuat hsx on sp.ma_hang_sx = hsx.ma_hang_sx