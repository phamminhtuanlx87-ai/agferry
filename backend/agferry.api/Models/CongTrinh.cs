using System;
using System.Collections.Generic;

namespace agferry.api.Models;

public partial class CongTrinh
{
    public int Id { get; set; }

    public string TenCongTrinh { get; set; } = null!;

    public DateOnly? NgayTao { get; set; }

    public string? DonViChuQuan { get; set; }

    public string? MaHieuGiaiDoan { get; set; }

    public virtual ICollection<ChiTietCongTrinh> ChiTietCongTrinhs { get; set; } = new List<ChiTietCongTrinh>();

    public virtual DanhMucGiaiDoan? MaHieuGiaiDoanNavigation { get; set; }
}
