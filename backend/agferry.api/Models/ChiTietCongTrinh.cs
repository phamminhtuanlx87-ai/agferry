using System;
using System.Collections.Generic;

namespace agferry.api.Models;

public partial class ChiTietCongTrinh
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

    public virtual CongTrinh? CongTrinh { get; set; }

    public virtual DanhMucDonVi? MaHieuDonViNavigation { get; set; }

    public virtual DanhMucGiaiDoan? MaHieuGiaiDoanNavigation { get; set; }
}
