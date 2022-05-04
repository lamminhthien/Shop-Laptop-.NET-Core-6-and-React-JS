#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ShopLaptop_EFCore.Data;
using ShopLaptop_EFCore.Models;

namespace ShopLaptop_EFCore.Controllers
{
    public class AnhSanPhamsViewController : Controller
    {
        private readonly shop_laptopContext _context;

        public AnhSanPhamsViewController(shop_laptopContext context)
        {
            _context = context;
        }

        // GET: AnhSanPhams
        public async Task<IActionResult> Index()
        {
            var shop_laptopContext = _context.AnhSanPhams.Include(a => a.MaSanPhamNavigation);
            return View(await shop_laptopContext.ToListAsync());
        }

        // GET: AnhSanPhams/Details/5
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var anhSanPham = await _context.AnhSanPhams
                .Include(a => a.MaSanPhamNavigation)
                .FirstOrDefaultAsync(m => m.MaAnh == id);
            if (anhSanPham == null)
            {
                return NotFound();
            }

            return View(anhSanPham);
        }

        // GET: AnhSanPhams/Create
        public IActionResult Create()
        {
            ViewData["MaSanPham"] = new SelectList(_context.SanPhams, "MaSanPham", "MaSanPham");
            return View();
        }

        // POST: AnhSanPhams/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("MaAnh,MaSanPham,FileAnh")] AnhSanPham anhSanPham)
        {
            if (ModelState.IsValid)
            {
                _context.Add(anhSanPham);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["MaSanPham"] = new SelectList(_context.SanPhams, "MaSanPham", "MaSanPham", anhSanPham.MaSanPham);
            return View(anhSanPham);
        }

        // GET: AnhSanPhams/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var anhSanPham = await _context.AnhSanPhams.FindAsync(id);
            if (anhSanPham == null)
            {
                return NotFound();
            }
            ViewData["MaSanPham"] = new SelectList(_context.SanPhams, "MaSanPham", "MaSanPham", anhSanPham.MaSanPham);
            return View(anhSanPham);
        }

        // POST: AnhSanPhams/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("MaAnh,MaSanPham,FileAnh")] AnhSanPham anhSanPham)
        {
            if (id != anhSanPham.MaAnh)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(anhSanPham);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AnhSanPhamExists(anhSanPham.MaAnh))
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
            ViewData["MaSanPham"] = new SelectList(_context.SanPhams, "MaSanPham", "MaSanPham", anhSanPham.MaSanPham);
            return View(anhSanPham);
        }

        // GET: AnhSanPhams/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var anhSanPham = await _context.AnhSanPhams
                .Include(a => a.MaSanPhamNavigation)
                .FirstOrDefaultAsync(m => m.MaAnh == id);
            if (anhSanPham == null)
            {
                return NotFound();
            }

            return View(anhSanPham);
        }

        // POST: AnhSanPhams/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var anhSanPham = await _context.AnhSanPhams.FindAsync(id);
            _context.AnhSanPhams.Remove(anhSanPham);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AnhSanPhamExists(string id)
        {
            return _context.AnhSanPhams.Any(e => e.MaAnh == id);
        }
    }
}
