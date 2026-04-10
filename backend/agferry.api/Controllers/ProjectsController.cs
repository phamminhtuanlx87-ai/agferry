using agferry.api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using static agferry.api.Controllers.UsersController;

namespace agferry.api.Controllers
{
    public class ProjectsController : Controller
    {
        private readonly AgferryDatabaseContext _context;

        public ProjectsController(AgferryDatabaseContext context)
        {
            _context = context;
        }

        public class ProjectRequest
        {
            public int Id { get; set; }

            [Required]
            public required string TenCongTrinh { get; set; } = null!;

            [Required]
            public required DateOnly? NgayTao { get; set; }

            [Required]
            public required string? DonViChuQuan { get; set; }

            [Required]
            public required string? MaHieuGiaiDoan { get; set; }

        }

        [HttpPost("api/addproject")]
        public async Task<IActionResult> AddProject([FromBody] ProjectRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);

            if (string.IsNullOrWhiteSpace(request.MaHieuGiaiDoan))
            {
                return BadRequest("MaHieuGiaiDoan is required.");
            }

            var mahieu = await _context.DanhMucGiaiDoans
                .FirstOrDefaultAsync(mh => mh.MaHieuGiaiDoan == request.MaHieuGiaiDoan);
            ArgumentNullException.ThrowIfNull(mahieu);
            if (mahieu == null)
                return BadRequest("MaHieuGiaiDoan không tồn tại.");
            var ctr = new CongTrinh
            {
                TenCongTrinh = request.TenCongTrinh,
                NgayTao = request.NgayTao,
                DonViChuQuan = request.DonViChuQuan,
                MaHieuGiaiDoan = mahieu.MaHieuGiaiDoan,
            };


