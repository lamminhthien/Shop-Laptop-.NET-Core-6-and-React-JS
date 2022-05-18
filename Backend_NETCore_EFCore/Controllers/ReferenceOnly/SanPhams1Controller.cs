using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;

namespace ShopLaptop_EFCore.Controllers.ReferenceOnly
{
    public class SanPhams1Controller : Controller
    {
        private readonly shop_laptopContext _context;

        public SanPhams1Controller(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: SanPhams1
        public async Task<IActionResult> Index()
        {
            var shop_laptopContext = _context.SanPhams.Include(s => s.MaHangSxNavigation).Include(s => s.MaLoaiSpNavigation);
            return View(await shop_laptopContext.ToListAsync());
        }

        // GET: SanPhams1/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.SanPhams == null)
            {
                return NotFound();
            }

            var sanPham = await _context.SanPhams
                .Include(s => s.MaHangSxNavigation)
                .Include(s => s.MaLoaiSpNavigation)
                .FirstOrDefaultAsync(m => m.MaSanPham == id);
            if (sanPham == null)
            {
                return NotFound();
            }

            return View(sanPham);
        }

        // GET: SanPhams1/Create
        public IActionResult Create()
        {
            ViewData["MaHangSx"] = new SelectList(_context.HangSanXuats, "MaHangSx", "MaHangSx");
            ViewData["MaLoaiSp"] = new SelectList(_context.LoaiSanPhams, "MaLoaiSp", "MaLoaiSp");
            return View();
        }

        // POST: SanPhams1/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("MaSanPham,TenSanPham,MaLoaiSp,MaHangSx,TrangThaiSp,Gia")] SanPham sanPham)
        {
            if (ModelState.IsValid)
            {
                _context.Add(sanPham);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["MaHangSx"] = new SelectList(_context.HangSanXuats, "MaHangSx", "MaHangSx", sanPham.MaHangSx);
            ViewData["MaLoaiSp"] = new SelectList(_context.LoaiSanPhams, "MaLoaiSp", "MaLoaiSp", sanPham.MaLoaiSp);
            return View(sanPham);
        }

        // GET: SanPhams1/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.SanPhams == null)
            {
                return NotFound();
            }

            var sanPham = await _context.SanPhams.FindAsync(id);
            if (sanPham == null)
            {
                return NotFound();
            }
            ViewData["MaHangSx"] = new SelectList(_context.HangSanXuats, "MaHangSx", "MaHangSx", sanPham.MaHangSx);
            ViewData["MaLoaiSp"] = new SelectList(_context.LoaiSanPhams, "MaLoaiSp", "MaLoaiSp", sanPham.MaLoaiSp);
            return View(sanPham);
        }

        // POST: SanPhams1/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("MaSanPham,TenSanPham,MaLoaiSp,MaHangSx,TrangThaiSp,Gia")] SanPham sanPham)
        {
            if (id != sanPham.MaSanPham)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(sanPham);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SanPhamExists(sanPham.MaSanPham))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["MaHangSx"] = new SelectList(_context.HangSanXuats, "MaHangSx", "MaHangSx", sanPham.MaHangSx);
            ViewData["MaLoaiSp"] = new SelectList(_context.LoaiSanPhams, "MaLoaiSp", "MaLoaiSp", sanPham.MaLoaiSp);
            return View(sanPham);
        }

        // GET: SanPhams1/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.SanPhams == null)
            {
                return NotFound();
            }

            var sanPham = await _context.SanPhams
                .Include(s => s.MaHangSxNavigation)
                .Include(s => s.MaLoaiSpNavigation)
                .FirstOrDefaultAsync(m => m.MaSanPham == id);
            if (sanPham == null)
            {
                return NotFound();
            }

            return View(sanPham);
        }

        // POST: SanPhams1/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.SanPhams == null)
            {
                return Problem("Entity set 'shop_laptopContext.SanPhams'  is null.");
            }
            var sanPham = await _context.SanPhams.FindAsync(id);
            if (sanPham != null)
            {
                _context.SanPhams.Remove(sanPham);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SanPhamExists(int id)
        {
          return (_context.SanPhams?.Any(e => e.MaSanPham == id)).GetValueOrDefault();
        }
    }
}