            await _context.CongTrinhs.AddAsync(ctr);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                TenCongTrinh = request.TenCongTrinh,
                NgayTao = request.NgayTao,
                DonViChuQuan = request.DonViChuQuan,
                MaHieuGiaiDoan = request.MaHieuGiaiDoan
            });
        }
        [HttpPost("api/editproject/{id}")]
        public async Task<IActionResult> EditProject([FromBody] ProjectRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);

            var mahieu = await _context.DanhMucGiaiDoans
               .FirstOrDefaultAsync(mh => mh.MaHieuGiaiDoan == request.MaHieuGiaiDoan);
            ArgumentNullException.ThrowIfNull(mahieu);
            if (mahieu == null)
                return BadRequest("MaHieuGiaiDoan không tồn tại.");

            var ctr = await _context.CongTrinhs
         .FirstOrDefaultAsync(u => u.Id == request.Id);
            if (ctr != null)
            {
                ctr.TenCongTrinh = request.TenCongTrinh;
                ctr.DonViChuQuan = request.DonViChuQuan;
                ctr.MaHieuGiaiDoan = mahieu.MaHieuGiaiDoan;
            }
            else return NotFound();
            await _context.SaveChangesAsync();

            return Ok(new
            {
                TenCongTrinh = request.TenCongTrinh,
                NgayTao = request.NgayTao,
                DonViChuQuan = request.DonViChuQuan,
                MaHieuGiaiDoan = request.MaHieuGiaiDoan
            });
        }
        [HttpGet("api/getproject/{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var ctr = await _context.CongTrinhs
             .Include(ct => ct.MaHieuGiaiDoanNavigation)
             .FirstOrDefaultAsync(u => u.Id == id);
            if (ctr == null)
                return NotFound();
            var chiTietCtr = await _context.ChiTietCongTrinhs
                .Where(ct => ct.CongTrinhId == id)
                .Select(ct => new
                {
                    ct.Id,
                    ct.CongTrinhId,
                    ct.MaHieuGiaiDoan,
                    ct.MaHieuDonVi,
                    ct.NgayThucHien,
                    ct.TongGiaTri,
                    ct.ChiPhiXayDung,
                    ct.SoNgayTcPgv,
                    ct.NgayHoanThanh,
                    ct.SoNgayTcThucTe,
                    ct.LinkFile
                })
                .ToListAsync();
            return Ok(new
            {
                maCongTrinh = ctr.Id,
                TenCongTrinh = ctr.TenCongTrinh,
                NgayTao = ctr.NgayTao,
                DonViChuQuan = ctr.DonViChuQuan,
                MaHieuGiaiDoan = ctr.MaHieuGiaiDoan,
                TenGiaiDoan = ctr.MaHieuGiaiDoanNavigation?.TenGiaiDoan,
                ChiTietCongTrinhs = chiTietCtr,
            }); 
        }

        [HttpGet("api/getprojectlist/{year}")]
        public async Task<IActionResult> GetProjectList(int year)
        {
            // 1. Lấy danh sách công trình theo năm và include các bảng liên quan
            var projects = await _context.CongTrinhs
                .Where(ct => ct.NgayTao.HasValue && ct.NgayTao.Value.Year == year)
                .Include(ct => ct.ChiTietCongTrinhs)
                    .ThenInclude(ctct => ctct.MaHieuGiaiDoanNavigation)
                .ToListAsync();

            if (projects == null || !projects.Any())
                return NotFound();

            // 2. Map dữ liệu sang DTO (Data Transfer Object) để trả về đúng định dạng bảng
            var result = projects.Select(ct => {
                // Lấy giai đoạn mới nhất để xác định trạng thái và đơn vị hiện tại
                var latestStage = ct.ChiTietCongTrinhs
                    .OrderByDescending(s => s.Id) // Giả sử bạn có cột NgayCapNhat hoặc Id
                    .FirstOrDefault();

                // Lấy thông tin dự toán (Giai đoạn 'DT')
                var duToanStage = ct.ChiTietCongTrinhs
                    .FirstOrDefault(s => s.MaHieuGiaiDoan == "PD_DT");

                // Lấy thông tin dự toán điều chỉnh (Giai đoạn 'DTDC')
                var duToanDieuChinhStage = ct.ChiTietCongTrinhs
                    .FirstOrDefault(s => s.MaHieuGiaiDoan == "PD_DT_PS");

                return new
                {
                    MaCT = ct.Id,
                    TenCongTrinh = ct.TenCongTrinh,
                    DonViChuQuan = ct.DonViChuQuan,
                    DonVi = latestStage?.MaHieuDonVi,
                    NgayTao = ct.NgayTao,

                    // Số tiền phê duyệt từ giai đoạn DT
                    QDPheDuyetDT = duToanStage?.TongGiaTri,

                    // Số tiền từ giai đoạn DTDC
                    QDPheDuyetDTDC = duToanDieuChinhStage?.TongGiaTri,

                    // Quyết toán (Nếu có giai đoạn quyết toán riêng)
                    QuyetToan = ct.ChiTietCongTrinhs.FirstOrDefault(s => s.MaHieuGiaiDoan == "QT")?.TongGiaTri,

                    TrangThai = latestStage?.MaHieuGiaiDoanNavigation?.TenGiaiDoan,
                    MaTrangThai = latestStage?.MaHieuGiaiDoan // Dùng để render màu sắc UI
                };
            });

            return Ok(result);
        }

        public class StageRequest
        {
            public int Id { get; set; }

            public int? CongTrinhId { get; set; }

            public string? MaHieuGiaiDoan { get; set; }

            public string? MaHieuDonVi { get; set; }

            public DateOnly? NgayThucHien { get; set; }

            public decimal? TongGiaTri { get; set; }

            public decimal? ChiPhiXayDung { get; set; }

            public int? SoNgayTcPgv { get; set; }

            public DateOnly? NgayHoanThanh { get; set; }

            public int? SoNgayTcThucTe { get; set; }

            public string? LinkFile { get; set; }
        }

        [HttpPost("api/addstage")]
        public async Task<IActionResult> AddStage([FromBody] StageRequest request)
        {
            ArgumentNullException.ThrowIfNull(request);

            var congTrinh = await _context.CongTrinhs
                .FirstOrDefaultAsync(ctr => ctr.Id == request.CongTrinhId);
            if (congTrinh == null)
                return BadRequest("Công trình không tồn tại.");
            var mahieu = await _context.DanhMucGiaiDoans
                 .FirstOrDefaultAsync(ctr => ctr.MaHieuGiaiDoan == request.MaHieuGiaiDoan);
            if (mahieu == null)
                return BadRequest("Mã hiệu không tồn tại.");
            var donvi = await _context.DanhMucDonVis
                .FirstOrDefaultAsync(ctr => ctr.MaHieuDonVi == request.MaHieuDonVi);
            if (donvi == null)
                return BadRequest("Đơn vị không tồn tại.");

            var chiTietCtr = new ChiTietCongTrinh
            {
                CongTrinhId = request.CongTrinhId,
                MaHieuGiaiDoan = request.MaHieuGiaiDoan,
                MaHieuDonVi = request.MaHieuDonVi,
                NgayThucHien = request.NgayThucHien,
                TongGiaTri = request.TongGiaTri,
                ChiPhiXayDung = request.ChiPhiXayDung,
                SoNgayTcPgv = request.SoNgayTcPgv,
                NgayHoanThanh = request.NgayHoanThanh,
                SoNgayTcThucTe = request.SoNgayTcThucTe,
                LinkFile = request.LinkFile
            };
            var existingStage = await _context.ChiTietCongTrinhs
                .FirstOrDefaultAsync(mh => mh.MaHieuGiaiDoan == request.MaHieuGiaiDoan && mh.CongTrinhId == request.CongTrinhId);

            // If an existing stage exists, update it; otherwise add a new one
            if (existingStage != null)
            {   
                existingStage.MaHieuDonVi = chiTietCtr.MaHieuDonVi;
                existingStage.NgayThucHien = chiTietCtr.NgayThucHien;
                existingStage.TongGiaTri = chiTietCtr.TongGiaTri;
                existingStage.ChiPhiXayDung = chiTietCtr.ChiPhiXayDung;
                existingStage.SoNgayTcPgv = chiTietCtr.SoNgayTcPgv;
                existingStage.NgayHoanThanh = chiTietCtr.NgayHoanThanh;
                existingStage.SoNgayTcThucTe = chiTietCtr.SoNgayTcThucTe;
                existingStage.LinkFile = chiTietCtr.LinkFile;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    existingStage.Id,
                    existingStage.CongTrinhId,
                    existingStage.MaHieuGiaiDoan,
                    existingStage.MaHieuDonVi,
                    existingStage.NgayThucHien,
                    existingStage.TongGiaTri,
                    existingStage.ChiPhiXayDung,
                    existingStage.SoNgayTcPgv,
                    existingStage.NgayHoanThanh,
                    existingStage.SoNgayTcThucTe,
                    existingStage.LinkFile
                });
            }

            // Add to the ChiTietCongTrinhs DbSet (not CongTrinhs)
            await _context.ChiTietCongTrinhs.AddAsync(chiTietCtr);  
            await _context.SaveChangesAsync();

            // Return a DTO with selected fields to avoid circular JSON references
            return Ok(new
            {
                chiTietCtr.Id,
                chiTietCtr.CongTrinhId,
                chiTietCtr.MaHieuGiaiDoan,
                chiTietCtr.MaHieuDonVi,
                chiTietCtr.NgayThucHien,
                chiTietCtr.TongGiaTri,
                chiTietCtr.ChiPhiXayDung,
                chiTietCtr.SoNgayTcPgv,
                chiTietCtr.NgayHoanThanh,
                chiTietCtr.SoNgayTcThucTe,
                chiTietCtr.LinkFile
            });
        }








        // GET: ProjectsController
        public ActionResult Index()
        {
            return View();
        }

        // GET: ProjectsController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ProjectsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ProjectsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ProjectsController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ProjectsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ProjectsController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ProjectsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
